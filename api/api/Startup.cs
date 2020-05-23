using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Runtime.InteropServices;
using api.Configuration;
using api.Entities;
using api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace api
{
    public class Startup
    {
        private readonly IDatabaseInitialize _databaseInitialize;

        public Startup(IConfiguration configuration, IDatabaseInitialize databaseInitialize)
        {
            Configuration = configuration;
            _databaseInitialize = databaseInitialize;
        }

        internal static IConfiguration Configuration { get; private set; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            
            services
                .AddAuthentication(sharedOptions =>
                {
                    sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    var authSettings = Configuration.GetSection("AzureAd").Get<AzureAdOptions>();

                    options.Audience = authSettings.ClientId;
                    options.Authority = authSettings.Authority;
                });

            
            services.AddAuthorization(options =>
            {
                var authSettings = Configuration.GetSection("AzureAd").Get<AzureAdOptions>();

                options.AddPolicy("admin",
                    policy => policy.RequireClaim("groups", authSettings.AdminGroupId));
            });

            services.AddControllers()
                .AddNewtonsoftJson(
                options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    
                    options.SerializerSettings.ContractResolver =
                        new CamelCasePropertyNamesContractResolver();

                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());

                });

            services.AddHealthChecks();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "Digital Access Card ", Version = "v1"});

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                        "JWT Authorization header with the Bearer scheme. \r\n\r\n " +
                        "Enter 'Bearer' [space] and then your token in the text input as: \"Bearer 123123abcabc...\" \r\n\r\n " +
                        "One why to get a token is to check the console after signing in to the administration web in dev mode.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.XML";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                c.IncludeXmlComments(xmlPath);
            });
            services.AddSwaggerGenNewtonsoftSupport();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IIdentityService, AzureAdIdentityService>();
            services.AddScoped<IAccessService, AccessService>();
            
            services.AddScoped<IAzureAdRepository, AzureAdRepository>();
            services.AddScoped<ISmartLockRepository, SmartLockRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<IAccessRepository, AccessRepository>();
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                services.AddDbContext<ApiContext>(opt =>
                    opt.UseSqlServer(Configuration.GetConnectionString("LockAccessDB")));
            }
            else
            {
                services.AddDbContext<ApiContext>(opt =>
                    opt.UseSqlServer(Configuration.GetConnectionString("MacLocalDB")));
            }
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            app.UseCors(builder =>
            {
                builder
                    .SetIsOriginAllowed(_ => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Digital Access Card API");
                c.RoutePrefix = string.Empty;

                c.DefaultModelExpandDepth(2);
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
                c.EnableDeepLinking();

            });
            
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints
                    .MapDefaultControllerRoute()
                    .RequireAuthorization();
                endpoints.MapHealthChecks("/api/health");
            });

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                _databaseInitialize.Initialize(serviceScope.ServiceProvider.GetRequiredService<ApiContext>());
            }
        }
    }
}
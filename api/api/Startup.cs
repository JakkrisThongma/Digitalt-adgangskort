using api.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;

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

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<CookiePolicyOptions>(options =>
			{
				// This lambda determines whether user consent for non-essential cookies is needed for a given request.
				options.CheckConsentNeeded = context => true;
				options.MinimumSameSitePolicy = SameSiteMode.None;
			});

			services.AddAuthentication(AzureADDefaults.AuthenticationScheme)
					.AddAzureAD(options => Configuration.Bind("AzureAd", options));

			services.Configure<OpenIdConnectOptions>(AzureADDefaults.OpenIdScheme, options =>
			{
				options.Authority = options.Authority + "/v2.0/";         // Microsoft identity platform

				options.TokenValidationParameters.ValidateIssuer = false; // accept several tenants (here simplified)
			});

			services.AddMvc(options =>
			{
				var policy = new AuthorizationPolicyBuilder()
								.RequireAuthenticatedUser()
								.Build();
				options.Filters.Add(new AuthorizeFilter(policy));
			})
			.SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			services.AddDbContext<ApiContext>(opt =>
				opt.UseSqlServer(Configuration.GetConnectionString("LockAccessDB")));
			services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints
				.MapDefaultControllerRoute()
				.RequireAuthorization();

			});

			using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
			{
				_databaseInitialize.Initialize(serviceScope.ServiceProvider.GetRequiredService<ApiContext>());
			}
		}
	}
}

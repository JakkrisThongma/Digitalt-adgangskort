using api.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using api.Services;

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

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
			{
				_databaseInitialize.Initialize(serviceScope.ServiceProvider.GetRequiredService<ApiContext>());
			}
		}
	}
}

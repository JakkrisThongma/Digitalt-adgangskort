using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace api
{
	public class Program
	{
		public static void Main(string[] args)
		{
			CreateHostBuilder(args).Build().Run();
		}

		public static IWebHostBuilder CreateHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.ConfigureLogging((context, logging) =>
				{
					logging.ClearProviders();
					logging.AddConfiguration(context.Configuration.GetSection("Logging"));
					logging.AddDebug();
					logging.AddConsole();
				})
				.ConfigureServices(serviceCollection =>
					serviceCollection
						.AddScoped<IDatabaseInitialize, DatabaseInitialize>())
				.UseStartup<Startup>();
	}
}

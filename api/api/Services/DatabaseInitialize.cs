using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Services
{
	public class DatabaseInitialize : IDatabaseInitialize
	{
		public void Initialize(ApiContext context)
		{
			context.Database.EnsureDeleted();
			context.Database.EnsureCreated();
			if(!context.Employees.ToList().Any())
			{
				var employees = new List<Models.Employee>
				{
					new Models.Employee
					{
						Firstname = "Bao",
						Lastname = "Nguyen",
						DayOfBirth = 211091,
						PhoneNumber = 47355622
					},
					new Models.Employee
					{
						Firstname = "Jakkris",
						Lastname = "Thongma",
						DayOfBirth = 050695,
						PhoneNumber = 45024278
					}
				};

				foreach (var employee in employees)
				{
					context.Employees.Add(employee);
					context.SaveChanges();
				}
			}

			if (!context.AccessLevels.ToList().Any())
			{
				var accessLevels = new List<Models.AccessLevel>
				{
					new Models.AccessLevel
					{
						Title = "Administrasjon"
					},
					new Models.AccessLevel
					{
						Title = "Utvikler"
					},
					new Models.AccessLevel
					{
						Title = "Økonomi"
					},
					new Models.AccessLevel
					{
						Title = "Markedsføring"
					},
					new Models.AccessLevel
					{
						Title = "Vekter"
					}
				};

				foreach (var accessLevel in accessLevels)
				{
					context.AccessLevels.Add(accessLevel);
					context.SaveChanges();
				}


			}

			if (!context.Locks.ToList().Any())
			{
				var locks = new List<Models.Doorlock>
				{
					new Models.Doorlock
					{
						Title = "Inngang"
					},
					new Models.Doorlock
					{
						Title = "Utgang"
					}
				};

				foreach (var lock1 in locks)
				{
					context.Locks.Add(lock1);
					context.SaveChanges();
				}


			}

		}
	}
}

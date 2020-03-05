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

			if (!context.DoorLocks.ToList().Any())
			{
				var locks = new List<Models.DoorLock>
				{
					new Models.DoorLock
					{
						Title = "Inngang"
					},
					new Models.DoorLock
					{
						Title = "Utgang"
					}
				};

				foreach (var lock1 in locks)
				{
					context.DoorLocks.Add(lock1);
					context.SaveChanges();
				}


			}

		}
	}
}

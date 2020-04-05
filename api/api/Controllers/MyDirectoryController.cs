/*
 * Created by: Saket Adhav
 * https://github.com/saketadhav/WebApiWithGraph
 */
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Services;
using Microsoft.Graph;
using System.Net;


namespace api.Controllers
{
    [Produces("application/json")]
    [Route("directory")]
    public class MyDirectoryController : Controller
    {
        internal static class RouteNames
        {
            public const string Users = nameof(Users);
            public const string UserById = nameof(UserById);
            public const string PhotoByUserId = nameof(PhotoByUserId);

            public const string Groups = nameof(Groups);
            public const string GroupById = nameof(GroupById);
            public const string GroupMemebersByGroupId = nameof(GroupMemebersByGroupId);
        }

        [HttpGet("users/{id}", Name = RouteNames.UserById)]
        public async Task<IActionResult> GetUser(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id) || string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest();
                }

                UserDto objUser = new UserDto();

                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load user profile.
                var user = await client.Users[id].Request().GetAsync();

                // Copy Microsoft-Graph User to DTO User
                objUser.Id = Guid.Parse(user.Id);
                objUser.GivenName = user.GivenName;
                objUser.Surname = user.Surname;
                objUser.UserPrincipalName = user.UserPrincipalName;
                objUser.Mail = user.Mail;
                objUser.MobilePhone = user.MobilePhone;
                objUser.JobTitle = user.JobTitle;
                objUser.OfficeLocation = user.OfficeLocation;


                return Ok(objUser);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }

        [HttpGet("users/{id}/photo", Name = RouteNames.PhotoByUserId)]
        public async Task<IActionResult> GetUserPhoto(string id)
        {
            try
            {
                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load user profile.

                var pictureStream = await client.Users[id].Photo.Content.Request().GetAsync();
                // Copy stream to MemoryStream object so that it can be converted to byte array.
                var pictureMemoryStream = new MemoryStream();
                await pictureStream.CopyToAsync(pictureMemoryStream);

                // Convert stream to byte array.
                var pictureByteArray = pictureMemoryStream.ToArray();

                // Convert byte array to base64 string.
                var pictureBase64 = Convert.ToBase64String(pictureByteArray);

                var photo = "data:image/jpeg;base64," + pictureBase64;


                return Ok(photo);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }


        [HttpGet("users/")]
        public async Task<IActionResult> GetUsers()
        {
            var users = new List<UserDto>();
            try
            {
                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load users profiles.
                var userList = await client.Users.Request().GetAsync();

                System.Diagnostics.Debug.WriteLine(userList);

                // Copy Microsoft User to DTO User
                foreach (var user in userList)
                {
                    UserDto objUser = new UserDto();
                    objUser.Id = Guid.Parse(user.Id);
                    objUser.GivenName = user.GivenName;
                    objUser.Surname = user.Surname;
                    objUser.UserPrincipalName = user.UserPrincipalName;
                    objUser.Mail = user.Mail;
                    objUser.MobilePhone = user.MobilePhone;
                    objUser.JobTitle = user.JobTitle;
                    objUser.OfficeLocation = user.OfficeLocation;
                    users.Add(objUser);
                }

                return Ok(users);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }


        [HttpGet("groups/{id}", Name = RouteNames.GroupById)]
        public async Task<IActionResult> GetGroup(string id)
        {
            GroupDto objGroup = new GroupDto();
            try
            {
                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load group profile.
                var group = await client.Groups[id].Request().GetAsync();

                // Copy Microsoft-Graph Group to DTO Group
                objGroup.Id = Guid.Parse(group.Id);
                objGroup.DisplayName = group.DisplayName;
                objGroup.Description = group.Description;
                return Ok(objGroup);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }

        [HttpGet("groups/{id}/members", Name = RouteNames.GroupMemebersByGroupId)]
        public async Task<IActionResult> GetGroupMembers(string id)
        {
            try
            {
                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load group profile.
                var members = await client.Groups[id].Members.Request().GetAsync();

                // Copy Microsoft-Graph Group to DTO Group

                return Ok(members);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }


        [HttpGet("groups/")]
        public async Task<IActionResult> GetGroups()
        {
            try
            {
                var groups = new List<GroupDto>();


                // Initialize the GraphServiceClient.
                GraphServiceClient client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load groups profiles.
                var groupList = await client.Groups.Request().GetAsync();


                // Copy Microsoft-Graph Group to DTO Group
                foreach (var group in groupList)
                {
                    var objGroup = new GroupDto();
                    objGroup.Id = Guid.Parse(group.Id);
                    objGroup.DisplayName = group.DisplayName;
                    objGroup.Description = group.Description;
                    groups.Add(objGroup);
                }

                return Ok(groups);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}
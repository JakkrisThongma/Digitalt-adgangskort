/*
 * Created by: David Bottiau
 * https://github.com/Odonno/azuread-react-dotnet-core-example
 */

using System;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;


        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService ??
                               throw new ArgumentNullException(nameof(identityService));
        }

        [HttpGet("validate-token")]
        public ActionResult<IdentityDto> ValidateToken()
        {
            return Ok(new IdentityDto
            {
                UserId = _identityService.GetId(),
                Mail = _identityService.GetMail(),
                IsAuthenticated = _identityService.IsAuthenticated(),
            });
        }
    }
}
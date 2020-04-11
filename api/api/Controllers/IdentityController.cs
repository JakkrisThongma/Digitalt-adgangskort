/*
 * Created by: David Bottiau
 * https://github.com/Odonno/azuread-react-dotnet-core-example
 */

using System;
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
        public ActionResult ValidateToken()
        {
            if (_identityService.IsAuthenticated())
            {
                return Ok(new
                {
                    Id = _identityService.GetId(),
                    Login = _identityService.GetMail(),
                    IsAuthenticated = _identityService.IsAuthenticated(),
                });
            }

            return Ok(new
            {
                IsAuthenticated = _identityService.IsAuthenticated(),
            });
        }
    }
}
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models.Auth;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DotNetAngularApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly AuthenticationContext _context;
        public UserProfileController(UserManager<ApplicationUser> userManager, AuthenticationContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new ApplicationUserModel
            {
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName
            };
        }

        // todo: Update profile
        // todo: Delete profile

        [HttpPost]
        [Route("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordResource model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await _userManager.ChangePasswordAsync(user, model.Token, model.Password);
                
                if (!result.Succeeded)
                    return BadRequest(new { message = "Cannot change password" });

                return Ok(result);
            }
            else            
                return BadRequest(new { message = "User not found" });
        }
    }
}
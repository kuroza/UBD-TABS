using System;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using DotNetAngularApp.Core.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace DotNetAngularApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(
        UserManager<ApplicationUser> userManager, 
        SignInManager<ApplicationUser> signInManager,
        IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        // POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            model.Role = "NormalUser"; // Default: NormalUser
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        // POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            // var user = await _userManager.FindByNameAsync(model.UserName);
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                // get role assigned to the user
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Email or password is incorrect." });
        }

        [HttpPut]
        [Route("ManageUserRole")]
        // PUT : /api/ApplicationUser/ManageUserRole
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> ManageUserRole(UserRoleModel model)
        {
            // search Id in db
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user != null)
            {
                // if found, get user roles and remove them
                var role = await _userManager.GetRolesAsync(user);
                var result = await _userManager.RemoveFromRolesAsync(user, role);

                if (!result.Succeeded)
                    return BadRequest(new { message = "Cannot remove user's existing role." });

                // add new role to user
                result = await _userManager.AddToRoleAsync(user, model.Role);

                if (!result.Succeeded)
                    return BadRequest(new { message = "Cannot add role to user." });
                
                return Ok(result);
            }
            else
                return BadRequest(new { message = "User cannot be found." }); // Should it be NotFound?
        }

        [HttpGet]
        [Route("AllUsers")]
        [Authorize]
        //GET : /api//ApplicationUser/AllUsers
        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            var users = _userManager.Users;

            return users;
        }

        // todo DeleteUser()
        
    }
}
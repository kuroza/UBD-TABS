using DotNetAngularApp.Core.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options) : base(options)
        {
            
        }
        
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
}
using System.Security.Claims;
using AutoMapper;
using DotNetAngularApp.Core;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace DotNetAngularApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IBookingRepository, BookingRepository>();
            
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddControllers().AddNewtonsoftJson(); //install package first

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<TabsDbContext>(options => //services - a container for all the dependencies in the app
                options.UseSqlServer(Configuration.GetConnectionString("Default")));

            // services.AddCors(options =>
            // {
            //     options.AddPolicy("AllowSpecificOrigin",
            //         builder =>
            //         {
            //             builder
            //             .WithOrigins("https://localhost:5001")
            //             .AllowAnyMethod()
            //             .AllowAnyHeader()
            //             .AllowCredentials();
            //         });
            // });

            string domain = $"https://{Configuration["Auth0:Domain"]}/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = Configuration["Auth0:ApiIdentifier"];
                // options.TokenValidationParameters = new TokenValidationParameters
                // {
                // NameClaimType = ClaimTypes.NameIdentifier
                // };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("create:bookings", policy => policy.Requirements.Add(new HasScopeRequirement("create:bookings", domain)));
                options.AddPolicy("read:bookings", policy => policy.Requirements.Add(new HasScopeRequirement("read:bookings", domain)));
                options.AddPolicy("update:bookings", policy => policy.Requirements.Add(new HasScopeRequirement("update:bookings", domain)));
                options.AddPolicy("delete:bookings", policy => policy.Requirements.Add(new HasScopeRequirement("delete:bookings", domain)));
                options.AddPolicy("create:rooms", policy => policy.Requirements.Add(new HasScopeRequirement("create:rooms", domain)));
                options.AddPolicy("read:rooms", policy => policy.Requirements.Add(new HasScopeRequirement("read:rooms", domain)));
                options.AddPolicy("update:rooms", policy => policy.Requirements.Add(new HasScopeRequirement("update:rooms", domain)));
                options.AddPolicy("delete:rooms", policy => policy.Requirements.Add(new HasScopeRequirement("delete:rooms", domain)));
            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            // app.UseCors("AllowSpecificOrigin");
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}

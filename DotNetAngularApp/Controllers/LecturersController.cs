using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    public class LecturersController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public LecturersController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/lecturers")]
        public async Task<IEnumerable<LecturerResource>> GetLecturers()
        {
            var lecturers = await context.Lecturers.ToListAsync();

            return mapper.Map<List<Lecturer>, List <LecturerResource>>(lecturers);
            // return lecturers;
        }
    }
} 
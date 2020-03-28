using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    public class TimeSlotsController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public TimeSlotsController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("/api/timeslots")]
        public async Task<IEnumerable<TimeSlotResource>> GetTimeSlots()
        {
            var timeSlots = await context.TimeSlots.ToListAsync();

            return mapper.Map<List<TimeSlot>, List <TimeSlotResource>>(timeSlots);
        }
    }
}
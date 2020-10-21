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
    [AllowAnonymous]
    public class RoomsController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public RoomsController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/rooms")]
        public async Task<IEnumerable<RoomResource>> GetRooms()
        {
            var rooms = await context.Rooms.ToListAsync();

            return mapper.Map<List<Room>, List<RoomResource>>(rooms);
        }

        // todo: create a GetRoom(id) method
    }
}
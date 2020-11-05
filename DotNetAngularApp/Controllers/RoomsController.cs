using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/rooms")]
    public class RoomsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IRoomRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public RoomsController(IMapper mapper, IRoomRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/allrooms")]
        public async Task<IEnumerable<RoomResource>> GetAllRooms()
        {
            var rooms = await repository.GetAllRooms();

            return mapper.Map<IEnumerable<Room>, IEnumerable<RoomResource>>(rooms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await repository.GetRoom(id);

            if (room == null)
                return NotFound();

            var roomResource = mapper.Map<Room, RoomResource>(room);

            return Ok(roomResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateRoom([FromBody] SaveRoomResource roomResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var room = mapper.Map<SaveRoomResource, Room>(roomResource);

            var existName = await repository.RoomNameExist(room);
            if (existName != null)
                return Conflict("Room name already exists.");

            repository.Add(room);
            await unitOfWork.CompleteAsync();

            room = await repository.GetRoom(room.Id);

            var result = mapper.Map<Room, RoomResource>(room);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await repository.GetRoom(id, includeRelated: false);

            if (room == null)
                return NotFound();

            repository.Remove(room);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] SaveRoomResource roomResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var room = await repository.GetRoom(id);

            if (room == null)
                return NotFound();

            room = mapper.Map<SaveRoomResource, Room>(roomResource, room);

            // var existName = await repository.RoomNameExist(room);
            // if (existName != null)
            //     return Conflict("Room name already exists.");

            await unitOfWork.CompleteAsync();

            room = await repository.GetRoom(room.Id);

            var result = mapper.Map<Room, RoomResource>(room);

            return Ok(result);
        }
    }
}
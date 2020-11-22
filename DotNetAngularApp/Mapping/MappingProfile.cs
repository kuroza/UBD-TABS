using System.Linq;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            // <Source, target>
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Faculty, FacultyResource>();
            CreateMap<Major, MajorResource>();
            
            CreateMap<BookDate, BookDateResource>();

            CreateMap<TimeSlot, TimeSlotResource>();
            CreateMap<TimeSlot, SaveTimeSlotResource>();
            
            CreateMap<Room, RoomResource>()
                .ForMember(rr => rr.Building, opt => opt.MapFrom(r => r.Building));
            CreateMap<Room, SaveRoomResource>();

            CreateMap<Lecturer, LecturerResource>();
            CreateMap<Lecturer, SaveLecturerResource>();

            CreateMap<Building, KeyValuePairResource>();
            CreateMap<Building, BuildingResource>();
            CreateMap<Building, SaveBuildingResource>();

            CreateMap<Semester, SemesterResource>();
            CreateMap<Semester, SaveSemesterResource>();

            CreateMap<Offering, OfferingResource>() // ! Mapping error here
                .ForMember(br => br.SemesterId, opt => opt.MapFrom(b => b.Semester.Id))
                .ForMember(or => or.Modules, opt => 
                    opt.MapFrom(o => o.Modules.Select(mo => 
                    new ModuleResource { Id = mo.Module.Id, Name = mo.Module.Name, Code = mo.Module.Code, 
                        Major = new MajorResource { Id = mo.Module.Major.Id, Name = mo.Module.Major.Name, 
                        ShortName = mo.Module.Major.ShortName, FacultyId = mo.Module.Major.FacultyId }
                    })))
                .ForMember(or => or.Lecturers, opt =>
                    opt.MapFrom(o => o.Lecturers.Select(lo =>
                    new LecturerResource { Id = lo.Lecturer.Id, Name = lo.Lecturer.Name, Title = lo.Lecturer.Title, Email = lo.Lecturer.Email })));
            CreateMap<Offering, SaveOfferingResource>();

            CreateMap<Booking, BookingResource>()
                .ForMember(br => br.Session, opt => opt.MapFrom(b => b.Semester.Session))
                .ForMember(br => br.Rooms, opt => 
                    opt.MapFrom(b => b.Rooms.Select(bm => 
                    new Room { Id = bm.Room.Id, Name = bm.Room.Name, Code = bm.Room.Code, Capacity = bm.Room.Capacity, Building = bm.Room.Building }))) // ! Room?
                .ForMember(br => br.TimeSlots, opt => 
                    opt.MapFrom(b => b.TimeSlots.Select(bt => 
                    new TimeSlotResource { Id = bt.TimeSlot.Id, StartTime = bt.TimeSlot.StartTime, EndTime = bt.TimeSlot.EndTime })))
                .ForMember(br => br.Modules, opt => 
                    opt.MapFrom(b => b.Modules.Select(bm => 
                    new ModuleResource { Id = bm.Module.Id, Name = bm.Module.Name, Code = bm.Module.Code, 
                        Major = new MajorResource { Id = bm.Module.Major.Id, Name = bm.Module.Major.Name, 
                        ShortName = bm.Module.Major.ShortName, FacultyId = bm.Module.Major.FacultyId 
                        }
                    })));
            CreateMap<Booking, SaveBookingResource>()
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => bt.TimeSlotId)))
                .ForMember(br => br.Modules, opt => opt.MapFrom(b => b.Modules.Select(bt => bt.ModuleId)));

            CreateMap<Module, ModuleResource>()
                .ForMember(mr => mr.Major, opt => opt.MapFrom(m => m.Major));
            CreateMap<Module, SaveModuleResource>();

            // API Resource to Domain, saving to database
            CreateMap<BookingQueryResource, BookingQuery>();

            CreateMap<SaveFacultyResource, Faculty>()
                .ForMember(f => f.Id, opt => opt.Ignore());

            CreateMap<SaveMajorResource, Major>()
                .ForMember(p => p.Id, opt => opt.Ignore());

            CreateMap<SaveRoomResource, Room>()
                .ForMember(r => r.Id, opt => opt.Ignore());
            
            CreateMap<SaveLecturerResource, Lecturer>()
                .ForMember(l => l.Id, opt => opt.Ignore());

            CreateMap<SaveTimeSlotResource, TimeSlot>()
                .ForMember(t => t.Id, opt => opt.Ignore());

            CreateMap<SaveModuleResource, Module>()
                .ForMember(m => m.Id, opt => opt.Ignore());

            CreateMap<SaveBuildingResource, Building>()
                .ForMember(b => b.Id, opt => opt.Ignore());

            CreateMap<SaveSemesterResource, Semester>()
                .ForMember(s => s.Id, opt => opt.Ignore());

            CreateMap<SaveOfferingResource, Offering>()
                .ForMember(o => o.Id, opt => opt.Ignore())
                .ForMember(o => o.Modules, opt => opt.Ignore())
                    .AfterMap((or, o) => {
                        var removedModules = o.Modules.Where(mo => !or.Modules.Contains(mo.ModuleId)).ToList();
                        foreach (var m in removedModules)
                            o.Modules.Remove(m);

                        var addedModules = or.Modules
                            .Where(id => !o.Modules.Any(mo => mo.ModuleId == id))
                            .Select(id => new ModuleOffering { ModuleId = id });
                        foreach (var m in addedModules)
                            o.Modules.Add(m);
                    })
                .ForMember(o => o.Lecturers, opt => opt.Ignore())
                    .AfterMap((or, o) => {
                        var removedLecturers = o.Lecturers.Where(lo => !or.Lecturers.Contains(lo.LecturerId)).ToList();
                        foreach (var l in removedLecturers)
                            o.Lecturers.Remove(l);

                        var addedLecturers = or.Lecturers
                            .Where(id => !o.Lecturers.Any(lo => lo.LecturerId == id))
                            .Select(id => new LecturerOffering { LecturerId = id });
                        foreach (var l in addedLecturers)
                            o.Lecturers.Add(l);
                    });

            CreateMap<SaveBookingResource, Booking>()
                .ForMember(b => b.Id, opt => opt.Ignore())
                .ForMember(b => b.TimeSlots, opt => opt.Ignore())
                    .AfterMap((br, b) => {
                        var removedTimeSlots = b.TimeSlots.Where(t => !br.TimeSlots.Contains(t.TimeSlotId)).ToList();
                        foreach (var t in removedTimeSlots)
                            b.TimeSlots.Remove(t);

                        var addedTimeSlots = br.TimeSlots
                            .Where(id => !b.TimeSlots.Any(t => t.TimeSlotId == id))
                            .Select(id => new BookingTimeSlot { TimeSlotId = id });
                        foreach (var t in addedTimeSlots)
                            b.TimeSlots.Add(t);
                    })
                .ForMember(b => b.Modules, opt => opt.Ignore())
                    .AfterMap((br, b) => {
                        var removedModules = b.Modules.Where(m => !br.Modules.Contains(m.ModuleId)).ToList();
                        foreach (var m in removedModules)
                            b.Modules.Remove(m);

                        var addedModules = br.Modules
                            .Where(id => !b.Modules.Any(m => m.ModuleId == id))
                            .Select(id => new BookingModule { ModuleId = id });
                        foreach (var m in addedModules)
                            b.Modules.Add(m);
                    })
                .ForMember(b => b.BookDates, opt => opt.Ignore())
                    .AfterMap((br, b) => {
                        var removedBookDates = b.BookDates.Where(bd => !br.BookDates.Contains(bd.Date)).ToList();
                        foreach (var d in removedBookDates)
                            b.BookDates.Remove(d);

                        var addedBookDates = br.BookDates
                            .Where(date => !b.BookDates.Any(bd => bd.Date == date))
                            .Select(date => new BookDate { Date = date });
                        foreach (var d in addedBookDates)
                            b.BookDates.Add(d);
                    })
                .ForMember(b => b.Rooms, opt => opt.Ignore())
                    .AfterMap((br, b) => {
                        var removedRooms = b.Rooms.Where(r => !br.Rooms.Contains(r.RoomId)).ToList();
                        foreach (var r in removedRooms)
                            b.Rooms.Remove(r);

                        var addedRooms = br.Rooms
                            .Where(id => !b.Rooms.Any(r => r.RoomId == id))
                            .Select(id => new BookingRoom { RoomId = id });
                        foreach (var r in addedRooms)
                            b.Rooms.Add(r);
                    });
        }
    }
}
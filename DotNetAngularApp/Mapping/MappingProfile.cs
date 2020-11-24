using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

            CreateMap<Offering, OfferingResource>()
                .ForMember(or => or.SemesterId, opt => opt.MapFrom(o => o.Semester.Id))
                .ForMember(or => or.Module, opt => opt.MapFrom(o => o.Module))
                .ForMember(or => or.Lecturers, opt =>
                    opt.MapFrom(o => o.Lecturers.Select(lo =>
                    new LecturerResource { Id = lo.Lecturer.Id, Name = lo.Lecturer.Name, Title = lo.Lecturer.Title, Email = lo.Lecturer.Email })));
            CreateMap<Offering, SaveOfferingResource>();

            CreateMap<Booking, BookingResource>()
                .ForMember(br => br.Rooms, opt => 
                    opt.MapFrom(b => b.Rooms.Select(bm => 
                    new Room { Id = bm.Room.Id, Name = bm.Room.Name, Code = bm.Room.Code, Capacity = bm.Room.Capacity, Building = bm.Room.Building }))) // ! Room?
                .ForMember(br => br.TimeSlots, opt => 
                    opt.MapFrom(b => b.TimeSlots.Select(bt => 
                    new TimeSlotResource { Id = bt.TimeSlot.Id, StartTime = bt.TimeSlot.StartTime, EndTime = bt.TimeSlot.EndTime })))
                .ForMember(br => br.Offerings, opt =>
                    opt.MapFrom(b => b.Offerings.Select(bo => 
                    new OfferingResource { Id = bo.OfferingId, SemesterId = bo.Offering.SemesterId, Module = 
                        new ModuleResource { Id = bo.Offering.ModuleId, Name = bo.Offering.Module.Name, Code = bo.Offering.Module.Code, Major = 
                            new MajorResource { Id = bo.Offering.Module.MajorId, Name = bo.Offering.Module.Major.Name, 
                                ShortName = bo.Offering.Module.Major.ShortName, FacultyId = bo.Offering.Module.Major.FacultyId
                            }
                        }
                    }))); // ! How to map Modules and Lecturers here? No need?
            CreateMap<Booking, SaveBookingResource>()
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => bt.TimeSlotId)));

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
                .ForMember(b => b.Offerings, opt => opt.Ignore())
                    .AfterMap((br, b) => {
                        var removedOfferings = b.Offerings.Where(bo => !br.Offerings.Contains(bo.OfferingId)).ToList();
                        foreach (var o in removedOfferings)
                            b.Offerings.Remove(o);

                        var addedOfferings = br.Offerings
                            .Where(id => !b.Offerings.Any(bo => bo.OfferingId == id))
                            .Select(id => new BookingOffering { OfferingId = id });
                        foreach (var o in addedOfferings)
                            b.Offerings.Add(o);
                    })
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
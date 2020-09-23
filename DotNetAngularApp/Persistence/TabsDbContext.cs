using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class TabsDbContext : DbContext
    {
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }

        public TabsDbContext(DbContextOptions<TabsDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // BookingTimeSlot
            modelBuilder.Entity<BookingTimeSlot>()
                .HasKey(bt => new { bt.BookingId, bt.TimeSlotId });

            // ModuleLecturer
            modelBuilder.Entity<ModuleLecturer>()
                .HasKey(ml => new { ml.ModuleId, ml.LecturerId });

            // BookingModule
            modelBuilder.Entity<BookingModule>()
                .HasKey(bm => new { bm.BookingId, bm.ModuleId });
        }
    }
}
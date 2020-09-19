using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Modules")]
    public class Module
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Code { get; set; }

        public ICollection<BookingModule> Bookings { get; set; }

        public ICollection<ModuleLecturer> Lecturers { get; set; }

        // public int CourseId { get; set; }
        
        // public Course Course { get; set; }
        
        public Module()
        {
            Bookings = new Collection<BookingModule>();
            Lecturers = new Collection<ModuleLecturer>();
        }
    }
}
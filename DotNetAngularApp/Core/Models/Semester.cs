using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System;

namespace DotNetAngularApp.Core.Models
{
    [Table("Semesters")]
    public class Semester
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Session { get; set; } // ie. 2020/2021 Semester 1

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public Semester()
        {
        }
    }
}
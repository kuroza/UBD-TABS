using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Building
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        [Display(Name = "Building Name")]
        public string Name { get; set; }
    }
}

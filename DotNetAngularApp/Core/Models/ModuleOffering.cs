using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("ModuleOfferings")]
    public class ModuleOffering // ! Drop table
    {
        public int ModuleId { get; set; }
        public Module Module { get; set; }
        public int OfferingId { get; set; }
        public Offering Offering { get; set; }
    }
}
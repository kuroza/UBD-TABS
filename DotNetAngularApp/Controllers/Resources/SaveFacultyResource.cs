namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveFacultyResource
    {
        public int Id { get; set; }

        // [Required]
        public string Name { get; set; }
        
        public string ShortName { get; set; }
    }
}
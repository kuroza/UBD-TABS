namespace DotNetAngularApp.Controllers.Resources
{
    public class CourseResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // inverse relationship here caused a loop
    }
}
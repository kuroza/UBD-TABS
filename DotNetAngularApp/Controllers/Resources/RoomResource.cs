namespace DotNetAngularApp.Controllers.Resources
{
    public class RoomResource : KeyValuePairResource
    {
        public int Capacity { get; set; }

        public string Code { get; set; }

        public KeyValuePairResource Building { get; set; }
    }
}
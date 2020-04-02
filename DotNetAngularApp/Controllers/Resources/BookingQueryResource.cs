namespace DotNetAngularApp.Controllers.Resources
{
    public class BookingQueryResource
    {
        public int? BuildingId { get; set; }
        public int? RoomId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
using DotNetAngularApp.Extensions;

namespace DotNetAngularApp.Core.Models
{
    public class BookingQuery : IQueryObject // filtering, sorting and pagination
    {
        public int? BuildingId { get; set; }
        public int? RoomId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}
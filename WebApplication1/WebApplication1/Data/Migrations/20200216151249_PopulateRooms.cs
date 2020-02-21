using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class PopulateRooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, IsAvailable, BuildingId) VALUES ('Mini Theatre 1', 96, 1, 11)");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, IsAvailable, BuildingId) VALUES ('Mini Theatre 2', 132, 1, 11)");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, IsAvailable, BuildingId) VALUES ('Lecture Theatre 1', 240, 1, 11)");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, IsAvailable, BuildingId) VALUES ('Lecture Theatre 2', 240, 1, 11)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Rooms");
        }
    }
}

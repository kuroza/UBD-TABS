using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class PopulateRooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('APB G.19', 30, (SELECT Id FROM Buildings WHERE Id = 1))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('APB G.21a', 30, (SELECT Id FROM Buildings WHERE Id = 1))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('APB G.21b', 30, (SELECT Id FROM Buildings WHERE Id = 1))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('APB G.35', 20, (SELECT Id FROM Buildings WHERE Id = 1))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CH Lecture Theatre', 400, (SELECT Id FROM Buildings WHERE Id = 2))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CH Room 2 Basement', 45, (SELECT Id FROM Buildings WHERE Id = 2))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CH Room 3 Basement', 45, (SELECT Id FROM Buildings WHERE Id = 2))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CH Room 4 Basement', 45, (SELECT Id FROM Buildings WHERE Id = 2))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CLT 1.1', 19, (SELECT Id FROM Buildings WHERE Id = 3))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CLT 1.11', 46, (SELECT Id FROM Buildings WHERE Id = 3))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CLT 1.13', 34, (SELECT Id FROM Buildings WHERE Id = 3))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('CLT 1.17', 176, (SELECT Id FROM Buildings WHERE Id = 3))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('FASS G.20', 25, (SELECT Id FROM Buildings WHERE Id = 4))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('FASS G.29', 50, (SELECT Id FROM Buildings WHERE Id = 4))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('FSB 1.10', 17, (SELECT Id FROM Buildings WHERE Id = 5))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('FSB 1.11', 15, (SELECT Id FROM Buildings WHERE Id = 5))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('ISB B1.11', 40, (SELECT Id FROM Buildings WHERE Id = 6))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('Lab Room', 20, (SELECT Id FROM Buildings WHERE Id = 7))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('IHS MPH Base Room', 40, (SELECT Id FROM Buildings WHERE Id = 8))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('SBE G.14', 18, (SELECT Id FROM Buildings WHERE Id = 9))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('SHBIE 1.34', 20, (SELECT Id FROM Buildings WHERE Id = 10))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('Mini Theatre 1', 96, (SELECT Id FROM Buildings WHERE Id = 11))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('Mini Theatre 2', 132, (SELECT Id FROM Buildings WHERE Id = 11))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('Lecture Theatre 1', 240, (SELECT Id FROM Buildings WHERE Id = 11))");
            migrationBuilder.Sql("INSERT INTO Rooms (Name, Capacity, BuildingId) VALUES ('Lecture Theatre 2', 240, (SELECT Id FROM Buildings WHERE Id = 11))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Rooms");
        }
    }
}

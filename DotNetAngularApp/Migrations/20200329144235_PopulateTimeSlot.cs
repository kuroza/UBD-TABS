using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class PopulateTimeSlot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("SET IDENTITY_INSERT TimeSlots ON");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (1, '07:50:00', '08:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (2, '08:50:00', '09:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (3, '09:50:00', '10:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (4, '10:50:00', '11:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (5, '11:50:00', '12:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (6, '12:50:00', '13:40:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (7, '14:10:00', '15:00:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (8, '15:10:00', '16:00:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (9, '16:30:00', '17:20:00')");
            migrationBuilder.Sql("INSERT INTO TimeSlots (Id, StartTime, EndTime) VALUES (10, '17:30:00', '18:20:00')");
            migrationBuilder.Sql("SET IDENTITY_INSERT TimeSlots OFF");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM TimeSlots");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class ChangeTimeSlotDataType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "TimeSlots",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "TimeSlots",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "TimeSlots",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "EndTime",
                table: "TimeSlots",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}

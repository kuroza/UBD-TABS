using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class AddModuleNameAndStaffToBookingsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_TimeSlots_TimeSlotId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_TimeSlotId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "BuildingId",
                table: "Bookings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ModuleCode",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StaffName",
                table: "Bookings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ModuleCode",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StaffName",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "ModuleId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_TimeSlotId",
                table: "Bookings",
                column: "TimeSlotId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_TimeSlots_TimeSlotId",
                table: "Bookings",
                column: "TimeSlotId",
                principalTable: "TimeSlots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

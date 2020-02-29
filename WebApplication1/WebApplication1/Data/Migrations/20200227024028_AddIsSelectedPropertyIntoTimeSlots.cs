using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class AddIsSelectedPropertyIntoTimeSlots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSelected",
                table: "TimeSlots",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BuildingId",
                table: "Bookings",
                column: "BuildingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Buildings_BuildingId",
                table: "Bookings",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Buildings_BuildingId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_BuildingId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "IsSelected",
                table: "TimeSlots");
        }
    }
}

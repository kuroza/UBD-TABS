using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class AddBookingOfferings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Semesters_SemesterId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_SemesterId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "SemesterId",
                table: "Bookings");

            migrationBuilder.CreateTable(
                name: "BookingOfferings",
                columns: table => new
                {
                    BookingId = table.Column<int>(nullable: false),
                    OfferingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingOfferings", x => new { x.BookingId, x.OfferingId });
                    table.ForeignKey(
                        name: "FK_BookingOfferings_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingOfferings_Offerings_OfferingId",
                        column: x => x.OfferingId,
                        principalTable: "Offerings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingOfferings_OfferingId",
                table: "BookingOfferings",
                column: "OfferingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingOfferings");

            migrationBuilder.AddColumn<int>(
                name: "SemesterId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_SemesterId",
                table: "Bookings",
                column: "SemesterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Semesters_SemesterId",
                table: "Bookings",
                column: "SemesterId",
                principalTable: "Semesters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

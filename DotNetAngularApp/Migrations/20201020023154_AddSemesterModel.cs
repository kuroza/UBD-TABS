using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class AddSemesterModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Rooms",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherName",
                table: "Buildings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SemesterId",
                table: "Bookings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Session = table.Column<string>(maxLength: 255, nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Semesters_SemesterId",
                table: "Bookings");

            migrationBuilder.DropTable(
                name: "Semesters");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_SemesterId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "OtherName",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "SemesterId",
                table: "Bookings");
        }
    }
}

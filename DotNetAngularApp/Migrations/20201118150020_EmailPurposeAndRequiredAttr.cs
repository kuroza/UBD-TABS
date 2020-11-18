using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class EmailPurposeAndRequiredAttr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ShortName",
                table: "Majors",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Lecturers",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ShortName",
                table: "Faculties",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Purpose",
                table: "Bookings",
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "Purpose",
                table: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "ShortName",
                table: "Majors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ShortName",
                table: "Faculties",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 255,
                oldNullable: true);
        }
    }
}

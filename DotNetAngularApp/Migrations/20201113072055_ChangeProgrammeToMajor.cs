using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class ChangeProgrammeToMajor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Programmes_ProgrammeId",
                table: "Modules");

            migrationBuilder.DropTable(
                name: "Programmes");

            migrationBuilder.DropIndex(
                name: "IX_Modules_ProgrammeId",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "ProgrammeId",
                table: "Modules");

            migrationBuilder.AddColumn<int>(
                name: "MajorId",
                table: "Modules",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Majors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    ShortName = table.Column<string>(nullable: true),
                    FacultyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Majors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Majors_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Modules_MajorId",
                table: "Modules",
                column: "MajorId");

            migrationBuilder.CreateIndex(
                name: "IX_Majors_FacultyId",
                table: "Majors",
                column: "FacultyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Majors_MajorId",
                table: "Modules",
                column: "MajorId",
                principalTable: "Majors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Majors_MajorId",
                table: "Modules");

            migrationBuilder.DropTable(
                name: "Majors");

            migrationBuilder.DropIndex(
                name: "IX_Modules_MajorId",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "MajorId",
                table: "Modules");

            migrationBuilder.AddColumn<int>(
                name: "ProgrammeId",
                table: "Modules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Programmes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FacultyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programmes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Programmes_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Modules_ProgrammeId",
                table: "Modules",
                column: "ProgrammeId");

            migrationBuilder.CreateIndex(
                name: "IX_Programmes_FacultyId",
                table: "Programmes",
                column: "FacultyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Programmes_ProgrammeId",
                table: "Modules",
                column: "ProgrammeId",
                principalTable: "Programmes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

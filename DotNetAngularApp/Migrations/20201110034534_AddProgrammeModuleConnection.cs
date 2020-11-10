using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class AddProgrammeModuleConnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Modules");
            migrationBuilder.Sql("DELETE FROM Lecturers");
            migrationBuilder.Sql("DELETE FROM ModuleLecturers");

            migrationBuilder.AddColumn<int>(
                name: "ProgrammeId",
                table: "Modules",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Modules_ProgrammeId",
                table: "Modules",
                column: "ProgrammeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Programmes_ProgrammeId",
                table: "Modules",
                column: "ProgrammeId",
                principalTable: "Programmes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Programmes_ProgrammeId",
                table: "Modules");

            migrationBuilder.DropIndex(
                name: "IX_Modules_ProgrammeId",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "ProgrammeId",
                table: "Modules");
        }
    }
}

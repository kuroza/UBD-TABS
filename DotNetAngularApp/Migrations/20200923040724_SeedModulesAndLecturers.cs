using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class SeedModulesAndLecturers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("SET IDENTITY_INSERT Modules ON");
            migrationBuilder.Sql("INSERT INTO Modules (Id, Name, Code) VALUES (1, 'Programming Fundamentals 1', 'SS-1201')");
            migrationBuilder.Sql("INSERT INTO Modules (Id, Name, Code) VALUES (2, 'Computer Systems and Information Technology', 'SS-1202')");
            migrationBuilder.Sql("SET IDENTITY_INSERT Modules OFF");

            migrationBuilder.Sql("SET IDENTITY_INSERT Lecturers ON");
            migrationBuilder.Sql("INSERT INTO Lecturers (Id, Name, Title) VALUES (1, 'Owais Ahmed Malik', 'Dr.')");
            migrationBuilder.Sql("INSERT INTO Lecturers (Id, Name, Title) VALUES (2, 'Wee Hong Ong', 'Dr.')");
            migrationBuilder.Sql("INSERT INTO Lecturers (Id, Name, Title) VALUES (3, 'Rosyzie Anna binti Hj Mohd Apong', 'Dr.')");
            migrationBuilder.Sql("SET IDENTITY_INSERT Lecturers OFF");

            migrationBuilder.Sql("INSERT INTO ModuleLecturers (ModuleId, LecturerId) VALUES (1, 1)");
            migrationBuilder.Sql("INSERT INTO ModuleLecturers (ModuleId, LecturerId) VALUES (2, 2)");
            migrationBuilder.Sql("INSERT INTO ModuleLecturers (ModuleId, LecturerId) VALUES (1, 3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Modules");
            migrationBuilder.Sql("DELETE FROM Lecturers");
            migrationBuilder.Sql("DELETE FROM ModuleLecturers");
        }
    }
}

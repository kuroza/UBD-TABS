using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class SeedFacultyAndCourseDatabases : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Faculties (Name) VALUES ('Faculty of Science')");

            migrationBuilder.Sql("INSERT INTO Courses (Name, FacultyId) VALUES ('Computer Science', (SELECT Id FROM Faculties WHERE Name = 'Faculty of Science'))");
            migrationBuilder.Sql("INSERT INTO Courses (Name, FacultyId) VALUES ('Mathematics', (SELECT Id FROM Faculties WHERE Name = 'Faculty of Science'))");
            migrationBuilder.Sql("INSERT INTO Courses (Name, FacultyId) VALUES ('Chemistry', (SELECT Id FROM Faculties WHERE Name = 'Faculty of Science'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Faculties WHERE Name IN ('Faculty of Science')");
        }
    }
}

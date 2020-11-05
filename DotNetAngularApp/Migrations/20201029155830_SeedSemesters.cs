using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class SeedSemesters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Semesters (Session, StartDate, EndDate) VALUES ('2020/2021 Semester 1', '2020-08-03', '2020-11-08')");
            migrationBuilder.Sql("INSERT INTO Semesters (Session, StartDate, EndDate) VALUES ('2020/2021 Semester 2', '2021-01-04', '2021-04-10')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Semesters");
        }
    }
}

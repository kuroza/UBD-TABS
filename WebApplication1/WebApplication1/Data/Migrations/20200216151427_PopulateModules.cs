using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class PopulateModules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Modules (Name, Code) VALUES ('Programming Fundamentals 1', 'SS-1201')");
            migrationBuilder.Sql("INSERT INTO Modules (Name, Code) VALUES ('Computer Systems and Information Technology', 'SS-1202')");
            migrationBuilder.Sql("INSERT INTO Modules (Name, Code) VALUES ('Programming Fundamentals 2', 'SS-1203')");
            migrationBuilder.Sql("INSERT INTO Modules (Name, Code) VALUES ('Computer Architecture and Ogranisation', 'SS-1204')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Modules");
        }
    }
}

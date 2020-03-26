using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class PopulateBuildings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("SET IDENTITY_INSERT Buildings ON");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (1, 'Academy of Brunei Studies')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (2, 'Chancellor Hall')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (3, 'Central Lecture Theater')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (4, 'Faculty of Arts and Social Sciences')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (5, 'Faculty of Science')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (6, 'Integrated Science Building')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (7, 'Institue of Leadership Innovation and Advancement')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (8, 'PAP Rashidah Saadatul Bolkiah Institute of Health Sciences')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (9, 'School of Business and Economic')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (10, 'Sultan Hassanal Bolkiah Institute of Education')");
            migrationBuilder.Sql("INSERT INTO Buildings (Id, Name) VALUES (11, 'University Technology Hub')");
            migrationBuilder.Sql("SET IDENTITY_INSERT Buildings OFF");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Buildings");
        }
    }
}

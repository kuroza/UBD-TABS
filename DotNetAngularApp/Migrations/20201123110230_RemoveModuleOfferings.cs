using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetAngularApp.Migrations
{
    public partial class RemoveModuleOfferings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModuleOfferings");

            migrationBuilder.AddColumn<int>(
                name: "ModuleId",
                table: "Offerings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Offerings_ModuleId",
                table: "Offerings",
                column: "ModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offerings_Modules_ModuleId",
                table: "Offerings",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offerings_Modules_ModuleId",
                table: "Offerings");

            migrationBuilder.DropIndex(
                name: "IX_Offerings_ModuleId",
                table: "Offerings");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "Offerings");

            migrationBuilder.CreateTable(
                name: "ModuleOfferings",
                columns: table => new
                {
                    ModuleId = table.Column<int>(type: "int", nullable: false),
                    OfferingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuleOfferings", x => new { x.ModuleId, x.OfferingId });
                    table.ForeignKey(
                        name: "FK_ModuleOfferings_Modules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Modules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ModuleOfferings_Offerings_OfferingId",
                        column: x => x.OfferingId,
                        principalTable: "Offerings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ModuleOfferings_OfferingId",
                table: "ModuleOfferings",
                column: "OfferingId");
        }
    }
}

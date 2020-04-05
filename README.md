# UBD Timetabling and Room Booking System (UBD-TABS)

## To run Angular + ASP.NET Core version of UBD-TABS:

1. Download and install latest .NET Core SDK.
2. Download and install latest Node.js LTS.
3. Open Node.js command prompt and run: 

```sh
npm install -g @angular/cli
```

4. In Node.js command prompt, go to the DotNetAngularApp folder and run:

```sh
dotnet run
```

5. It will take some time to download node_modules.
6. Open http://localhost:5000 or https://localhost:5001 in your browser.

## To create the database:

1. Stop the running application in the terminal by pressing Ctrl+c.
2. Install Entity Framework

```sh
dotnet tool install --global dotnet-ef
```

3. Update database

```sh
dotnet ef database update
```

## If you'd like to run the ASP.NET MVC 5 version of UBD-TABS:

1. Go to WebApplication1 folder.
2. Open WebApplication1.sln file.
3. Click build and run.


## To create the database in Microsoft SQL Management Studio:

1. In Visual Studio 2019, open Package Manager Console.
2. Type 'Update-Database' in console and it will automatically create a database in your system.

```sh
update-database
```


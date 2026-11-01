using CarRental.Api.Data;
using CarRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Endpoints;

public static class CarEndpoints
{
    public static void MapCarEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/cars");

        group.MapGet("", async (string? search, string? category, AppDbContext db) =>
        {
            var query = db.Cars.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(c => c.Name.ToLower().Contains(search.ToLower()));

            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(c => c.Category == category);

            return await query.ToListAsync();
        });

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Cars.FindAsync(id) is Car car ? Results.Ok(car) : Results.NotFound("Car not found"));
    }
}
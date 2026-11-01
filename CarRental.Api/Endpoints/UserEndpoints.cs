using CarRental.Api.Data;
using CarRental.Api.Dtos;
using CarRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users");

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Users.FindAsync(id) is User user
                ? Results.Ok(user.ToResponse())
                : Results.NotFound("User not found"));

        group.MapPut("/{id:int}", async (int id, UpdateUserRequest req, AppDbContext db) =>
        {
            var user = await db.Users.FindAsync(id);
            if (user is null)
                return Results.NotFound("User not found");

            var email = req.Email?.Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(req.FullName) || string.IsNullOrWhiteSpace(email))
                return Results.BadRequest("Name and email are required");

            if (await db.Users.AnyAsync(u => u.Email == email && u.Id != id))
                return Results.Conflict("Email already registered");

            user.FullName = req.FullName.Trim();
            user.Email = email;
            user.Phone = (req.Phone ?? "").Trim();
            user.BirthDay = (req.BirthDay ?? "").Trim();
            user.Gender = (req.Gender ?? "").Trim();
            await db.SaveChangesAsync();

            return Results.Ok(user.ToResponse());
        });
    }
}

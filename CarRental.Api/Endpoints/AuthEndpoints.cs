using CarRental.Api.Data;
using CarRental.Api.Dtos;
using CarRental.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");
        var hasher = new PasswordHasher<User>();

        group.MapPost("/register", async (RegisterRequest req, AppDbContext db) =>
        {
            var email = req.Email?.Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(req.FullName) || string.IsNullOrWhiteSpace(email) || string.IsNullOrEmpty(req.Password))
                return Results.BadRequest("Name, email and password are required");

            if (await db.Users.AnyAsync(u => u.Email == email))
                return Results.Conflict("Email already registered");

            var user = new User { FullName = req.FullName.Trim(), Email = email };
            user.PasswordHash = hasher.HashPassword(user, req.Password);

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Ok(user.ToResponse());
        });

        group.MapPost("/login", async (LoginRequest req, AppDbContext db) =>
        {
            var email = req.Email?.Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrEmpty(req.Password))
                return Results.Unauthorized();

            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null)
                return Results.Unauthorized();

            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, req.Password);
            if (result == PasswordVerificationResult.Failed)
                return Results.Unauthorized();

            return Results.Ok(user.ToResponse());
        });
    }
}
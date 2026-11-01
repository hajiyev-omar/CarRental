using CarRental.Api.Data;
using CarRental.Api.Dtos;
using CarRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Endpoints;

public static class BookingEndpoints
{
    private const decimal DriverFee = 50;

    public static void MapBookingEndpoints(this WebApplication app)
    {
        app.MapPost("/bookings", async (CreateBookingRequest req, AppDbContext db) =>
        {
            if (req.Days < 1)
                return Results.BadRequest("Days must be at least 1");

            var car = await db.Cars.FindAsync(req.CarId);
            if (car is null)
                return Results.NotFound("Car not found");

            if (!await db.Users.AnyAsync(u => u.Id == req.UserId))
                return Results.NotFound("User not found");

            var price = car.PricePerDay * req.Days;
            var fee = req.NeedsDriver ? DriverFee : 0;

            var booking = new Booking
            {
                CarId = car.Id,
                UserId = req.UserId,
                Days = req.Days,
                NeedsDriver = req.NeedsDriver,
                Location = (req.Location ?? "").Trim(),
                Total = price + fee
            };

            db.Bookings.Add(booking);
            await db.SaveChangesAsync();

            return Results.Ok(new BookingResponse(booking.Id, car.Name, booking.Days, price, fee, booking.Total));
        });
    }
}
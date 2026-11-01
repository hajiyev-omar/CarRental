using CarRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Car> Cars => Set<Car>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

        modelBuilder.Entity<Car>().HasData(
            new Car { Id = 1, Name = "Range Rover",  Category = "family", PricePerDay = 200, Transmission = "Automatic", MaxSpeed = 200, Rating = 4, ImageUrl = "/images/range-rover.png" },
            new Car { Id = 2, Name = "Toyota",       Category = "family", PricePerDay = 300, Transmission = "Automatic", MaxSpeed = 180, Rating = 5, ImageUrl = "/images/toyota.png" },
            new Car { Id = 3, Name = "Lamborghini",  Category = "luxury", PricePerDay = 550, Transmission = "Automatic", MaxSpeed = 325, Rating = 5, ImageUrl = "/images/lamborghini.png" },
            new Car { Id = 4, Name = "Tesla",        Category = "cheap",  PricePerDay = 150, Transmission = "Automatic", MaxSpeed = 225, Rating = 4, ImageUrl = "/images/tesla.png" },
            new Car { Id = 5, Name = "Audi Red A6",  Category = "cheap",  PricePerDay = 180, Transmission = "Manual",    MaxSpeed = 250, Rating = 4, ImageUrl = "/images/audi-a6.png" }
        );
    }
}

// rm carrental.db*
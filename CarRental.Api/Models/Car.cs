namespace CarRental.Api.Models;

public class Car
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal PricePerDay { get; set; }
    public string Transmission { get; set; } = "";
    public int MaxSpeed { get; set; }
    public int Rating { get; set; }
    public string ImageUrl { get; set; } = "";
}
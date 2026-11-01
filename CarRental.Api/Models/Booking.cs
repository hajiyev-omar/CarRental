namespace CarRental.Api.Models;

public class Booking
{
    public int Id { get; set; }
    public int CarId { get; set; }
    public Car? Car { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int Days { get; set; }
    public bool NeedsDriver { get; set; }
    public string Location { get; set; } = "";
    public decimal Total { get; set; }
}
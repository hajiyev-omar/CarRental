using CarRental.Api.Models;

namespace CarRental.Api.Dtos;

public record RegisterRequest(string FullName, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record UserResponse(int Id, string FullName, string Email, string Phone, string BirthDay, string Gender);
public record UpdateUserRequest(string FullName, string Email, string Phone, string BirthDay, string Gender);

public record CreateBookingRequest(int CarId, int UserId, int Days, bool NeedsDriver, string Location);
public record BookingResponse(int Id, string CarName, int Days, decimal Price, decimal DriverFee, decimal Total);

public static class UserMappings
{
    public static UserResponse ToResponse(this User user) =>
        new(user.Id, user.FullName, user.Email, user.Phone, user.BirthDay, user.Gender);
}

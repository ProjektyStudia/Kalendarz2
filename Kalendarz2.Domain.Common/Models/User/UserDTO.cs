﻿namespace Kalendarz2.Domain.Common;

public class UserDTO
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Token { get; set; }
    public string Color { get; set; }
    public bool IsDarkmode { get; set; }
}

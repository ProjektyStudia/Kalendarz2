﻿namespace Kalendarz2.Infrastructure.EntityFramework;

public class Holiday
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
}
﻿namespace Kalendarz2.Infrastructure.EntityFramework;

public class Participation
{
    public int EventId { get; set; }
    public Event Event { get; set; }
    public int ParticipantId { get; set; }
    public User Participant { get; set; }
}
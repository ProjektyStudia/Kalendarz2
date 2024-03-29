﻿using Kalendarz2.Domain.Common;
using Kalendarz2.Domain.Common.Models.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kalendarz2.Infrastructure.EntityFramework.Mapper;

public class EventMapper
{
    public EventDTO Map(NewEventDTO newEvent, int id, ICollection<ParticipantDTO> participants)
    {
        return new EventDTO
        {
            Id = id,
            AuthorId = newEvent.AuthorId,
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            Participants = participants,
            StartEvent = newEvent.StartEvent,
            EndEvent = newEvent.EndEvent,
            Color = newEvent.Color,
            IsRecurring = newEvent.IsRecurring,
            IsDeleted = false
        };
    }
    public Event Map(NewEventDTO newEvent)
    {
        return new Event
        {
            AuthorId = newEvent.AuthorId,
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            StartEvent = newEvent.StartEvent,
            EndEvent = newEvent.EndEvent,
            IsRecurring = newEvent.IsRecurring,
            Color = newEvent.Color,
        };
    }
    public EventDTO Map(Event newEvent, ICollection<ParticipantDTO> participants)
    {
        return new EventDTO
        {
            Id = newEvent.Id,
            AuthorId = newEvent.AuthorId,
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            Participants = participants,
            StartEvent = newEvent.StartEvent,
            EndEvent = newEvent.EndEvent,
            IsRecurring = newEvent.IsRecurring,
            Color = newEvent.Color,
            IsDeleted = newEvent.IsDeleted
        };
    }
    public EventDTO Map(Event newEvent)
    {
        var participation = newEvent.Participants;
        var participantList = new List<ParticipantDTO>();
        if (participation != null)
        {
            foreach (var participant in participation)
            {
                var user = participant.Participant;
                var i = new ParticipantDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };
                participantList.Add(i);
            }
        }

        return new EventDTO
        {
            Id = newEvent.Id,
            AuthorId = newEvent.AuthorId,
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            Participants = participantList,
            StartEvent = newEvent.StartEvent,
            EndEvent = newEvent.EndEvent,
            IsRecurring = newEvent.IsRecurring,
            Color = newEvent.Color,
            IsDeleted = newEvent.IsDeleted
        };
    }
    public Event Map(EditEventDTO newEvent, ICollection<Participation> participantion)
    {
        return new Event
        {
            Title = newEvent.Title,
            Description = newEvent.Description,
            Location = newEvent.Location,
            StartEvent = newEvent.StartEvent,
            EndEvent = newEvent.EndEvent,
            Participants = participantion,
            IsRecurring = newEvent.IsRecurring,
            Color = newEvent.Color
        };
    }
}

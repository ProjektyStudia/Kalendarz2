import React, { createRef, useEffect, useState } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { INITIAL_EVENTS } from "./event-utils";
import { CalendarContainer } from "../common/components/containers/calendarContainer";
import { useDispatch } from "react-redux";
import { SelectColors, SelectUser } from "../auth/slice";
import { useAppSelector } from "../common/store/rootReducer";
import { getAllEventsAction } from "../event/eventActions";
import { SelectAllEvents } from "../event/selectors";
import { Holiday } from "../holiday/Holiday";

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export const Calendar = () => {
  const handleDateClick = (info: DateClickArg) => {
    console.log(info.dateStr);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // console.log();
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  const dispatch = useDispatch();
  let currentUser = useAppSelector((state) => SelectUser(state));
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (currentUser.id != 0) {
      setIsLogged(true);
      dispatch(getAllEventsAction({ authorId: currentUser.id }));
    } else {
      setIsLogged(false);
    }
  }, [currentUser.token, localStorage]);

  const events = useAppSelector((state) => SelectAllEvents(state));
  const calendarColors = useAppSelector((state) => SelectColors(state));
  const nonDeletedEvents = events.filter((e) => !e.isDeleted);
  const calendar_events = nonDeletedEvents.map((e) => {
    return {
      title: e.title,
      start: e.startEvent,
      end: e.endEvent,
      color: e.color,
    };
  });

  return (
    <>
      <CalendarContainer
        darkmode={calendarColors.isDarkmode}
        color={calendarColors.color}
      >
        <Holiday />
        <FullCalendar
          events={calendar_events}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "title",
            center: "",
            right: "dayGridMonth timeGridWeek timeGridDay",
          }}
          footerToolbar={{
            center: "prev next",
            left: "today",
            right: "prevYear nextYear",
          }}
          initialView="dayGridMonth"
          height={"71.7vh"}
          aspectRatio={2}
          expandRows={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          weekends={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}

          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </CalendarContainer>
    </>
  );
};

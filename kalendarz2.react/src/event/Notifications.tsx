import { useEffect } from "react";
import { SelectUser } from "../auth/slice";
import { useAppSelector } from "../common/store/rootReducer";
import { useDispatch } from "react-redux";
import { getAllEventsAction } from "./eventActions";
import { SelectAllEvents } from "./selectors";
import { NotificationsContainer } from "../common/components/containers/notificationsContainer";
import { Notification } from "./Notification";
export const Notifications = () => {
  const dispatch = useDispatch();
  let currentUser = useAppSelector((state) => SelectUser(state));

  const isBeforeNow = (date: Date) => {
    var now = new Date().getTime();
    var distance = new Date(date).getTime() - now;
    if (distance < 0) return true;
    return false;
  };

  useEffect(() => {
    if (currentUser.id != 0) {
      dispatch(getAllEventsAction({ authorId: currentUser.id }));
    } else {
    }
  }, []);

  const events = useAppSelector((state) => SelectAllEvents(state));
  const today = new Date();
  const todaysEvents = events.filter(
    (e) =>
      new Date(e.startEvent).getDate() == today.getDate() &&
      new Date(e.startEvent).getMonth() == today.getMonth() &&
      new Date(e.startEvent).getFullYear() == today.getFullYear() &&
      !isBeforeNow(e.startEvent)
  );
  const filteredTodaysEvents = todaysEvents.filter((e) => !e.isDeleted);

  const tomorrowsEvents = events.filter(
    (e) =>
      new Date(e.startEvent).getDate() == today.getDate() + 1 &&
      new Date(e.startEvent).getMonth() == today.getMonth() &&
      new Date(e.startEvent).getFullYear() == today.getFullYear()
  );
  const filteredTomorrowsEvents = tomorrowsEvents.filter((e) => !e.isDeleted);

  const sortedtodaysEvents = filteredTodaysEvents.sort(function (a, b) {
    return new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime();
  });

  const sortedtomorrowsEvents = filteredTomorrowsEvents.sort(function (a, b) {
    return new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime();
  });

  return (
    <NotificationsContainer
      darkmode={currentUser.isDarkmode}
      color={currentUser.color}
    >
      <div className="notifications-group">
        {sortedtodaysEvents.length > 0 ? (
          <h1>Today's events</h1>
        ) : (
          <h1>You don't have any events today</h1>
        )}

        <div className="notifications">
          {sortedtodaysEvents.map((event) => {
            return (
              <Notification
                bcolor={event.color}
                event={event}
                today={true}
              ></Notification>
            );
          })}
        </div>
      </div>
      <div className="notifications-group">
        {sortedtomorrowsEvents.length > 0 ? (
          <h1>Tomorrow's events</h1>
        ) : (
          <h1>You don't have any events tomorrow</h1>
        )}
        <div className="notifications">
          {sortedtomorrowsEvents.map((event) => {
            return (
              <Notification
                bcolor={event.color}
                event={event}
                today={false}
              ></Notification>
            );
          })}
        </div>
      </div>
    </NotificationsContainer>
  );
};

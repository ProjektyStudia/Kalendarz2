import { createSlice } from "@reduxjs/toolkit";
import { connection } from "../common/hubs/conversationHub";
import { initialState } from "../common/models/event/events";
import { RootState } from "../common/store/rootReducer";
import event from "../common/models/event/event"
import {
  addEventAction, getAllEventsAction
} from "./eventActions";

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEventAction.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          const newEvent: event = {
            authorId: action.payload.authorId,
            title: action.payload.title,
            description: action.payload.description,
            location:action.payload.location,
            participantsEmails:action.payload.participantsEmails,
            startEvent: action.payload.startEvent,
            endEvent: action.payload.endEvent,
            color:action.payload.number,
            isRecurring:action.payload.isRecurring,
          };
          const newEvents = state.events;
          newEvents.push(newEvent);
          state.events = newEvents;
        }
      })
      .addCase(getAllEventsAction.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.events = action.payload;
        }
      })
  },
});

export default eventSlice.reducer;


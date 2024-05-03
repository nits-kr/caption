import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // Import the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // Import the interaction plugin

function Calender() {
  const [events, setEvents] = useState([]);
  const handleDateClick = () => {
    const title = prompt("Please enter a new title for your events.");
  };
  return <div></div>;
}

export default Calender;

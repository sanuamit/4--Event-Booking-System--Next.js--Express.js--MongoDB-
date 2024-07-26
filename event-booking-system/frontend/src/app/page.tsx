"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";

interface Event {
  _id: string;
  title: string;
  date: string;
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Event Booking System
      </h1>
      <EventForm addEvent={addEvent} />
      {loading ? (
        <div className="flex justify-center">
          <span className="text-gray-600">Loading events...</span>
        </div>
      ) : (
        <EventList events={events} deleteEvent={deleteEvent} />
      )}
    </div>
  );
};

export default HomePage;

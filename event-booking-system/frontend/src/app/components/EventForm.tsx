"use client";

import React, { useState } from "react";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

interface EventFormProps {
  addEvent: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/events", {
        title,
        date,
        location,
        description,
      });

      const newEvent: Event = response.data;
      addEvent(newEvent);

      // Reset the form fields
      setTitle("");
      setDate("");
      setLocation("");
      setDescription("");
    } catch (err) {
      setError("Failed to add event. Please try again.");
      console.error("Error adding event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Event</h2>
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the event title"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Enter the event location"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter the event description"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;

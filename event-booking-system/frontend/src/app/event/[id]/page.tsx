/* eslint-disable react/no-unescaped-entities */
// src/app/event/[id]/page.tsx

import React from "react";
import { Metadata } from "next";
import axios from "axios";

// Dynamic Metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const event = await fetchEvent(params.id);
  return {
    title: `${event?.name || "Event Details"} - Event Booking System`,
    description: event?.description || "Find details about this event.",
  };
}

const fetchEvent = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const event = await fetchEvent(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600">
            The event you're looking for does not exist. Please check the URL or
            go back to the home page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Event Details
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
        <p className="text-gray-700 mb-4">{event.description}</p>
      </div>
    </div>
  );
};

export default EventPage;

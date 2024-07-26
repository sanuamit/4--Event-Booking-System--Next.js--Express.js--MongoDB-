"use client";

import React from "react";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  deleteEvent: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, deleteEvent }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
      <h2 className="text-xl font-semibold mb-4 px-6 py-4 border-b border-gray-300">
        Event List
      </h2>
      <ul className="divide-y divide-gray-200">
        {events.map((event: Event) => (
          <li
            key={event._id}
            className="p-4 flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <Link
              href={`/event/${event._id}`}
              className="flex-grow flex justify-between items-center"
            >
              <span className="text-lg font-medium text-gray-800">
                {event.title}
              </span>
              <span className="text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </Link>
            <button
              onClick={() => deleteEvent(event._id)}
              className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              aria-label={`Delete ${event.title}`}
              title={`Delete ${event.title}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

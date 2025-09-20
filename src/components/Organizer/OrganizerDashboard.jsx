import React from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Calendar, ListChecks, ClipboardList, History } from "lucide-react";

const OrganizerDashboard = () => {
  const menuItems = [
    {
      title: "Create Event",
      desc: "Easily create and publish new events for attendees.",
      icon: <Calendar className="w-8 h-8 text-white" />,
    },
    {
      title: "Events",
      desc: "Manage all your upcoming and live events in one place.",
      icon: <ListChecks className="w-8 h-8 text-white" />,
    },
    {
      title: "Booked",
      desc: "Track all the bookings and participants registered.",
      icon: <ClipboardList className="w-8 h-8 text-white" />,
    },
    {
      title: "Past Events",
      desc: "Review your past events and analyze performance.",
      icon: <History className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-[#f9faf7] min-h-screen px-6 py-12 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#5a6b47] font-audiowide">
          Organizer Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-[#dfe6d9] hover:shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center p-6 md:p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#8C9F6E] shadow-md mb-4">
                  {item.icon}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-[#5a6b47] mb-2">
                  {item.title}
                </h2>
                <p className="text-sm md:text-base text-[#5a6b47]/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizerDashboard;

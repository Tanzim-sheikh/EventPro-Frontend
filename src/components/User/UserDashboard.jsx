import React from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { CalendarCheck2, History, Ticket, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "My Events",
      desc: "View and manage all the events you have created or joined.",
      icon: <CalendarCheck2 className="w-8 h-8 text-white" />,
    },
    {
      title: "Past Events",
      desc: "Check the details of events you have attended in the past.",
      icon: <History className="w-8 h-8 text-white" />,
    },
    {
      title: "My Bookings",
      desc: "See your tickets and booking details in one place.",
      icon: <Ticket className="w-8 h-8 text-white" />,
    },
    {
      title: "Past Bookings",
      desc: "Your completed event tickets and booking history.",
      icon: <History className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-[#f9faf7] min-h-screen px-6 py-12 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#5a6b47] font-audiowide">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-[#dfe6d9] hover:shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
              onClick={() => {
                if(item.title === "My Events"){
                  navigate("/user/events");
                }
                 else if (item.title === "My Bookings") {
                  navigate("/user/bookings");
                } else if (item.title === "Past Events") {
                  navigate("/user/past-events");
                } else if (item.title === "Past Bookings") {
                  navigate("/user/past-bookings");
                }
              }}
            >
              <div className="flex flex-col items-center text-center p-6 md:p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#A3B886] shadow-md mb-4">
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

export default UserDashboard;

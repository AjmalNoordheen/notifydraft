import { generateCalendar, isPrevDisabled } from "@/app/utils/CalenderUtil";
import React, { useState } from "react";

const Calender = ({
  allDocuments,
}: {
  allDocuments: any[];
}) => {
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const calendarDays = generateCalendar(calendarMonth, allDocuments);
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const prevMonth = () => {
    const prev = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1,
    );
    setCalendarMonth(prev);
  };

  const nextMonth = () => {
    const next = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      1,
    );
    setCalendarMonth(next);
  };


  return (
    <>
      <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              disabled={isPrevDisabled(calendarMonth)}
              onClick={prevMonth}
              className={`p-2 rounded-lg transition-colors ${
                isPrevDisabled(calendarMonth)
                  ? "bg-gray-400 cursor-not-allowed opacity-50"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {calendarMonth.toLocaleString("default", { month: "long" })}
              </h2>
              <p className="text-blue-100 text-sm">
                {calendarMonth.getFullYear()}
              </p>
            </div>

            <button
              onClick={nextMonth}
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {/* Calendar days */}
            {calendarDays.map(({ day, documents }, index) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="h-20 bg-gray-50 rounded-lg"
                  ></div>
                );
              }

              const isToday =
                new Date().toDateString() ===
                new Date(year, month, day).toDateString();
              const isWeekend =
                new Date(year, month, day).getDay() === 0 ||
                new Date(year, month, day).getDay() === 6;
              const hasDocuments = documents.length > 0;

              return (
                <div
                  key={day}
                  className={`h-20 p-2 rounded-lg border transition-all hover:shadow-md ${
                    isToday
                      ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                      : hasDocuments
                        ? "bg-yellow-50 border-yellow-300"
                        : isWeekend
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isToday
                        ? "text-blue-700"
                        : hasDocuments
                          ? "text-yellow-800"
                          : isWeekend
                            ? "text-gray-500"
                            : "text-gray-900"
                    }`}
                  >
                    {day}
                    {isToday && (
                      <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    {documents.slice(0, 2).map((doc, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded truncate"
                        title={`${doc.clientName} - ${doc.type}`}
                      >
                        {doc.clientName}
                      </div>
                    ))}
                    {documents.length > 2 && (
                      <div
                        className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 relative group"
                        title={`Click to see all ${documents.length} documents`}
                      >
                        +{documents.length - 2} more
                        {/* Hover tooltip showing all documents */}
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg z-10 min-w-max">
                          <div className="font-semibold mb-1">
                            All Expiring Documents:
                          </div>
                          {documents.map((doc, idx) => (
                            <div key={idx} className="mb-1 last:mb-0">
                              {doc.clientName} - {doc.type}
                            </div>
                          ))}
                          {/* Arrow pointing down */}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Expiring</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>Weekend</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-xs">
              <div className="text-gray-500">
                {calendarDays.filter((d) => d.documents.length > 0).length} days
                with expiries
              </div>
              <div className="text-gray-500">
                {calendarDays.reduce(
                  (total, day) => total + day.documents.length,
                  0,
                )}{" "}
                total documents
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;

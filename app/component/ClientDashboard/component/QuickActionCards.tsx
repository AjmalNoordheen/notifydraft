import { generateCalendar } from "@/app/utils/CalenderUtil";
import React, { useState } from "react";
import { Button } from "../../elements/Button";

type QuickActionCardsType = {
  allDocuments: any[];
  setShowAddUserPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuickActionCards = ({
  allDocuments,
  setShowAddUserPopup,
}: QuickActionCardsType) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const calendarDays = generateCalendar(calendarMonth, allDocuments);

  const prevMonth = () => {
    const prev = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1
    );
    setCalendarMonth(prev);
  };

  const nextMonth = () => {
    const next = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      1
    );
    setCalendarMonth(next);
  };

  const isPrevDisabled = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    return (
      calendarMonth.getFullYear() < currentYear ||
      (calendarMonth.getFullYear() === currentYear &&
        calendarMonth.getMonth() <= currentMonth)
    );
  };
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">➕ Add New Client</h3>
          <p className="mb-4 text-sm text-gray-600">
            Register a new client and manage all their documents.
          </p>
          <Button
            variant="primary"
            text="Add Client"
            onClick={() => setShowAddUserPopup(true)}
            className="w-full px-4 py-2 "
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">📅 Expiry Calendar</h3>
          <p className="mb-4 text-sm text-gray-600">
            View all upcoming expiries in calendar view.
          </p>
          <Button
            text={showCalendar ? "Hide Calendar" : "Open Calendar"}
            variant="secondary"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full px-4 py-2 "
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <h3 className="mb-2 text-lg font-semibold">🚩 Upgrade Your Plan</h3>
          <p className="mb-4 text-sm text-gray-600">
            Upload passport, visa, Emirates ID, or license.
          </p>
          <Button
            variant="ghost"
            text="👑 Upgrade Plan"
            className="w-full px-4 py-2"
          />
        </div>
      </div>

      {showCalendar && (
        <div className="mt-12 border p-6 rounded-xl bg-white shadow-sm border-blue-100 ">
          <div className="flex items-center justify-between mb-4">
            <button
              disabled={isPrevDisabled()}
              onClick={prevMonth}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              ◀
            </button>
            <h2 className="text-xl [background-image:var(--ring-gradient)] font-semibold bg-clip-text text-transparent">
              {calendarMonth.toLocaleString("default", { month: "long" })}{" "}
              {calendarMonth.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ▶
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map(({ day, documents }) => (
              <div
                key={day}
                className={`border border-gray-300 rounded p-2 ${
                  documents.length > 0 ? "bg-yellow-100" : "bg-white"
                }`}
              >
                <div className={`font-semibold mb-1 ${documents?.length > 0 ? "text-red-800" : "text-purple-800"}`}>{day}</div>
                {documents.map((doc, idx) => (
                  <div key={idx} className="text-xs text-red-800">
                    {doc.clientName} - {doc.type}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

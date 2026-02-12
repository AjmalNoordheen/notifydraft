import React, { useState } from "react";
import { Button } from "../../elements/Button";
import Calender from "./Calender";

type QuickActionCardsType = {
  allDocuments: any[];
  setShowAddUserPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuickActionCards = ({
  allDocuments,
  setShowAddUserPopup,
}: QuickActionCardsType) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 shadow-sm transition hover:shadow-md">
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

        <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 shadow-sm transition hover:shadow-md">
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

        <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 shadow-sm transition hover:shadow-md">
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

      {showCalendar && <Calender allDocuments={allDocuments} />}
    </>
  );
};

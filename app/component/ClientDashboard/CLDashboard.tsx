"use client";

import { useState } from "react";
import { QuickActionCards } from "./component/QuickActionCards";
import { generateCalendar } from "@/app/utils/CalenderUtil";
import { Input, Label } from "../elements/Input";
import { showToast } from "nextjs-toast-notify";
import { AddUserPOpup } from "./component/AddUserPopup";

export default function TypingCenterDashboard() {
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [clients] = useState([
    {
      name: "Ahmed Khan",
      documents: [
        { type: "Emirates ID", expiry: "2026-02-15" },
        { type: "Passport", expiry: "2026-08-20" },
      ],
    },
    {
      name: "Sara Ali",
      documents: [
        { type: "Visa", expiry: "2026-03-02" },
        { type: "Trade License", expiry: "2026-07-10" },
      ],
    },
    {
      name: "Rashed LLC",
      documents: [
        { type: "Trade License", expiry: "2026-02-18" },
        { type: "Emirates ID", expiry: "2026-02-18" },
      ],
    },
  ]);

  const allDocuments = clients.flatMap((client) =>
    client.documents.map((doc) => ({
      clientName: client.name,
      type: doc.type,
      expiry: new Date(doc.expiry),
    }))
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        showToast.error(`File too large: ${file.name} (Max 10MB)`, {
          duration: 2000,
          progress: false,
          position: "bottom-right",
          transition: "swingInverted",
          icon: "",
          sound: true,
        });
        continue; // skip this file
      }

      validFiles.push(file);
    }

    // Append new files (important!)
    setFile((prev) => [...prev, ...validFiles]);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="mt-1 text-gray-600">
          Manage your clients, documents, and expiry reminders from one place.
        </p>
      </div>

      <QuickActionCards
        allDocuments={allDocuments}
        setShowAddUserPopup={setShowAddUserPopup}
      />

      {/* Upcoming Expiries Table */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Upcoming Expiries</h2>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Document</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, idx) =>
                client.documents.map((doc, jdx) => {
                  const expiryDate: any = new Date(doc.expiry);
                  const todayDate: any = new Date();
                  const daysLeft = Math.ceil(
                    (expiryDate - todayDate) / (1000 * 60 * 60 * 24)
                  );
                  const statusColor =
                    daysLeft <= 15
                      ? "text-red-600"
                      : daysLeft <= 30
                      ? "text-orange-600"
                      : "text-green-600";
                  return (
                    <tr key={`${idx}-${jdx}`} className="border-t">
                      <td className="p-4">{client.name}</td>
                      <td className="p-4">{doc.type}</td>
                      <td className="p-4">{expiryDate.toLocaleDateString()}</td>
                      <td className={`p-4 font-medium ${statusColor}`}>
                        {daysLeft} days left
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showAddUserPopup && (
       <AddUserPOpup setShowAddUserPopup={setShowAddUserPopup} handleFileChange={handleFileChange} file={file} setFile={setFile} />
      )}
    </div>
  );
}

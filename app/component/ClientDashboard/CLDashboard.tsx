"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { QuickActionCards } from "./component/QuickActionCards";
import { generateCalendar } from "@/app/utils/CalenderUtil";
import { Input, Label } from "../elements/Input";
import { showToast } from "nextjs-toast-notify";
import { AddUserPOpup } from "./component/AddUserPopup";
import { dummyUsers } from "@/app/constants/dummyData";
import { DocumentModal } from "./component/DocumentModal";
import { UserSSearchAndFilter } from "./component/UserSSearchAndFilter";
import { Paginatio } from "./component/Paginatio";
import { ResultSummary } from "./component/ResultSummary";
import { UserList } from "./component/UserList";

const ITEMS_PER_PAGE = 5;

export default function TypingCenterDashboard() {
  const router = useRouter();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDocuments, setModalDocuments] = useState<any>(null);
  const [clients] = useState(dummyUsers);

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

  // Process and filter data
  const allDocuments = useMemo(() => {
    return clients.flatMap((client) =>
      client.documents.map((doc) => ({
        clientName: client.name,
        type: doc.type,
        expiry: new Date(doc.expiry),
        id: client.id,
      })),
    );
  }, [clients]);

  // Filter logic
  const filteredDocuments = useMemo(() => {
    let filtered = allDocuments;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (doc) =>
          doc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((doc) => {
        const daysLeft = Math.ceil(
          (doc.expiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        );

        if (filterStatus === "expiringSoon") {
          return daysLeft <= 30 && daysLeft > 0;
        } else if (filterStatus === "expired") {
          return daysLeft <= 0;
        }
        return true;
      });
    }

    // Date range filter
    if (startDate || endDate) {
      filtered = filtered.filter((doc) => {
        const docDate = doc.expiry.getTime();

        if (startDate) {
          const start = new Date(startDate).getTime();
          if (docDate < start) return false;
        }

        if (endDate) {
          const end = new Date(endDate).getTime();
          if (docDate > end) return false;
        }

        return true;
      });
    }

    return filtered;
  }, [allDocuments, searchQuery, filterStatus, startDate, endDate]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your clients, documents, and expiry reminders from one place.
        </p>
      </div>

      <QuickActionCards
        allDocuments={allDocuments}
        setShowAddUserPopup={setShowAddUserPopup}
      />

      {/* Upcoming Expiries Table */}
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            📋 Document Management
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Track and manage all your document expiries
          </p>
        </div>

        {/* Advanced Filters Card */}
        <div className="mb-6 rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100 shadow">
          <UserSSearchAndFilter
            setSearchQuery={setSearchQuery}
            setFilterStatus={setFilterStatus}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setCurrentPage={setCurrentPage}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Results Summary */}
          <ResultSummary filteredDocuments={filteredDocuments} />
        </div>

        {/* Documents Section */}
        <UserList
          paginatedDocuments={paginatedDocuments}
          setModalDocuments={setModalDocuments}
          setModalOpen={setModalOpen}
        />

        {/* Pagination */}
        <Paginatio
          filteredDocuments={filteredDocuments}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <DocumentModal
        isOpen={modalOpen}
        documents={modalDocuments}
        onClose={() => setModalOpen(false)}
      />
      {showAddUserPopup && (
        <AddUserPOpup
          setShowAddUserPopup={setShowAddUserPopup}
          handleFileChange={handleFileChange}
          file={file}
          setFile={setFile}
        />
      )}
    </div>
  );
}

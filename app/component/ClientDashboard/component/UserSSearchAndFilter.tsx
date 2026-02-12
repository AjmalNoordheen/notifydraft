import React from "react";

export const UserSSearchAndFilter = ({ setSearchQuery, setFilterStatus, setStartDate, setEndDate, setCurrentPage, searchQuery, filterStatus, startDate, endDate }:{
    setSearchQuery: (value: string) => void;
    setFilterStatus: (status: string) => void;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setCurrentPage: (page: number) => void;
    searchQuery: string;
    filterStatus: string;
    startDate: string;
    endDate: string;
}) => {
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1);
  };

  const clearDateFilters = () => {
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };
  return (
    <>
      {/* Search Bar */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold text-gray-900 uppercase">
          🔍 Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-white bg-white px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Status Filter */}
        <div>
          <label className="mb-2 block text-xs font-bold text-gray-900 uppercase">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full rounded-lg border border-white bg-white px-3 py-2 text-sm text-gray-700 font-medium transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          >
            <option value="all">✓ All Documents</option>
            <option value="expiringSoon">⏱️ Expiring Soon</option>
            <option value="expired">⚠️ Expired</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="mb-2 block text-xs font-bold text-gray-900 uppercase">
            From Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateFilterChange(e.target.value, endDate)}
            className="w-full rounded-lg border border-white bg-white px-3 py-2 text-sm text-gray-700 font-medium transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="mb-2 block text-xs font-bold text-gray-900 uppercase">
            To Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateFilterChange(startDate, e.target.value)}
            className="w-full rounded-lg border border-white bg-white px-3 py-2 text-sm text-gray-700 font-medium transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(startDate || endDate || searchQuery || filterStatus !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterStatus("all");
              clearDateFilters();
            }}
            className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-50 border border-red-200"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </>
  );
};

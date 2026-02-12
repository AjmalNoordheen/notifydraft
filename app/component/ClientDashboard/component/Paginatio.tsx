import React from "react";

export const Paginatio = ({
  filteredDocuments,
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  filteredDocuments: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}) => {
  return (
    <>
      {filteredDocuments?.length > 0 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-lg bg-white p-4 shadow border border-gray-200 md:flex-row">
          <div className="text-xs font-semibold text-gray-700">
            Page <span className="text-blue-600">{currentPage}</span> of{" "}
            <span className="text-blue-600">{totalPages}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-8 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${
                      currentPage === page
                        ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow"
                        : "border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

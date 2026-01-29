
export const DocumentModal = ({ isOpen, documents, onClose }: { isOpen: boolean; documents: any[]; onClose: () => void }) => {
  if (!isOpen || !documents) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="max-h-96 w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            All Expiring Documents
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-3">
          {documents.map((doc: any, idx: number) => {
            const daysLeft = Math.ceil(
              (doc.expiry.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            );
            const statusColor =
              daysLeft <= 15
                ? "bg-red-100 text-red-800"
                : daysLeft <= 30
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800";

            return (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {doc.clientName}
                  </p>
                  <p className="text-sm text-gray-600">{doc.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {doc.expiry.toLocaleDateString()}
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${statusColor}`}
                  >
                    {daysLeft <= 0 ? "Expired" : `${daysLeft}d left`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


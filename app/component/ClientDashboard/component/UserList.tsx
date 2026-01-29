import { useRouter } from "next/navigation";

export const UserList = ({
  paginatedDocuments,
  setModalDocuments,
  setModalOpen,
}: {
  paginatedDocuments: any[];
  setModalDocuments: any;
  setModalOpen: any;
}) => {
  const router = useRouter();
  return (
    <div className="rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
      {paginatedDocuments.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {/* Group documents by client */}
          {paginatedDocuments
            .reduce((acc: any, doc: any) => {
              const clientIdx = acc.findIndex(
                (item: any) => item.client === doc.clientName,
              );
              if (clientIdx !== -1) {
                acc[clientIdx].docs.push(doc);
              } else {
                acc.push({
                  client: doc.clientName,
                  docs: [doc],
                  id: doc.id,
                });
              }
              return acc;
            }, [])
            .map((group: any, groupIdx: number) => {
              const visibleDocs = group.docs.slice(0, 2);
              const hiddenCount = Math.max(0, group.docs.length - 2);

              return (
                <div key={groupIdx}>
                  {/* Client Header Row */}
                  <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {group.client}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {group.docs.length} doc
                          {group.docs.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          router.push(`/dashbord/users/${group.id}`);
                        }}
                        className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Document Rows */}
                  {visibleDocs.map((doc: any, docIdx: number) => {
                    const daysLeft = Math.ceil(
                      (doc.expiry.getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    const statusBgColor =
                      daysLeft <= 15
                        ? "hover:bg-red-50"
                        : daysLeft <= 30
                          ? "hover:bg-orange-50"
                          : "hover:bg-green-50";
                    const statusColor =
                      daysLeft <= 15
                        ? "bg-red-100 text-red-700 border-red-200"
                        : daysLeft <= 30
                          ? "bg-orange-100 text-orange-700 border-orange-200"
                          : "bg-green-100 text-green-700 border-green-200";

                    return (
                      <div
                        key={docIdx}
                        className={`px-4 py-3 flex items-center justify-between border-b border-gray-100 transition-colors cursor-pointer bg-white ${statusBgColor}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">
                            {doc.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.expiry.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-3 shrink-0">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold border ${statusColor}`}
                          >
                            {daysLeft <= 0 ? "Expired" : `${daysLeft}d`}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* View More Row */}
                  {hiddenCount > 0 && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <button
                        onClick={() => {
                          setModalDocuments(group.docs);
                          setModalOpen(true);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        +{hiddenCount} more
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <p className="text-2xl font-bold text-gray-800">No documents found</p>
          <p className="mt-2 text-gray-600 text-sm">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

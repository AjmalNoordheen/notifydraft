export const DocumentPreviewPopUp = ({
  previewDoc,
  setPreviewDoc,
}: {
  previewDoc: any;
  setPreviewDoc: any;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {previewDoc?.type}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {previewDoc?.issueDate &&
                `Issued: ${new Date(previewDoc.issueDate).toLocaleDateString("en-US")}`}
              {previewDoc?.issueDate && previewDoc?.expiry && " • "}
              {previewDoc?.expiry &&
                `Expires: ${new Date(previewDoc.expiry).toLocaleDateString("en-US")}`}
            </p>
          </div>
          <button
            onClick={() => setPreviewDoc(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {previewDoc?.notes && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Notes:</span> {previewDoc.notes}
              </p>
            </div>
          )}

          {/* File Preview */}
          {previewDoc?.fileUrls && previewDoc.fileUrls.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  Attached Files
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previewDoc.fileUrls.map((fileUrl: string, idx: number) => {
                    const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
                    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);

                    return (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        {isImage ? (
                          <div className="space-y-3">
                            <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-48">
                              <img
                                src={`/api/documents/${fileUrl}`}
                                alt={`Preview ${idx + 1}`}
                                className="max-w-full max-h-60 object-contain"
                                onError={(e) => {
                                  // Fallback for images
                                  (e.target as HTMLImageElement).src =
                                    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3EImage%3C/text%3E%3C/svg%3E`;
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-2">
                                {fileUrl}
                              </p>
                              <a
                                href={`/api/documents/${fileUrl}`}
                                download={fileUrl}
                                className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                              >
                                📥 Download
                              </a>
                            </div>
                          </div>
                        ) : isPdf ? (
                          <div className="space-y-3">
                            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center flex-col gap-2">
                              <svg
                                className="w-12 h-12 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
                                <path d="M7 7a1 1 0 000 2h6a1 1 0 000-2H7z" />
                              </svg>
                              <p className="text-sm text-gray-600">
                                PDF Document
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-2">
                                {fileUrl}
                              </p>
                              <div className="flex gap-2">
                                <a
                                  href={`/api/documents/${fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                >
                                  👁️ View
                                </a>
                                <a
                                  href={`/api/documents/${fileUrl}`}
                                  download={fileUrl}
                                  className="inline-flex items-center px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                >
                                  📥 Download
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 text-center">
                            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-xs font-medium text-gray-700 truncate">
                              {fileUrl}
                            </p>
                            <a
                              href={`/api/documents/${fileUrl}`}
                              download={fileUrl}
                              className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                              📥 Download
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4 text-gray-600">
                No files attached to this document
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

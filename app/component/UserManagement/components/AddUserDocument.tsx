import React from "react";
import Tiptap from "../../ClientDashboard/component/TipTap";
import { DocumentForm } from "@/app/types/userdetails";


export const AddUserDocument = ({
  editingDocId,
  documentForm,
  setDocumentForm,
  handleAddDocument,
  handleUpdateDocument,
  handleCancelEdit,
}: DocumentForm) => {
  const handleRemoveFile = (index: number) => {
    setDocumentForm({
      ...documentForm,
      files: documentForm.files?.filter((_, i) => i !== index) || [],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDocumentForm({
        ...documentForm,
        files: [...(documentForm.files || []), ...newFiles],
      });
    }
  };

  return (
    <>
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          {editingDocId ? "Edit Document" : "Add New Document"}
        </h4>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <input
                type="text"
                placeholder="e.g., Passport, License, Visa"
                value={documentForm.type}
                onChange={(e) =>
                  setDocumentForm({
                    ...documentForm,
                    type: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={documentForm.issueDate || ""}
                  onChange={(e) =>
                    setDocumentForm({
                      ...documentForm,
                      issueDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={documentForm.expiry}
                  onChange={(e) =>
                    setDocumentForm({
                      ...documentForm,
                      expiry: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <Tiptap
              content={documentForm.notes || ""}
              onChange={(html) =>
                setDocumentForm({ ...documentForm, notes: html })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Files (Optional)
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                id={`doc-file-${editingDocId || "new"}`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(`doc-file-${editingDocId || "new"}`)
                    ?.click()
                }
                className="w-full h-10 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                📁 Choose files
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              PDF, JPG, or PNG up to 10MB each
            </p>

            {documentForm.files && documentForm.files.length > 0 && (
              <div className="space-y-2">
                {documentForm.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <span className="text-lg">📄</span>
                      )}
                      <span className="text-xs text-gray-700 truncate">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="text-red-600 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={
              editingDocId
                ? () => editingDocId && handleUpdateDocument(editingDocId)
                : handleAddDocument
            }
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {editingDocId ? "Update Document" : "Add Document"}
          </button>

          <button
            onClick={handleCancelEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

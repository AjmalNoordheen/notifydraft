import { Document } from "@/app/types/userdetails";
import { FileIcon } from "../../icons/FileIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";

export const UserDocumentList = ({
  documents,
  setPreviewDoc,
  handleEditDocument,
  handleDeleteDocument,
}: {
  documents: Document[];
  setPreviewDoc: any;
  handleEditDocument: (doc: any) => void;
  handleDeleteDocument: (docId: string) => void;
}) => {
  return (
    <div className="space-y-4">
      {documents.length > 0 ? (
        documents.map((doc: any, index) => {
          const expiryDate = new Date(doc.expiry);
          const today = new Date();
          const daysLeft = Math.ceil(
            (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          );

          return (
            <div
              key={doc.id || index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setPreviewDoc(doc)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FileIcon
                  height={"20"}
                  width={"20"}
                  className="text-blue-500"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {doc.type}
                  </h4>
                  <div className="space-y-1 mt-1">
                    {doc.issueDate && (
                      <p className="text-xs text-gray-600">
                        Issued:{" "}
                        {new Date(doc.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <p className="text-xs text-gray-600">
                      Expires:{" "}
                      {expiryDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    {doc.notes && (
                      <p className="text-xs text-gray-500 italic">
                        {doc.notes}
                      </p>
                    )}
                    {doc.fileUrls && doc.fileUrls.length > 0 && (
                      <p className="text-xs text-blue-600 font-medium">
                        📎 {doc.fileUrls.length} file(s) attached - Click to
                        view
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    daysLeft <= 0
                      ? "bg-red-100 text-red-800"
                      : daysLeft <= 30
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditDocument(doc);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit document"
                  >
                    <EditIcon />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (doc.id) {
                        handleDeleteDocument(doc.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete document"
                  >
                  <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <FileIcon height="40" width="40" className="flex justify-center text-gray-400"/>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No documents
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new document.
          </p>
        </div>
      )}
    </div>
  );
};

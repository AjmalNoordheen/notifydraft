"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { dummyUsers } from "@/app/constants/dummyData";
import { HandleUser } from "./components/HandleUser";
import { UserProfileInfo } from "./components/UserProfileInfo";
import { AddUserDocument } from "./components/AddUserDocument";
import { UserDocumentList } from "./components/UserDocumentList";
import { DocumentPreviewPopUp } from "./components/DocumentPreviewPopUp";
import { Document, UserDetail } from "@/app/types/userdetails";
import { BackIcon } from "../icons/BackIcon";
import { AddIcon } from "../icons/AddIcon";

export default function UserDetailView() {
  const params = useParams();
  const router = useRouter();
  const userId = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  const [user, setUser] = useState<UserDetail | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserDetail | null>(null);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    type: "",
    expiry: "",
    issueDate: "" as string | null,
    notes: "" as string | null,
    files: [] as File[],
  });
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  useEffect(() => {
    if (!userId) return;
    const foundUser = dummyUsers.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setEditForm(foundUser);
      setDocuments(foundUser.documents || []);
    }
    setLoading(false);
  }, [userId]);

  const handleSaveUser = async () => {
    if (!editForm) return;
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleAddDocument = async () => {
    if (!documentForm.type || !documentForm.expiry) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch(`/api/users/${userId}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...documentForm,
          files: undefined, // Don't send File objects to API
        }),
      });
      if (response.ok) {
        const newDoc = await response.json();
        setDocuments([...documents, newDoc]);
        setDocumentForm({
          type: "",
          expiry: "",
          issueDate: null,
          notes: null,
          files: [],
        });
        setShowDocumentForm(false);
      }
    } catch (error) {
      console.error("Failed to add document:", error);
    }
  };

  const handleUpdateDocument = async (docId: string) => {
    if (!documentForm.type || !documentForm.expiry) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch(`/api/users/${userId}/documents/${docId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...documentForm,
          files: undefined, // Don't send File objects to API
        }),
      });
      if (response.ok) {
        const updatedDoc = await response.json();
        setDocuments(
          documents.map((doc) => (doc.id === docId ? updatedDoc : doc)),
        );
        setDocumentForm({
          type: "",
          expiry: "",
          issueDate: "",
          notes: "",
          files: [],
        });
        setEditingDocId(null);
      }
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      const response = await fetch(`/api/users/${userId}/documents/${docId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDocuments(documents.filter((doc) => doc.id !== docId));
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleEditDocument = (doc: Document) => {
    if (doc.id) {
      setEditingDocId(doc.id);
      setDocumentForm({
        type: doc.type,
        expiry: doc.expiry,
        issueDate: doc.issueDate || "",
        notes: doc.notes || "",
        files: [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingDocId(null);
    setDocumentForm({
      type: "",
      expiry: "",
      issueDate: "",
      notes: "",
      files: [],
    });
    setShowDocumentForm(false);
  };

  if (!userId || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-gray-800">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-gray-50  border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px- py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <BackIcon />
              </button>

              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    User Management • Client Profile
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800 border border-green-800"
                        : "bg-red-100 text-red-800 border border-red-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        user.status === "active" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></span>
                    {user.status || "Active"}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-800">
                    {user.role || "User"}
                  </span>
                </div>
              </div>

              <HandleUser
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleSaveUser={handleSaveUser}
                userId={userId}
                setEditForm={setEditForm}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Information Card */}
          <UserProfileInfo
            isEditing={isEditing}
            editForm={editForm}
            setEditForm={setEditForm}
            user={user}
          />

          {/* Documents Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Document Management
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Track and manage all user documents
                  </p>
                </div>

                {!showDocumentForm && editingDocId === null && (
                  <button
                    onClick={() => setShowDocumentForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    <AddIcon />
                    Add Document
                  </button>
                )}
              </div>

              <div className="p-6">
                {/* Add/Edit Document Form */}
                {(showDocumentForm || editingDocId) && (
                  <AddUserDocument
                    documentForm={documentForm}
                    setDocumentForm={setDocumentForm}
                    handleAddDocument={handleAddDocument}
                    handleUpdateDocument={handleUpdateDocument}
                    handleCancelEdit={handleCancelEdit}
                    editingDocId={editingDocId}
                  />
                )}

                {/* Documents List */}
                <UserDocumentList
                  documents={documents}
                  setPreviewDoc={setPreviewDoc}
                  handleEditDocument={handleEditDocument}
                  handleDeleteDocument={handleDeleteDocument}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewPopUp
          previewDoc={previewDoc}
          setPreviewDoc={setPreviewDoc}
        />
      )}
    </div>
  );
}

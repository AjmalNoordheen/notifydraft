export interface UserDetail {
  id: string;
  name: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  createdAt?: string;
  documents?: Document[];
}

export interface Document {
  id?: string;
  type: string;
  expiry: string;
  issueDate?: string;
  notes?: string;
  files?: File[];
  fileUrls?: string[];
  status?: string;
}

export interface UserListingProps {
  id: string;
  name: string;
  email?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

export type DocumentForm = {
  editingDocId: string | null;
  documentForm: {
    type: string;
    issueDate: string | null | any;
    expiry: string;
    notes: string | null;
    files: File[];
  };
  setDocumentForm: React.Dispatch<
    React.SetStateAction<{
      type: string;
      issueDate: string | null;
      expiry: string;
      notes: string | null;
      files: File[];
    }>
  >;
  handleAddDocument: () => void;
  handleUpdateDocument: (docId: string) => void;
  handleCancelEdit: () => void;
};
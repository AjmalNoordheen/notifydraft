'use client';
import { Button } from "../../elements/Button";
import { Input, Label } from "../../elements/Input";
import Tiptap from "./TipTap";

export const AddUserPOpup = ({
  handleFileChange,
  file,
  setFile,
  setShowAddUserPopup,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File[];
  setFile: (files: File[] | ((prev: File[]) => File[])) => void;
  setShowAddUserPopup: (show: boolean) => void;
}) => {
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const values = new FormData(e.target as HTMLFormElement);
    console.log(values.get("client-name"));
    console.log(values.get("client-doc"));
    console.log(values.get("client-email"));
    console.log(values.get("issue-date"));
    console.log(values.get("expiry-date"));
    console.log(values.get("file"));

  }
  return (
    <>
      <div className="fixed inset-0 flex  justify-center overflow-scroll bg-black/60 z-20 py-4">
        <div className="bg-white rounded-lg p-6 my-auto w-122.5 h-fit border border-gray-300 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add New Client</h2>
            <span
              className="cursor-pointer text-gray-600 text-lg"
              onClick={() => setShowAddUserPopup(false)}
            >
              🗙
            </span>
          </div>
          <form action="" onSubmit={handleAddUser}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                id="client-name"
                type="text"
                name="client-name"
                placeholder="ABC Typing Center"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                id="client-email"
                type="email"
                name="client-email"
                placeholder="you@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type of document</Label>
              <Input
                id="client-doc"
                type="text"
                name="client-doc"
                placeholder="e.g., Passport, ID Card"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input id="issue-date" name="issue-date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input id="expiry-date" type="date" name="expiry-date" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
             <Tiptap />
            </div>
            <div className="space-y-2">
            
              <Label>Upload Document (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  name="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  multiple={true}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="w-full h-14 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  onClick={() => document.getElementById("file")?.click()}
                >
                  🗁 choose a file
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, or PNG up to 10MB
              </p>
              {file.length > 0 && (
                <div className="mt-4 space-y-2">
                  {file.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between relative rounded border p-1.5 max-h-14 text-sm"
                    >
                      <div
                        className="cursor-pointer text-red-600 absolute right-0.5 -top-1.5 text-lg"
                        onClick={() => {
                          setFile((prev: File[]) =>
                            prev.filter((_: File, i: number) => i !== index)
                          );
                        }}
                      >
                        ×
                      </div>
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          <span className="text-lg">📄</span>
                        )}
                        <span className="truncate max-w-50">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 mr-4">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 float-end">
              <Button
                variant="secondary"
                text="Cancel"
                onClick={() => setShowAddUserPopup(false)}
                className="px-4 py-2"
              />
                
              
              <Button
                variant="primary"
                text="Add Client"
                type="submit"
                // onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              />
                
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const UserProfileInfo = ({
  isEditing,
  editForm,
  setEditForm,
  user,
}: {
  isEditing: boolean;
  editForm: any;
  setEditForm: (v: any) => void;
  user: any;
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Basic user details and contact information
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editForm?.name || ""}
                onChange={(e) =>
                  setEditForm(
                    editForm ? { ...editForm, name: e.target.value } : null,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            ) : (
              <p className="text-gray-900 font-medium">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editForm?.email || ""}
                onChange={(e) =>
                  setEditForm(
                    editForm ? { ...editForm, email: e.target.value } : null,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            ) : (
              <p className="text-gray-900">{user.email || "Not provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editForm?.phone || ""}
                onChange={(e) =>
                  setEditForm(
                    editForm ? { ...editForm, phone: e.target.value } : null,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            ) : (
              <p className="text-gray-900">{user.phone || "Not provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Created
            </label>
            <p className="text-gray-900">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

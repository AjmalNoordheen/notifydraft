"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dummyUsers } from "@/app/constants/dummyData";
import { UserListingProps } from "@/app/types/userdetails";

export default function UserListing() {
  const [users, setUsers] = useState<UserListingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUsers(dummyUsers as UserListingProps[]);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()),
  );

  const handleViewDetails = (userId: string) => {
    router.push(`/dashbord/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage all users and their documents
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-end">
      <div className="mb-6 rounded-lg  bg-white shadow border w-1/3 border-gray-200 p-1.5  ">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border  border-gray-300 px-4 py-2 y text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
        />
      </div>
</div>
      {/* Users Table */}
      <div className="rounded-lg bg-white shadow border block border-gray-200 overflow-hidden">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleViewDetails(user.id)}
                        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-lg font-semibold text-gray-800">
              No users found
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

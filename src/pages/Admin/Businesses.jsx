import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { fetchBusinessUsers, searchBusiness } from "@/src/services/api/admin/businessInfoapis";
import BlockConfirmationModal from "@/src/components/Alerts/BlockConfimModal";
import { toggleUserStatus } from "@/src/services/api/admin/users";
import { useNavigate } from "react-router-dom";

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await (searchTerm
          ? searchBusiness(searchTerm, currentPage)
          : fetchBusinessUsers(currentPage));

        setBusinesses(response.results);
        setCount(response.count);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBlockClick = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const confirmBlockUnlock = async () => {
    setIsModalOpen(false);

    if (!selectedBusiness) return;

    try {
      const response = await toggleUserStatus(selectedBusiness.id);
      console.log(response);

      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((business) =>
          business.id === selectedBusiness.id ? { ...business, status: !business.status } : business
        )
      );
    } catch (error) {
      console.error("Error toggling business status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage and monitor business accounts</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search by business name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Business Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone Number</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <img
                        src={business.avatar_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"}
                        alt={business.company_name || "Business"}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{business.company_name || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{business.email}</td>
                    <td className="px-6 py-4 text-gray-600">{business.phone_number}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleBlockClick(business)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          business.status
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {business.status ? "Block" : "Unblock"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`${business.id}`)}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200"
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Pagination */}
          {count > 7 && (
            <div className="flex items-center justify-center px-6 py-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(Math.ceil(count / 7)).keys()].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === page + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(count / 7)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Block/Unblock Confirmation Modal */}
      <BlockConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmBlockUnlock}
        message={`Are you sure you want to ${selectedBusiness?.status ? "block" : "unblock"} ${selectedBusiness?.email}?`}
        confirmText="Yes, Confirm"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Businesses;
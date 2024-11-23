import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import {
  fetchInvestorUserInfo,
  searchInvestors,
} from "@/src/services/api/admin/InvesterInfoapis";
import { debounce } from "@/src/utils/helpers/searchDebouncing";
import { useNavigate } from "react-router-dom";
import BlockConfirmationModal from "@/src/components/Alerts/BlockConfimModal";
import { toggleUserStatus } from "@/src/services/api/admin/users";

const Investors = () => {
  const [investorsInfo, setInvestorsInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async (page, query = "") => {
    setIsLoading(true);
    try {
      const response = query 
        ? await searchInvestors(query, page) 
        : await fetchInvestorUserInfo(page);

      setInvestorsInfo(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / 7));
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage, searchQuery.trim());
  }, [currentPage, searchQuery, fetchData]);

  const handleSearch = useMemo(() => 
    debounce((query) => {
      console.log("Search Query:", query);
      setSearchQuery(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleBlockUnlock = (investor) => {
    setSelectedInvestor(investor);
    setIsModalOpen(true);
  };

  const confirmBlockUnlock = async () => {
    if (!selectedInvestor) return;
    
    try {
      const response = await toggleUserStatus(selectedInvestor.id);
      console.log(response);
      
      setInvestorsInfo(prevInvestors => 
        prevInvestors.map(investor => 
          investor.id === selectedInvestor.id 
            ? {...investor, status: !investor.status} 
            : investor
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investors Dashboard</h1>
          <p className="text-gray-600">Manage and monitor investor accounts</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search by name or email..."
              onChange={(e) => handleSearch(e.target.value)}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone Number</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {investorsInfo.map((investor, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <img
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                        src={investor.avatar_image || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                        alt={investor.full_name}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{investor.full_name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{investor.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {investor.phone_number || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleBlockUnlock(investor)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          investor.status
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {investor.status ? "Block" : "Unlock"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`${investor.id}`)}
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
          {totalCount >= 7 && (
            <div className="flex items-center justify-center px-6 py-10 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
        message={`Are you sure you want to ${selectedInvestor?.status ? "block" : "unblock"} ${selectedInvestor?.email}?`}
        confirmText="Yes, Confirm"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Investors;
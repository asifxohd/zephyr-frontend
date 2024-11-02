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

    console.log(`${selectedInvestor.status ? "Blocking" : "Unlocking"} investor ${selectedInvestor.full_name}`);
    
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
    <div className="p-6 max-w-full mx-auto space-y-6">
      {/* Header and Search */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Investors</h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="pl-10 w-full bg-white rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                placeholder="Search by name or email..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">
                Actions
              </th>
              <th className="px-10 py-3 font-semibold text-gray-700 text-right">
                More Info
              </th>
            </tr>
          </thead>
          <tbody>
            {investorsInfo.map((investor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  <img
                    className="rounded-full h-10 w-10"
                    src={
                      investor.avatar_image
                        ? investor.avatar_image
                        : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt="img-investor"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{investor.full_name}</td>
                <td className="px-6 py-4">{investor.email}</td>
                <td className="px-6 py-4">
                  {investor.phone_number ? investor.phone_number : "N/A"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleBlockUnlock(investor)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      investor.status
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    } hover:shadow-md transition-all`}
                  >
                    {investor.status ? "Block" : "Unlock"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`${investor.id}`)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:shadow-md transition-all"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalCount >= 7 && (
        <div className="flex justify-center mt-6 space-x-1">
          <button
            className="px-3 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded border border-gray-300 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      
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
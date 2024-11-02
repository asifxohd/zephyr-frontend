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

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (searchTerm
          ? searchBusiness(searchTerm, currentPage)
          : fetchBusinessUsers(currentPage));

        setBusinesses(response.results);
        setCount(response.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBlockClick = (investor) => {
    setSelectedBusiness(investor);
    setIsModalOpen(true);
  };

  const confirmBlockUnlock = async () => {
    setIsModalOpen(false);

    if (!selectedBusiness) return;

    console.log(`${selectedBusiness.status ? "Blocking" : "Unlocking"} business ${selectedBusiness.company_name}`);

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
    <div className="p-6 max-w-full mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Businesses</h1>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="pl-10 w-full bg-white rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Business Name</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Phone Number</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
              <th className="px-10 py-3 font-semibold text-gray-700 text-right">More Info</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {business.avatar_image ? (
                    <img src={business.avatar_image} alt="Avatar" className="h-10 w-10 rounded-full" />
                  ) : (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"
                      alt="Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{business.company_name || "N/A"}</td>
                <td className="px-6 py-4">{business.email}</td>
                <td className="px-6 py-4">{business.phone_number}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleBlockClick(business)}
                    className={`px-3 py-1 text-sm rounded-lg ${business.status ? "bg-red-500  px-5 text-white" : "bg-green-400 text-gray-700"
                      } hover:shadow-md transition-all`}
                  >
                    {business.status ? "Block" : "Unblock"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={()=> navigate(`${business.id}`)} className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:shadow-md transition-all">
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {count > 7 && (
        <div className="flex justify-center mt-6 space-x-1">
          <button
            className="px-3 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(Math.ceil(count / 7)).keys()].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded border ${currentPage === page + 1
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(count / 7)}
          >
            Next
          </button>
        </div>
      )}
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

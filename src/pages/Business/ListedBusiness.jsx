// src/components/ListedBusiness/ListedBusiness.jsx
import React, { useEffect, useState } from 'react';
import Pagination from '@/src/components/business/Pagination';
import BusinessList from '@/src/components/business/BusinessList';
import { fetchBuseinessUserInfomationForClient } from '@/src/services/api/business/userManagerapis';

const ListedBusiness = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [businesses, setBusinesses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBuseinessUserInfomationForClient();
        console.log(data);
        
        if (data && data.results) {
          setBusinesses(data.results);
          setTotalPages(Math.ceil(data.count / itemsPerPage)); 
        }
      } catch (err) {
        console.log(err);
      } 
    };

    fetchData();
  }, []);

  const itemsPerPage = 7;
  const indexOfLastBusiness = currentPage * itemsPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - itemsPerPage;
  const currentBusinesses = businesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="">
      {businesses.length > 0 ? (
        <>
          <BusinessList businesses={currentBusinesses} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : (
        <div className="text-center text-gray-600 mt-4">No data is given</div>
      )}
    </div>
  );
};

export default ListedBusiness;

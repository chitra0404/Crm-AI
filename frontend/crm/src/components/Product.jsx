import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [business, setBusiness] = useState({
    name: '',
    sectortype: '',
    targetcustomer: '',
    location: '',
    contactInfo: '',
    businessemail: ''
  });

  const [prospects, setProspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/business`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProspects(response.data.prospects);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error('Error fetching prospects:', error);
      }
    };

    fetchProspects();
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleAddBusiness = async () => {
    try {
      const response = await axios.post(`${Base_Url}/api/business`, business, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBusiness({
        name: '',
        sectortype: '',
        targetcustomer: '',
        location: '',
        contactInfo: '',
        businessemail: ''
      });
      // Optionally, you can refetch or update the list of prospects here
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProspects = pr
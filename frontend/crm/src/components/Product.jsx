import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../config/api';

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
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [message, setMessage] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/prospects`, {
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
      setProspects(response.data.prospects);
      setTotalPages(Math.ceil(response.data.prospects.length / itemsPerPage));
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (prospect) => {
    setSelectedProspect(prospect);
  };

  const handleStatusChange = async (status) => {
    try {
      const response = await axios.put(
        `${Base_Url}/api/prospects/${selectedProspect._id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setProspects(prospects.map(p => p._id === response.data._id ? response.data : p));
      setSelectedProspect(response.data);
      setMessage('Prospect status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating status');
    }
  };

  const paginatedProspects = prospects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Enter the Details</h2>
      <div className="row mb-4">
        <div className="col-md-6">
        <div className="mb-3">
            <input
              name="name"
              placeholder="Name"
              className="form-control"
              value={business.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="sectortype"
              placeholder="Sector Type"
              className="form-control"
              value={business.sectortype}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="targetcustomer"
              placeholder="Target Customer"
              className="form-control"
              value={business.targetcustomer}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="location"
              placeholder="Location"
              className="form-control"
              value={business.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="contactInfo"
              placeholder="Contact Info"
              className="form-control"
              value={business.contactInfo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="businessemail"
              placeholder="Business Email"
              className="form-control"
              value={business.businessemail}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleAddBusiness} className="btn btn-primary">Add Business</button>
        </div>
      </div>

      <h3 className="mb-4">Prospects</h3>
      <div className="row">
        {paginatedProspects.length > 0 ? (
          paginatedProspects.map((prospect) => (
            <div className="col-md-4 mb-4" key={prospect._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{prospect.prospectName}</h5>
                  <p className="card-text">{prospect.contactInfo}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewDetails(prospect)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No prospects available.</p>
        )}
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <span className="page-link">{index + 1}</span>
            </li>
          ))}
        </ul>
      </nav>

      
      {selectedProspect && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Prospect Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProspect(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedProspect.prospectName}</p>
                <p><strong>Contact Info:</strong> {selectedProspect.contactInfo}</p>
                <p><strong>Sector Type:</strong> {selectedProspect.sectortype}</p>
                <p><strong>Location:</strong> {selectedProspect.location}</p>
                <p><strong>Status:</strong>
                  <select
                    className="form-select"
                    value={selectedProspect.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedProspect(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default Product;

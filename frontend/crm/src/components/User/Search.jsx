import React, { useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';

const Search = () => {
  const [search, setSearch] = useState({ sectortype: '', location: '' });
  const [prospects, setProspects] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/search`, {
         search,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
console.log(response)
      if (response.data.length === 0) {
        setMessage('No prospects found.');
      } else {
        setMessage('');
        setProspects(response.data);
      }
    } catch (error) {
      console.error('Error searching prospects:', error);
      setMessage('Error searching prospects.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Search Prospects</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="mb-3">
            <input
              name="location"
              placeholder="Search by Location"
              className="form-control"
              value={search.location}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="sectortype"
              placeholder="Search by Sector Type"
              className="form-control"
              value={search.sectortype}
              onChange={handleSearchChange}
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>

      <h3 className="mb-4">Prospects</h3>
      <div className="row">
        {prospects.length > 0 ? (
          prospects.map((prospect) => (
            <div className="col-md-4 mb-4" key={prospect._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{prospect.prospectName}</h5>
                  <p className="card-text">Contact Info: {prospect.contactInfo}</p>
                  <p className="card-text">Sector: {prospect.sectortype}</p>
                  <p className="card-text">Location: {prospect.location}</p>
                  <p className="card-text">Status: {prospect.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No prospects available.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

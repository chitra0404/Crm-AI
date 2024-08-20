import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../config/api';

const FetchProspects = () => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/getProspects`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProspects(response.data);
      } catch (error) {
        console.error('Error fetching prospects:', error);
      }
    };

    fetchProspects();
  }, []);

  return (
    <div>
      <h2>Your Prospects</h2>
      {prospects.length > 0 ? (
        <ul>
          {prospects.map((prospect) => (
            <li key={prospect._id}>
              <h3>{prospect.prospectName}</h3>
              <p>{prospect.contactInfo}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No prospects found.</p>
      )}
    </div>
  );
};

export default FetchProspects;

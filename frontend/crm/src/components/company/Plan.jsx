import React, { useState } from 'react';
import { Base_Url } from '../../config/api';
import axios from 'axios';

const plans = [
  {
    name: 'Basic',
    price: '$29/month',
    features: ['simplified set and onboarding', 'lead,account,contact managmenet', 'email integration'],
     },
  {
    name: 'Medium',
    price: '$59/month',
    features: ['email integration', 'contact management', 'validation rules', 'schedulemassemail'],
   

  },
  {
    name: 'Advanced',
    price: '$99/month',
    features: ['data preparation', 'advance customization', 'extended AI capabilites', 'More contacts', 'high level customersupport'],
  } 
];

function Plan() {

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [message, setMessage] = useState('');
  
    const handlePlanSelect = async (planName) => {
      try {
        const response = await axios.post(
          `${Base_Url}/api/plan`,
          { plan: planName },
          { headers: { Authorization: `Bearer ${localStorage.getItem('tokenAuth')}` } }
        );
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error updating plan:', error);
        setMessage('Error updating plan.');
      }
    }

  return (
    <div className="container mt-5">
        <h2 className='fs-3 fw-bolder text-center'>Select a plan </h2>
      <div className="row pt-3">
        {plans.map((plan, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ width: '18rem' }}>
              {/* <img src={plan.imgSrc} className="card-img-top" alt={plan.name} /> */}
              <div className="card-body">
                <h5 className="card-title fs-5 text-center">{plan.name}</h5>
                <p className="card-text fs-3 text-center">{plan.price}</p>
              </div>
              <ul className="list-group list-group-flush">
                {plan.features.map((feature, i) => (
                  <li className="list-group-item" key={i}>{feature}</li>
                ))}
              </ul>
              <div className="card-body">
                <button className="btn btn-primary text-center"  onClick={() => handlePlanSelect(plan.name)}>Choose {plan.name} Plan</button>
              </div>
            </div>
          </div>
        ))}
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Plan;

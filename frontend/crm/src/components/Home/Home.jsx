import React from 'react';
import HomeNavbar from '../Navbar/HomeNavbar';
import Type from './type';


function Home() {
    return (
        <div>
            <HomeNavbar />
            <div className="container-fluid">
                <div className="row align-items-center pt-5" >
                    <div className="col-md-6">
                        <div className="text-section ms-3"> 
                          <Type/>
                            <p className="fs-2 ">
                                AI-crm helps businesses better organize customer information and access that information more easily.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                       
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLpgDUCo5XrTZ2IOTYWJH_d-Bth0HjbwzFsFNLsqM652ekJPj7pYvxpgrDLEiWGv8Ix4&usqp=CAU"  
                            alt="Description" 
                            className="img-fluid rounded" 
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

import React, { useEffect , useState , useRef } from 'react';
import './Home.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link , useLocation} from 'react-router-dom';
import axios from 'axios';


function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('userEmail');
  const navi = () => {
    navigate('/group' , { state: { email : email } });
  }
  const [data, setData] = useState({}); // Initialize state to hold an object

  useEffect(() => {
    console.log('Email:', email); // Log the email to check if it's being retrieved correctly
  
    const fetchData = async () => {
      try {
        const lik = `http://localhost:8000/storepayment?email=${email}`;
        console.log(lik);
        const response = await axios.get(lik);
        console.log('API response:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set data to an empty object or a message indicating no data
        setData({}); // or setData({ message: 'No payments found' });
      }
    };
  
    if (email) {
      fetchData(); // Fetch data only if the email exists
    } else {
      console.error('No email found in state or localStorage');
    }
  }, [email]); // Fetch data when the email changes
  // console.log(data[0].members);

  return (
    <div style={{ width:'100%' } }>
    <div className='nav'>
      <div className="logo">
        <div className="logo_img">
          <img src="https://i.imghippo.com/files/oY3oR1720359657.png" alt="error"></img>
        </div>
        <div className="logo_nam">
          FairShare
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',paddingRight:'50px'}}>
        {email}
      </div>
      
    </div>
    <div className='main'>
      <div className='text1'>
        <span class="line">Effortless Expense</span>
        <span class="line">Splitting for Every</span>
        <div style={{paddingBottom:'20px'}}className='tupe' aria-label="Hi! I'm a developer">
        &nbsp;<span class="typewriter thick"></span>
       </div>
  <button style={{width:'150px'}} className="create-group" onClick={navi}>
    Get Started
  </button>
      </div>
      
      <div className='grp'>
        <img src="https://i.imghippo.com/files/bFl341720360262.png"></img>
      </div>
    </div>
    <div className='prevbills'>
     {data.length > 0 ? (
    <h2>Payment Data</h2>
    ) : <p>No Previous payment data available</p> }
    </div>
    <div className="data-section">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="payment-item">
              <h3>Trip Name: {item.tripName}</h3>
              <br></br>
              <h4>Members:</h4>
              <ul>
                {item.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
              <button className='edit' >Edit</button>
            </div>
          ))
        ) : (
          <p>No Previous payment data available</p>
        )}
      </div>
    
      </div>
  )
}
export default Home;

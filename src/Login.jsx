import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';

// function Login() {
//     const history = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     async function submit(e) {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:8000/", {
//                 email,
//                 password
//             });

//             if (response.data.status === "success") {
//                 localStorage.setItem('userEmail', email); // Store email for future use
//                 history("/home", { state: { id: email } });
//             } else if (response.data.status === "invalid_password") {
//                 alert("Invalid password");
//             } else if (response.data.status === "not_found") {
//                 alert("User not found. Please sign up.");
//             }
//         } catch (error) {
//             alert("An error occurred. Please try again.");
//             console.log(error);
//         }
//     }

//     return (
//         <div className="login">
//             <h1>Login</h1>
//             <form onSubmit={submit}>
//                 <input 
//                     type="email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} 
//                     placeholder="Email"
//                     required
//                 />
//                 <input 
//                     type="password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} 
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <br />
//             <p>OR</p>
//             <br />
//             <Link to="/signup">Signup Page</Link>
//         </div>
//     );
// }



// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css';

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (response.data.status === "success") {
                localStorage.setItem('userEmail', email); // Store email for future use
                history("/home", { state: { id: email } });
            } else if (response.data.status === "invalid_password") {
                alert("Invalid password");
            } else if (response.data.status === "not_found") {
                alert("User not found. Please sign up.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.log(error);
        }
    }
    return (
        <>


            <div className="wrapper">

                <div style={{ display: 'flex', flexDirection: 'column' , alignitems: 'center'}} className="form" >
                    <div style={{ display: 'flex', justifyContent: 'center'}} className="logo_img">
                        <img src="https://i.imghippo.com/files/oY3oR1720359657.png" alt="error"></img>
                    </div>
                    <div className="heading">LOGIN</div>
                    <form onSubmit={submit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        grid: '10px',
                    }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account ? <Link to="/signup"> Sign In </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
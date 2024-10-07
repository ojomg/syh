import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault(); // Prevent form from submitting traditionally

        try {
            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password
            });

            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                history("/home", { state: { id: email } });
            }
        } catch (error) {
            alert("An error occurred during signup");
            console.log(error);
        }
    }

    return (
        <>
        <div className="wrapper">
            <div style={{ display: 'flex', flexDirection: 'column', aligncontent: 'center' , alignitems: 'center'}} className="form">
            <div style={{ display: 'flex', justifyContent : 'center'}} className="logo_img">
            <img src="https://i.imghippo.com/files/oY3oR1720359657.png" alt="error"></img>
            </div>
            <div className="heading">SIGN UP</div>
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
                <button type="submit">Sign Up</button>
            </form>
            <p>
            Do you have an account ? <Link to="/"> Login </Link>
            </p>
            </div>
        </div>
        </>
    );
}

export default Signup;
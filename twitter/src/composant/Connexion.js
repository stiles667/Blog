import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        };

        axios.post('http://localhost:3002/api/login', user)
            .then(res => {
                // Handle successful login
                console.log(res.data);
            })
            .catch(error => {
                // Handle login error
                console.error(error.response.data);
            });
    };

    return (
        <div>
            <h2>Connexion</h2>

            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Mot de passe:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;

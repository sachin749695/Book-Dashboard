// App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import EmailSignUp from './Component/EmailSignUp';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="App">
            {!user ? (
                <div>
                    <h1>Email Sign Up</h1>
                    <EmailSignUp />
                </div>
            ) : (
                user ? <Dashboard setUser={setUser} /> : <Login setUser={setUser} />
            )}
        </div>
    );
}

export default App;

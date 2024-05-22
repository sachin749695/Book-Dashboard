// src/components/Dashboard.js

import React from 'react';
import BooksTable from './BooksTable';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Dashboard = ({ setUser }) => {
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <BooksTable />
        </div>
    );
};

export default Dashboard;

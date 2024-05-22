// EmailSignUp.js
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Import db along with auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const EmailSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save additional user information to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: email
      });

      // Clear form fields
      setEmail('');
      setPassword('');
      
      // User is signed up
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2></h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmailSignUp;

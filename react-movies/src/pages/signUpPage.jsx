import React, { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    if (password.length > 0 && password === passwordAgain) {
      const success = await context.register(userName, password);
      if (success) {
        setRegistered(true);
      }
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register a username and password to log in.</p>
      <input value={userName} placeholder="user name" onChange={e => setUserName(e.target.value)} />
      <br />
      <input value={password} type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={e => setPasswordAgain(e.target.value)} />
      <br />
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encode JWT Id token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "356500518638-89ai5pftcfsrekm1gopo15l52pvcftfi.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();

  }, []);

  // If we have no user: sign-in button
  // If we have a user: show the logout button

  return (
    <div className="App">
      <div className="center-content">
        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <div>
            <img src={user.picture} alt="Profile" />
            <h3>{user.name}</h3>
            <button className="sign-out-button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

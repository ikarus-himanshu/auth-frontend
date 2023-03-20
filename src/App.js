import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Slicer from './Home/Slicer'
import { SuperTokensConfig } from "./config";
import {useState} from 'react'
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { redirectToAuth } from "supertokens-auth-react";
import { useSessionContext } from 'supertokens-auth-react/recipe/session'; 
import axios from "axios";


SuperTokens.init(SuperTokensConfig);


function NavBar() {
    async function onLogout() {
    //   await signOut();
      axios.post("http://localhost:8000/signout",{}, {withCredentials: true}).then((res) => {window.location.href = "/";console.log(res)}).catch((err) => {console.log(err)})
      
    }
    return (
      <ul>
        <li>Home</li>
        <li onClick={onLogout}>Logout</li>
  
      </ul>
    )
  }

  function Dashboard(props) {
    let session = useSessionContext();

    if (session.loading) {
        return null;
    }

    let {doesSessionExist, userId, accessTokenPayload} = session;

    // doesSessionExist will always be true if this is wrapped in `<SessionAuth>`
    if (!doesSessionExist) {
        // TODO
    }

    let name = accessTokenPayload.userName;
}

function App() {
    const [port, setPort] = useState(null);
    console.log("port", port);
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                    <SessionAuth>
                                        <Home port={port} setPort={setPort}/>
                                    </SessionAuth>
                                }
                            />
                            <Route
                                path="/slicer"
                                element={
                                    /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                    <SessionAuth>
                                        <Slicer />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LogIn from './LogIn.js';
import EventsList from './EventsList.js';
import EventsDetail from './EventsDetail.js';
import CreateEvent from './CreateEvent.js';

import logo from './logo.svg';
import './App.css';

const App = props => {
	const [token, setToken] = useState(null);
	const backURL = "http://172.24.98.163:5000";
	useEffect(() => {
	}, [token]);

	const renderPage = (properties, component, name) => (
	    <div className="container-fluid">
	      	<div className={name === "LogIn"? "row justify-content-center align-items-center": "row"}>
	          	<main>{component}</main>
	      	</div>
	    </div>
	);

	return (
	    <div className="App">
	    	<HashRouter>
	    		{token !== null ? <Redirect push to="/eventslist" /> : <Redirect push to="/" />}
		        <Switch>
		          <Route
		            path="/"
		            render={properties =>
		              renderPage(properties, <LogIn {...properties} backURL={backURL} setToken={setToken} />, "LogIn")
		            }
		            exact
		          />
		          <Route
		            path="/eventslist"
		            render={properties =>
		              renderPage(properties, <EventsList {...properties} backURL={backURL} token={token} />, "EventsList")
		            }
		            exact
		          />
		          <Route
		            path="/eventdetail/:eventId"
		            render={properties =>
		              renderPage(properties, <EventsDetail {...properties} backURL={backURL} token={token} />, "EventDetail")
		            }
		            exact
		          />
		          <Route
		            path="/createevent/"
		            render={properties =>
		              renderPage(properties, <CreateEvent {...properties} backURL={backURL} token={token} />, "CreateEvent")
		            }
		            exact
		          />
		        </Switch>
		      </HashRouter>
	    </div>
	);
}

export default App;

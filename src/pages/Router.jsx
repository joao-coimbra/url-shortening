import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";

import Redirect from "../components/Redirect";

import Landing from "./Landing";

function PageRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/:shortId' element={<Redirect />} />
			</Routes>
		</Router>
	);
}

export default PageRouter;

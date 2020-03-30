import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Nav } from "../common/components";
import Routes from "./Routes";

const App = () => {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container mx-auto">
				<Routes />
			</div>
		</BrowserRouter>
	);
}

export default App;

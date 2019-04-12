import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Inventory from "./components/Inventory";

const App: React.FunctionComponent = () => {
	const title = "Serverless Web App Demo";
	const subtitle = "Bleeding Edge Cloud Stack";
	const text = "Todo";

	return (
		<>
			<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
				<h5 className="my-0 mr-md-auto font-weight-normal">{title}</h5>
			</div>
			<div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
				<h1 className="display-4">{subtitle}</h1>
				<p className="lead">{text}</p>
			</div>
			<div className="container">
				<div className="card-deck mb-3 text-center">
					<Inventory id="demo" />
				</div>
			</div>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("react-app"));

import * as React from "react";
import IOrder from "../../common/contracts/IOrder";
import { guid } from "../../common/utilities";

interface IProps {
	onOrderAdded: (order: IOrder) => void;
}

interface IState {
	item?: string;
	quantity?: number;
	cost?: number;
}

const AddOrderForm: React.FunctionComponent<IProps> = ({ onOrderAdded }) => {
	const [state, setState] = React.useState<IState>({});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setState({
			...state,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (state.item && state.quantity && state.cost) {
			const id = guid();
			const item = state.item;
			const quantity = state.quantity;
			const cost = state.cost;
			onOrderAdded({ id, item, quantity, cost });

			setState({});
		}
	};
	console.log(state);
	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col">
					<input name="item" type="text" className="form-control" placeholder="Name" value={state.item || ""} onChange={handleChange} />
				</div>
				<div className="col">
					<input name="quantity" type="number" className="form-control" placeholder="Quantity" value={state.quantity || ""} onChange={handleChange} />
				</div>
				<div className="col">
					<input name="cost" type="number" className="form-control" placeholder="Cost" value={state.cost || ""} onChange={handleChange} />
				</div>
				<div className="col">
					<button type="submit" className="btn btn-primary form-control">
						Add
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddOrderForm;

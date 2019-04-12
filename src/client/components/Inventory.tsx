import * as React from "react";
import AddOrderForm from "./AddOrderForm";
import OrderList from "./OrderList";
import IInventory from "../../common/contracts/IInventory";
import IOrder from "../../common/contracts/IOrder";

interface IProps {
	id: string;
}

interface IState extends IInventory {}

const Inventory: React.FunctionComponent<IProps> = ({ id }) => {
	const [state, setState] = React.useState<IState>({ id, name: "Demo", orders: [] });
	const handleOrderAdded = (order: IOrder) =>
		setState({
			...state,
			orders: [...state.orders, order],
		});

	return (
		<div className="card mb-4 shadow-sm">
			<div className="card-header">
				<h4 className="my-0 font-weight-normal">{state.name}</h4>
			</div>
			<OrderList orders={state.orders} />
			<div className="card-body">
				<AddOrderForm onOrderAdded={handleOrderAdded} />
			</div>
		</div>
	);
};

export default Inventory;

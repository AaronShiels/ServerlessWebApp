import * as React from "react";
import IOrder from "../../common/contracts/IOrder";

interface IProps {
	orders: IOrder[];
}

const OrderList: React.FunctionComponent<IProps> = ({ orders }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Item</th>
					<th scope="col">Quantity</th>
					<th scope="col">Cost</th>
					<th scope="col">Subtotal</th>
				</tr>
			</thead>
			<tbody>
				{orders.map(o => (
					<tr key={o.id}>
						<th scope="row">{o.item}</th>
						<td>{o.quantity}</td>
						<td>${o.cost}</td>
						<td>${o.quantity * o.cost}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default OrderList;

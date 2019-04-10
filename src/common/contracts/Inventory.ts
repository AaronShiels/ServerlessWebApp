import Order from "./Order";

export default interface Inventory {
	id: string;
	name: string;
	orders: Order[];
}

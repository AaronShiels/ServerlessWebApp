import IOrder from "./IOrder";

export default interface IInventory {
	id: string;
	name: string;
	orders: IOrder[];
}

import { Action } from 'redux';

interface IGameAction extends Action {
	type: string;
	payload: {};
	initiator: string;
	timestamp: Date;
}

type GameAction = ICreateGame | IJoinGame;
export default GameAction;

export interface ICreateGame extends IGameAction {
	type: "CREATE";
	payload: {
		name: string;
	};
}

export interface IJoinGame extends IGameAction {
	type: "JOIN";
	payload: {
		name: string;
	};
}

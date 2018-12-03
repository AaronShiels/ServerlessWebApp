import GameAction from './actions';
import { IGameState } from '.';

export const initialState: IGameState = {
	players: {},
};

export default function(state: IGameState, action: GameAction): IGameState {
	switch (action.type) {
		case "CREATE": {
			return {
				...state,
				players: {
					...state.players,
					[action.initiator]: { name: action.payload.name },
				},
			};
		}
		case "JOIN": {
			return {
				...state,
				players: {
					...state.players,
					[action.initiator]: { name: action.payload.name },
				},
			};
		}
		default: {
			const exhaustiveCheck: never = action;
			throw new Error("Invalid action");
		}
	}
}

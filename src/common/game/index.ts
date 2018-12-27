export interface IGameState {
	players: { [key: string]: IPlayer };
}

export interface IPlayer {
	name: string;
}

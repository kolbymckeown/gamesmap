const initialState = {}

export default function gamesReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_GAMES': {
            return {
                ...state,
                [action.games.userGames]: {
                    ...action.games,
                }
            }
        }

        default:
            return state;
    }
}
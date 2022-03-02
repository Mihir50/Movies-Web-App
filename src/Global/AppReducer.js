const reducer = (state,action) => {
    switch (action.type) {
      case "ADD_TO_WATCHLIST":
        return {
          ...state,
          watchList: [action.payload, ...state.watchList],
        };
      case "ADD_TO_WATCHED":
        return {
          ...state,
          watched: [
            action.payload,
            ...state.watched,
          ],
        };

      case 'MOVE_TO_WATCHED':
        return {
          watchList: state.watchList.filter(
            (movie) => movie.id !== action.payload.id
          ),
          watched:[action.payload,...state.watched]
        };

      case "REMOVE_FROM_WATCHLIST":
        return {
          ...state,
          watchList: state.watchList.filter(movie => movie.id !== action.payload.id)
        }

      case "REMOVE_FROM_WATCHED":
        return {
          ...state,
          watched: state.watched.filter(
            (movie) => movie.id !== action.payload.id
          ),
        };


      default:
        return state;
    }
};


export default reducer;
export default (state = {}, action) => {
 switch (action.type) {
  case 'API_FETCHING_TICKER':
   return {
     ...state,
    tickerData: action.data
   }
   case 'API_FETCHING_TRADES':
     let data = action.data
     let newData = {
       data,
       ...state.tradesData,
     }
     return {
        ...state,
       tradesData: newData,
     }
   case 'API_FETCHING_BOOK':
     data = action.data
     newData = {
       data,
       ...state.bookData,
     }
    return {
      ...state,
     bookData: newData
   }
  default:
   return state
 }
}

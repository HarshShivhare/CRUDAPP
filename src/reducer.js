export default function reducer(state = {}, action) {
  switch (action.type) {
    case "FETCHDATA":
      return {
        data: action.data
      };
    case "ADD":
      state.data.push(action.data);
      return {
        data: [...state.data]
      };
    case "EDIT":
      state.data.splice(action.index, 1, action.data);
      return {
        data: [...state.data]
      };
    case "DELETEPRODUCT":
      state.data.splice(action.index, 1);
      return {
        data: [...state.data]
      };
    default:
      return state;
  }
}

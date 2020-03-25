export const fetchData = data => ({ type: "FETCHDATA", data });

export const add = data => ({ type: "ADD", data });

export const edit = (data, index) => ({ type: "EDIT", data, index });

export const deleteproduct = index => ({ type: "DELETEPRODUCT", index }); 

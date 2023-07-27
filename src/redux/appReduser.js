const boshlangich = {
  todo: [],
};

export default (state = boshlangich, action) => {
  switch (action.type) {
    case "post":
      return {
        todo: [...state.todo, action.payload],
      };
    case "edit":
      return {
        todo: state.todo.map(p => {
          if (p.id == action.payload.id) {
            console.log("salom");
            return action.payload;
          } else {
            return p;
          }
        }),
      };
    case "delete":
      return {
        todo: state.todo.filter(a => a.id != action.payload.id),
      };
    default:
      return state;
  }
};

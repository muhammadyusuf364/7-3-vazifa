import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editingID, setEditingId] = useState(0);

  function submit(e) {
    e.preventDefault();
    if (title) {
      if (isEditing) {
        dispatch({ type: "edit", payload: { id: editingID, title: title } });
        setIsEditing(false);
        setEditingId(0);
      } else {
        dispatch({ type: "post", payload: { id: Date.now(), title: title } });
      }
      setTitle("");
    }
  }
  function edit(title, id) {
    setIsEditing(true);
    setTitle(title);
    setEditingId(id);
  }

  function deleteF(id) {
    dispatch({ type: "delete", payload:{ id: id }});
  }

  return (
    <div>
      <form className="form" onSubmit={submit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          autoFocus
        />
        <button className="submit">{isEditing ? "Add" : "Submit"}</button>
      </form>
      <div className="box">
        {state.todo?.map((todo) => (
          <p key={todo.id} className="todos">
            <span>{todo.title}</span>
            <span className="icons">
              <RiEdit2Fill
                className="edit"
                onClick={() => edit(todo.title, todo.id)}
              />
              <AiTwotoneDelete
                className="delet"
                onClick={() => deleteF(todo.id)}
              />
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Form;

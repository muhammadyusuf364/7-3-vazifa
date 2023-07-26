import { useState } from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'


function Form() {

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))
    const [title, setTitle] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    const [editingID, setEditingId] = useState(0);

    function submit(e) {
        e.preventDefault();
        if (title) {
            if (isEditing) {
                setTodos(todos.map(p => {
                    if (p.id == editingID) {
                        return p.title = title, p.id
                    } else {
                        return p
                    }
                }))
                setTodos(todos)
                setIsEditing(false)
                setEditingId(0)
            } else {
                if (!todos) {
                    setTodos([]);
                    let arr = [];
                    arr.push({
                        id: Date.now(),
                        title: title
                    })
                    setTodos(arr)
                } else {
                    let arr = todos;
                    arr.push({
                        id: Date.now(),
                        title: title
                    })
                    setTodos(arr)
                }
            }
            localStorage.setItem('todos', JSON.stringify(todos))
            setTitle('')
        }
    }

    function edit(title, id) {
        setIsEditing(true)
        setTitle(title)
        setEditingId(id)
    }

    function deleteF(id) {
        let filter = [];
        todos.map(p => {
            if (p.id !== id) {
                filter.push(p)
            }
        })
        setTodos(filter)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    return (
        <div>
            <form className='form' onSubmit={submit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='input' autoFocus />
                <button className='submit'>{isEditing ? "Add" : "Submit"}</button>
            </form>
            <div className="box">
                {todos?.map(todo => <p key={todo.id} className='todos'><span>{todo.title}</span>  <span className='icons'><RiEdit2Fill className='edit' onClick={() => edit(todo.title, todo.id)}/><AiTwotoneDelete className='delet' onClick={() => deleteF(todo.id)}/> </span></p>)}
            </div>
        </div>
    )
}

export default Form
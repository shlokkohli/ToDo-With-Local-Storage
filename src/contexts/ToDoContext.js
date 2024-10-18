import {createContext, useContext} from "react"

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],
    // functionalities
    addToDo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const ToDoProvider = ToDoContext.Provider

export const useToDo = () => {
    return useContext(ToDoContext)
}
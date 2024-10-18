import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/ToDoForm";
import TodoItem from "./components/ToDoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachVal) => {
        if(eachVal.id === id) {
          return {...eachVal, ...todo}
        }
        else {
          return eachVal;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((eachVal) => eachVal.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachVal) => {
      if(eachVal.id === id){
        return {...eachVal, completed: !eachVal.completed };
      }
      return eachVal;
    })
  );
  };

  // show todos on screen from local storage
  useEffect(() => {
    const data = localStorage.getItem("mykey")
    if(data){
      const parsedData = JSON.parse(data)
      if(parsedData.length > 0){
        setTodos(parsedData);
      }
    }
  }, []);

  // add items in the todos, store it in the local storage
  useEffect(() => {
    localStorage.setItem("mykey", JSON.stringify(todos))
  }, [todos])

  return (
    <ToDoProvider
      value={{ todos, addToDo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">

            {todos.map((eachVal) => (
              <div key={eachVal.id}
              className="w-full">
                <TodoItem todo={eachVal} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;

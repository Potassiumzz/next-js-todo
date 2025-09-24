"use client"

import React from "react"

interface TodoInputProps {
  addTodoList: (todo: string) => void;
}

export default function TodoInput({ addTodoList }: TodoInputProps) {
  const [todoInput, setTodoInput] = React.useState<string | null>("");
  const [error, setError] = React.useState("");

  function handleAddTodo() {
    if (todoInput) addTodoList(todoInput);
    else setError("Empty todo cannot be added");
  }

  return (
    <div className="flex gap-2 mb-4 mt-20">
      <input
        className="border px-2 py-1 text-white flex-1"
        placeholder="Add a todo"
        onChange={(e) => {
          setTodoInput(e.target.value);
          setError("");
        }
        }
      />
      {error && <div>{error}</div>}
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded-sm w-[200px] hover:cursor-pointer hover:bg-blue-800 duration-200"
        onClick={handleAddTodo}
      >
        Add new todo
      </button>
    </div>
  )
}

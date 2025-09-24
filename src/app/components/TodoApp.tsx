"use client"

import React from "react";
import TodoInput from "./TodoInput";
import Link from "next/link";

export default function TodoApp() {
  const [todoList, setTodoList] = React.useState<string[]>([]);
  const [completeTodoList, setCompleteTodoList] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("todos"));
      if (list) setTodoList(list);
    } catch (err) {
      console.error("Error parsing todos from localStorage", err);
    }
  }, []);

  React.useEffect(() => {
    if (todoList.length > 0) localStorage.setItem("todos", JSON.stringify(todoList));
    if (completeTodoList.length > 0) localStorage.setItem("completed-todos", JSON.stringify(completeTodoList));
  }, [todoList, completeTodoList]);

  function addTodoList(todo: string) {
    setTodoList([...todoList, todo]);
  }

  function handleComplete(todo: string, index: number) {
    console.log(todo);
    setCompleteTodoList([...completeTodoList, todo]);
    handleDelete(index);
  }

  function handleDelete(index: number) {
    setTodoList(todoList.filter((_, i) => i !== index));
    localStorage.setItem("todos", JSON.stringify(todoList));
  }

  return (
    <>
      <h1 className="text-4xl text-center pt-4 pb-2 border-b-2"> Todo List </h1>
      <div className="px-8">
        <div className="text-center pt-5">
          <Link href={"/completed-todo"} className="text-2xl underline hover:underline-offset-8">Completed todos</Link>
        </div>
        <TodoInput addTodoList={addTodoList} />
        <div className="h-[50px] flex flex-col gap-4">
          {
            todoList.length > 0 ?
              todoList.map((todo, index) => {
                return (
                  <div className="bg-gray-500/[.5] p-2 rounded-sm" key={index}>
                    <div className="flex justify-between">
                      {todo}
                      <div className="flex gap-5">
                        <button
                          onClick={() => handleComplete(todo, index)}
                          className="border px-2 hover:bg-white hover:text-black duration-200 cursor-pointer">
                          Complete
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="border px-2 hover:bg-red-600 duration-200 cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }) :
              <div className="text-center text-4xl">No todo items</div>
          }
        </div>
      </div>
    </>
  )
}

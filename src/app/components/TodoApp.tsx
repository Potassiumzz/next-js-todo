"use client"

import React from "react";
import TodoInput from "./TodoInput";
import { todo } from "node:test";

export default function TodoApp() {
  const [todoList, setTodoList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const list: string | null = localStorage.getItem("todos");
    if (list) setTodoList(JSON.parse(list));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function addTodoList(todo: string) {
    setTodoList([...todoList, todo]);
  }

  function handleComplete(todo: string) {
    console.log(todo);
  }

  function handleDelete(index: number) {
    setTodoList(todoList.filter((todo, i) => i != index));
    localStorage.setItem("todos", JSON.stringify(todoList));
  }

  return (
    <div className="px-8">
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
                        onClick={() => handleComplete(todo)}
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
  )
}

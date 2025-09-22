"use client"

import React from "react";
import TodoInput from "./TodoInput";

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

  return (
    <div className="px-8">
      <TodoInput addTodoList={addTodoList} />
      <div className="h-[50px] flex flex-col gap-4">
        {
          todoList.length > 0 ?
            todoList.map((todo, index) => {
              return (
                <div className="bg-gray-500/[.5] p-2 rounded-sm">
                  {todo}
                </div>
              )
            }) :
            <div className="text-center text-4xl">No todo items</div>
        }
      </div>
    </div>
  )
}

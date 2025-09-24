"use client"

import Link from "next/link";
import React from "react"

export default function CompletedTodo() {
  const [todo, setTodo] = React.useState<string[]>([]);

  React.useEffect(() => {
    const list = JSON.parse(localStorage.getItem("completed-todos"));
    if (list) setTodo(list);
  }, [])

  return (
    <>
      <h1 className="text-4xl text-center pt-4 pb-2 border-b-2">Completed Todo list</h1>
      <div className="flex flex-col px-8">
        {
          todo.length > 0 ?
            <>
              <div className="text-center pt-5 mb-8">
                <Link href={"/"} className="text-2xl underline hover:underline-offset-8">Go to home</Link>
              </div>
              {
                todo.map((to, index) => {
                  return (
                    <div className="bg-gray-500/[.5] p-2 rounded-sm" key={index}>
                      <div className="flex justify-between">
                        {to}
                      </div>
                    </div>
                  )
                })
              }
            </>
            : <EmptyList />
        }
      </div>
    </>
  )
}

function EmptyList() {
  return (
    <div className="flex flex-col h-dvh justify-center gap-20">
      <div className="text-center text-4xl">No completed todo items</div>
      <div className="text-center pt-5">
        <Link href={"/"} className="text-2xl underline hover:underline-offset-8">Go to home</Link>
      </div>
    </div>
  )
}

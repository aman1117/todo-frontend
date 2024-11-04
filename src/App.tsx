'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Circle, Trash2, Plus } from 'lucide-react'

function Square({ value }: { value: boolean }) {
  return (
    <div
      className={`w-4 h-4 m-1 rounded-sm ${value ? 'bg-green-500' : 'bg-gray-300'}`}
    />
  )
}

export default function Component() {
  const [todo, setTodo] = useState<string>("")
  const [todoList, setTodoList] = useState<string[]>([])
  const [doneCount, setDoneCount] = useState<number>(0)
  const [doneList, setDoneList] = useState<string[]>([])

  useEffect(() => {
    const storedTodoList = Cookies.get('todoList')
    const storedDoneList = Cookies.get('doneList')
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList))
    }
    if (storedDoneList) {
      setDoneList(JSON.parse(storedDoneList))
      setDoneCount(JSON.parse(storedDoneList).length)
    }
  }, [])

  const handleSubmit = () => {
    if (todo.trim() !== "") {
      const updatedTodoList = [...todoList, todo]
      setTodoList(updatedTodoList)
      setTodo("")
      Cookies.set('todoList', JSON.stringify(updatedTodoList))
    }
  }

  const handleDelete = (idx: number) => {
    const updatedTodoList = todoList.filter((_, index) => index !== idx)
    setTodoList(updatedTodoList)
    Cookies.set('todoList', JSON.stringify(updatedTodoList))
  }

  const handleDone = (idx: number) => {
    const updatedDoneList = [...doneList, todoList[idx]]
    setDoneList(updatedDoneList)
    const updatedTodoList = todoList.filter((_, index) => index !== idx)
    setTodoList(updatedTodoList)

    Cookies.set('todoList', JSON.stringify(updatedTodoList))
    Cookies.set('doneList', JSON.stringify(updatedDoneList))
    setDoneCount(doneCount + 1)
  }

  const handleDoneDelete = (idx: number) => {
    const updatedDoneList = doneList.filter((_, index) => index !== idx)
    setDoneList(updatedDoneList)
    setDoneCount(doneCount - 1)
    Cookies.set('doneList', JSON.stringify(updatedDoneList))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add a new task"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit()
                }
              }}
              className="flex-1 p-2 border rounded"
            />
            <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>

          <div className="flex flex-wrap">
            {[...Array(doneCount)].map((_, idx) => (
              <Square key={`done-${idx}`} value={true} />
            ))}
            {todoList.map((_, idx) => (
              <Square key={`todo-${idx}`} value={false} />
            ))}
          </div>

          <div>
            {todoList.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow mb-2"
              >
                <span>{todo}</span>
                <div className="space-x-2">
                  <button onClick={() => handleDone(index)} className="p-1">
                    <Circle className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(index)} className="p-1">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {doneList.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
              <div>
                {doneList.map((todo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-200 p-3 rounded-md shadow mb-2"
                  >
                    <span className="line-through text-gray-500">{todo}</span>
                    <button onClick={() => handleDoneDelete(index)} className="p-1">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
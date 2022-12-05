import { useEffect, useState } from 'react'
import './assets/css/tailwind.css'
import { ToDoList } from './component/ToDoList'

const STORE_KEY = 'TO_DO_APP'

function App() {

  const [toDoList, setToDoList] = useState(() => {
    let list = localStorage.getItem(STORE_KEY)
    if (list) {
      return JSON.parse(list)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('TO_DO_APP', JSON.stringify(toDoList))
  }, [toDoList])

  const onAdd = (name) => {
    const task = {
      id: Date.now(),
      name,
      isCompleted: false
    }

    setToDoList([...toDoList, task])
  }

  const onCompleted = (id) => {
    let task = toDoList.find(e => e.id === id)
    if (task) {
      task.isCompleted = true
      setToDoList([...toDoList])
    }
  }

  return (
    <>
      <ToDoList toDoList={toDoList} onAdd={onAdd} onCompleted={onCompleted} />
    </>

  )
}

export default App

import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../store/store'

const TaskCard = ({ task }) => {
  const dispatch = useDispatch()
  return (
    <div className="bg-white p-3 rounded shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
          <p className="text-xs text-gray-500">{task.description}</p>
        </div>
        <div className="text-xs text-gray-400">{task.priority}</div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs px-2 py-1 rounded bg-gray-100">{task.category}</div>
        <button onClick={() => dispatch(deleteTask({ taskId: task.id }))} className="text-xs text-red-500">Delete</button>
      </div>
    </div>
  )
}

export default TaskCard

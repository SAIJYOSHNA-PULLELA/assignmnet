import React from 'react'
import TaskCard from './TaskCard'

const Column = ({ column, tasks, onAdd }) => {
  return (
    <div className="bg-gray-100 p-3 rounded w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">{column.title}</h2>
        <button onClick={()=>onAdd(column.id)} className="text-sm bg-white px-2 py-1 rounded border">+ Add</button>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 && <p className="text-xs text-gray-400">No tasks</p>}
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  )
}

export default Column

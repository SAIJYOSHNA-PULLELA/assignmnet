import React, { useState } from 'react'
import Board from './components/Board'
import FilterBar from './components/FilterBar'
import AddTaskModal from './components/AddTaskModal'
import { useSelector } from 'react-redux'

function App() {
  const [showAdd, setShowAdd] = useState(false)
  const [addColumn, setAddColumn] = useState('todo')
  const board = useSelector(s => s.board)

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Creative Upaay Dashboard</h1>
            <p className="text-sm text-gray-500">Level 1 Assignment — Tasks & Filters</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setAddColumn('todo'); setShowAdd(true) }} className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Add Task</button>
          </div>
        </div>
        <div className="mt-4">
          <FilterBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <Board onAdd={(colId)=>{ setAddColumn(colId); setShowAdd(true)}}/>
      </main>

      {showAdd && <AddTaskModal columnId={addColumn} onClose={()=>setShowAdd(false)} />}
    </div>
  )
}

export default App

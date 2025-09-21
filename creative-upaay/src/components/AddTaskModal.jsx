import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/store'

const AddTaskModal = ({ columnId, onClose }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [priority, setPriority] = useState('normal')

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addTask({ columnId, title, description, category, priority }))
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded p-6 w-96 shadow">
        <h2 className="text-lg font-semibold mb-3">Add Task to {columnId}</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <div className="flex gap-2">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="border px-2 py-1 rounded">
              <option value="general">General</option>
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
            </select>
            <select value={priority} onChange={e=>setPriority(e.target.value)} className="border px-2 py-1 rounded">
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal

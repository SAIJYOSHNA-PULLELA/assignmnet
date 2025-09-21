import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/store'

const FilterBar = () => {
  const dispatch = useDispatch()
  const filter = useSelector(s => s.board.filter)

  return (
    <div className="flex gap-3 items-center">
      <input
        value={filter.query}
        onChange={(e)=>dispatch(setFilter({query: e.target.value}))}
        placeholder="Search tasks..."
        className="px-3 py-2 border rounded w-64"
      />
      <select className="px-3 py-2 border rounded" value={filter.category} onChange={(e)=>dispatch(setFilter({category: e.target.value}))}>
        <option value="all">All categories</option>
        <option value="general">General</option>
        <option value="feature">Feature</option>
        <option value="bug">Bug</option>
      </select>
      <select className="px-3 py-2 border rounded" value={filter.priority} onChange={(e)=>dispatch(setFilter({priority: e.target.value}))}>
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}

export default FilterBar

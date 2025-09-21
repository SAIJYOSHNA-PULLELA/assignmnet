import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import Column from './Column'
import { reorderWithinColumn, moveTask } from '../store/store'

const Board = ({ onAdd }) => {
  const dispatch = useDispatch()
  const board = useSelector(s => s.board)
  const { columns, columnOrder, tasks, filter } = board

  // filter tasks in a column
  const filterTasks = (taskIds) => {
    return taskIds
      .map(id => tasks[id])
      .filter(Boolean)
      .filter(task => {
        if (filter.query && !(
          task.title.toLowerCase().includes(filter.query.toLowerCase()) ||
          task.description.toLowerCase().includes(filter.query.toLowerCase())
        )) return false
        if (filter.category !== 'all' && task.category !== filter.category) return false
        if (filter.priority !== 'all' && task.priority !== filter.priority) return false
        return true
      })
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return

    // same column reorder
    if (source.droppableId === destination.droppableId) {
      const col = columns[source.droppableId]
      const newTaskIds = Array.from(col.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      dispatch(reorderWithinColumn({ columnId: col.id, newTaskIds }))
    } else {
      // move between columns
      const fromCol = columns[source.droppableId]
      const toCol = columns[destination.droppableId]
      // remove from fromCol
      const newFromTaskIds = Array.from(fromCol.taskIds).filter(id => id !== draggableId)
      const newToTaskIds = Array.from(toCol.taskIds)
      newToTaskIds.splice(destination.index, 0, draggableId)

      // set by dispatching reorder for both columns
      dispatch(reorderWithinColumn({ columnId: fromCol.id, newTaskIds: newFromTaskIds }))
      dispatch(reorderWithinColumn({ columnId: toCol.id, newTaskIds: newToTaskIds }))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6">
        {columnOrder.map(colId => {
          const col = columns[colId]
          const visibleTasks = filterTasks(col.taskIds)
          return (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="min-w-[320px]">
                    <div className="bg-gray-50 p-4 rounded shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold">{col.title}</h2>
                        <button onClick={()=>onAdd(col.id)} className="text-sm px-2 py-1 border rounded">Add</button>
                      </div>
                      <div className="space-y-3">
                        {col.taskIds.map((taskId, index) => {
                          const task = tasks[taskId]
                          // if filtered out, still render as drag placeholder? we will skip if not in visibleTasks
                          const isVisible = visibleTasks.find(t => t.id === taskId)
                          if (!task) return null
                          return (
                            <Draggable draggableId={taskId} index={index} key={taskId}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-2 ${!isVisible ? 'opacity-40' : ''}`}
                                >
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
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default Board

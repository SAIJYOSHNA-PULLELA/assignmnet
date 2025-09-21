import { configureStore, createSlice } from '@reduxjs/toolkit'

// localStorage helpers
const STORAGE_KEY = 'creative_upaay_state'
const loadState = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (!s) return undefined
    return JSON.parse(s)
  } catch (e) {
    console.error('Failed to load state', e)
    return undefined
  }
}
const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}

const initialData = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: [] }
  },
  tasks: {
    // sample: 'task-1': { id: 'task-1', title:'Sample', description:'desc', category:'general', priority:'low' }
  },
  columnOrder: ['todo', 'inprogress', 'done'],
  filter: { query: '', category: 'all', priority: 'all' }
}

const persisted = loadState() || initialData

const boardSlice = createSlice({
  name: 'board',
  initialState: persisted,
  reducers: {
    addTask: (state, action) => {
      const { columnId, title, description, category = 'general', priority = 'normal' } = action.payload
      const id = `task-${Date.now()}`
      state.tasks[id] = { id, title, description, category, priority }
      state.columns[columnId].taskIds.unshift(id)
    },
    moveTask: (state, action) => {
      // move between columns (non-dnd)
      const { fromColumnId, toColumnId, taskId, toIndex = 0 } = action.payload
      // remove from fromColumn
      const fromTasks = state.columns[fromColumnId].taskIds
      state.columns[fromColumnId].taskIds = fromTasks.filter(id => id !== taskId)
      // insert into toColumn
      state.columns[toColumnId].taskIds.splice(toIndex, 0, taskId)
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload
      delete state.tasks[taskId]
      Object.values(state.columns).forEach(col => {
        col.taskIds = col.taskIds.filter(id => id !== taskId)
      })
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload }
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload
      if (state.tasks[id]) {
        state.tasks[id] = { ...state.tasks[id], ...updates }
      }
    },
    reorderWithinColumn: (state, action) => {
      const { columnId, newTaskIds } = action.payload
      state.columns[columnId].taskIds = newTaskIds
    },
    setState: (state, action) => {
      return action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    board: boardSlice.reducer
  }
})

// subscribe for persistence
store.subscribe(() => {
  saveState(store.getState().board)
})

export const {
  addTask,
  moveTask,
  deleteTask,
  setFilter,
  updateTask,
  reorderWithinColumn,
  setState
} = boardSlice.actions

export default store

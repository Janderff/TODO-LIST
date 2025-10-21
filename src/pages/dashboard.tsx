import { Plus } from 'lucide-react'
import { Tasks, type TasksProps } from '../components/tasks'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export async function quantitys(status: string) {
  const { data } = await axios.get<TasksProps[]>(
    `http://localhost:3000/tasks?status=${status}`
  )
  let countActive
  let countFineshed
  let count
  if (status === 'active') {
    return (countActive = data.filter(
      (task) => task.status === 'active'
    ).length)
  } else if (status === 'finished') {
    return (countFineshed = data.filter(
      (task) => task.status === 'finished'
    ).length)
  } else {
    return (count = data.length)
  }
}

export function Dashboard() {
  const queryClient = useQueryClient()
  const [task, setTask] = useState('')
  const [statusTask, setStatusTask] = useState('active')
  const [editingTask, setEditingTask] = useState<string | null>('')
  const { data: tasks, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
  async function editTask(id: string, title: string, status: string) {
    setEditingTask(id)
    setTask(title)
    setStatusTask(status)
    refetch()
    queryClient.invalidateQueries({ queryKey: ['quantity-total'] })
    queryClient.invalidateQueries({ queryKey: ['quantity-active'] })
    queryClient.invalidateQueries({ queryKey: ['quantity-finished'] })
  }

  async function getTasks() {
    const { data } = await axios.get<TasksProps[]>(
      'http://localhost:3000/tasks'
    )

    return data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async function handleAddTask() {
    if (editingTask) {
      await axios.put(`http://localhost:3000/tasks/${editingTask}`, {
        title: task,
        status: statusTask,
        createdAt: new Date(),
      })
      setEditingTask(null)
    } else {
      await axios.post('http://localhost:3000/tasks', {
        title: task,
        status: statusTask,
        createdAt: new Date(),
      })
      await getTasks()
    }
    setTask('')
    refetch()
    queryClient.invalidateQueries({ queryKey: ['quantity-total'] })
    queryClient.invalidateQueries({ queryKey: ['quantity-active'] })
    queryClient.invalidateQueries({ queryKey: ['quantity-finished'] })
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-task'],
    mutationFn: handleAddTask,
    onSuccess: () => {
      refetch()
      setTask('')
    },
  })
  const [searchTask, setSearchTask] = useState('')
  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  )
  return (
    <div className='flex items-center justify-center'>
      <div className=' h-auto p-4 w-full max-w-7xl'>
        <div className='flex gap-4'>
          <div className='flex items-center  w-full gap-2'>
            <input
              type='text'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder='Adicione uma nova tarefa...'
              className='border-2 border-zinc-200 rounded-md placeholder:text-zinc-400
               hover:border-sky-700 hover:boder-3 outline-none focus:border-sky-700  
               p-2 w-full flex-1 '
            />
            <select
              value={statusTask}
              onChange={(e) => setStatusTask(e.target.value)}
            >
              <option value='active'>Ativo</option>
              <option value='finished'>Concluido</option>
            </select>
            <button
              onClick={() => mutate()}
              disabled={isPending}
              className=' bg-sky-700 rounded-md
               hover:border-sky-700 hover:boder-3 hover:bg-sky-700 outline-none focus:border-sky-700 
            flex flex-row h-auto items-center gap-1 border p-2 text-zinc-100 '
            >
              <Plus />
              Adicionar
            </button>
          </div>
        </div>
        <div className='flex gap-2 mt-4 mb-4'>
          <input
            type='text'
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            placeholder='Digite a tarefa procurada'
            className='border-2 h-auto rounded-md w-fit p-2 border-zinc-200 placeholder:text-zinc-400 hover:border-sky-700 hover:boder-3 outline-none focus:border-sky-700 '
          />
        </div>
        <div>
          {filteredTasks &&
            filteredTasks?.map((task) => {
              return (
                <Tasks
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                  refetch={refetch}
                  editTask={editTask}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

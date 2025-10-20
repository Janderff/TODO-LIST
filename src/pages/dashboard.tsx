import { Plus } from 'lucide-react'
import { Tasks, type TasksProps } from '../components/tasks'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
export function Dashboard() {
  const [task, setTask] = useState('')

  const { data: tasks, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  async function getTasks() {
    const { data } = await axios.get<TasksProps[]>(
      'http://localhost:3000/tasks'
    )
    console.log(data) // eslint-disable-line no-console, no-undef, no-un
    return data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async function handleAddTask() {
    await axios.post('http://localhost:3000/tasks', {
      title: task,
      status: 'active',
      createdAt: new Date(),
    })
    await getTasks()
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-task'],
    mutationFn: handleAddTask,
    onSuccess: () => {
      refetch()
      setTask('')
    },
  })

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
          <button className='rounded-md p-2 bg-zinc-200 hover:bg-sky-600 text-zinc-600 hover:text-zinc-100'>
            Todas as tarefas
          </button>
          <button className='rounded-md p-2 bg-zinc-200 hover:bg-sky-600 text-zinc-600 hover:text-zinc-100'>
            Tarefas Ativas
          </button>
          <button className='rounded-md p-2 bg-zinc-200 hover:bg-sky-600 text-zinc-600 hover:text-zinc-100'>
            Todas Concluidas
          </button>
        </div>
        <div>
          {tasks &&
            tasks?.map((task) => {
              return (
                <Tasks
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

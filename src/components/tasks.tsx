import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Circle, SquarePen, Trash2 } from 'lucide-react'
export interface TasksProps {
  id: string
  title: string
  status: 'active' | 'finished'
  createdAt: Date
}
export function Tasks({ title, status = 'active', id }: TasksProps) {
  async function handleDeleteTask(id: string) {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
  }
  const { refetch } = useQuery({
    queryKey: ['tasks'],
  })

  const { mutate } = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: handleDeleteTask,
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <div
      key={id}
      className='w-100 bg-zinc-100 p-4 h-auto rounded-md flex mt-4 justify-between '
    >
      <span className='text-zinc-600 flex justify-center items-center gap-2'>
        <Circle
          className={
            status === 'active'
              ? 'fill-emerald-500  border-emerald-500 text-emerald-500'
              : ' fill-zinc-500 text-zinc-500  line-through'
          }
        />
        <span
          className={
            status === 'active'
              ? ''
              : ' fill-zinc-500 text-zinc-500  line-through'
          }
        >
          {title}
        </span>
      </span>
      <div className='flex gap-3'>
        <button className='text-amber-500'>
          <SquarePen />
        </button>
        <button className='text-red-500' onClick={() => mutate(id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  )
}

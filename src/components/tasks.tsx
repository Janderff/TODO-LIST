import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Circle, SquarePen, Trash2 } from 'lucide-react'
//import { editTask } from '../pages/dashboard'

export interface TasksProps {
  id: string
  title: string
  status: string
  createdAt: Date
  refetch: () => void
  editTask: (id: string, title: string, status: string) => void
}
export function Tasks({ title, status, id, refetch, editTask }: TasksProps) {
  const queryClient = useQueryClient()
  async function handleDeleteTask(id: string) {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
  }

  const { mutate } = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: handleDeleteTask,
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ['quantity-total'] })
      queryClient.invalidateQueries({ queryKey: ['quantity-active'] })
      queryClient.invalidateQueries({ queryKey: ['quantity-finished'] })
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
        <button
          className='text-amber-500'
          onClick={() => {
            editTask(id, title, status)
          }}
        >
          <SquarePen />
        </button>
        <button className='text-red-500' onClick={() => mutate(id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  )
}

import { Cards } from './card'
import { quantitys } from '../pages/dashboard'
import { useQuery } from '@tanstack/react-query'

export default function Header() {
  const { data: total } = useQuery({
    queryKey: ['quantity-total'],
    queryFn: () => quantitys(''),
  })
  const { data: active } = useQuery({
    queryKey: ['quantity-active'],
    queryFn: () => quantitys('active'),
  })
  const { data: finished } = useQuery({
    queryKey: ['quantity-finished'],
    queryFn: () => quantitys('finished'),
  })
  return (
    <header className='bg-sky-900 w-full h-auto pb-8 flex flex-col justify-center   items-center'>
      <div className='max-w-7xl w-full flex justify-between items-center px-4 '>
        <span>
          <img
            src='/src/assets/TaskTideLogo.png'
            className='w-22 h-22'
            alt='logo da TaskTide'
          />
        </span>
      </div>
      <div className='max-w-7xl w-full flex justify-between items-center px-4 '>
        <Cards title='Total de Tarefas' quantity={total ?? 0} />
        <Cards title='Tarefas Ativas' quantity={active ?? 0} />
        <Cards title=' Tarefas Concluídas' quantity={finished ?? 0} />
      </div>
    </header>
  )
}

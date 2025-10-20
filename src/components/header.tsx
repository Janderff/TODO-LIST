import { LogOut } from 'lucide-react'
import { Cards } from './card'

export default function Header() {
  return (
    <header className='bg-sky-700 w-full h-auto pb-8 flex flex-col justify-center   items-center'>
      <div className='max-w-7xl w-full flex justify-between items-center px-4 '>
        <span>
          <img
            src='/src/assets/TaskTideLogo.png'
            className='w-22 h-22'
            alt='logo da TaskTide'
          />
        </span>
        <button className='border rounded-md p-2 flex bg-sky-800 text-white hover:bg-sky-700 transition-colors items-center gap-2'>
          <LogOut />
          Logout
        </button>
      </div>
      <div className='max-w-7xl w-full flex justify-between items-center px-4 '>
        <Cards title='Total de Tarefas' quantity={10} />
        <Cards title='Tarefas Ativas' quantity={5} />
        <Cards title=' Tarefas Concluídas' quantity={15} />
      </div>
    </header>
  )
}

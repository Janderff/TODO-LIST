import { Outlet } from 'react-router-dom'
import Header from '../../components/header'

export default function DashboardLayout() {
  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col w-full max-h-min-screen'>
        <Header />
        <main className='flex w-full flex-1 flex-col p-5'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

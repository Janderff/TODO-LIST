import { Outlet } from 'react-router-dom'
import Header from '../../components/header'

export default function DashboardLayout() {
  return (
    <div className='flex'>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

interface CardsProps {
  title?: string
  quantity?: number
}

export function Cards({ title, quantity }: CardsProps) {
  return (
    <div className='p-2 w-80 bg-sky-800 opacity-75 rounded-md mt-4 font-bold text-white '>
      <span>{quantity}</span>
      <h5 className='font-normal'>{title}</h5>
    </div>
  )
}

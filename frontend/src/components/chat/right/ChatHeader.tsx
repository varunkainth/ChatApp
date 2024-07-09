
type Props = {
    // children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatHeader = (props: Props) => {
  return (
    <div className='flex w-full rounded border'>
        <div className='flex p-2'>
        <img
          src="https://avatar.iran.liara.run/public/boy?username=pain"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <div className='flex-1 justify-center items-center ml-3'>
            <p className="font-bold text-lg">pain</p>
            <span className='text-sm my-0'>online</span>

        </div>
        </div>
        
        </div>
  )
}

export default ChatHeader
import React from 'react'
import Message from './Message'
import useGetMessages from '../../../hooks/useGetMessages'

const Messages = () => {

  const {loading,messages}= useGetMessages()

  console.log("messages",messages);
  

  return (
    <div>
        <h1>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </h1>
    </div>
  )
}

export default Messages
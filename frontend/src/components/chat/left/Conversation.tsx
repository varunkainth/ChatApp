import React from 'react'

type Props = {
    children: React.ReactNode
}

const Conversation = (props: Props) => {
  return (
    <>
        <div className="conversation">{props.children}</div>
        childeren
    </>

  )
}

export default Conversation
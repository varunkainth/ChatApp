"use client"

import { Button } from "./ui/button"
import { ToastAction } from "./ui/toast"
import { useToast } from "./ui/use-toast"

export function ToastWithAction(message:string) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: message,
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}

import * as React from "react"

import { ScrollArea } from "../../ui/scroll-area"
import { Separator } from "../../ui/separator" 

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Person ${a.length - i}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-[47rem] w-full bg-black-500 rounded-md ">
      <div className="p-4">
        <h4 className="mb-4 text-sm bg-black-500 font-bold text-black font-medium leading-none">All Chat's</h4>
        {tags.map((tag,) => (
          <>
            <div key={tag.length} className=" bg-black text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}

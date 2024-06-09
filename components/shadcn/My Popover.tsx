// MyPopover.jsx or MyPopover.tsx
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ReactNode } from "react"

interface MyPopoverProps {
  buttonLabel: string
  children: ReactNode
  popoverWidth?: string
  sideOffset?: number
}

export function MyPopover({ buttonLabel, children, popoverWidth = "w-80", sideOffset = 5 }: MyPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{buttonLabel}</Button>
      </PopoverTrigger>
      <PopoverContent className={popoverWidth} sideOffset={sideOffset}>
        <div className="grid gap-4">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  )
}

import { LoaderPinwheel  } from "lucide-react"

import { cn } from "../../libs/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderPinwheel
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }

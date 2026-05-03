
import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast"

export function Toaster() {
  const { toasts } = useToast()

  const variantStyles = {
  default: "bg-white text-black",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-400 text-black",
  destructive: "bg-red-950 text-white",
  error: "border-red-500 text-white bg-red-950",
};

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={`p-2 pl-4 fixed top-4 right-4 z-[1000] max-w-[20rem] rounded-sm text-lg
    ${variantStyles[variant ?? "default"]}`}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

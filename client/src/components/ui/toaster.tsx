"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string) => {
    switch (variant) {
      case "destructive":
        return <XCircle className="h-5 w-5" />
      case "success":
        return <CheckCircle2 className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getIconColor = (variant?: string) => {
    switch (variant) {
      case "destructive":
        return "text-red-500"
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
              "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
              "data-[state=closed]:slide-out-to-right-full",
              "backdrop-blur-md bg-background/95",
              props.variant === "destructive" && "border-red-500/50 bg-red-500/10",
              props.variant === "success" && "border-green-500/50 bg-green-500/10",
              props.variant === "warning" && "border-yellow-500/50 bg-yellow-500/10",
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn("mt-0.5", getIconColor(props.variant))}>
                {getIcon(props.variant)}
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle className="text-sm font-semibold">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}

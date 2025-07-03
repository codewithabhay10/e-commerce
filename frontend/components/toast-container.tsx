"use client"
import { useToast } from "@/hooks/use-toast"

export default function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded shadow text-white ${
            toast.variant === "destructive" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <strong>{toast.title}</strong>
          {toast.description && <div>{toast.description}</div>}
          <button
            onClick={() => dismiss(toast.id)}
            className="ml-4 text-white underline"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  )
}

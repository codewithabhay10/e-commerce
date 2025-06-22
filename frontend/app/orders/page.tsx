import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderHistory } from "@/components/order-history"

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrderHistory />
      </main>
      <Footer />
    </div>
  )
}

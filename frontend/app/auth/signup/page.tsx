import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <SignupForm />
      </main>
      <Footer />
    </div>
  )
}

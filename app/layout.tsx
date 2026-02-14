import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/AuthContext'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col pt-16">
  <AuthProvider>
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </AuthProvider>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</body>


    </html>
  )
}
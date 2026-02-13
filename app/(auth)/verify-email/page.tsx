'use client'

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">
          Verify Your Email 📩
        </h2>

        <p className="text-gray-600 mb-4">
          We have sent a confirmation link to your email.
        </p>

        <p className="text-sm text-gray-500">
          After confirming, you will be redirected automatically.
        </p>
      </div>
    </div>
  )
}

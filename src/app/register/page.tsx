import RegisterForm from './register-form'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Create an Account</h3>
        <RegisterForm />
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from 'axios'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []
    
    if (!username) newErrors.push('Username is required')
    if (!email) newErrors.push('Email is required')
    else if (!validateEmail(email)) newErrors.push('Invalid email format')
    if (!password) newErrors.push('Password is required')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }else{
        setErrors([])
    }

    // Here you would typically send a request to your API to register the user
    try {
        const res = await axios.post('/api/auth/signup', {
            username,
            email,
            password,
            role
        })    
        console.log(res);
        
    } catch (error) {
        console.log(error);
        if( error instanceof Error ) {
            setErrors([error.response?.data.message])
        }
    }
    
    

    // Simulate API call delay

    // Redirect to a success page or login page
    // router.push('/register/success')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mt-4">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="mt-4">
        <Label>Role</Label>
        <RadioGroup defaultValue="user" value={role} onValueChange={setRole} className="flex space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin">Admin</Label>
          </div>
        </RadioGroup>
      </div>
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-between mt-4">
        <Button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          Register
        </Button>
      </div>
    </form>
  )
}


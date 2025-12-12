import { useState } from 'react'
import { loginOwner } from '../../services/fetch'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const LoginOwner = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passcode, setPasscode] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const result = await loginOwner(email, password, passcode)

        if (!result || result.success === false) {
            toast.error(result?.message || "Something went wrong.")
            return
        }

        toast.success("Logged in successfully!")

        navigate("/dashboard")
    }

    return (
        <div>
            <Toaster />

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email@email.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    required
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <input
                    type="password"
                    placeholder="Enter Passcode"
                    required
                    onChange={(e) => setPasscode(e.target.value)}
                /><br />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

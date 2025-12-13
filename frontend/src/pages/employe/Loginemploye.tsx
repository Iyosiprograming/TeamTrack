import { loginemploye } from "../../services/fetch";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export const Loginemploye = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handellogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginemploye(email, password);
            console.log(response);
            if (!response.ok) {
                toast(response.message || "Login failed", {
                    duration: 5000,

                })
            }
            toast(response.message || "Login successful", {
                duration: 2000,

            })
        } catch (error: any) {
            console.log(error);
            toast(error.message || "Login failed", {
                duration: 2000,

            })
        }
    }
    return (
        <div>
            <Toaster />
            <form onSubmit={handellogin}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

import React from 'react'

export const LoginOwner = () => {
    const handelLogin = (e) => {
        e.preventDefault()
        console.log('Login')
    }
    return (
        <div>
            {/* form to login */}
            <form onSubmit={handelLogin}>
                <input type="email" placeholder='Email@email.com' required onChange={(e) => e.target.value} /><br />
                <input type="password" placeholder='Enter Password' required minLength={8} onChange={(e) => e.target.value} /><br />
                <input type="password" placeholder='Enter Passcode' required onChange={(e) => e.target.value} /><br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

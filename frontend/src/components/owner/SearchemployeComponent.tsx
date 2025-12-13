import React, { useState } from 'react'
import { getSingleEmploye } from '../../services/fetch'
import { Toaster, toast } from 'react-hot-toast'

export const SearchEmployeComponent = () => {
    const [name, setName] = useState('')
    const [employe, setEmploye] = useState<any>(null)

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await getSingleEmploye(name)
            setEmploye(response.employe)
            toast.success('Employee found')
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error fetching employee")
            setEmploye(null)
        }
    }

    return (
        <div>
            <Toaster />

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>

            {employe && (
                <div>
                    <h3>Employee Info</h3>
                    <p>Name: {employe.name}</p>
                    <p>Email: {employe.email}</p>
                    <p>Role: {employe.role}</p>
                </div>
            )}
        </div>
    )
}

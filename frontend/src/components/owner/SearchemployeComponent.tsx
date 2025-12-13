import React, { useState } from 'react'
import { getSingleEmploye } from '../../services/fetch'
import { Toaster, toast } from 'react-hot-toast'

export const SearchEmployeComponent = () => {
  const [name, setName] = useState('')
  const [employe, setEmploye] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await getSingleEmploye(name.trim())
      setEmploye(response.employe)
      toast.success('Employee found')
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || 'Error fetching employee')
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
          <p><strong>Name:</strong> {employe.name}</p>
          <p><strong>Email:</strong> {employe.email}</p>
          <p><strong>Role:</strong> {employe.role}</p>
          <p><strong>Age:</strong> {employe.age}</p>
          <p><strong>Gender:</strong> {employe.gender}</p>
          <p><strong>Phone:</strong> {employe.phone}</p>
          <p><strong>Salary:</strong> ${employe.salary}</p>
        </div>
      )}
    </div>
  )
}

import { createTeam } from '../../services/fetch'
import { useState } from 'react'
import { Toaster, toast } from "react-hot-toast"

export const CreateTeamComponent = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleToggle = () => {
        setShowForm(prev => !prev)
    }

    const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await createTeam(name, description)
            toast.success("Team Created Successfully")
            setName('')
            setDescription('')
            setShowForm(false)
        } catch (error) {
            toast.error("Team Creation Failed")
        }
    }

    return (
        <div>
            <Toaster />
            <button onClick={handleToggle}>
                {showForm ? 'Hide Form' : 'Create Team'}
            </button>

            {showForm && (
                <form onSubmit={handleCreateTeam}>
                    <input
                        type="text"
                        placeholder="Enter Team Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />

                    <input
                        type="text"
                        placeholder="Enter Team Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />

                    <input type="submit" value="Create Team" />
                </form>
            )}
        </div>
    )
}

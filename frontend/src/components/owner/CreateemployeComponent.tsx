import React, { useState } from 'react';
import { createEmploye } from '../../services/fetch';
import { Toaster, toast } from 'react-hot-toast';

export const CreateemployeComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState('male');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState<number | null>(null);

    const calculateAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        setAge(calculatedAge);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (age === null || salary === null) return; // simple validation
            const response = await createEmploye({ name, email, age, gender, phone, role, salary });
            console.log(response);
            toast.success(response.message || 'Employee created successfully!'); // success toast
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to create employee.'); // error toast
        }
    };

    return (
        <div>
            <Toaster />
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Birth Date"
                    value={birthDate}
                    onChange={(e) => {
                        setBirthDate(e.target.value);
                        calculateAge(e.target.value);
                    }}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age ?? ''}
                    readOnly
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input
                    type="text"
                    placeholder="Employee Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Employee Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Employee Salary"
                    value={salary ?? ''}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    required
                    min={0}
                />
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
};

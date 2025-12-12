import { getCounts } from "../../services/fetch";
import { useState, useEffect } from 'react'

export const TotaldataComponent = () => {
    const [counts, setCounts] = useState({
        employeeCount: 0,
        teamCount: 0,
    });
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const counts = await getCounts();
                setCounts(counts);
            } catch (error) {
                console.error("Failed to fetch counts:", error);
            }
        };
        fetchCounts();
    }, []);
    return (
        <div>
            <h1>Total Employee</h1>
            <p>Employee Count: {counts.employeeCount}</p>
            <h1>Total Teams</h1>
            <p>Team Count: {counts.teamCount}</p>
        </div>
    )
}

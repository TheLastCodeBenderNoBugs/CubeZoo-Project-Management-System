import { useState, useEffect } from "react";
import axios from "axios";

type User = {
    id: number;
    name: string;
};


const UserDropdown = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        axios.get("http://cube-zoo-task-management-system.test/api/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <select className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select a user</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
    );
};

export default UserDropdown;

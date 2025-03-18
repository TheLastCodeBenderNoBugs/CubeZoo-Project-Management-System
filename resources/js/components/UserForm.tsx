import { useState } from "react";
import axios from "axios";

export default function UserForm({ fetchUsers }: { fetchUsers: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://cube-zoo-task-management-system.test/api/users", { name, email, password });
            alert("User added successfully");
            fetchUsers(); // Refresh user list
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            alert("Failed to add user");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="m-1 w-full bg-black text-white rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4" type="submit">Add User</button>
        </form>
    );
}

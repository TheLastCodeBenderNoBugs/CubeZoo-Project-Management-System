import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('http://cube-zoo-task-management-system.test/api/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch users');
                setLoading(false);
            });
    }, []);

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://cube-zoo-task-management-system.test/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="mb-6 flex items-center space-x-2">
                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
                    <thead className="bg-black text-white">
                        <tr className="text-left">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <button className="mb-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700" onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

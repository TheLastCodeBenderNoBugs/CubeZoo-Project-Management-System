import axios from 'axios';
import { useEffect, useState } from 'react';

interface TaskLog {
    id: number;
    task_id: number;
    action: string;
    changes: Record<string, any>;
    created_at: string;
}

const TaskLogs = () => {
    const [logs, setLogs] = useState<TaskLog[]>([]);

    useEffect(() => {
        axios
            .get('/api/task-logs')
            .then((response) => setLogs(response.data))
            .catch((error) => console.error('Error fetching logs:', error));
    }, []);

    return (
        <div>
            <div className="mb-6 flex items-center space-x-2">
                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
                    <thead className="bg-black text-white">
                        <tr className="text-left">
                            <th className="border px-4 py-2">Task ID</th>
                            <th className="border px-4 py-2">Action</th>
                            <th className="border px-4 py-2">Changes</th>
                            <th className="border px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b">
                                <td className="border px-4 py-2">{log.task_id}</td>
                                <td className="border px-4 py-2">{log.action}</td>
                                <td className="border px-4 py-2">
                                    <pre>{JSON.stringify(log.changes, null, 2)}</pre>
                                </td>
                                <td className="border px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskLogs;

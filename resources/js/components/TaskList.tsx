import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDropdown from './AssignTask';

const TaskList = () => {
    interface List {
        id: string;
        title: string;
        description: string;
        due_date: string;
        status: string;
        assigned_person: string;
        created_by: string;
    }

    const [tasks, setTasks] = useState<List[]>([]);
    const [editingTask, setEditingTask] = useState<List | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<List>>({});

    /** Handles editing of every specific task */
    const startEditing = (task: List) => {
        setEditingTask(task);
        setUpdatedFields({ ...task });
    };

    /** Handles changes as fields are edited */
    const handleFieldChange = (field: keyof List, value: string | number) => {
        setUpdatedFields((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        axios
            .get('http://cube-zoo-task-management-system.test/api/tasks')
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    /** State variables to hold filter values */
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [filteredTasks, setFilteredTasks] = useState<List[]>(tasks); // Holds the filtered tasks

    /** Status Filter Function */
    const filterTasks = () => {
        let updatedTasks = tasks;

        // Filter by status
        if (statusFilter !== 'all') {
            updatedTasks = updatedTasks.filter((task) => task.status === statusFilter);
        }

        setFilteredTasks(updatedTasks); // Update filtered tasks
    };

    /** Date Filter Function */
    const [selectedDate, setSelectedDate] = useState<string>('');
    const formatDate = (datetime: string) => datetime.split(' ')[0];

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setSelectedDate(date);

        if (!date) {
            setFilteredTasks(tasks); // Show all if no date is selected
        } else {
            setFilteredTasks(tasks.filter((task) => formatDate(task.due_date) === date));
        }
    };

    /** Search Filter Function - based on search query (title or description) */
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length < 3) {
            setFilteredTasks(tasks); // Reset to full list if less than 3 characters
        } else {
            setFilteredTasks(
                tasks.filter(
                    (task) => task.title.toLowerCase().includes(query.toLowerCase()) || task.description.toLowerCase().includes(query.toLowerCase()),
                ),
            );
        }
    };

    useEffect(() => {
        filterTasks(); // Reapply filters whenever status or date filter changes
    }, [statusFilter, tasks]); // Trigger this when filters or tasks change

    /** Run the update process */
    const handleUpdate = async () => {
        if (!editingTask) return;

        try {
            const response = await axios.put(`http://cube-zoo-task-management-system.test/api/update/${editingTask.id}`, updatedFields);

            if (response.status === 200) {
                setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...updatedFields } : t)));
                setEditingTask(null);
                alert('Task updated successfully');
            } else {
                alert('Failed to update task ');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    };
    /** delete a task from the database */
    const deleteTask = async (id: string) => {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const response = await axios.delete(`http://cube-zoo-task-management-system.test/api/delete/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (response.status === 200 || response.status === 201) {
                setTasks(tasks.filter((task) => task.id !== id));
                alert('Task deleted successfully');
            } else {
                alert('Failed to delete task');
            }
        } catch (error: any) {
            console.error('Delete error:', error.response || error);
            alert(`Error deleting task: ${error.response?.data?.message || error.message}`);
            alert('Error deleting task');
        }
    };

    return (
        <div>
            {editingTask && (
                <div>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        value={updatedFields.title || ''}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        value={updatedFields.description || ''}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        placeholder="Description"
                    />
                    <select
                        className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        value={updatedFields.status || 'pending' || 'Completed' || 'In Progress'}
                        onChange={(e) => handleFieldChange('status', e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="date"
                        className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        value={updatedFields.due_date || ''}
                        onChange={(e) => handleFieldChange('due_date', e.target.value)}
                    />

                    <input
                        type="text"
                        className="m-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        value={updatedFields.assigned_person || ''}
                        onChange={(e) => handleFieldChange('assigned_person', Number(e.target.value))}
                        placeholder="Assigned Person ID"
                    />
                    <button className="m-1 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700" onClick={handleUpdate}>
                        Save
                    </button>
                    <button className="m-1 mb-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700" onClick={() => setEditingTask(null)}>
                        Cancel
                    </button>
                </div>
            )}
            <div className="mb-6 flex items-center space-x-2">
                {/**Search filter section */}
                <div className="search-container flex-1">
                    <label htmlFor="search" className="mr-5 text-sm font-semibold text-gray-700">
                        Search:
                    </label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search..."
                        className="search-input mt-1 w-full rounded-lg border border-gray-300 p-2 text-black md:w-64"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <div className="filter-container">
                    <label htmlFor="filter" className="mr-5 text-sm font-semibold text-gray-700">
                        Filter By Date:
                    </label>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="filter-input mt-1 w-full rounded-lg border border-gray-300 p-2 text-black md:w-48"
                    />
                </div>

                <div className="filter-container">
                    <label htmlFor="filter" className="mr-5 text-sm font-semibold text-gray-700">
                        Filter:
                    </label>
                    <select
                        id="filter"
                        className="filter-input mt-1 w-full rounded-lg border border-gray-300 p-2 text-black md:w-48"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Select a filter</option>
                        <option value="in-progress">Status: In Progress</option>
                        <option value="completed"> Status: Completed</option>
                        <option value="pending"> Status: Pending</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
            {/**Table component */}
            <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
                <thead className="bg-black text-white">
                    <tr className="text-left">
                        <th className="border px-4 py-2">Task ID</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Due Date</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                        <th className="border px-4 py-2">Reassign Task</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((list, index) => (
                        <tr className="border-b">
                            <td className="border px-4 py-2">{list.id}</td>
                            <td className="border px-4 py-2">{list.title}</td>
                            <td className="border px-4 py-2">{list.description}</td>
                            <td className="border px-4 py-2">{list.due_date}</td>
                            <td className="border px-4 py-2">{list.status}</td>
                            <td className="border px-4 py-2">
                                <button className="mb-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700" onClick={() => deleteTask(list.id)}>
                                    Delete
                                </button>
                                <button className="rounded bg-green-500 px-3 py-1 text-white hover:bg-blue-700" onClick={() => startEditing(list)}>
                                    Update
                                </button>
                            </td>
                            <td className="border px-4 py-2">
                                <UserDropdown />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;

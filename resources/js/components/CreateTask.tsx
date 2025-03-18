import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDropdown from './AssignTask';

interface Task {
    title: string;
    description: string;
    status: string;
    due_date: string;
    assigned_person: string;
}

const CreateTask = () => {
    /**States for User Inputs */
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [assigned_person, setAssignedPerson] = useState('');
    /** Store API Responses defaulse false to track states */
    const [message, setMessage] = useState(""); 
    const [isError, setIsError] = useState(false);

    //Add task to the database
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://cube-zoo-task-management-system.test/api/create', {
                title,
                description,
                status,
                due_date,
                assigned_person,
            });

            if (response.status === 200 || response.status === 201) {
                setMessage("Task successfully created!");
                setIsError(false);
            } else {
                setMessage("Failed to create task.");
                setIsError(true);
            }
        } catch (error) {
            setMessage("Error: Could not submit task. ");
            setIsError(true);
        }
    };

    return (
        <div>
            {/**  Response message */}
            {message && (
                <h3 style={{ color: isError ? "red" : "green" }}>
                    {message}
                </h3>
            )}
            <form onSubmit={handleSubmit}>
                
                <div className="mb-5">
                    <label className="mb-1 block font-medium text-gray-700">Title </label>
                    <input
                        type="text"
                        id="txtTitle"
                        name="txtTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} /** Retrieve input values */
                        className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        placeholder="Title"
                    />
                </div>
                <div className="mb-5">
                    <label className="mb-1 block font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dtpDueDate"
                        name="dtpDueDate"
                        value={due_date}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        placeholder="Pick a date"
                    />
                </div>
                <div className="mb-5">
                    <label className="mb-1 block font-medium text-gray-700">Assign To Member</label>
                    <UserDropdown />
                </div>
                <div className="mb-5">
                    <label className="mb-1 block font-medium text-gray-700">Status</label>
                    <select
                        id="sltStatus"
                        name="sltStatus"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                    >
                        <option value="">Choose</option>
                        <option value="completed">Completed</option>
                        <option value="inprogress">In progress</option>
                        <option value="waiting">Pending</option>
                        <option value="block">Block</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="mb-1 block font-medium text-gray-700">Desciption</label>
                    <textarea
                        id="txtadescription"
                        name="txtadescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/4"
                        placeholder="Type your description here..."
                    ></textarea>
                </div>
                <button className="rounded-lg bg-black px-6 py-2 font-semibold text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 focus:outline-none">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;

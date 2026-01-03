import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';

export function TaskList() {
    const { tasks, loading, error, addTask, toggleTask, deleteTask } = useTasks();
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(newTask);
        setNewTask('');
    };

    if (loading) {
        return <div className="text-center py-10 text-slate-400">Loading tasks...</div>;
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                <p className="font-semibold">Error loading tasks</p>
                <p className="text-sm opacity-90">{error}</p>
                <p className="text-xs mt-2 text-slate-500">
                    Hint: Check your Firestore Security Rules in the Firebase Console.
                    Currently, they might be set to deny all requests.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-8 relative">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full pl-5 pr-14 py-4 rounded-2xl border-none shadow-sm bg-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                    disabled={!newTask.trim()}
                >
                    <Plus size={24} />
                </button>
            </form>

            <div className="space-y-1">
                {tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">No tasks yet. Add one above!</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

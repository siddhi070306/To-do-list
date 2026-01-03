import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div
            className={cn(
                "group flex items-center justify-between p-4 mb-3 rounded-xl bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md",
                task.isCompleted && "bg-slate-50 opacity-50"
            )}
        >
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={() => onToggle(task.id, task.isCompleted)}
                    className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        task.isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-slate-300 hover:border-green-500 text-transparent"
                    )}
                >
                    <Check size={14} strokeWidth={3} />
                </button>
                <span
                    className={cn(
                        "text-slate-700 font-medium transition-all duration-300",
                        task.isCompleted && "line-through text-slate-400"
                    )}
                >
                    {task.text}
                </span>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete task"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

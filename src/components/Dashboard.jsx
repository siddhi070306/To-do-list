import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTasks } from '../hooks/useTasks';

export function Dashboard() {
    const { tasks } = useTasks();

    const data = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            return d;
        }).reverse();

        return last7Days.map(date => {
            const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
            const count = tasks.filter(task => {
                if (!task.isCompleted || !task.completedAt) return false;
                // Handle Firestore Timestamp or Date object
                const completedDate = task.completedAt.toDate ? task.completedAt.toDate() : new Date(task.completedAt);
                completedDate.setHours(0, 0, 0, 0);
                return completedDate.getTime() === date.getTime();
            }).length;

            return { name: dayStr, count };
        });
    }, [tasks]);

    const totalCompleted = tasks.filter(t => t.isCompleted).length;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">Weekly Productivity</h2>
                <p className="text-slate-500 text-sm">You have completed <span className="font-semibold text-indigo-600">{totalCompleted} tasks</span> in total.</p>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis
                            hide
                        />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="count" radius={[6, 6, 6, 6]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.count > 0 ? '#6366f1' : '#e2e8f0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

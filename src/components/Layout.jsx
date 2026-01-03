import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare } from 'lucide-react';
import { cn } from '../lib/utils'; // Assuming cn is in utils

export function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'dashboard'

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-100 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <CheckSquare className="text-white" size={20} />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            SmartTask
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 relative">
                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 inline-flex">
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                activeTab === 'tasks'
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            <CheckSquare size={16} />
                            Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                activeTab === 'dashboard'
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </button>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Pass activeTab to children if needed, or handle render logic here defined by prop passing from App is better */}
                    {/* Actually simpler to just have Layout handle the view switching or pass activeTab back up.
                 For this structure, let's pass a function to children or just handle rendering here. 
                 But typical Layout wraps children. Let's make Layout handle the switching or accept a prop.
                 Better: Let App handle state. Layout just renders tabs and takes `currentTab` and `onTabChange`.
             */}
                    {children(activeTab)}
                </div>
            </main>
        </div>
    );
}

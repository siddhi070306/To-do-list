import { useState, useEffect } from 'react';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const taskData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTasks(taskData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("Firestore Error:", err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const addTask = async (text) => {
        if (!text.trim()) return;
        try {
            await addDoc(collection(db, 'tasks'), {
                text,
                isCompleted: false,
                createdAt: serverTimestamp(),
                completedAt: null
            });
        } catch (err) {
            console.error("Error adding task:", err);
            setError(err.message);
        }
    };

    const toggleTask = async (id, isCompleted) => {
        try {
            const taskRef = doc(db, 'tasks', id);
            await updateDoc(taskRef, {
                isCompleted: !isCompleted,
                completedAt: !isCompleted ? serverTimestamp() : null
            });
        } catch (err) {
            console.error("Error toggling task:", err);
            // Don't set global error for toggle to avoid blocking UI, but log it
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return { tasks, loading, error, addTask, toggleTask, deleteTask };
}

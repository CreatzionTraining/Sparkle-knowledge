'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Toast, ConfirmModal, LoadingModal } from '@/components/Modals';

interface Breakdown {
    label: string;
    score: string;
}

interface Certificate {
    id: number;
    name: string;
    role: string;
    score: string;
    image?: string;
    breakdown: Breakdown[];
}

export default function CertificatesAdmin() {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [score, setScore] = useState('');
    const [image, setImage] = useState('');

    // Default breakdown setup for 4 skills
    const [breakdown, setBreakdown] = useState<Breakdown[]>([
        { label: 'Listening', score: '8.5' },
        { label: 'Reading', score: '8.5' },
        { label: 'Speaking', score: '7.5' },
        { label: 'Writing', score: '7.0' }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void; onCancel: () => void; } | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await fetch('/api/certificates');
            const data = await res.json();
            if (data.success) setCertificates(data.certificates);
        } catch (error) { console.error('Error fetching certificates'); }
    };

    const handleDelete = async (id: number) => {
        setConfirmDialog({
            title: 'Delete Certificate',
            message: 'Are you sure you want to permanently delete this certificate?',
            onConfirm: async () => {
                setConfirmDialog(null);
                setLoadingMessage('Deleting certificate...');
                try {
                    await fetch('/api/certificates', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    setToast({ message: 'Certificate deleted successfully', type: 'success' });
                    fetchCertificates();
                } catch {
                    setToast({ message: 'Error deleting certificate', type: 'error' });
                } finally {
                    setLoadingMessage(null);
                }
            },
            onCancel: () => setConfirmDialog(null)
        });
    };

    const handleEdit = (cert: Certificate) => {
        setEditingId(cert.id);
        setName(cert.name);
        setRole(cert.role);
        setScore(cert.score);
        setImage(cert.image || '');
        setBreakdown(cert.breakdown || []);
        setView('create');
    };

    const handlePublish = async () => {
        if (!name || !score) {
            setToast({ message: 'Name and Overal Score are required.', type: 'error' });
            return;
        }

        setLoadingMessage(editingId ? 'Updating certificate...' : 'Saving certificate...');
        setIsSubmitting(true);

        const data = {
            id: editingId || Date.now(),
            name,
            role,
            score,
            image,
            breakdown
        };

        try {
            const method = editingId ? 'PUT' : 'POST';
            await fetch('/api/certificates', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setToast({ message: editingId ? 'Updated Successfully!' : 'Saved Successfully!', type: 'success' });

            if (!editingId) setView('list');
            fetchCertificates();

            if (!editingId) {
                setName('');
                setRole('');
                setScore('');
                setImage('');
                setBreakdown([
                    { label: 'Listening', score: '8.5' },
                    { label: 'Reading', score: '8.5' },
                    { label: 'Speaking', score: '7.5' },
                    { label: 'Writing', score: '7.0' }
                ]);
            }
            setEditingId(null);
        } catch (error) {
            setToast({ message: 'Failed to save', type: 'error' });
        } finally {
            setLoadingMessage(null);
            setIsSubmitting(false);
        }
    };

    const updateBreakdown = (index: number, field: 'label' | 'score', value: string) => {
        const newBD = [...breakdown];
        newBD[index][field] = value;
        setBreakdown(newBD);
    };

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    if (view === 'list') {
        return (
            <div className="h-screen overflow-y-auto w-full bg-gray-50 flex justify-center font-sans text-gray-900 overflow-x-hidden">
                <div className="w-full max-w-5xl p-4 md:p-6 lg:p-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 lg:mb-10 border-b border-gray-200 pb-4 md:pb-6 gap-3 md:gap-4">
                        <div className="w-full md:w-auto">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                                Certificates Admin
                            </h1>
                            <p className="text-gray-500 font-medium mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Manage student achievement cards</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                            <a href="/admin" className="w-full sm:w-auto bg-white border border-gray-200 hover:border-blue-500 text-gray-700 px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                                Back to Main
                            </a>
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setName('');
                                    setRole('');
                                    setScore('');
                                    setImage('');
                                    setView('create');
                                }}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 text-white px-5 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="text-lg">＋</span> <span>Add Certificate</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                                <p className="text-gray-400 text-xl font-medium">No certificates found.</p>
                            </div>
                        ) : (
                            certificates.map(item => (
                                <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative group flex flex-col justify-between">
                                    <div className="mb-4 text-center">
                                        <h3 className="font-bold text-xl text-gray-900 uppercase tracking-tight">{item.name}</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.role}</p>
                                        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-sm shadow-sm">{item.score}</div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full mt-2">
                                        <button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 flex-1 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 flex-1 transition-colors">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                {confirmDialog && <ConfirmModal title={confirmDialog.title} message={confirmDialog.message} onConfirm={confirmDialog.onConfirm} onCancel={confirmDialog.onCancel} />}
                {loadingMessage && <LoadingModal message={loadingMessage} />}
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto w-full bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border text-gray-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={handlePublish} disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 shadow-md">
                    {editingId ? 'Update' : 'Save'} Certificate
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-red-600 h-2 w-full"></div>
                    <div className="p-6 md:p-10 space-y-6">

                        <div>
                            <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Student Name *</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-2xl font-bold bg-transparent border-b-2 border-gray-200 px-2 py-2 outline-none focus:border-blue-500 uppercase" placeholder="SAIGURU SEKARAN" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Role / Program</label>
                                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100" placeholder="IELTS Academic" />
                            </div>
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Overall Score *</label>
                                <input type="text" value={score} onChange={(e) => setScore(e.target.value)} className="w-full bg-blue-50 px-4 py-3 rounded-xl border border-blue-100 font-bold text-blue-800 outline-none focus:ring-2 focus:ring-blue-200" placeholder="IELTS Band 8.0" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <label className="block text-xs font-extrabold text-blue-600 uppercase mb-4">Score Breakdown</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {breakdown.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => updateBreakdown(idx, 'label', e.target.value)}
                                            className="w-1/2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-semibold text-sm outline-none focus:border-blue-500"
                                            placeholder="Skill"
                                        />
                                        <input
                                            type="text"
                                            value={item.score}
                                            onChange={(e) => updateBreakdown(idx, 'score', e.target.value)}
                                            className="w-1/2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 font-bold text-red-600 text-sm outline-none focus:border-red-500 text-center"
                                            placeholder="Score"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {loadingMessage && <LoadingModal message={loadingMessage} />}
        </div>
    );
}

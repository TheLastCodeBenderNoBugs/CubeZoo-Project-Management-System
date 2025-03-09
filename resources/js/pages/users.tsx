
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import UserList from "@/components/UserList";
import UserForm from "@/components/UserForm";
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'System Users',
        href: '/users',
    },
];

export default function Dashboard() {

    const [refresh, setRefresh] = useState(false);
    const fetchUsers = () => setRefresh(!refresh);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="activity-log-container w-full rounded-lg bg-white p-6 text-black shadow-lg">
                <UserForm fetchUsers={fetchUsers} />
                <UserList key={refresh ? 'true' : 'false'} />
                </div>
            </div>
        </AppLayout>
    );
}

import TaskLogs from '@/components/TaskLogs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Activity Log',
        href: '/activitylog',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Log" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="activity-log-container w-full rounded-lg bg-white p-6 text-black shadow-lg">
                    <TaskLogs />
                </div>
            </div>
        </AppLayout>
    );
}

import { requireRole } from '@/lib/auth';
import AdminTabs from './AdminTabs';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Panel del dueño · Hoshito' };

export default async function AdminLayout({ children }) {
  await requireRole(['owner', 'dev']);
  return (
    <div className="with-tabs">
      {children}
      <AdminTabs />
    </div>
  );
}

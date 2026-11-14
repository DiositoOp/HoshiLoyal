import { requireRole } from '@/lib/auth';
import { pendingCount } from '@/lib/pending';
import StaffTabs from '@/components/StaffTabs';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Panel del dueño · Hoshito' };

export default async function AdminLayout({ children }) {
  const staff = await requireRole(['owner', 'dev']);
  return (
    <div className="with-tabs">
      {children}
      <StaffTabs role={staff.role} pending={await pendingCount(staff.restaurant_id)} />
    </div>
  );
}

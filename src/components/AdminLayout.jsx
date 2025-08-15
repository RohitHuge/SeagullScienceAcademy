import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-matte-black">
      <AdminSidebar />
      <AdminTopBar />
      <main className="ml-64 pt-16 p-6">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

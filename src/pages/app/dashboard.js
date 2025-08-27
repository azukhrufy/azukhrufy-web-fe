import AuthGuards from "@/guards/AuthGuards";
import DashboardLayout from "@/layouts/DashboardLayout";

Dashboard.getLayout = function getLayout(page) {
  return (
    <AuthGuards>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuards>
  );
};

export default function Dashboard() {
  return <div>Dashboard</div>;
}

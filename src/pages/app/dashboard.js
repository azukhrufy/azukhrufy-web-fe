import AuthGuards from "@/guards/AuthGuards";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";

Dashboard.getLayout = function getLayout(page) {
  return (
    <AuthGuards>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuards>
  );
};

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Azukhrufy Web</title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Dashboard</div>
    </>
  );
}

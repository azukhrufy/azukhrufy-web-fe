import AuthGuards from "@/guards/AuthGuards";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

AppIndex.getLayout = function getLayout(page) {
  return (
    <AuthGuards>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuards>
  );
};

/**
 * AppIndex component that redirects to the dashboard page when the router is ready.
 *
 * @component
 * @returns {null} This component does not render anything.
 *
 * @example
 * // Usage
 * <AppIndex />
 *
 * @function
 * @name AppIndex
 */
export default function AppIndex() {
  const router = useRouter();

  useEffect(() => {
    if (router?.isReady) {
      router.push("/app/dashboard");
    }
  }, [router]);
}

"use-client";
import PATHS from "@/const/path";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * AuthGuards component to protect routes based on user authentication status.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @param {boolean} [props.isObscured=false] - Flag to determine if the route should be obscured.
 *
 * @returns {React.ReactNode} The rendered children if authenticated, otherwise redirects.
 */
export default function AuthGuards({ children, isObscured = false }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!user && !loading) {
      toast({
        description: "Please login to continue",
        status: "info",
      });
      router.push(PATHS.auth.login);
    }

    if (isObscured) {
      setTimeout(() => {
        router.push(PATHS.error[404]);
      }, [1000]);
    }
  }, [user, loading, router, toast, isObscured]);

  return <>{children}</>;
}

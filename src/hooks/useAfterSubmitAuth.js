import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Custom hook to handle actions after a successful form submission.
 *
 * @param {boolean} isSubmitSuccessfull - Indicates whether the form submission was successful.
 * @param {Function} [callback] - Optional callback function to be executed after a successful submission.
 */
export default function useAfterSubmitAuth(isSubmitSuccessfull, callback) {
  const router = useRouter();
  useEffect(() => {
    if (!isSubmitSuccessfull) return;

    if (callback) {
      setTimeout(callback, 1000);
      return;
    }

    setTimeout(() => {
      router.push("/app/dashboard");
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessfull]);
}

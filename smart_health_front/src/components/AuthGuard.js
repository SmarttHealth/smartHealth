import { useEffect } from "react";

export default function AuthGuard({ children }) {
  useEffect(() => {
    const statusCode = localStorage.getItem('statusCode');
   console.log(statusCode);
    

    // Redirect to the login page if the status code is 401 (Unauthorized)
    if (statusCode === '401') {
      window.location.href = "/login";
    }
  }, []);

  // Render children if the user is authenticated
  return children;
}

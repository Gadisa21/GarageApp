"use client";
import { useSession } from "next-auth/react";  // To track the session state
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState,removeAuthState  } from "@/features/auth/authSlice";  

const AuthSync = () => {
  const { data: session } = useSession();  // Get the current session
  const dispatch = useDispatch();  // Get the Redux dispatch function

  useEffect(() => {
    // If session data exists (meaning the user is logged in)
    if (session?.user?.token) {
      dispatch(
        setAuthState({
          employee_id: session.user.employee_id,
          employee_email: session.user.employee_email,
          employee_first_name: session.user.employee_first_name,
          employee_role: session.user.employee_role,
          token: session.user.token,
        })
      );
    } else {
      // If no session, clear the auth state in Redux
      dispatch(removeAuthState());
    }
  }, [session]);  // This effect runs every time the session changes

  return null;  // This doesn't render any UI; it only syncs state
};

export default AuthSync;

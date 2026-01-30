import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthUser } from "../auth/hooks/useAuthUser";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, initialized } = useAuthUser();

  if (!initialized) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{user ? children : <Navigate to="/admin/login" />}</>;
}

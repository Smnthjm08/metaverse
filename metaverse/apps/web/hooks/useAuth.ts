import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user.api";

export const AUTH = "auth";

// staleTime keeps user data fresh indefinitely
const useAuth = (options = {}) => {
  const { data: user , ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...options,
  });
  return { user, ...rest };
};

export default useAuth;

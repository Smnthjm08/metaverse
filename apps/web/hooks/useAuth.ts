import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user.api";

export const AUTH = "auth";

interface User {
  avatar: string;
  name: string;
  username: string;
  email: string;
  id: string;
  verified: boolean;
  createdAt?: string; // Made optional to match schema
  updatedAt?: string; // Made optional to match schema
}

// staleTime keeps user data fresh indefinitely
type UseAuthReturn = {
  user: User | undefined;
  isLoading: boolean;
  [key: string]: any;
};

const useAuth = (options = {}): UseAuthReturn => {
  const {
    data,
    isLoading,
    ...option
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: 0,
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
    ...options,
  });

  if (!data) {
    return { user: undefined, isLoading, ...option };
  }
  console.log("useAuth data:", data);
  const user: User = data?.data;

  return { user, isLoading, ...option };
};

export default useAuth;
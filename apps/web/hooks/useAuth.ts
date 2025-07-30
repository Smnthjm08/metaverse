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
  createdAt: string;
  updatedAt: string;
}

type UseAuthReturn = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  isAuthenticated: boolean;
  refetch: () => void;
  [key: string]: any;
};

const useAuth = (options = {}): UseAuthReturn => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    ...otherOptions
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });

  // Handle case when query fails or returns no data
  if (isError || !data) {
    return { 
      user: undefined, 
      isLoading, 
      isError, 
      error,
      isAuthenticated: false,
      refetch,
      ...otherOptions 
    };
  }

  console.log("useAuth data:", data?.data);
  const user: User = data.data;

  return { 
    user, 
    isLoading, 
    isError, 
    error,
    isAuthenticated: !!user,
    refetch,
    ...otherOptions 
  };
};

export default useAuth;
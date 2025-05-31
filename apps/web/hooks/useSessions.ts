import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../api/sessions.api";

export const SESSIONS = "sessions";

const useSessions = (options = {}) => {
  const { data: sessions = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...options,
  });

  return { sessions, ...rest };
};

export default useSessions;

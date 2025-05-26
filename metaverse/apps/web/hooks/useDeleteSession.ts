import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "../api/sessions.api";

const useDeleteSession = (sessionId: number) => {
  const { mutate, ...options } = useMutation({
    mutationFn: () => deleteSession(sessionId),
  });
  return {deleteSession: mutate, ...options};
};


export default useDeleteSession;
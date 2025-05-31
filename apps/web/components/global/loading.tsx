import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin text-cyan-400" width={40} height={40} />
    </div>
  );
}

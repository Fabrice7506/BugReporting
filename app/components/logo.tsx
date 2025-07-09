// components/LogoBrand.tsx
import { Bug } from "lucide-react";

const LogoBrand = () => (
  <div className="flex items-center gap-2">
    <Bug className="h-6 w-6 text-primary" />
    <span className="font-bold text-lg">SnapBug</span>
  </div>
);

export default LogoBrand;

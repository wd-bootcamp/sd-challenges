import { useEffect, useState } from "react";

import { getHealth } from "@/api";
import { Badge } from "@/components/ui/badge";

/** Shows whether the backend answers GET /api/health (checks the proxy, too). */
export function ApiStatus() {
  const [state, setState] = useState<"checking" | "ok" | "down">("checking");

  useEffect(() => {
    getHealth()
      .then(() => setState("ok"))
      .catch(() => setState("down"));
  }, []);

  if (state === "checking") return null;
  return (
    <Badge
      variant={state === "ok" ? "secondary" : "destructive"}
      data-testid="api-status"
    >
      {state === "ok" ? "API: ok" : "API not reachable"}
    </Badge>
  );
}

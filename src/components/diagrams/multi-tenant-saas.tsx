import { FlowDiagram } from "./flow-diagram";

export function MultiTenantSaasDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={20}
      nodes={[
        { id: "request", x: 10, y: 84, w: 140, h: 52, label: "Request", sublabel: "Authorization: Bearer" },
        { id: "claims", x: 170, y: 84, w: 140, h: 52, label: "JWT Claims", sublabel: "tenant_schema, perms" },
        { id: "rbac", x: 330, y: 84, w: 140, h: 52, label: "RBAC Check", sublabel: "in-process map", accent: true },
        { id: "schema", x: 490, y: 84, w: 140, h: 52, label: "Tenant Schema", sublabel: "SET search_path" },
        { id: "response", x: 650, y: 84, w: 140, h: 52, label: "Response", sublabel: "scoped data" },
      ]}
      edges={[
        { d: "M150,110 L170,110" },
        { d: "M310,110 L330,110" },
        { d: "M470,110 L490,110" },
        { d: "M630,110 L650,110" },
      ]}
    />
  );
}

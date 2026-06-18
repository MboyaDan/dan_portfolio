import { FlowDiagram } from "./flow-diagram";

export function RequestLifecycleDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={20}
      nodes={[
        { id: "client", x: 10, y: 84, w: 140, h: 52, label: "Client", sublabel: "POST /bookings" },
        { id: "api", x: 170, y: 84, w: 140, h: 52, label: "Go API", sublabel: "validate request" },
        { id: "tx", x: 330, y: 84, w: 140, h: 52, label: "BEGIN TX", sublabel: "SELECT … FOR UPDATE", accent: true },
        { id: "db", x: 490, y: 84, w: 140, h: 52, label: "PostgreSQL", sublabel: "availability row" },
        { id: "res", x: 650, y: 84, w: 140, h: 52, label: "Response", sublabel: "201 booked" },
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

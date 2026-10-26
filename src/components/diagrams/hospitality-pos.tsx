import { FlowDiagram } from "./flow-diagram";

export function HospitalityPosDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 260"
      edgeLength={60}
      nodes={[
        { id: "app", x: 24, y: 104, w: 170, h: 52, label: "Next.js App", sublabel: "POS · rooms · back office" },
        { id: "api", x: 226, y: 104, w: 170, h: 52, label: "Go API", sublabel: "sessions · CSRF · idempotency", accent: true },
        { id: "orders", x: 430, y: 20, w: 170, h: 52, label: "Orders & Sales", sublabel: "shifts · refunds · print" },
        { id: "stock", x: 430, y: 104, w: 170, h: 52, label: "Stock Ledger", sublabel: "append-only movements" },
        { id: "rooms", x: 430, y: 188, w: 170, h: 52, label: "Rooms & Folios", sublabel: "no-overlap constraint" },
        { id: "db", x: 632, y: 104, w: 144, h: 52, label: "PostgreSQL", sublabel: "EXCLUDE · triggers", accent: true },
      ]}
      edges={[
        { d: "M194,130 L226,130" },
        { d: "M396,130 C413,130 413,46 430,46" },
        { d: "M396,130 L430,130" },
        { d: "M396,130 C413,130 413,214 430,214" },
        { d: "M600,46 C616,46 616,130 632,130" },
        { d: "M600,130 L632,130" },
        { d: "M600,214 C616,214 616,130 632,130" },
      ]}
    />
  );
}

import { FlowDiagram } from "./flow-diagram";

export function AdmissionsPipelineDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={20}
      nodes={[
        { id: "signin", x: 40, y: 30, w: 180, h: 52, label: "One-time Link", sublabel: "passwordless sign-in" },
        { id: "steps", x: 310, y: 30, w: 180, h: 52, label: "Autosave Steps", sublabel: "PUT per step" },
        { id: "docs", x: 580, y: 30, w: 180, h: 52, label: "Document Check", sublabel: "by content · re-encode", accent: true },
        { id: "submit", x: 580, y: 140, w: 180, h: 52, label: "Submit", sublabel: "Idempotency-Key", accent: true },
        { id: "snapshot", x: 310, y: 140, w: 180, h: 52, label: "Snapshot + Status", sublabel: "one transaction" },
        { id: "staff", x: 40, y: 140, w: 180, h: 52, label: "Staff Portal", sublabel: "review · decide" },
      ]}
      edges={[
        { d: "M220,56 L310,56" },
        { d: "M490,56 L580,56" },
        { d: "M670,82 L670,140" },
        { d: "M580,166 L490,166" },
        { d: "M310,166 L220,166" },
      ]}
    />
  );
}

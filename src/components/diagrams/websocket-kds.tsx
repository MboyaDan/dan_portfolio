import { FlowDiagram } from "./flow-diagram";

export function WebsocketKdsDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={24}
      nodes={[
        { id: "waiter", x: 24, y: 84, w: 170, h: 52, label: "Waiter App", sublabel: "places order" },
        { id: "api", x: 218, y: 84, w: 170, h: 52, label: "Go API", sublabel: "writes order" },
        { id: "redis", x: 412, y: 84, w: 170, h: 52, label: "Redis Pub/Sub", sublabel: "branch channel", accent: true },
        { id: "kds", x: 606, y: 84, w: 170, h: 52, label: "Kitchen Display", sublabel: "<200ms update" },
      ]}
      edges={[
        { d: "M194,110 L218,110" },
        { d: "M388,110 L412,110" },
        { d: "M582,110 L606,110" },
      ]}
    />
  );
}

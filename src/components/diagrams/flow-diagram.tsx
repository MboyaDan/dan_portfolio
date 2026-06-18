interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  accent?: boolean;
}

interface DiagramEdge {
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
}

interface FlowDiagramProps {
  viewBox: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** approximate length of each edge path, used for the dash animation */
  edgeLength?: number;
}

export function FlowDiagram({ viewBox, nodes, edges, edgeLength = 200 }: FlowDiagramProps) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      role="img"
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-muted)" />
        </marker>
      </defs>

      {/* edges drawn first, beneath nodes */}
      {edges.map((edge, i) => (
        <g key={i}>
          <path
            d={edge.d}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />
          <path
            d={edge.d}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`4 ${Math.max(edgeLength - 4, 8)}`}
            opacity="0.9"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={-edgeLength}
              dur="3.5s"
              repeatCount="indefinite"
            />
          </path>
          {edge.label && (
            <text
              x={edge.labelX}
              y={edge.labelY}
              textAnchor="middle"
              className="fill-current text-muted"
              style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            >
              {edge.label}
            </text>
          )}
        </g>
      ))}

      {/* nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="6"
            fill="var(--color-surface)"
            stroke={node.accent ? "var(--color-accent)" : "var(--color-border)"}
            strokeWidth={node.accent ? 1.5 : 1}
          />
          <text
            x={node.x + node.w / 2}
            y={node.y + node.h / 2 + (node.sublabel ? -4 : 4)}
            textAnchor="middle"
            className="fill-current text-foreground"
            style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 500 }}
          >
            {node.label}
          </text>
          {node.sublabel && (
            <text
              x={node.x + node.w / 2}
              y={node.y + node.h / 2 + 12}
              textAnchor="middle"
              className="fill-current text-muted"
              style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}
            >
              {node.sublabel}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

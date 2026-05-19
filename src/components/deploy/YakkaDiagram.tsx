const VB_W = 260
const VB_H = 176

/** Right edge of flavor group */
const FLAVOR_R = 94
/** Left / right of GO_API */
const API_L = 112
const API_R = 154
const API_W = API_R - API_L

const FLAVOR_A_CY = 52
const FLAVOR_B_CY = 122

const ADMIN_L = 188
const ADMIN_CY = 48
const DB_CY = 128

function arrowH(x1: number, y: number, x2: number) {
  return `M ${x1} ${y} H ${x2}`
}

function arrowElbow(x1: number, y1: number, x2: number, y2: number, bendX: number) {
  return `M ${x1} ${y1} H ${bendX} V ${y2} H ${x2}`
}

export default function YakkaDiagram() {
  return (
    <svg
      className="w-full h-full stroke-current"
      fill="none"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <marker
          id="yakka-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0 0 L7 3.5 L0 7 Z" className="fill-current" />
        </marker>
      </defs>

      <text
        className="font-mono-ui text-[6px] fill-steel stroke-none"
        textAnchor="middle"
        x={47}
        y={12}
      >
        FLUTTER FLAVORS
      </text>

      {/* ── Flavor A ── */}
      <rect
        className="stroke-primary/70"
        x={10}
        y={26}
        width={84}
        height={52}
        strokeDasharray="4 3"
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[7px] fill-primary stroke-none"
        textAnchor="middle"
        x={52}
        y={36}
      >
        FLAVOR_A
      </text>
      <rect
        className="stroke-primary fill-primary/10"
        x={16}
        y={42}
        width={32}
        height={24}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={32}
        y={56}
      >
        MOBILE
      </text>
      <rect
        className="stroke-primary fill-primary/5"
        x={56}
        y={42}
        width={32}
        height={24}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={72}
        y={56}
      >
        WEB
      </text>
      <path
        d="M 48 54 H 56"
        className="stroke-primary/50"
        strokeDasharray="2 2"
        strokeWidth={1}
      />

      {/* ── Flavor B ── */}
      <rect
        className="stroke-primary/70"
        x={10}
        y={96}
        width={84}
        height={52}
        strokeDasharray="4 3"
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[7px] fill-primary stroke-none"
        textAnchor="middle"
        x={52}
        y={106}
      >
        FLAVOR_B
      </text>
      <rect
        className="stroke-primary fill-primary/10"
        x={16}
        y={112}
        width={32}
        height={24}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={32}
        y={126}
      >
        MOBILE
      </text>
      <rect
        className="stroke-primary fill-primary/5"
        x={56}
        y={112}
        width={32}
        height={24}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={72}
        y={126}
      >
        WEB
      </text>
      <path
        d="M 48 124 H 56"
        className="stroke-primary/50"
        strokeDasharray="2 2"
        strokeWidth={1}
      />

      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={52}
        y={168}
      >
        same stack / per marca
      </text>

      {/* ── Golang API (spans both flavor rows) ── */}
      <rect
        className="stroke-concrete group-hover:stroke-primary transition-none"
        x={API_L}
        y={34}
        width={API_W}
        height={108}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        x={API_L + API_W / 2}
        y={92}
      >
        GO_API
      </text>

      {/* ── Next.js admin ── */}
      <rect
        className="stroke-concrete"
        x={ADMIN_L}
        y={30}
        width={58}
        height={36}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={ADMIN_L + 29}
        y={44}
      >
        NEXT_ADMIN
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={ADMIN_L + 29}
        y={54}
      >
        (OPS WEB)
      </text>

      {/* ── PostgreSQL ── */}
      <rect
        className="stroke-concrete"
        x={ADMIN_L}
        y={110}
        width={58}
        height={36}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={ADMIN_L + 29}
        y={132}
      >
        POSTGRES
      </text>

      {/* Flavor A → API (center-aligned) */}
      <path
        d={arrowH(FLAVOR_R, FLAVOR_A_CY, API_L)}
        className="stroke-primary"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#yakka-arrow)"
      />

      {/* Flavor B → API */}
      <path
        d={arrowH(FLAVOR_R, FLAVOR_B_CY, API_L)}
        className="stroke-primary"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#yakka-arrow)"
      />

      {/* API → Next admin (elbow, aligned to box centers) */}
      <path
        d={arrowElbow(API_R, ADMIN_CY, ADMIN_L, ADMIN_CY, API_R + 14)}
        className="stroke-concrete"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#yakka-arrow)"
      />

      {/* API → Postgres */}
      <path
        d={arrowElbow(API_R, DB_CY, ADMIN_L, DB_CY, API_R + 14)}
        className="stroke-concrete"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#yakka-arrow)"
      />
    </svg>
  )
}

const VB_W = 260
const VB_H = 188

const WASI_R = 72
const CH_L = 10
const CH_W = 78
const API_L = 98
const API_W = 46
const MOD_L = 158
const MOD_W = 56

const ROW1_Y = 38
const ROW2_Y = 98
const API_Y = 44
const API_H = 88
const MOD1_Y = 32
const MOD2_Y = 108

function arrowH(x1: number, y: number, x2: number) {
  return `M ${x1} ${y} H ${x2}`
}

function arrowElbow(x1: number, y1: number, x2: number, y2: number, bendX: number) {
  return `M ${x1} ${y1} H ${bendX} V ${y2} H ${x2}`
}

export default function SaeEcosystemDiagram() {
  const brokerCy = ROW1_Y + 16
  const registryCy = ROW2_Y + 16
  const apiCx = API_L + API_W / 2
  const apiMidY = API_Y + API_H / 2
  const auctionCy = MOD1_Y + 18
  const dbCy = MOD2_Y + 18

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
          id="sae-arrow"
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
        x={130}
        y={12}
      >
        SAE DIGITAL ECOSYSTEM
      </text>

      {/* Legacy WASI */}
      <rect
        className="stroke-steel/60"
        x={8}
        y={16}
        width={WASI_R}
        height={22}
        strokeDasharray="3 2"
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-steel stroke-none"
        textAnchor="middle"
        x={8 + WASI_R / 2}
        y={30}
      >
        WASI (LEGACY)
      </text>
      <path
        d={arrowElbow(WASI_R + 8, 27, API_L, API_Y + 8, 88)}
        className="stroke-steel/50"
        strokeDasharray="2 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={84}
        y={22}
      >
        migrate
      </text>

      {/* Broker web */}
      <rect
        className="stroke-primary fill-primary/10"
        x={CH_L}
        y={ROW1_Y}
        width={CH_W}
        height={32}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[7px] fill-primary stroke-none"
        textAnchor="middle"
        x={CH_L + CH_W / 2}
        y={ROW1_Y + 12}
      >
        BROKER_WEB
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={CH_L + CH_W / 2}
        y={ROW1_Y + 22}
      >
        (NEXT.JS)
      </text>

      {/* Actibox registry */}
      <rect
        className="stroke-primary/80 fill-primary/5"
        x={CH_L}
        y={ROW2_Y}
        width={CH_W}
        height={32}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-primary stroke-none"
        textAnchor="middle"
        x={CH_L + CH_W / 2}
        y={ROW2_Y + 14}
      >
        ACTIBOX_REG
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={CH_L + CH_W / 2}
        y={ROW2_Y + 24}
      >
        (INVENTORY)
      </text>

      {/* Golang API hub */}
      <rect
        className="stroke-concrete group-hover:stroke-primary transition-none"
        x={API_L}
        y={API_Y}
        width={API_W}
        height={API_H}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        x={apiCx}
        y={apiMidY - 4}
      >
        GO_API
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={apiCx}
        y={apiMidY + 8}
      >
        core
      </text>

      {/* Actibox auction */}
      <rect
        className="stroke-concrete"
        x={MOD_L}
        y={MOD1_Y}
        width={MOD_W}
        height={36}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={MOD_L + MOD_W / 2}
        y={MOD1_Y + 14}
      >
        ACTIBOX_AUC
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={MOD_L + MOD_W / 2}
        y={MOD1_Y + 24}
      >
        (AUCTION)
      </text>

      {/* PostgreSQL */}
      <rect
        className="stroke-concrete"
        x={MOD_L}
        y={MOD2_Y}
        width={MOD_W}
        height={36}
        strokeWidth={1}
      />
      <text
        className="font-mono-ui text-[6px] fill-current stroke-none"
        textAnchor="middle"
        x={MOD_L + MOD_W / 2}
        y={MOD2_Y + 14}
      >
        POSTGRES
      </text>
      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={MOD_L + MOD_W / 2}
        y={MOD2_Y + 24}
      >
        (DATA)
      </text>

      <text
        className="font-mono-ui text-[5px] fill-steel stroke-none"
        textAnchor="middle"
        x={130}
        y={182}
      >
        golang · next.js · no legacy runtime
      </text>

      <path
        d={arrowH(CH_L + CH_W, brokerCy, API_L)}
        className="stroke-primary"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
      <path
        d={arrowH(CH_L + CH_W, registryCy, API_L)}
        className="stroke-primary"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
      <path
        d={arrowElbow(API_L + API_W, auctionCy, MOD_L, auctionCy, API_L + API_W + 10)}
        className="stroke-concrete"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
      <path
        d={arrowElbow(API_L + API_W, dbCy, MOD_L, dbCy, API_L + API_W + 10)}
        className="stroke-concrete"
        strokeDasharray="3 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
      <path
        d={arrowElbow(MOD_L + MOD_W / 2, MOD1_Y + 36, MOD_L + MOD_W / 2, MOD2_Y, MOD_L + MOD_W / 2)}
        className="stroke-concrete/60"
        strokeDasharray="2 2"
        strokeWidth={1}
        markerEnd="url(#sae-arrow)"
      />
    </svg>
  )
}

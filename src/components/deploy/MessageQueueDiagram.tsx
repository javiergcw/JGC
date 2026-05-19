export default function MessageQueueDiagram() {
  return (
    <svg
      className="w-full h-full stroke-current stroke-1"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        className="stroke-primary group-hover:fill-primary/10 transition-none"
        height="40"
        width="40"
        x="20"
        y="80"
      />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        x="40"
        y="105"
      >
        PUB
      </text>
      <rect
        className="stroke-concrete group-hover:stroke-primary transition-none"
        height="160"
        width="40"
        x="80"
        y="20"
      />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        transform="rotate(-90 100 105)"
        x="100"
        y="105"
      >
        BROKER_CORE
      </text>
      <rect className="stroke-concrete" height="30" width="40" x="140" y="40" />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        x="160"
        y="58"
      >
        SUB_1
      </text>
      <rect className="stroke-concrete" height="30" width="40" x="140" y="130" />
      <text
        className="font-mono-ui text-[8px] fill-current stroke-none"
        textAnchor="middle"
        x="160"
        y="148"
      >
        SUB_2
      </text>
      <path d="M60 100 H 80" strokeDasharray="2 2" />
      <path d="M120 55 H 140" strokeDasharray="2 2" />
      <path d="M120 145 H 140" strokeDasharray="2 2" />
      <polygon
        className="fill-current stroke-none"
        points="76,98 80,100 76,102"
      />
      <polygon
        className="fill-current stroke-none"
        points="136,53 140,55 136,57"
      />
      <polygon
        className="fill-current stroke-none"
        points="136,143 140,145 136,147"
      />
    </svg>
  )
}

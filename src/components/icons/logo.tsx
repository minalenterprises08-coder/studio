export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g>
        {/* M Shape - uses primary color */}
        <path
          d="M10 85 V 15 H 25 L 50 55 L 75 15 H 90 V 85 H 75 V 35 L 55 75 H 45 L 25 35 V 85 H 10 Z"
          className="fill-primary"
        />
        {/* E Shape overlay - uses accent color */}
        <path
          d="M20 55 H 70 V 70 H 20 V 55 Z"
          fill="hsl(var(--accent))"
        />
        <path
          d="M20 35 H 80 V 50 H 20 V 35 Z"
          fill="hsl(var(--accent))"
        />
      </g>
    </svg>
  );
}

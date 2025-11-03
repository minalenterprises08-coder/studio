export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g>
        {/* Red A-shape */}
        <path
          d="M40 85 L58 15 H72 L90 85 H75 L68 65 H52 L45 85 H40 Z M55 55 H65 L60 30 Z"
          className="fill-primary"
        />
        {/* Blue bars */}
        <path d="M10 85 L28 15 H38 L20 85 H10 Z" fill="#2E67B2" />
        <path d="M25 85 L43 15 H53 L35 85 H25 Z" fill="#4B9CE2" />
      </g>
    </svg>
  );
}

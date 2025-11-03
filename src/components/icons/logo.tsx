export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_105_2)">
        <path
          d="M0 0H100V100H0V0Z"
          className="fill-primary/10 stroke-primary/20"
        />
        <path
          d="M50 0L100 50L50 100L0 50L50 0Z"
          className="fill-background"
        />
        <path
          d="M50 15L85 50L50 85L15 50L50 15Z"
          className="stroke-primary"
          strokeWidth="4"
        />
        <path
          d="M50 25L75 50L50 75L25 50L50 25Z"
          className="fill-accent"
        />
        <path
          d="M50 35L65 50L50 65L35 50L50 35Z"
          className="fill-background"
        />
        <path
          d="M50 42L58 50L50 58L42 50L50 42Z"
          className="fill-primary"
        />
      </g>
      <defs>
        <clipPath id="clip0_105_2">
          <rect width="100" height="100" rx="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

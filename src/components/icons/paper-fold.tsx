export function PaperFoldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2 12 12" />
      <path d="M22 2v6h-6" />
      <path d="M12 12 2 22" />
      <path d="M2 22V12h10" />
    </svg>
  );
}

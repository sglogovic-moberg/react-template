import { IconSVGProps } from "./types";

const DashIcon = ({ height = 4, width = 16, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M2 2H6H10H14" stroke="#002649" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default DashIcon;

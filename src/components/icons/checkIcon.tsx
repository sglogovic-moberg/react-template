import { IconSVGProps } from "./types";

const CheckIcon = ({ height = 13, width = 16, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M2 7L6 11L14 2" stroke="#002649" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default CheckIcon;

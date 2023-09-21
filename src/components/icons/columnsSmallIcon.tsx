import { IconSVGProps } from "./types";

const ColumnsSmallIcon = ({ height = 16, width = 16, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.6 0.666656C0.7175 0.666656 0 1.38416 0 2.26666V10.2667C0 11.1492 0.7175 11.8667 1.6 11.8667H14.4C15.2825 11.8667 16 11.1492 16 10.2667V2.26666C16 1.38416 15.2825 0.666656 14.4 0.666656H1.6ZM4.8 2.26666V10.2667H1.6V2.26666H4.8ZM6.4 2.26666H9.6V10.2667H6.4V2.26666ZM14.4 2.26666V10.2667H11.2V2.26666H14.4Z"
            fill="#002649"
        />
    </svg>
);

export default ColumnsSmallIcon;

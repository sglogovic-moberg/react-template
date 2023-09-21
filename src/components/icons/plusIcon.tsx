import { IconSVGProps } from "./types";

const PlusIcon = ({ height = 14, width = 14, color }: IconSVGProps) => (
    <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.83398 1.5C7.83398 0.946875 7.38711 0.5 6.83398 0.5C6.28086 0.5 5.83398 0.946875 5.83398 1.5V6H1.33398C0.780859 6 0.333984 6.44688 0.333984 7C0.333984 7.55312 0.780859 8 1.33398 8H5.83398V12.5C5.83398 13.0531 6.28086 13.5 6.83398 13.5C7.38711 13.5 7.83398 13.0531 7.83398 12.5V8H12.334C12.8871 8 13.334 7.55312 13.334 7C13.334 6.44688 12.8871 6 12.334 6H7.83398V1.5Z"
            fill={color}
        />
    </svg>
);

export default PlusIcon;

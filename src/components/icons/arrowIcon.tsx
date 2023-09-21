import { IconSVGProps } from "./types";

const AngleIcon = ({ height = 14, width = 12, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.70664 0.792969C7.31602 0.402344 6.68164 0.402344 6.29102 0.792969L1.29102 5.79297C0.900391 6.18359 0.900391 6.81797 1.29102 7.20859C1.68164 7.59922 2.31602 7.59922 2.70664 7.20859L6.00039 3.91172V13.4992C6.00039 14.0523 6.44727 14.4992 7.00039 14.4992C7.55352 14.4992 8.00039 14.0523 8.00039 13.4992V3.91172L11.2941 7.20547C11.6848 7.59609 12.3191 7.59609 12.7098 7.20547C13.1004 6.81484 13.1004 6.18047 12.7098 5.78984L7.70977 0.789844L7.70664 0.792969Z"
            fill="#5B8206"
        />
    </svg>
);

export default AngleIcon;

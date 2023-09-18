import { IconSVGProps } from "./types";

const AngleIcon = ({ height = 18, width = 12, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${12} ${18}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.8152 10.0629C11.4012 9.47694 11.4012 8.52538 10.8152 7.93945L3.31523 0.439447C2.72929 -0.14649 1.77773 -0.14649 1.19179 0.439447C0.60585 1.02538 0.60585 1.97695 1.19179 2.56288L7.63242 9.00351L1.19647 15.4441C0.610537 16.0301 0.610537 16.9816 1.19647 17.5676C1.78241 18.1535 2.73398 18.1535 3.31991 17.5676L10.8199 10.0676L10.8152 10.0629Z"
            fill="currentColor"
        />
    </svg>
);

export default AngleIcon;

import { IconSVGProps } from "./types";

const CancelSmallIcon = ({ height = 14, width = 14, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.2721 2.61039C13.7926 2.0898 13.7926 1.24436 13.2721 0.72377C12.7515 0.203181 11.906 0.203181 11.3854 0.72377L7 5.11338L2.61039 0.727935C2.0898 0.207346 1.24437 0.207346 0.723776 0.727935C0.203187 1.24852 0.203187 2.09396 0.723776 2.61455L5.11338 6.99999L0.727941 11.3896C0.207351 11.9102 0.207351 12.7556 0.727941 13.2762C1.24853 13.7968 2.09397 13.7968 2.61456 13.2762L7 8.88661L11.3896 13.2721C11.9102 13.7926 12.7556 13.7926 13.2762 13.2721C13.7968 12.7515 13.7968 11.906 13.2762 11.3854L8.88662 6.99999L13.2721 2.61039Z"
            fill="#002649"
        />
    </svg>
);

export default CancelSmallIcon;

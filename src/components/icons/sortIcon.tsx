import { IconSVGProps } from "./types";

interface ExtendedIconSVGProps extends IconSVGProps {
    "data-id"?: string;
}

const SortIcon = ({ height = 16, width = 16, className, ...props }: ExtendedIconSVGProps) => (
    <svg
        data-id={props["data-id"]}
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            data-id={props["data-id"]}
            d="M4.23442 10.4239L7.43409 13.756C7.74655 14.0813 8.254 14.0813 8.56647 13.756L11.7661 10.4239C11.9936 10.1844 12.0636 9.8278 11.9386 9.51542C11.8136 9.20305 11.5212 9 11.1987 9H4.80186C4.47689 9 4.18692 9.20305 4.06194 9.51542C3.93695 9.8278 4.00444 10.1844 4.23442 10.4239Z"
            fill="#72889d"
        />
        <path
            data-id={props["data-id"]}
            d="M4.23442 5.57608L7.43409 2.24405C7.74655 1.91865 8.254 1.91865 8.56647 2.24405L11.7661 5.57608C11.9936 5.81557 12.0636 6.1722 11.9386 6.48458C11.8136 6.79695 11.5212 7 11.1987 7H4.80186C4.47689 7 4.18692 6.79695 4.06194 6.48458C3.93695 6.1722 4.00444 5.81557 4.23442 5.57608Z"
            fill="#72889d"
        />
    </svg>
);

export default SortIcon;

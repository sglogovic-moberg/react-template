import { IconSVGProps } from "./types";

const HamburgerMenuIcon = ({ height = 24, width = 24, className }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20.5714 5.83333H3.42857C2.63973 5.83333 2 5.20026 2 4.41667C2 3.6344 2.63973 3 3.42857 3H20.5714C21.3616 3 22 3.6344 22 4.41667C22 5.20026 21.3616 5.83333 20.5714 5.83333ZM20.5714 20H3.42857C2.63973 20 2 19.3669 2 18.5833C2 17.7997 2.63973 17.1667 3.42857 17.1667H20.5714C21.3616 17.1667 22 17.7997 22 18.5833C22 19.3669 21.3616 20 20.5714 20Z"
            fill="#002649"
        />
        <path
            opacity="0.4"
            d="M2 11.5C2 10.6703 2.41583 10 2.92857 10H14.0714C14.585 10 15 10.6703 15 11.5C15 12.3297 14.585 13 14.0714 13H2.92857C2.41583 13 2 12.3297 2 11.5Z"
            fill="#002649"
        />
    </svg>
);

export default HamburgerMenuIcon;

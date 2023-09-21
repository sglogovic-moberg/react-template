import { IconSVGProps } from "./types";

const ErrorWarningIcon = ({ height = 24, width = 24, className, fill, style }: IconSVGProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={style}
        fill={fill ?? "none"}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_365_4133)">
            <path
                d="M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM12 21.75C6.62344 21.75 2.25 17.3761 2.25 12C2.25 6.62391 6.62344 2.25 12 2.25C17.3766 2.25 21.75 6.62391 21.75 12C21.75 17.3761 17.3766 21.75 12 21.75ZM12 14.25C12.6211 14.25 13.125 13.7461 13.125 13.125V7.125C13.125 6.50625 12.6234 6 12 6C11.3766 6 10.875 6.50625 10.875 7.125V13.125C10.875 13.7484 11.3813 14.25 12 14.25ZM12 15.8016C11.1862 15.8016 10.5262 16.4616 10.5262 17.2753C10.5281 18.0891 11.1844 18.75 12 18.75C12.8156 18.75 13.4738 18.09 13.4738 17.2762C13.4719 16.4625 12.8156 15.8016 12 15.8016Z"
                fill="#002649"
            />
        </g>
    </svg>
);

export default ErrorWarningIcon;

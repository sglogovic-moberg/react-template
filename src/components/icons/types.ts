import * as React from "react";

type SVGAddons = {
    height?: number | string;
    width?: number | string;
    className?: string;
    color?: string;
};

export type IconSVGProps = React.SVGProps<SVGSVGElement> & SVGAddons;

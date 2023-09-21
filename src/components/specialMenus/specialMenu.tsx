import classNames from "classnames";
import React, { useRef } from "react";
import { useOutsideAlerter } from "utils/customHooks";
import "./specialMenu.scss";
import CancelSmallIcon from "components/icons/cancelSmallIcon";

interface ISpecialMenuProps {
    bodyNode?: React.ReactNode;
    footerNode?: React.ReactNode;
    text: React.ReactNode | string;
    icon?: React.ReactNode;
    isActive?: boolean;
    isMenuOpen: boolean;
    setSpecialMenuVisibilty: (isOpen: boolean) => void;
}

const SpecialMenu = (props: ISpecialMenuProps) => {
    const wrapperRef = useRef(null);

    const toggleMenu = () => {
        props.setSpecialMenuVisibilty(!props.isMenuOpen);
    };

    const openMenu = () => {
        if (!props.isMenuOpen) {
            props.setSpecialMenuVisibilty(true);
        }
    };

    const closeMenu = () => {
        if (props.isMenuOpen) {
            props.setSpecialMenuVisibilty(false);
        }
    };

    useOutsideAlerter(wrapperRef, closeMenu, wrapperRef);

    return (
        <div className="special-menus__wrap">
            <div
                className={classNames("special-menus", {
                    "menu-open": props.isMenuOpen,
                })}
                onClick={openMenu}
                ref={wrapperRef}
            >
                <div
                    className={classNames("special-menus__button", {
                        "menu-open": props.isMenuOpen,
                        "menu-active": !props.isMenuOpen && props.isActive,
                    })}
                    onClick={toggleMenu}
                >
                    <div className="special-menus__button--left">
                        <div className="special-menus__button-icon">{props.icon}</div>
                        <div className="special-menus__button-text">{props.text}</div>
                    </div>
                    <div className={"special-menus__button--close"} onClick={toggleMenu}>
                        <CancelSmallIcon />
                    </div>
                </div>
                <div
                    className={classNames("special-menus__menu", {
                        "menu-open": props.isMenuOpen,
                    })}
                >
                    {props.bodyNode}
                </div>
                <div
                    className={classNames("special-menus__footer", {
                        "menu-open": props.isMenuOpen,
                    })}
                >
                    {props.footerNode}
                </div>
            </div>
            <div className="special-menus__button special-menus__placeholder">
                <div className="special-menus__button--left">
                    <div className="special-menus__button--icon">{props.icon}</div>
                    <div className="special-menus__button--text">{props.text}</div>
                </div>
            </div>
        </div>
    );
};

export default SpecialMenu;

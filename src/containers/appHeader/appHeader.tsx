import logo from "assets/images/logo.svg";
import classNames from "classnames";
import MainNavigation from "containers/appHeader/mainNavigation/mainNavigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StringResources } from "utils/language/languageResource";
import "./appHeader.scss";
import HamburgerMenuIcon from "components/icons/hamburgerMenuIcon";
import CancelIcon from "components/icons/cancelIcon";
import AngleIcon from "components/icons/angleIcon";

const matchExpandedBreakpoint = window.matchMedia("screen and (min-width: 1440px)");

interface IHeaderProps {
    toggleHeaderExpandedState: Function;
}

const AppHeader = ({ toggleHeaderExpandedState }: IHeaderProps) => {
    const { t } = useTranslation();
    const [isMainNavOpen, setIsMainNavOpen] = useState(false);
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

    useEffect(() => {
        if (matchExpandedBreakpoint.matches) {
            setIsHeaderExpanded(true);
            toggleHeaderExpandedState();
        }
    }, []);

    const toggleMobileNavigation = () => {
        setIsMainNavOpen(!isMainNavOpen);
    };

    const toggleWidth = () => {
        setIsHeaderExpanded(!isHeaderExpanded);
        toggleHeaderExpandedState();
    };

    return (
        <header
            className={classNames("app-header", {
                "app-header--is-expanded": isHeaderExpanded,
            })}
        >
            <div className="app-header__wrap">
                <button
                    type="button"
                    className={classNames("app-header__toggle-mobile-nav-action", {
                        "app-header__toggle-mobile-nav-action--is-open": isMainNavOpen,
                    })}
                    onClick={toggleMobileNavigation}
                >
                    <HamburgerMenuIcon className="app-header__menu-icon" />
                    <CancelIcon className="app-header__cancel-icon" />
                </button>

                <Link to="/" className="app-header__logo">
                    <img
                        height="10"
                        width="40"
                        src={logo}
                        alt="Straumur - Merchant Portal"
                        className="app-header__logo-image"
                    />
                </Link>

                <button className="app-header__toggle-width-action" onClick={toggleWidth}>
                    <AngleIcon />
                </button>
            </div>

            <MainNavigation
                isOpen={isMainNavOpen}
                isExpanded={isHeaderExpanded}
                closeNavigation={toggleMobileNavigation}
            />
        </header>
    );
};

export default AppHeader;

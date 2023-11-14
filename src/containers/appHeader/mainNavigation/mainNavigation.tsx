import classNames from "classnames";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { adminLogoutThunk } from "redux/actions/authActions";
import { RootState, useAppDispatch } from "redux/store";
import { StringResources } from "utils/language/languageResource";
import { PortalRouteElements } from "utils/routing/pathsAndElements";
import { setRedirectToLastRoute } from "utils/storageActions";
import "./mainNavigation.scss";
import { GlobalLangaugeSelector } from "components/languageSelector/languageSelector";
import { useSelector } from "react-redux";

interface IMainNavigationProps {
    isOpen: boolean;
    isExpanded: boolean;
    closeNavigation: Function;
}

const MainNavigation = ({ isOpen, isExpanded, closeNavigation }: IMainNavigationProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    let location = useLocation();
    const [isMainNavScrollable, setIsMainNavScrollable] = useState(false);
    const currentPermission = useSelector((state: RootState) => state.auth.userRole);

    useEffect(() => {
        // Calculation for the thin border that appears on the top side of the bottom (secondary) navigation when the window height is smaller than the overall height of the navigation.
        const windowHeight = window.innerHeight;
        const headerWrapEl = document.querySelector(".app-header__wrap") as HTMLElement;
        const primaryNavigationEl = document.querySelector(".main-nav__list--primary") as HTMLElement;
        const secondaryNavigationEl = document.querySelector(".main-nav__list--secondary") as HTMLElement;
        const additionalPaddingValues = 23;

        const elementsHeightSum =
            headerWrapEl.offsetHeight +
            primaryNavigationEl.scrollHeight +
            secondaryNavigationEl.offsetHeight +
            additionalPaddingValues;

        if (windowHeight < elementsHeightSum) {
            setIsMainNavScrollable(true);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            closeNavigation();
        }
    }, [location]);

    const logOut = () => {
        setRedirectToLastRoute(false);
        dispatch(adminLogoutThunk());
    };

    return (
        <nav
            className={classNames("main-nav", {
                "main-nav--is-open": isOpen,
                "main-nav--is-expanded": isExpanded,
            })}
        >
            <div className={"main-nav__list-wrap"}>
                <ul className="main-nav__list main-nav__list--primary">
                    {PortalRouteElements.map((navItem, index) => {
                        if (navItem.permission && navItem.permission !== currentPermission) {
                            return;
                        }
                        return (
                            <li className="main-nav__list-item" key={index}>
                                <OverlayTrigger
                                    delay={{ show: 500, hide: 100 }}
                                    placement="right"
                                    overlay={
                                        isExpanded ? (
                                            <></>
                                        ) : (
                                            <Tooltip bsPrefix={"main-nav__tooltip tooltip"}>{`${t(
                                                navItem.label
                                            )}`}</Tooltip>
                                        )
                                    }
                                >
                                    <NavLink to={navItem.path} className="main-nav__action">
                                        <span className="main-nav__action-text">{`${t(navItem.label)}`}</span>
                                    </NavLink>
                                </OverlayTrigger>
                            </li>
                        );
                    })}
                </ul>
                <ul
                    className={classNames("main-nav__list main-nav__list--secondary", {
                        "main-nav__list--with-border": isMainNavScrollable,
                    })}
                >
                    <GlobalLangaugeSelector className="app-login__lang-select" />
                    <li className="main-nav__list-item main-nav__list-item--with-extra-spacing">
                        <button className="main-nav__logout-action" onClick={logOut}>
                            <span className="main-nav__action-text">{`${t(
                                StringResources.mainNavigation.logout
                            )}`}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MainNavigation;

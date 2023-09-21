import { Transition } from "react-transition-group"; // ES6
import React, { useRef } from "react";
import "./infoDrawer.scss";
import AngleIcon from "components/icons/angleIcon";

interface IInfoDrawerProps {
    content: React.ReactNode;
    isOpen: boolean;
    onCloseDrawer: () => void;
}

const InfoDrawer = (props: IInfoDrawerProps) => {
    const { content, isOpen, onCloseDrawer } = props;
    const nodeRef = useRef(null);

    const onCloseDrawerClick = () => {
        onCloseDrawer();
    };

    const transitionStyles = {
        entering: { width: 500 },
        entered: { width: 500 },
        exiting: { width: 0 },
        exited: { width: 0 },
        unmounted: { width: 0 },
    };

    return (
        <Transition nodeRef={nodeRef} in={isOpen} timeout={500} mountOnEnter={true} unmountOnExit={true}>
            {state => (
                <div
                    ref={nodeRef}
                    className={"information-drawer"}
                    key="infoDrawer"
                    style={{
                        transition: `width 500ms ease-in-out`,
                        ...transitionStyles[state],
                    }}
                >
                    <button className="information-drawer__close-action" onClick={onCloseDrawerClick}>
                        <AngleIcon className={`information-drawer__icon information-drawer__icon--${state}`} />
                    </button>
                    {content}
                </div>
            )}
        </Transition>
    );
};

export default InfoDrawer;

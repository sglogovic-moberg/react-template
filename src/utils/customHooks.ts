import { AsyncThunk } from "@reduxjs/toolkit";
import { useState, useEffect, useRef } from "react";
import modalThunkActions from "redux/actions/modalAction";
import { OpenModalPayload } from "redux/models/modalModels";
import { useAppDispatch } from "redux/store";

export function useContainerThunkDispatch<ReturnType, ArgumentType>(
    thunkAction?: AsyncThunk<ReturnType, ArgumentType, {}>,
    args?: ArgumentType
) {
    const appDispatch = useAppDispatch();
    const [status, setStatus] = useState<{
        loading: boolean;
        isValid: boolean;
        error?: Error;
        data?: ReturnType;
    }>({
        loading: true,
        isValid: false,
    });

    const executeRequest = (thunkAction: AsyncThunk<ReturnType, ArgumentType, {}>, args: ArgumentType) => {
        appDispatch(thunkAction(args))
            .unwrap()
            .then((data: any) => {
                setStatus({
                    loading: false,
                    isValid: true,
                    data,
                });
            })
            .catch((error: any) => {
                setStatus({
                    loading: false,
                    isValid: false,
                    error,
                });
            });
    };

    useEffect(() => {
        if (thunkAction && args) {
            executeRequest(thunkAction, args);
        }
    }, []);

    return { ...status, executeRequest };
}

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, onOutSideClick: () => void, ignoredRef: any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                ignoredRef.current &&
                !ignoredRef.current.contains(event.target)
            ) {
                onOutSideClick();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, ignoredRef, onOutSideClick]);
}
/**
 * Easily retrieve media dimensions with this Hook React which also works onResize.
 * @param query retrive string e.g. '(max-width: 768px)'
 * @returns boolean 
 */
export function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    function handleChange() {
        setMatches(getMatches(query));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if query changes
        handleChange();

        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return matches;
}

export function useModalManagement() {
    const dispatch = useAppDispatch();

    const openModal = async (data: OpenModalPayload) => {
        const { payload } = await dispatch(modalThunkActions.open(data));
        return payload;
    };

    return {
        openModal,
    };
}

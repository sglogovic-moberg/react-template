import { isPending, isRejected, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { ignoreLoader, reduxAction } from "utils/constants";
import { removeUserLocalStorageData } from "utils/storageActions";
import { addLoaderAction, removeLoaderAction, unAuthorizedAdmin, unInitializedAdmin } from "./reducers/authReducer";

const loaderMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
    if (action.meta != undefined) {
        if (isPending(action)) {
            api.dispatch(
                addLoaderAction({
                    type: action.type,
                    requestId: action.meta.requestId,
                    isLoaderIgnored: ignoreLoader.some(x => action.type.startsWith(x)),
                })
            );
        } else {
            api.dispatch(removeLoaderAction(action.meta.requestId));
        }
    }

    return next(action);
};

const authMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
    if (isRejected(action)) {
        if (action.error.code == 401) {
            api.dispatch(unInitializedAdmin());
            api.dispatch({ type: reduxAction.resetStore });
            removeUserLocalStorageData();
        }
    }

    return next(action);
};

export { loaderMiddleware, authMiddleware };

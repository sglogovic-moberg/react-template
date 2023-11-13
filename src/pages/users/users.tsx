import ReportDataContainer from "containers/reportContainer/reportDataContainer";
import { endpoints } from "pages/users/api/usersApi";
import { usersColumnDefinition, usersDetailsDefinition, usersFilterDefinitions } from "pages/users/api/usersModels";
import React from "react";
import { PageTypeEnum } from "utils/enums";

const users = () => {
    return (
        <>
            <ReportDataContainer
                pageType={PageTypeEnum.Users}
                endpoint={endpoints.getUsers}
                columnDefinitions={usersColumnDefinition}
                detailsDefinitions={usersDetailsDefinition}
                filterDefinitions={usersFilterDefinitions}
                // exportRoute={usersExportRoute}
            />
        </>
    );
};

export default users;

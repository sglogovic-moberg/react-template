import ReportDataContainer from "containers/reportContainer/reportDataContainer";
import { endpoints, postsExportRoute } from "pages/posts/api/postsApi";
import { postsColumnDefinition, postsDetailsDefinition, postsFilterDefinitions } from "pages/posts/api/postsModels";
import React from "react";
import { PageTypeEnum } from "utils/enums";

const Posts = () => {
    return (
        <>
            <ReportDataContainer
                pageType={PageTypeEnum.Posts}
                endpoint={endpoints.getPosts}
                columnDefinitions={postsColumnDefinition}
                detailsDefinitions={postsDetailsDefinition}
                filterDefinitions={postsFilterDefinitions}
                // exportRoute={postsExportRoute}
            />
        </>
    );
};

export default Posts;

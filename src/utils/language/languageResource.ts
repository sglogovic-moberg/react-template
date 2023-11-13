import { PageTypeEnum } from "utils/enums";

export const StringResources = {
    modal: {
        close: "modal.close",
        confirm: "modal.confirm",
        delete: "modal.delete",
        cancel: "modal.cancel",
        set: "modal.set",
        details: "modal.details",
        submit: "modal.submit",
        column: "modal.column",
        filter: "modal.filter",
    },
    login: {
        title: "login.title",
        formTitle: "login.formTitle",
        formUsernameInputLabel: "login.formUsernameInputLabel",
        formPasswordInputLabel: "login.formPasswordInputLabel",
        formButtonCaption: "login.formButtonCaption",
    },
    mainNavigation: {
        logout: "mainNavigation.logout",
        title: "mainNavigation.title",
    },
    table: {
        fallbackMessage: "table.fallbackMessage",
        fallbackMessageWithFilter: "table.fallbackMessageWithFilter",
        itemsPerPage: "table.itemsPerPage",
        emptyTableMessage: "table.emptyTableMessage",
        export: "table.export",
    },
    reportDetails: {
        boolean: {
            yesLabel: "reportDetails.boolean.yesLabel",
            noLabel: "reportDetails.boolean.noLabel",
        },
    },
    pages: {
        [PageTypeEnum.None]: {
            title: "pages.none.title",
        },
        [PageTypeEnum.Dashboard]: {
            title: "pages.dashboard.title",
        },
        [PageTypeEnum.Posts]: {
            title: "pages.posts.title",
            id: "pages.posts.id",
            titleColumn: "pages.posts.titleColumn",
            body: "pages.posts.body",
            userName: "pages.posts.userName",
            createdTime: "pages.posts.createdTime",
            search: "pages.posts.search",
        },
        [PageTypeEnum.Users]: {
            title: "pages.users.title",
            id: "pages.users.id",
            name: "pages.users.name",
            email: "pages.users.email",
            createdTime: "pages.users.createdTime",
        },
    },
    filter: {
        buttonText: "filter.buttonText",
        clear: "filter.clear",
        search: "filter.search",
    },
    columnChooser: {
        column: "columnChooser.column",
        unsavedChanges: "columnChooser.unsavedChanges",
        save: "columnChooser.save",
        cancel: "columnChooser.cancel",
        selectAll: "columnChooser.selectAll",
        defaultView: "columnChooser.defaultView",
    },
    export: {
        exportSuccess: "export.exportSuccess",
        exportError: "export.exportError",
        title: "export.title",
        confirm: "export.confirm",
        close: "export.close",
        exportType: "export.exportType",
        exportTypeCSV: "export.exportTypeCSV",
        exportTypeXLSX: "export.exportTypeXLSX",
        exportColumn: "export.exportColumn",
        exportAllColumns: "export.exportAllColumns",
        exportVisibleColumns: "export.exportVisibleColumns",
    },
};

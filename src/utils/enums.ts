export enum SupportedLanguageEnum {
    English = 1,
    Hrvatski = 2,
}

export enum LoginStateEnum {
    Uninitialized = 0,
    Pending = 1,
    LoggedIn = 2,
    Unauthorized = 3,
    Expired = 4,
}

export enum ModalTypeEnum {
    None = 0,
    Confirm = 1,
    Details = 2,
    SpecialMenuFilter = 3,
    SpecialMenuColumn = 4,
    Export = 5,
}

export enum ModalActionButtonTypeEnum {
    Confirm = 0,
    Delete = 1,
}

export enum PageTypeEnum {
    None = "none",
    Dashboard = "dashboard",
    Posts = "posts",
    Users = "users",
}

export enum FilterTypeEnum {
    TextFilter = 1,
    DateFilter = 2,
    NumberFilter = 3,
}

export enum DetailsRowTypeFormatterEnum {
    Text = 1,
    Date = 3,
    DateTime = 4,
    Drill = 5,
    Id = 6,
    List = 7,
    Boolean = 8,
}

export enum DetailSectionEnum {
    Default = 1,
}

export enum DetailHeaderEnum {
    None = 0,
    Default = 1,
}

export enum ExportType {
    CSV = "1",
    XLSX = "2",
}

export enum ExportColumn {
    All = "0",
    VisibleColumns = "1",
}

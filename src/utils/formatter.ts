// We can add any other this that we want to format and just return string (without JSX component). JSX should implement this approach.
export function formatter(value: string | number | null | undefined, format: Datetime): string {
    if (value === null || value === undefined) {
        return defaultValue("-");
    }

    if (isDatetimeFormat(format)) {
        if (typeof value !== "string") {
            return defaultValue(value);
        }
        // assuming all dates that comes from backend are UTC (Z at the end of date string)
        return formatDatetime(new Date(value), format as Datetime);
    }

    return defaultValue(value);
}

function defaultValue(value: string | number): string {
    return value.toString();
}

//we are formating only in following format: dd/MM/yyyy hh:mm
function formatDatetime(value: Date, format: Datetime): string {
    let year = value.getFullYear();
    let month = (value.getMonth() + 1).toString().padStart(2, "0"); // month is zero-based. if it's March, padStart will add zero at the beginning so it's 03
    let date = value.getDate().toString().padStart(2, "0");
    let hour = value.getHours().toString().padStart(2, "0");
    let minute = value.getMinutes().toString().padStart(2, "0");

    switch (format) {
        case "long":
            return `${date}.${month}.${year} ${hour}:${minute}`;
        case "time":
            return `${hour}:${minute}`;
        case "date":
            return `${date}.${month}.${year}`;
    }
}

export function isDatetimeFormat(format: unknown): boolean {
    return typeof format === "string" && DatetimeFormats.includes(format as Datetime);
}

export const DatetimeFormats = ["long", "time", "date"] as const;
export type Datetime = typeof DatetimeFormats[number];

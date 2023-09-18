import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLanguageEnum } from "utils/enums";
import { translationsEn } from "./translationsEn";
import { translationsIs } from "./translationsIs";

i18n.use(initReactI18next).init({
    resources: {
        [SupportedLanguageEnum[SupportedLanguageEnum.English]]: {
            translations: translationsEn,
        },
    },
    lng: localStorage.getItem("lng") || SupportedLanguageEnum[SupportedLanguageEnum.English],
    fallbackLng: "Icelandic",
    debug: false,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

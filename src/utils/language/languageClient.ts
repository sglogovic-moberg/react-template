import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLanguageEnum } from "utils/enums";
import { translationsEn } from "./translationsEn";
import { translationsHr } from "utils/language/translationsHr";

i18n.use(initReactI18next).init({
    resources: {
        [SupportedLanguageEnum[SupportedLanguageEnum.English]]: {
            translations: translationsEn,
        },
        [SupportedLanguageEnum[SupportedLanguageEnum.Hrvatski]]: {
            translations: translationsHr,
        },
    },
    lng: localStorage.getItem("lng") || SupportedLanguageEnum[SupportedLanguageEnum.English],
    fallbackLng: "English",
    debug: false,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

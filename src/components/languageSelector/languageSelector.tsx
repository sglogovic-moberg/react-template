import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getLanguages, handleChangeLanguage } from "utils/helperFunctions";
import BaseDropdown from "components/baseDropdown/baseDropdown";
import { Dropdown } from "react-bootstrap";
import { ILookupResponse } from "utils/models";

const languages = getLanguages();

interface GlobalLangaugeSelectorProps {
    className?: string;
}

export const GlobalLangaugeSelector: FC<GlobalLangaugeSelectorProps> = ({ className }) => {
    const { i18n } = useTranslation();

    const updateLanguage = (eventKey: any, event: Object) => {
        handleChangeLanguage(eventKey);
    };

    return (
        <BaseDropdown toggleText={i18n.language} onSelect={updateLanguage}>
            {languages.map((x: ILookupResponse<number>) => {
                return (
                    <Dropdown.Item key={x.value} eventKey={x.value}>
                        {x.name}
                    </Dropdown.Item>
                );
            })}
        </BaseDropdown>
    );
};

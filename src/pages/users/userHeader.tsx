import BaseButton from "components/baseButton/baseButton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteUserThunk } from "redux/actions/usersActions";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { RootState, useAppDispatch } from "redux/store";
import { useModalManagement } from "utils/customHooks";
import { ModalTypeEnum, PageTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

export interface IUsersHeaderProps {
    pageType: PageTypeEnum;
}

const UsersHeader = (props: IUsersHeaderProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const activeRow = useSelector((state: RootState) => state.report.activeRow);
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const modalManagement = useModalManagement();

    const onClick = async () => {
        await dispatch(deleteUserThunk(activeRow.id));
        await dispatch(setQueryFilters({ ...queryFilters, random: new Date().toISOString() }));
    };

    const onCreateClick = async () => {
        modalManagement.openModal({ modalType: ModalTypeEnum.CreateUser });
    };

    return (
        <div className="report-details__title">
            <div className="report-details__title--label">{`${t(StringResources.pages[props.pageType].title)}`}</div>
            <div className="report-details__title--action">
                <BaseButton styleType="line" handleClick={onClick} text={`${t(StringResources.pages.users.delete)}`} />
                <BaseButton
                    styleType="solid"
                    handleClick={onCreateClick}
                    text={`${t(StringResources.pages.users.createUser)}`}
                />
            </div>
        </div>
    );
};

export default UsersHeader;

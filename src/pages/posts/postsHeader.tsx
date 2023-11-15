import BaseButton from "components/baseButton/baseButton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePostThunk } from "redux/actions/postsActions";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { RootState, useAppDispatch } from "redux/store";
import { useModalManagement } from "utils/customHooks";
import { ModalTypeEnum, PageTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

export interface IPostsHeaderProps {
    pageType: PageTypeEnum;
}

const PostsHeader = (props: IPostsHeaderProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const activeRow = useSelector((state: RootState) => state.report.activeRow);
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const modalManagement = useModalManagement();

    const onClick = async () => {
        try {
            await dispatch(deletePostThunk(activeRow.id)).unwrap();
            await dispatch(setQueryFilters({ ...queryFilters, random: new Date().toISOString() }));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const onCreateClick = async () => {
        modalManagement.openModal({ modalType: ModalTypeEnum.CreatePost });
    };

    const onEditClick = async () => {
        modalManagement.openModal({ modalType: ModalTypeEnum.EditPost });
    };

    return (
        <div className="report-details__title">
            <div className="report-details__title--label">{`${t(StringResources.pages[props.pageType].title)}`}</div>
            <div className="report-details__title--action">
                <BaseButton styleType="line" handleClick={onClick} text={`${t(StringResources.pages.posts.delete)}`} />
                <BaseButton
                    styleType="solid"
                    handleClick={onEditClick}
                    text={`${t(StringResources.pages.posts.editPost)}`}
                />
                <BaseButton
                    styleType="solid"
                    handleClick={onCreateClick}
                    text={`${t(StringResources.pages.posts.createPost)}`}
                />
            </div>
        </div>
    );
};

export default PostsHeader;

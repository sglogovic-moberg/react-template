import ReportDetails from "containers/reportDetails/reportDetails";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { confirmModal, declineModal } from "redux/reducers/modalReducer";
import { RootState, useAppDispatch } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

import "./createPost.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseInput from "components/baseInput/baseInput";
import BaseButton from "components/baseButton/baseButton";
import { createPostThunk } from "redux/actions/postsActions";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export interface ICreatePostModalProps {
    title: string;
    description: string;
}

const CreatePostModal = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const activeRow = useSelector((state: RootState) => state.report.activeRow);

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: ModalTypeEnum.CreatePost }));
    };

    const createPostValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            description: Yup.string().required(),
        }),
        onSubmit: async (values: ICreatePostModalProps) => {
            const payload = {
                title: values.title,
                description: values.description,
                id: activeRow.id,
            };

            try {
                await dispatch(createPostThunk(payload)).unwrap();
                await dispatch(setQueryFilters({ ...queryFilters, random: new Date().toISOString() }));
                await dispatch(confirmModal({ modalType: ModalTypeEnum.CreatePost }));
            } catch (error: any) {}
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createPostValidation.handleSubmit();
    };

    const isFormValid = createPostValidation.dirty && createPostValidation.isValid;

    return (
        <Modal show={true} onHide={onCancelClick} dialogClassName="base-modal-details">
            <Modal.Header closeButton>
                <Modal.Title>{`${t(StringResources.modal.details)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="create-post__form-row">
                        <BaseInput
                            type={"text"}
                            name={"title"}
                            label={`${t(StringResources.modal.createPost.title)}`}
                            value={createPostValidation.values["title"]}
                            onBlur={createPostValidation.handleBlur}
                            onChange={createPostValidation.handleChange}
                            invalid={createPostValidation.touched["title"] && createPostValidation.errors["title"]}
                        />
                    </Form.Group>
                    <Form.Group className="create-post__form-row">
                        <BaseInput
                            type={"text"}
                            name={"description"}
                            label={`${t(StringResources.modal.createPost.description)}`}
                            value={createPostValidation.values["description"]}
                            invalid={
                                createPostValidation.touched["description"] &&
                                createPostValidation.errors["description"]
                            }
                            onBlur={createPostValidation.handleBlur}
                            onChange={createPostValidation.handleChange}
                        />
                    </Form.Group>

                    <BaseButton
                        type={"submit"}
                        styleType={"solid"}
                        size={"full"}
                        disabled={!isFormValid}
                        text={t(StringResources.modal.createPost.createPost)}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePostModal;

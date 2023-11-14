import ReportDetails from "containers/reportDetails/reportDetails";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { confirmModal, declineModal } from "redux/reducers/modalReducer";
import { RootState, useAppDispatch } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

import "./createUser.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseInput from "components/baseInput/baseInput";
import BaseButton from "components/baseButton/baseButton";
import { createUserThunk } from "redux/actions/usersActions";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { useSelector } from "react-redux";

export interface ICreateUserModalProps {
    username: string;
    password: string;
    name: string;
}

const CreateUserModal = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: ModalTypeEnum.CreateUser }));
    };

    const createUserValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
            name: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            name: Yup.string().required(),
        }),
        onSubmit: async (values: ICreateUserModalProps) => {
            const payload = {
                username: values.username,
                password: values.password,
                name: values.name,
            };

            try {
                await dispatch(createUserThunk(payload)).unwrap();
                await dispatch(setQueryFilters({ ...queryFilters, random: new Date().toISOString() }));
                await dispatch(confirmModal({ modalType: ModalTypeEnum.CreateUser }));
            } catch (error: any) {}
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createUserValidation.handleSubmit();
    };

    const isFormValid = createUserValidation.dirty && createUserValidation.isValid;

    return (
        <Modal show={true} onHide={onCancelClick} dialogClassName="base-modal-details">
            <Modal.Header closeButton>
                <Modal.Title>{`${t(StringResources.modal.details)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="create-user__form-row">
                        <BaseInput
                            type={"name"}
                            name={"name"}
                            label={`${t(StringResources.modal.createUser.name)}`}
                            value={createUserValidation.values["name"]}
                            onBlur={createUserValidation.handleBlur}
                            onChange={createUserValidation.handleChange}
                            invalid={createUserValidation.touched["name"] && createUserValidation.errors["name"]}
                        />
                    </Form.Group>
                    <Form.Group className="create-user__form-row">
                        <BaseInput
                            type={"text"}
                            name={"username"}
                            label={`${t(StringResources.login.formUsernameInputLabel)}`}
                            value={createUserValidation.values["username"]}
                            invalid={
                                createUserValidation.touched["username"] && createUserValidation.errors["username"]
                            }
                            onBlur={createUserValidation.handleBlur}
                            onChange={createUserValidation.handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="create-user__form-row">
                        <BaseInput
                            type={"text"}
                            name={"password"}
                            label={`${t(StringResources.login.formPasswordInputLabel)}`}
                            value={createUserValidation.values["password"]}
                            onBlur={createUserValidation.handleBlur}
                            onChange={createUserValidation.handleChange}
                            invalid={
                                createUserValidation.touched["password"] && createUserValidation.errors["password"]
                            }
                        />
                    </Form.Group>

                    <BaseButton
                        type={"submit"}
                        styleType={"solid"}
                        size={"full"}
                        disabled={!isFormValid}
                        text={t(StringResources.pages.users.createUser)}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateUserModal;

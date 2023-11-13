import BaseButton from "components/baseButton/baseButton";
import BaseInput from "components/baseInput/baseInput";
import { GlobalLangaugeSelector } from "components/languageSelector/languageSelector";
import { useFormik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { adminLoginThunk } from "redux/actions/authActions";
import { ILoginParams } from "redux/models/authModels";
import { useAppDispatch } from "redux/store";
import { StringResources } from "utils/language/languageResource";
import * as Yup from "yup";
import "./login.scss";

interface ILoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [isAutoFilled, setIsAutoFilled] = useState<boolean>(false);

    const loginValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(""),
            password: Yup.string().required(""),
        }),
        onSubmit: async (values: ILoginForm) => {
            setErrorMessage("");

            const payload: ILoginParams = {
                username: values.username,
                password: values.password,
            };

            try {
                await dispatch(adminLoginThunk(payload)).unwrap();
            } catch (error: any) {
                setErrorMessage(error?.message);
            }
        },
    });

    const isFormValid = (isAutoFilled || loginValidation.dirty) && loginValidation.isValid;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoginInProgress(true);
        loginValidation.handleSubmit();
    };

    return (
        <main role="main" className="app-login">
            <div className="app-login__wrap">
                <GlobalLangaugeSelector className="app-login__lang-select" />

                <div className="app-login__content">
                    <div className="app-login__content-item app-login__content-item--form">
                        <h1 className="app-login__title">{`${t(StringResources.login.title)}`}</h1>

                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="app-login__form-row">
                                <BaseInput
                                    type={"text"}
                                    name={"username"}
                                    label={`${t(StringResources.login.formUsernameInputLabel)}`}
                                    value={loginValidation.values["username"]}
                                    invalid={loginValidation.touched["username"] && loginValidation.errors["username"]}
                                    onBlur={loginValidation.handleBlur}
                                    onChange={loginValidation.handleChange}
                                    disabled={loginInProgress}
                                />
                            </Form.Group>

                            <Form.Group className="app-login__form-row">
                                <BaseInput
                                    type={"password"}
                                    name={"password"}
                                    label={`${t(StringResources.login.formPasswordInputLabel)}`}
                                    value={loginValidation.values["password"]}
                                    onBlur={loginValidation.handleBlur}
                                    onChange={loginValidation.handleChange}
                                    disabled={loginInProgress}
                                />
                            </Form.Group>

                            {errorMessage && <p className="app-login__form-error">{errorMessage}</p>}

                            <BaseButton
                                type={"submit"}
                                styleType={"solid"}
                                size={"full"}
                                disabled={!isFormValid || loginInProgress}
                                text={t(StringResources.login.formButtonCaption)}
                            />
                        </Form>
                    </div>
                </div>

                <div></div>
            </div>
        </main>
    );
};

export default Login;

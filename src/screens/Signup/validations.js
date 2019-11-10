import * as Yup from "yup";

const validations = Yup.object().shape({
    username: Yup
        .string()
        .required("bu alan zorunlu"),
    password: Yup
        .string()
        .required("bu alan zorunlu"),
    passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref("password")], "sifre alani ile ayni olmali")
        .required("bu alan zorunlu")
});

module.exports = validations;
import * as Yup from "yup";

const validations = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    photo: Yup.string(),
    stock_quantity: Yup.number()
});

module.exports = validations;
const isEmail = require("../util/EmailValidationUtil");

const errorMessage = (field, message) => ({ field, message });

const signUpInputValidation = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];

    if (!name) {
        errors.push(errorMessage("name", "O nome é obrigatório."));
    } else if (typeof name !== "string" || name.length < 2) {
        errors.push(errorMessage("name", "Nome de usuário inválido."));
    }

    if (!email) {
        errors.push(errorMessage("email", "O email é obrigatório."));
    } else if (!isEmail(email)) {
        errors.push(errorMessage("email", "E-mail de usuário inválido."));
    }

    if (!password) {
        errors.push(errorMessage("password", "A senha é obrigatória."));
    } else if (typeof password !== "string" || password.length < 5) {
        errors.push(
            errorMessage("password", "A senha deve ter 5 ou mais caracteres.")
        );
    }

    if (!confirmPassword) {
        errors.push(
            errorMessage(
                "confirmPassword",
                "A confirmação de senha é obrigatória."
            )
        );
    } else if (
        typeof confirmPassword !== "string" ||
        confirmPassword !== password
    ) {
        errors.push(
            errorMessage("confirmPassword", "As senhas não são iguais.")
        );
    }

    return errors.length > 0 ? next(errors) : next();
};

const signInInputvalidation = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push(errorMessage("email", "O e-mail é obrigatório."));
    } else if (!isEmail(email)) {
        errors.push(errorMessage("email", "E-mail inválido."));
    }

    if (!password) {
        errors.push(errorMessage("password", "A senha é obrigatória."));
    } else if (typeof password !== "string") {
        errors.push(errorMessage("password", "Senha inválida."));
    }

    return errors.length > 0 ? next(errors) : next();
};

module.exports = { signUpInputValidation, signInInputvalidation };

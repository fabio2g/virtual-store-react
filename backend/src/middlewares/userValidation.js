const isValid = require("../util/EmailValidationUtil");

const { isString, isEmail, isLength } = require("../util/InputValidation");

const signUpInputValidation = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    const errors = [];

    // Validação de nome
    if (!name) {
        errors.push("O nome do usuário é obrigatório.");
    } else if (typeof name != "string") {
        errors.push("Nome de usuário inválido.");
    } else if (name.length < 2) {
        errors.push("O nome de usuário deve ter mais de 2 caracteres.");
    }

    // Validação de e-mail
    if (!isValid(email)) errors.push("E-mail de usuário inválido.");

    // Validação de senha
    if (!password) {
        errors.push("A senha é obrigatória.");
    } else if (typeof password !== "string") {
        errors.push("Senha inválida.");
    } else if (password.length < 5) {
        errors.push("A senha deve ter 5 ou mais caracteres.");
    }

    // Validação de confirmação de senha
    if (!confirmPassword) {
        errors.push("A confirmação de senha é obrigatória.");
    } else if (
        typeof confirmPassword !== "string" ||
        confirmPassword !== password
    ) {
        errors.push("As senhas não são iguais.");
    }

    return errors.length > 0 ? next(errors) : next();
};

const signInInputvalidation = (req, res, next) => {
    const { email, password } = req.body;

    const errors = [];

    if (!email) errors.push("O e-mail é obrigatório.");
    else if (!isValid(email)) errors.push("E-mail de usuário inválido.");

    if (!password) errors.push("A senha é obrigatória.");
    else if (typeof password !== "string") errors.push("Senha inválida.");

    return errors.length > 0 ? next(errors) : next();
};

module.exports = { signUpInputValidation, signInInputvalidation };

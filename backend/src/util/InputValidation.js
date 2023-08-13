class InputValidation {
    static isString = (input) => {
        return typeof input === "string";
    };

    static isLength = ({ min = 0, input }) => {
        console.log(input);

        if (typeof input !== "string") {
            throw new Error("Input must be a string");
        }

        return min === 0 ? input.length > min : input.length >= min;
    };

    static isNumber = (input) => {
        return typeof input !== "number" ? true : false;
    };

    static isEmail = (input) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input) ? true : false;
    };
}

module.exports = InputValidation;

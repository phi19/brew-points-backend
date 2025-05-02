const { HTTP400Error } = require("../../utils/errors/custom");

exports.registerValidator = (
  name,
  email,
  password,
  passwordConfirmation
) => {
  if (!name || !email || !password || !passwordConfirmation) {
    throw new HTTP400Error("Todos os campos devem ser preenchidos", {
      type: !email
        ? "email"
        : !name
        ? "name"
        : !password
        ? "password"
        : "passwordConfirmation",
    });
  }

  if (name.length < 2) {
    throw new HTTP400Error("Nome muito pequeno (2+ caracteres)", {
      type: "email",
    });
  }

  if (email.length < 4) {
    throw new HTTP400Error("Email muito pequeno (4+ caracteres)", {
      type: "email",
    });
  }

  if (!password || password.length < 6) {
    throw new HTTP400Error("Password muito pequena (6+ caracteres)", {
      type: "password",
    });
  }

  if (password !== passwordConfirmation) {
    throw new HTTP400Error("Passwords não coincidem", {
      type: "passwordConfirmation",
    });
  }
};


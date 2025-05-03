const HTTPStatusCodes = require("../../utils/HTTPStatusCodes");
const UserService = require("./user.service");
const UserValidator = require("./user.validator");

exports.login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await UserService.login(
      req.user.loginUser
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(HTTPStatusCodes.OK).json({
      user: {
        user: req.user.formattedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    UserValidator.registerValidator(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.passwordConfirmation
    );

    const user = await UserService.register(
      req.body.name,
      req.body.email,
      req.body.password
    );

    const { accessToken, refreshToken } = await UserService.login(user.user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(HTTPStatusCodes.CREATED).json({ user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.phoneRegister = async (req, res, next) => {
  const dummyUser = {
    id: "user_static_12345",
    name: "Pedro Santos",
    email: "hackathon.user@example.com",
    phoneNumber: "+351999999999",
    createdAt: new Date("2023-10-27T10:00:00Z"),
    location: {
      city: "Coimbra",
      country: "Portugal",
      // latitude: 40.2033,
      // longitude: -8.4103
    },
    // profileImageUrl: 'https://example.com/avatar_miguel.png'
  };

  try {
    const receivedPhoneNumber = req.body.phoneNumber;

    console.log(`Received request for /api/v1/user/createWithPhone`);
    console.log(`  -> Input phoneNumber (ignored): ${receivedPhoneNumber}`);
    console.log(`  -> Returning static user:`, dummyUser);

    res.status(HTTPStatusCodes.OK).json(dummyUser);
  } catch (err) {
    // if refresh token is blacklisted (user logged out)
    // do nothing, nothing will be done lol
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await UserService.refreshToken(
      req.refreshToken
    );

    // - set to http-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(HTTPStatusCodes.NO_CONTENT).send();
  } catch (err) {
    // if refresh token is blacklisted (user logged out)
    // do nothing, nothing will be done lol
    next(err);
  }
};

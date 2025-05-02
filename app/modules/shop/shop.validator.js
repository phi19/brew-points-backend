const { HTTP400Error } = require("../../utils/errors/custom");
const { isLocationValid } = require("../../utils/helpers/location.helper");

exports.createShopValidator = ({ name, bio, location }) => {
  if (!name || !bio || !location) {
    throw new HTTP400Error("Todos os campos devem ser preenchidos", {
      type: !name ? "name" : !bio ? "bio" : "location",
    });
  }

  if (name.length < 2) {
    throw new HTTP400Error("Nome muito pequeno (2+ caracteres)", {
      type: "name",
    });
  }

  if (bio.length < 50) {
    throw new HTTP400Error("Biografia muito pequena (50+ caracteres)", {
      type: "bio",
    });
  }

  if (!isLocationValid(location.latitude, location.longitude)) {
    throw new HTTP400Error("Localização muito pequena (2+ caracteres)", {
      type: "location",
    });
  }
};

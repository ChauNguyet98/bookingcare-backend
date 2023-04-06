import authService from "../services/authService";

let login = async (req, res) => {
  const data = await authService.getAccount(req, res);
  return res.status(200).json({
    message: "OK",
  });
};

module.exports = {
  login,
};

import authService from "../services/authService";

let login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({
      error: {
        errorCode: 1,
        message: "Email and password is required!",
      },
    });
  }

  const data = await authService.handleUserLogin(email, password);
  if (data.error) {
    return res.status(500).json({
      error: data.error,
    });
  }

  return res.status(200).json({
    message: "OK",
    data: data.data,
  });
};

module.exports = {
  login,
};

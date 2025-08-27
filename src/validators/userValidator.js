const { object, string } = require("yup");

const createUser = object().shape({
  name: string().required("Name is required"),
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
  role: string().required("Role is required"),
});

const login = object().shape({
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
});

const userValidator = {
  createUser,
  login,
};

export default userValidator;

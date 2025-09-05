import statuses from "../errors/status.js";
import userModel from "../model/user.model.js";
import emailFn from "../util/email.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { accessToken, refreshToken } from "../tokens/auth.token.js";

dotenv.config();
const Register = async ({ name, email, password }) => {
  console.log("here in service");

  if (!name || !email || !password) return statuses("Fields incomplete", 400);
  console.log("one validation");
  if (password.length <= 8) return statuses("Password Length", 400);
  console.log("two validation");
  // if(!email.includes("@")) return statuses("Email incorrect" , 400)
  console.log(email);
  const isEmailExist = await userModel.findOne({ email: email });
  console.log(isEmailExist);
  console.log("three validation");
  if (isEmailExist) return statuses("Email already exists", 400);
  console.log("four validation");
  const token = crypto.randomBytes(32).toString("hex");
  const newUser = await userModel.create({
    name,
    email,
    password,
    emailToken: token,
  });
  console.log(email);
  try {
    emailFn({ email, token });
  } catch (error) {
    console.log("error in email sending");
  }
  return statuses("Registeration Done + Email verify sent", 200);
};
const Login = async ({ email, password }) => {
  console.log("Login Entered" + email + password);
  if (!email || !password)
    return statuses("Input fields are incorrect", 400, null);
  console.log("One");
  const checkUser = await userModel.findOne({ email: email }); //taken userarray(users) having same email
  console.log("two");
  const UUID = checkUser._id;
  const name = checkUser.name;
  const role = checkUser.role;
  if (!checkUser) return statuses("User not exists", 400, null);
  console.log("three");
  if (checkUser.password.length < 7)
    return statuses("Password incorrect", 400, null);
  console.log("four");
  const isMatch = await bcrypt.compare(password, checkUser.password);
  console.log("five");
  if (!isMatch) return statuses("Incorrect Password", 400, null);
  console.log("last");
  if (!checkUser.isVerified)
    return statuses("Verify your email please", 400, null);

  console.log("all");
  let signedAccessToken, signedRefreshToken;
  try {
    signedAccessToken = accessToken({
      payload: {
        id: UUID,
        role: role,
        email: email,
      },
    });

    signedRefreshToken = refreshToken({ UUID });
  } catch (error) {
    console.log("TokenCreationError", error);
  }
  console.log("toke " + signedAccessToken);
  return statuses("Login successful", 200, {
    user: { UUID, name, signedAccessToken, signedRefreshToken, role, email },
  });
};
const verifyEmail = async ({ token }) => {
  if (!token || typeof token !== "string")
    return statuses("Incorrect token", 400, null);
  console.log(token + "is here");
  const user = await userModel.findOne({ emailToken: token });
  console.log(user);
  if (!user) return statuses("User Error", 400, null);

  (user.isVerified = true), (user.emailToken = undefined);
  await user.save();
  return statuses("Email Verified", 200, user);
};
const reset = async ({ email }) => {
  if (!email) return statuses("Email field incorrect", 400, null);
  const user = await userModel.findOne({ email: email });
  if (!user) return statuses("User doesnt exists", 400, null);
  const token = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = token;
  user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();
  try {
    emailFn({ email, token });
  } catch (error) {
    console.log("error in email sending");
  }
  return statuses("Reset Link sent on your email", 200, user);
};
const resetLink = async ({ pr_token, newPass }) => {
  console.log("toke is " + newPass);
  if (!pr_token) return statuses("Token is incorrect", 400, null);
  const user = await userModel.findOne({ passwordResetToken: pr_token });
  if (!user) return statuses("User do not exist/token invalud", 400, null);
  // Sample dry run in hours:
  // Let's say current time is 2:00 PM.
  // user.passwordResetExpiry = Date.now() + 1 hour = 3:00 PM.
  // If user clicks the link at 2:30 PM, 3:00 PM > 2:30 PM => token valid.
  // If user clicks the link at 3:01 PM, 3:00 PM > 3:01 PM => false => token expired.
  if (!user.passwordResetExpiry || user.passwordResetExpiry < Date.now()) {
    return statuses("Reset token has expired", 400, null);
  }
  user.password = newPass;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  await user.save();
  return statuses("Password has been changed", 200, user);
};
export { Register, verifyEmail, reset, resetLink, Login };

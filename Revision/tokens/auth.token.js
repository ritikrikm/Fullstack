import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
//generate access token
const refreshMap = new Map();
const accessToken = ({ payload }) => {
  console.log("payload" + payload);
  const token = jwt.sign(
    {
      id: payload.id,
      role: payload.role,
      email: payload.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TTL,
      issuer: process.env.ISS,
    }
  );
  return token;
};
const refreshToken = ({ UUID }) => {
  const tokenId = crypto.randomBytes(32).toString("hex");
  const token = jwt.sign(
    {
      tid: tokenId,
      userId: UUID,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TTL,
      issuer: process.env.ISS,
    }
  );
  const { exp } = jwt.decode(token);
  refreshMap.set(tokenId, {
    userId: UUID,
    revoke: false,
    exp,
  });
  return token;
};
const rotateRefresh = ({ oldToken }) => {
  const decode = jwt.verify(oldToken, process.env.SECRET_KEY, {
    issuer: "ricky",
  });
  const record = refreshMap.get(decode.tid);
  if (!record || record.revoke) throw new Error("refresh recoked/invalid");
  record.revoke = true;
  const user = record.userId;
  return refreshToken({ user });
};
export { accessToken, refreshToken, rotateRefresh };

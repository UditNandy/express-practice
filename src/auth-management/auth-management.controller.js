import db from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import util from "util";

export const signup = async (req, res) => {
  let { name, email, password, dob, role } = req.body;
  if (!role) role = "user";
  try {
    if (!name || !email || !password || !dob)
      return res.status(400).json({ message: "Some fields are missing" });
    const [existingUser] = await db.execute(
      "Select * from USERS where email=?",
      [email]
    );
    if (existingUser.length)
      return res.status(400).json({ message: "Email id already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const insert = await db.execute(
      "INSERT INTO USERS (name,email,password,dob) VALUES (?,?,?,?)",
      [name, email, hashedPassword, dob]
    );
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err?.sqlMessage || "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Some fields are missing" });
  try {
    const [row] = await db.execute("SELECT * FROM USERS WHERE EMAIL=?", [
      email,
    ]);
    if (!row.length) {
      return res.status(400).json({ message: "Email id not found" });
    }
    let user = row[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );
      return res.json({ message: "Signed in successfully", token });
    } else return res.status(400).json({ message: "Invalid Password" });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const signout = async (req, res) => {};

export const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = await util.promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      req["user_id"] = decode.user_id;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "User not authorised" });
  }
};

import db from "../../config/db.js";

export const fetchUserDetails = async (req, res) => {
  try {
    if (req?.user_id) {
      const [row] = await db.execute("SELECT * FROM USERS WHERE USER_ID = ?", [
        req.user_id,
      ]);
      let user = row[0];
      delete user["password"];
      res.json({ data: user });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wtong" });
  }
};

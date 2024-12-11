import db from "../../config/db.js";

export const fetchUserDetails = async (req, res) => {
  try {
    if (req?.user_id) {
      const [row] = await db.execute("SELECT * FROM USERS WHERE USER_ID = ?", [
        req.user_id,
      ]);
      let user = row[0];
      delete user["password"];
      return res.json({ data: user });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something went wtong" });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const user_id = req.user_id;
    let name = (req.query.name || "") + "%";
    const [data] = await db.query(
      "SELECT USER_ID,NAME FROM USERS WHERE USER_ID!=? AND LOWER(NAME) LIKE LOWER(?)",
      [user_id, name]
    );
    return res.json({ data: data });
  } catch (e) {
    console.log("Error is", e);
    return res.json({ message: "Something went wrong" });
  }
};

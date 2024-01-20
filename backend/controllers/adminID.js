const adminMain = require("../models/admin");

const deleteAdmin = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ Alert: "No ID" });

  // Let's have a propoer error message structure.
  // Something like,
  // {
  //   code: "FT-ADMIN_ID-DA-NF01", >> FT = Film Trailers, ADMIN_ID = Admin ID (File Name), DA = deleteAdmin (Method name), NF = Not Found, 01 = 01
  //   message: "No user ID was provided.",
  //   description: "Unable to delete the user as no user ID was provided."
  // }

  const existing = await adminMain.findOne({ _id: String(id) });
  if (existing) {
    await adminMain.deleteOne({ _id: String(id) });
    res.status(200).json({ Alert: "DELETED" });
  } else {
    res.status(404).json({ Alert: "User doesn't exist!" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ Alert: "No ID" });

  const existing = await adminMain.findOne({ _id: String(id) });
  if (existing) {
    await adminMain.deleteOne({ _id: String(id) });
  } else {
    res.status(404).json({ Alert: "Error deleting!" });
  }
};

const findAdmin = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ Alert: "No ID" });

  const existing = await adminMain.findOne({ _id: String(id) });
  if (existing) {
    await adminMain.findOne({ _id: String(id) });
    res.status(200).json(existing);
  } else {
    res.status(404).json({ Alert: "Error deleting!" });
  }
};

module.exports = { deleteAdmin, updateAdmin, findAdmin };

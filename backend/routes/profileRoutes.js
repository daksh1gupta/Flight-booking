import express from "express";

const router = express.Router();

// 🔥 TEMP DATA (later MongoDB)
let profileData = {};

// SAVE PROFILE
router.post("/", (req, res) => {
  profileData = req.body;
  console.log("Profile Saved:", profileData);

  res.json({
    success: true,
    message: "Profile saved successfully ✅",
  });
});

// GET PROFILE
router.get("/", (req, res) => {
  res.json(profileData);
});

export default router;
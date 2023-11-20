import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log("signout route");

  req.session = null;

  res.status(200).send("signed out");
});

export { router as signoutRouter };

// routes/chat.js
import express from "express";
import auth from "../middleware/auth.js";
import Search from "../models/Search.js";
import { generateOpenRouterResponse } from "../utils/openRouter.js";

const router = express.Router();

// Ask a question
router.post("/", auth, async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const response = await generateOpenRouterResponse(query);

    const saved = new Search({
      userId: req.user.id,
      query,
      response,
    });

    await saved.save();

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: "AI response failed", error: error.message });
  }
});

// View history
router.get("/history", auth, async (req, res) => {
  const history = await Search.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(history);
});

// Delete specific entry
router.delete("/history/:id", auth, async (req, res) => {
  const deleted = await Search.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
});

// Delete all history
router.delete("/history", auth, async (req, res) => {
  await Search.deleteMany({ userId: req.user.id });
  res.json({ message: "All history deleted" });
});

export default router;

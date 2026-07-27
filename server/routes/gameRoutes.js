const express = require("express");
const Game = require("../models/Game");

const router = express.Router();

// جلب جميع الألعاب
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.log("GET games error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب الألعاب",
    });
  }
});

// جلب لعبة واحدة
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "اللعبة غير موجودة",
      });
    }

    res.json(game);
  } catch (error) {
    console.log("GET game details error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب تفاصيل اللعبة",
    });
  }
});

// إضافة لعبة
router.post("/", async (req, res) => {
  try {
    const newGame = new Game({
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
      image: req.body.image,
      rating: req.body.rating,
    });

    const savedGame = await newGame.save();

    res.status(201).json(savedGame);
  } catch (error) {
    console.log("POST game error:", error);

    res.status(400).json({
      message: "حدث خطأ أثناء إضافة اللعبة",
      error: error.message,
    });
  }
});

// حذف لعبة
router.delete("/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);

    if (!deletedGame) {
      return res.status(404).json({
        message: "اللعبة غير موجودة",
      });
    }

    res.json({
      message: "Game deleted successfully",
    });
  } catch (error) {
    console.log("DELETE game error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء حذف اللعبة",
    });
  }
});

module.exports = router;
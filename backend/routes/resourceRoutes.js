const express = require("express");
const router = express.Router();
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createResource);        
router.get("/", authMiddleware, getResources);    
router.get("/:id", authMiddleware, getResourceById);
router.put("/:id", authMiddleware, updateResource);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;
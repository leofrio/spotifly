const express=require('express')
const router=express.Router() 
const controller=require("../Controllers/MusicController") 
router.get("/",controller.list)
router.get("/:id",controller.findById)
router.post("/",controller.post)
router.put("/:id",controller.put) 

module.exports=router;
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");

//Route 1: Get all the Note using: GET "/api/Note/fetchallNote". login required
router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    const Notes = await Note.find({ user: req.user.id });
    res.json(Notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 2: Get all the Note using: POST "/api/Note/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //yha par user id mil rha fetchuser middleware use karke so , the note will be saved under that user id
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Update an existing Note using: POST "/api/Note/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    
      //Create a new Note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      //Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      //now we match the user id of note from params with requseted user id, which we are getting from the fetchuser
      //to check if the note belongs to the user that is logged in
      if (note.user.toString() !== req.user.id) {
        //The toString() method converts the ObjectId (which is stored in note.user) into a regular string. This allows for a direct comparison with req.user.id, which is already a string.
        return res.status(401).send("Not Allowed");
      }
    
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      /*
        •{$set: newNote}: Only updates the fields that exist in newNote.
        •{new: true}: Ensures that the updated document is returned, not the old one.
            */
      res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
});

//Route 4: Delete an existing Note using: DELETE "/api/Note/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not Found");
        }
        //Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
      
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
  });

module.exports = router;

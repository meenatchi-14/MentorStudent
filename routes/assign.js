const router = require("express").Router();
const objId = require("mongoose").Types.ObjectId;

const { student, mentor } = require("../db.js");

router.post("/newMentor", async (req, res) => {
  console.log("assignMentorToStudent");
  //req -> has mentor id + studentsId
  //to do : add students to mentor & viceversa
  
  try {
    //updating studentList in mentor doc
    const mentorData = await mentor.findById(req.body.mentorId);
    mentorData.studentsAssigned = [
      ...mentorData.studentsAssigned,
      ...req.body.studentsArray,
    ];
    console.log(...req.body.studentsArray)
    mentorData.save();
    //adding mentor to all respective students
    req.body.studentsArray.forEach(async (stud) => {
      const temp = await student.findById(stud);
      temp.mentorAssigned = req.body.mentorId;
      temp.save();
    });
    res.send("Mentor Added to Students and updated in mentor document too");
  } catch (e) {
    console.log(e, "error in assignmentor route");
    res.status(400).send("error");
    
  }
});

// ------------------------------------------------------------------------


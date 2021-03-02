const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const Resume = require("../models/Resume");
const User = require("../models/User");

//Create or update a resume
//Route : api/resume

router.post("/", auth, async (req, res) => {
  const {
    name,
    title,
    email,
    address,
    phone,
    summary,
    skills,
    twitter,
    linkedin,
    github,
    instagram,
    youtube,
    portfolio,
  } = req.body;

  const resumeFields = {};

  resumeFields.user = req.user.id;

  if (name) resumeFields.name = name;
  if (title) resumeFields.title = title;
  if (email) resumeFields.email = email;
  if (address) resumeFields.address = address;
  if (phone) resumeFields.phone = phone;
  if (summary) resumeFields.summary = summary;
  if (skills) {
    resumeFields.skills = skills.split(",").map((skill) => skill);
  }

  resumeFields.social = {};
  if (youtube) resumeFields.social.youtube = youtube;
  if (twitter) resumeFields.social.twitter = twitter;
  if (github) resumeFields.social.github = github;
  if (instagram) resumeFields.social.instagram = instagram;
  if (linkedin) resumeFields.social.linkedin = linkedin;
  if (portfolio) resumeFields.social.portfolio = portfolio;

  try {
    let resume = await Resume.findOne({ user: req.user.id });

    if (resume) {
      resume = await Resume.findOneAndUpdate(
        { user: req.user.id },
        { $set: resumeFields },
        { new: true }
      );

      return res.json(resume);
    }

    resume = new Resume(resumeFields);
    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Add experience to resume
//Route : api/resume/experience

router.put("/experience", auth, async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const resume = await Resume.findOne({ user: req.user.id });

    resume.experience.push(newExp);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Add education to resume
//Route : api/resume/education

router.put("/education", [auth], async (req, res) => {
  const { school, degree, fieldofstudy, from, to, current } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
  };

  try {
    const resume = await Resume.findOne({ user: req.user.id });

    resume.education.push(newEdu);

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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

  resumeFields.socials = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (github) profileFields.social.github = github;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (portfolio) profileFields.social.portfolio = portfolio;

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

    resume = new resume(resumeFields);
    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

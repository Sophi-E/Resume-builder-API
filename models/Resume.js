const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ResumeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  skills: {
    type: [String],
  },
  summary: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },

      location: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Resume = mongoose.model("resume", ResumeSchema);

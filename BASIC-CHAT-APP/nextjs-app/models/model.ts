import mongoose from "mongoose";

const Registers = new mongoose.Schema({
  username: String,
  name: String,
  profileicon: String,
  password: String,
  email: String,
});

const Bots = new mongoose.Schema({
  name: String,
  desc: String,
  image: String,
  uniqueid: String,
  role: String,
  createdby: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register'
  },
});

const Chatmodel = new mongoose.Schema({
  usermessage: String,
  aimessage: String,
  uid: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register'
  },
  belongsto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot'

  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const RegisterModel =
  mongoose.models.Register || mongoose.model("Register", Registers);

export const ChatBotModel =
  mongoose.models.ChatBot || mongoose.model("ChatBot", Chatmodel);

export const BotModel =
  mongoose.models.Bot || mongoose.model("Bot", Bots);

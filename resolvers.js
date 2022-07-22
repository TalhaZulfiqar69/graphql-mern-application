import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Quote = mongoose.model('Quote');

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate('by', '_id firstName'),
    iquote: async (_, { by }) => await Quote.find({ by }),
    userProfile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error('You must be logged in.');
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (usr) => await Quote.find({ by: usr._id }),
  },
  Mutation: {
    registerUser: async (_, { newUser }) => {
      // TODO:
      const user = await User.findOne({ email: newUser.email });

      if (user) {
        throw new Error('User already exists with this email.');
      }

      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const userNew = new User({
        ...newUser,
        password: hashedPassword,
      });

      return await userNew.save();
    },

    signinUser: async (_, { userSignin }) => {
      // TODO:
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error('User dosent exist with that email.');
      }

      const doMatchedPassword = await bcrypt.compare(
        userSignin.password,
        user.password
      );

      if (!doMatchedPassword) {
        throw new Error('Email or password in invalid.');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      // TODO:
      if (!userId) {
        throw new Error('You must be logged in.');
      }

      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return 'Quote created successfully.';
    },
  },
};

export default resolvers;

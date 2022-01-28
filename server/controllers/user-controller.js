// import user model
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser(parent, args, context) {
    if (context.user) {
      const foundUser = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
      
      return foundUser
    }

    throw new AuthenticationError('Not logged in')
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser(parent, args) {
    const user = await User.create(args);
    const token = signToken(user);

    return { token, user };
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login(parent, { email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Incorrect credentials')
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials')
    }

    const token = signToken(user);

    console.log(token, user)

    return { token, user };
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook(parent, book, context) {
    if (context.user) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );

        return updatedUser;

      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Book was unable to be saved')
      }      
    }

    throw new AuthenticationError('You must be logged in!')

  },
  // remove a book from `savedBooks`
  async deleteBook(parent, { bookId }, context) {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Couldn't find user with this id!")
      }
      return updatedUser;      
    }

    throw new AuthenticationError('You must be logged in!')

  },
};
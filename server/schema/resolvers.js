const {
    getSingleUser,
    login,
    createUser,
    saveBook,
    deleteBook
} = require('../controllers/user-controller')

const resolvers = {
    Query: {
        me: getSingleUser
    },
    Mutation: {
        addUser: createUser,
        login: login,
        addBook: saveBook,
        removeBook: deleteBook
    }
}

module.exports = resolvers
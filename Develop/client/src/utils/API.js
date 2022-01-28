import gql from 'graphql-tag'

export const QUERY_ME = gql`
  query me {
    me {
      bookCount
      savedBooks {
        bookId
        image
        title
        authors
        description
      }      
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        savedBooks {
          bookId
          image
          title
          authors
          description
        }
      }      
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        savedBooks {
          bookId
          image
          title
          authors
          description
        }
      }      
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($authors: [String], $description: String, $bookId: String!, $image: String, $link: String, $title: String!) {
    addBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
      bookCount
      savedBooks {
        bookId
        image
        title
        authors
        description
      }
    }
  }
`

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      bookCount
      savedBooks {
        bookId
        image
        title
        authors
        description
      }
    }
  }
`

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};







// route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData) => {
//   return fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// // save book data for a logged in user
// export const saveBook = (bookData, token) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bookData),
//   });
// };

// remove saved book data for a logged in user
// export const deleteBook = (bookId, token) => {
//   return fetch(`/api/users/books/${bookId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };



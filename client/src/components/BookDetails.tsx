import React from 'react';
import { graphql } from 'react-apollo'; //Helps Glue Query To Component
import { getBook } from '../queries/queries';

interface BookDetailsProp {
  bookId: string | null;
  data?: any;
}

function BookDetails(props: BookDetailsProp) {
  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name} </h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className='other-books'>
            {book.author.books.map((item: any) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <div>No Book Selected...</div>;
  };
  return <div id='book-details'>{displayBookDetails()}</div>;
}

export default graphql(getBook, {
  options: (props: BookDetailsProp) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);

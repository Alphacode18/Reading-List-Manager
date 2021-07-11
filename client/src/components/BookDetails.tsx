import React from 'react';
import { graphql } from 'react-apollo'; //Helps Glue Query To Component
import { getBook } from '../queries/queries';

interface Book {
  name?: string;
  genre?: string;
  id?: string;
}

interface BookDetailsProp {
  bookId: string | null;
  data?: any;
}

function BookDetails(props: BookDetailsProp) {
  console.log(props);
  const { book } = props.data;
  if (book) {
    return (
      <div id='book-details'>
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
  return <p>No Book Selected </p>;
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

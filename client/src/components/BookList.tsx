import React from 'react';
import { graphql } from 'react-apollo'; //Helps Glue Query To Component
import { getBooksQuery } from '../queries/queries';

interface Book {
  name?: string;
  genre?: string;
  id?: string;
}

interface BookListProps {
  books: Book[];
}

function BookList(props: any) {
  const displayBooks = () => {
    const { books, loading } = props.data;
    return loading ? (
      <div>Loading Books...</div>
    ) : (
      books.map((book: Book) => {
        return <li key={book.id}>{book.name}</li>;
      })
    );
  };
  return (
    <div id='main'>
      <ul id='book-list'>{displayBooks()}</ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);

import React, { ChangeEvent, useState } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

interface Author {
  name?: string;
  age?: number;
  id?: string;
}

function AddBook(props: any) {
  const [name, setName] = useState<HTMLInputElement | null>();
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(name, genre, author);
  };

  const displayAuthors = () => {
    const { authors, loading } = props.data;
    return loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      authors.map((author: Author) => {
        return (
          <option value={author.name} key={author.id}>
            {author.name}
          </option>
        );
      })
    );
  };
  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          onChange={(event: any) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          onChange={(event: any) => {
            setGenre(event.target.value);
          }}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select
          onChange={(event: any) => {
            setAuthor(event.target.value);
          }}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getAuthorsQuery)(AddBook);

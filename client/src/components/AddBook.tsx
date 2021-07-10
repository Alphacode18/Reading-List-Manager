import React, { ChangeEvent, useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

interface Author {
  name?: string;
  age?: number;
  id?: string;
}

function AddBook(props: any) {
  const [name, setName] = useState<HTMLInputElement | null>();
  const [genre, setGenre] = useState<HTMLInputElement | null>();
  const [author, setAuthor] = useState<HTMLInputElement | null>();

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    props.addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: author,
      },
    });
  };

  const displayAuthors = () => {
    const { authors, loading } = props.getAuthorsQuery;
    return loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      authors.map((author: Author) => {
        return (
          <option value={author.id} key={author.id}>
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

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

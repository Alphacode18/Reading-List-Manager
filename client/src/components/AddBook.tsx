import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

interface Author {
  name?: string;
  age?: number;
  id?: string;
}

function AddBook(props: any) {
  const displayAuthors = () => {
    const { authors, loading } = props.data;
    return loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      authors.map((author: Author) => {
        return <option key={author.id}>{author.name}</option>;
      })
    );
  };
  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getAuthorsQuery)(AddBook);

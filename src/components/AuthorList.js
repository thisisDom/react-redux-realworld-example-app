import React from 'react';
import { Link } from 'react-router-dom';
import ListPagination from './ListPagination';

const AuthorList = props => {
  if (!props.authors){
    return (
      <div className="article-preview">Loading...</div>
    );
  }
  if (!props.authors.length === 0) {
    return (
      <div className="article-preview">
        No authors are here... yet.
      </div>
    );
  }
  const authorMetaStyle = {
    display: 'flex',
    width: "100%",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "1rem 0"
  }

  return (
    <div>
      {
        props.authors.map( author => {
          return (
            <div className="author-meta" style={authorMetaStyle} key={author.username}>
              <div className="info">
                <Link className="author" to={`/@${author.username}`}>
                  {author.username}
                </Link>
              </div>
            </div>
          )
        })
      }
      <ListPagination
        type="authors"
        pager={props.pager}
        itemCount={props.authorsCount}
        currentPage={props.currentPage} />
    </div>
  )
}

export default AuthorList;
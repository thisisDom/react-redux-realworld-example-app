import React from 'react';
import { connect } from 'react-redux';
import { SET_ARTICLE_PAGE, SET_AUTHORS_PAGE } from '../constants/actionTypes';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetPage: (page, payload) => {
    if (ownProps.type === 'authors'){
      dispatch({ type: SET_AUTHORS_PAGE, page, payload })
    }
    else {
      dispatch({ type: SET_ARTICLE_PAGE, page, payload })
    }
  }
});

const ListPagination = props => {
  if (props.itemCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.itemCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    } 
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);

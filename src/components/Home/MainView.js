import ArticleList from '../ArticleList';
import AuthorList from '../AuthorList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { 
  CHANGE_TAB, 
  GET_GLOBAL_ARTICLES, 
  GET_FEED_ARTICLES,
  GET_AUTHORS,
} from '../../constants/actionTypes';

const AuthorsFeedTab = props => {
  const clickHandler = e => {
    e.preventDefault();
    props.onTabClick('authors', agent.Authors.all, agent.Authors.all())
  }
  return (
    <li className="nav-item">
      <a href=""
        className={ props.tab === 'authors' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Authors
      </a>
    </li>
  )
}

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const tabActions = {
  authors: (pager, payload) => ({
    type: GET_AUTHORS,
    pager,
    payload
  }),
  all: (pager, payload) => ({
    type: GET_GLOBAL_ARTICLES,
    pager,
    payload
  }),
  feed: (pager, payload) => ({
    type: GET_FEED_ARTICLES,
    pager,
    payload
  }),
}

const mapStateToProps = state => ({
  authorList: state.authorList,
  articleList: state.articleList,
  tags: state.home.tags,
  token: state.common.token,
  tab: state.home.tab,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => {
    dispatch({ type: CHANGE_TAB, tab, pager, payload })
    let tabAction = tabActions[tab](pager, payload)
    if (tabAction){
      dispatch(tabAction)
    }
  }
});

const renderView = props => {
  switch(props.tab){
    case 'authors':
      return <AuthorList 
              pager={props.authorList.pager}
              authors={props.authorList.authors}
              loading={props.loading} 
              authorsCount={props.authorList.authorsCount}  
              currentPage={props.authorList.currentPage}  />
    case 'feed':
    case 'all':
      return <ArticleList
              pager={props.articleList.pager}
              articles={props.articleList.articles}
              loading={props.loading}
              articlesCount={props.articleList.articlesCount}
              currentPage={props.articleList.currentPage} />
    default:
      return;
  }
}

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <AuthorsFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>
      {renderView(props)}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

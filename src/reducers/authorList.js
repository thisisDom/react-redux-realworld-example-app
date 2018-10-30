import {
  GET_AUTHORS,
  SET_AUTHORS_PAGE,
  CHANGE_TAB
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHORS_PAGE:
      return {
        ...state,
        authors: action.payload.authors,
        authorsCount: action.payload.authorsCount,
        currentPage: action.page
      };
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        currentPage: 0,
      };
    case GET_AUTHORS:
      return {
        ...state,
        pager: action.pager,
        authors: action.payload.authors,
        authorsCount: action.payload.authorsCount,
        currentPage: 0
      }
    default:
      return state;
  }
};
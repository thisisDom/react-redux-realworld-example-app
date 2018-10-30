import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_TAB } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tab: action.tab,
        tags: action.payload[0].tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};

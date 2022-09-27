import {
  LAUNDRY_ITEM_LIST,
  LAUNDRY_ADD_ITEM,
  LAUNDRY_INFO
} from '../actions/types/types';

export const initState = {
  laundry_item_list: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case LAUNDRY_ITEM_LIST:
      return {
        ...state,
        laundryItems: action.payload.data.laundryItems
      };
    case LAUNDRY_ADD_ITEM:
      return {
        ...state
      };
    case LAUNDRY_INFO:
      return {
        ...state,
        laundryInfo: action.payload.data.laundries
      };
    default:
      return state;
  }
};

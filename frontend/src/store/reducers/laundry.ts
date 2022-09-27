import { LAUNDRY_ITEM_LIST, LAUNDRY_ADD_ITEM } from '../actions/types/types';

export const initState = {
  laundry_item_list: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case LAUNDRY_ITEM_LIST:
      return {
        laundry_item_list: action.payload.data.laundryItems
      };
    case LAUNDRY_ADD_ITEM:
      return {
        ...state
      };
    default:
      return state;
  }
};

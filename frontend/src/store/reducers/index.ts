import { combineReducers } from 'redux';
import user from './user';
import laundry from './laundry';

const rootReducer = combineReducers({
  user,
  laundry
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

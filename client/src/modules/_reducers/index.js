import { combineReducers } from "redux";
import user from "./user_reducer";
import imgList from "./img_reducer";
//

const rootReducer = combineReducers({
  user,
  imgList,
});

export default rootReducer;

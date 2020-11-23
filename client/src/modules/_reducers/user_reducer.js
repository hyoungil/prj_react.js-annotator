import { SIDE_HANDEL_MOUSE,} from "../_actions/types";
const initialState = {
  mouseStatus: "0",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIDE_HANDEL_MOUSE:
      return { ...state, mouseStatus: action.payload };
    default:
      return state;
  }
}

import { act } from "react-dom/test-utils";
import { GET_IMG_UNIT, VIEW_LABEL_BOX, DEL_IMG_LABEL, SIDE_HANDEL_MOUSE, INIT_DATA_LIST_SET, INIT_DATA_SET, SET_IMG_UNIT, SET_IMG_LABEL } from "../_actions/types";
const initialState = {
  imgIdx: 0,
  name: '',
  fakeDummyList: [
    // {
    //   imgId: "",
    //   imgIdx: 0,
    //   url: "",
    //   dir: "",
    // }
  ],
  fakeDummyData: {},
  LabalList: [{
    classUuid: "testUuid",
    className: "testName",
    label: [[0, 0], [0, 0], [0, 0], [0, 0]],
    viewFlag: false
  }],
  imgBase64Str: ""
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SIDE_HANDEL_MOUSE:
      return {
        ...state, LabalList: state.LabalList.map((element) =>
          element.viewFlag === true ? { ...element, viewFlag: false } : { ...element, viewFlag: false })
      };
    case VIEW_LABEL_BOX:
      return {
        ...state, LabalList: state.LabalList.map((element) =>
          element.classUuid === action.payload ? { ...element, viewFlag: true } : { ...element, viewFlag: false })
      };
    case DEL_IMG_LABEL:
      return { ...state, LabalList: state.LabalList.filter((item) => item.classUuid !== action.payload) }
    case SET_IMG_UNIT:
      return {
        ...state,
        imgIdx: action.payload.imgIdx,
        name: action.payload.name,
        imgBase64Str: action.payload.imgBase64Str,
        LabalList: action.payload.label
        // LabalList: Array.isArray(action.payload.label) ? action.payload.label : []
      };
    case SET_IMG_LABEL:
      return {
        ...state,
        imgIdx: action.payload.imgIdx,
        name: action.payload.imgName,
        LabalList: [...state.LabalList, action.payload.imgObj]
      };
    case INIT_DATA_SET:
      return {
        ...state,
        LabalList: Array.isArray(action.payload.label) ? action.payload.label : [],
        imgBase64Str: action.payload.imgBase64Str,
        imgIdx: action.payload.imgIdx,
        name: action.payload.name
      }
    case INIT_DATA_LIST_SET:
      return {
        ...state, fakeDummyList: action.payload.concat({
          imgId: action.payload.imgId,
          imgIdx: action.payload.imgIdx,
          url: action.payload.url,
          dir: action.payload.dir,
        }),

      };
    default:
      return state;
  }
}
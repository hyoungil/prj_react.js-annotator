// import { LOGIN_USER, REGISTER_USER, AUTH_USER, SELECT_POINTER } from "./types";
import { GET_IMG_UNIT, VIEW_LABEL_BOX, DEL_IMG_LABEL, INIT_DATA_LIST_SET, INIT_DATA_SET, SET_IMG_UNIT, SET_IMG_LABEL } from "./types";
import { userAPI } from "../api/userAPI";
import axios from 'axios';
import { request } from '../api/fetch';


// const GET_FAKE_DATA = "http://127.0.0.1:8002/api/get_viewData";
const USER_URL = "/api";

export function viewLabelBoxHandle(imgUuid) {
  return {
    type: VIEW_LABEL_BOX,
    payload: imgUuid,
  };
}

export function setImageUnitDate(imgIdx) {
  return (dispatch) => {
    console.log(imgIdx)
    userAPI.getImageUnitDate(imgIdx).then((res) => {
      dispatch(setImageUnitDateAct(res))
    })
  }
}

export function setImageUnitDateAct(res) {
  return {
    type: SET_IMG_UNIT,
    payload: res
  };
}


export function onSaveLabel(param) {
  const data = request("put", USER_URL + "/library", param);

  return {
    type: SET_IMG_LABEL,
    payload: param
  };
}
export function onDeleteLabel(param) {
  const data = request("delete", USER_URL + "/unit_data", param);

  return {
    type: DEL_IMG_LABEL,
    payload: param.classUuid
  };
}



export function onInitFakeDataList() {
  const data = request("get", USER_URL + "/get_viewData");
  return {
    type: INIT_DATA_LIST_SET,
    payload: data,
  };
  // return (dispatch) => {
    // userAPI.getfakeData().then((res) => {
    //   dispatch(onInitFakeDataListAct(res))
    // })
  // }
}

export function onInitFakeDataListAct(res) {

  return {
    type: INIT_DATA_LIST_SET,
    payload: res,
  };
}
export function initSetDataList(data) {

  return {
    type: INIT_DATA_SET,
    payload: data,
  };
}

export function itemsFetchData(value) {
  return (dispatch) => {
    userAPI.getImageUnitDate(value).then((res) => {
      dispatch(initSetDataList(res))
    })
    // axios.get(GET_FAKE_DATA)
    //   .then((response) => dispatch(initSetDataList(0)));
  };
}

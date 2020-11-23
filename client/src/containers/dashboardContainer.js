import './dashboardContainer.css';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenu from '../component/sideMenu';
import CropperComponent from '../component/cropper';
import LabelListComponent from '../component/labelList';
import * as imgAction from '../modules/_actions/img_action';
import { setImageUnitDate, onSaveLabel, itemsFetchData } from '../modules/_actions/img_action';
import * as useAction from '../modules/_actions/user_action';
import { sideMenuHandle } from '../modules/_actions/user_action';
import Header from '../layout/header';
import { useHistory } from "react-router-dom";

export const DashBoardContainer = ({ imgIdx, name, mouseFlag, LabalList, imgBase64Str, imgAction, useAction }) => {
  const history = useHistory();
  // 페이크 데이터 생성
  useEffect(() => {
    console.log(history)
    if (!history.location.imgidx) {
      history.goBack()
    }
    imgAction.itemsFetchData(history.location.imgidx)
  }, [imgAction])

  const handleChangeMouseAct = value => {
    useAction.sideMenuHandle(value)
    // sideMenuHandle(value)
  }
  const onSliderImageHandle = (Idx) => {
    if (Idx < 0) {
      return;
    }
    imgAction.setImageUnitDate(Idx)

  }
  const onSaveLabelHandle = (obj) => {
    let param = {
      imgIdx: imgIdx,
      imgName: name,
      imgObj: obj

    }
    imgAction.onSaveLabel(param)
  }

  return (
    <>
      <Header />
      <div className="contents">
        <div className="menu">
          <SideMenu mouseFlag={mouseFlag}
            onClickMouseAct={handleChangeMouseAct} />
        </div>
        <LabelListComponent labalList={LabalList} />
        <CropperComponent mouseFlag={mouseFlag} imgIndex={imgIdx} imgBase64={imgBase64Str} onSliderImage={onSliderImageHandle} onSaveLabel={onSaveLabelHandle} />
      </div>
    </>
  );
}


export default connect(
  state => ({
    imgIdx: state.imgList.imgIdx,
    name: state.imgList.name,
    mouseFlag: state.user.mouseStatus,
    LabalList: state.imgList.LabalList,
    imgBase64Str: state.imgList.imgBase64Str,
  }),
  dispatch => ({
    // sideMenuHandle: amount => dispatch(sideMenuHandle(amount)) ,
    useAction: bindActionCreators(useAction, dispatch),
    imgAction: bindActionCreators(imgAction, dispatch),
  })
)(DashBoardContainer)


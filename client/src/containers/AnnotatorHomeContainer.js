import './dashboardContainer.css';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SideMenu from '../component/sideMenu';
import CropperComponent from '../component/cropper';
import LabelListComponent from '../component/labelList';
import * as imgAction from '../modules/_actions/img_action';
import { setImageUnitDate, onSaveLabel } from '../modules/_actions/img_action';
// import { loginUser } from '../modules/_actions/user_action';
import * as useAction from '../modules/_actions/user_action';
import Header from '../layout/header';
import { useReducer, useState, useCallback, useMemo } from 'react';
// import ImageList from 'react-image-list';
import LabelCardComponent from '../component/labelCard';
import { useHistory, withRouter } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import data from '../modules/api/data';

const useStyles = makeStyles((theme) => ({
  labelCard: {
    height: '100%'
  },
  title: {
    position: "absolute",
    top: "115px",
    left: "136px",
    width: "100%",
    height: "49px",
    textAlign: "left",
    font: "normal normal bold 36px/49px Noto Sans Display",
    letterSpacing: 0,
    color: "#141746",
    opacity: 1
  },
  body: {
    top: "208px",
    position: "absolute"
  }
}));
// const dataOninitHandle = (list) => {
//   console.log(list)
//   return list.sort();
// }
export const AnnotatorContainer = ({ fakeDummyList,imgAction }) => {
  const classes = useStyles();
  const history = useHistory();
  // 임의 데이터
  const [labelList] = useState(data);


  // useEffect(() => {
  //   imgAction.onInitFakeDataList();
  // }, [imgAction])



  const onSeleteImageHandel = (e) => {
    history.push({
      pathname: '/label_list',
      imgidx: e
    })
    console.log(e)
  }
  // const sortList = useMemo(() => dataOninitHandle(fakeDummyList), [fakeDummyList]);
  return (
    <>
      <div>
        <div>
          <p className={classes.title}>
            Annotator Home
          </p>
        </div>
        <div className={classes.body}>
          <Container maxWidth={false}>
            {/* <Toolbar /> */}
            <Box mt={3}>
              <Grid
                container
                spacing={2}
              >
                {labelList.map((lebel) => (
                  <Grid
                    item
                    key={lebel.imgId}
                    lg={2}
                    md={6}
                    xs={12}
                  >
                    <LabelCardComponent
                      className={classes.labelCard}
                      lebel={lebel}
                      onSeleteImage={onSeleteImageHandel}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
  // }
}

export default connect(
  state => ({
    fakeDummyList: state.imgList.fakeDummyList
  }),
  dispatch => ({
    imgAction: bindActionCreators(imgAction, dispatch),
  })
)(AnnotatorContainer)

// export default AnnotatorContainer

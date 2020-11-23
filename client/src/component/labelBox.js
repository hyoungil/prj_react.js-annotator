import React, { useState, useMemo, useEffect, useCallback } from 'react';
import "./cropper.css"
// import "./labelBox.css"
import { useSelector, useDispatch, connect } from 'react-redux';
import * as imgAction from '../modules/_actions/img_action';
import { bindActionCreators } from 'redux';
import ContextMenu from './contextMenu';
import styled from 'styled-components';
import { MenuItem, ContextMenuTrigger } from "react-contextmenu";

const labelfilterHandle = (LabalList) => {
    return LabalList.find(item => item.viewFlag === true);
}
const labelIndexHandle = (LabalList) => {
    return LabalList.findIndex(obj => obj.viewFlag === true);
}

const LabelBox = ({ name, LabalList, mouseStatus ,imgAction }) => {

    const [contextMenuProperties, setContextMenuProperties] = useState({
        contextMenuVisibility: false,
        contextMenuTop: 0,
        contextMenuLeft: 0,
    });
    
    const onClose = useCallback(() => {
        setContextMenuProperties({
            contextMenuVisibility: false,
            contextMenuTop: 0,
            contextMenuLeft: 0,
        });
    }, [setContextMenuProperties]);

    const onRightClickBoxIn = useCallback(
        (event) => {
            event.preventDefault();
            setContextMenuProperties({
                contextMenuVisibility: true,
                contextMenuTop: event.clientY,
                contextMenuLeft: event.clientX,
            });
        },
        [setContextMenuProperties]
    );

    const {
        contextMenuTop,
        contextMenuLeft,
        contextMenuVisibility,
    } = contextMenuProperties;

    const dispatch = useDispatch();
    const labelBox = useMemo(() => labelfilterHandle(LabalList), [LabalList]);
    const labelIndex = useMemo(() => labelIndexHandle(LabalList), [LabalList]);
    useEffect(() => {
        const KEY_DEL = 46;
        const KEY_BACK = 8;
        const handleDelKeyUP = (event) => {
            if (event.keyCode === KEY_BACK || event.keyCode === KEY_DEL) {
                if (labelBox) {
                    console.log(labelBox)
                    let param = {
                        classUuid: labelBox.classUuid,
                        imgUuid: name,
                        labelIndex: labelIndex
                    }
                    imgAction.onDeleteLabel(param)
                }
            };
        }
        window.addEventListener('keyup', handleDelKeyUP);
        return () => {
            window.removeEventListener('keyup', handleDelKeyUP);
        };
    }, [labelBox]);
    const boxInconTextMenuClick = useCallback((data) => {
        console.log(`clicked`, { data });
        onClose()
    },[onClose]);
    return (
        <>
            {
                mouseStatus === "0" ? (
                    labelBox && (
                        <>
                            {contextMenuVisibility && (
                                <ContextMenu
                                    className="react-contextmenu"
                                    top={contextMenuTop}
                                    left={contextMenuLeft}
                                    close={onClose}
                                >
                                    <MenuItem >Edit Class <span>(TBD)</span></MenuItem>
                                    <MenuItem divider />
                                    <MenuItem onClick={boxInconTextMenuClick.bind(null, "ctx")} >Cut<span>Ctrl + x</span></MenuItem>
                                    <MenuItem onClick={boxInconTextMenuClick.bind(null, "ctc")} >Copy<span>Ctrl + c</span></MenuItem>
                                    <MenuItem onClick={boxInconTextMenuClick.bind(null, "ctv")} >Paste<span>Ctrl + v</span></MenuItem>
                                    <MenuItem onClick={boxInconTextMenuClick.bind(null, "del")} >Delte<span>Del</span></MenuItem>
                                </ContextMenu>
                            )}
                            <div onContextMenu={onRightClickBoxIn}>
                                <div className="cropper-crop-box" style={{ top: `${labelBox.label[0][1]}px`, left: `${labelBox.label[0][0]}px`, width: `${labelBox.label[1][0] - labelBox.label[0][0]}px`, height: `${labelBox.label[2][1] - labelBox.label[0][1]}px`, zIndex: `99` }}>
                                    <span className="cropper-view-box"></span>
                                    <span className="cropper-dashed dashed-h"></span>
                                    {/* {name} */}
                                    <span className="cropper-dashed dashed-v"></span>
                                    <span className="cropper-center"></span>
                                    <span className="cropper-face"></span>
                                    <span className="cropper-line line-e" data-cropper-action="e"></span>
                                    <span className="cropper-line line-n" data-cropper-action="n"></span>
                                    <span className="cropper-line line-w" data-cropper-action="w"></span>
                                    <span className="cropper-line line-s" data-cropper-action="s"></span>
                                </div>
                            </div>
                        </>
                    )
                ) : (<></>)
            }
        </>
    );
};


const mapStateToProps = ({ imgList, user }) => ({
    name: imgList.name,
    LabalList: imgList.LabalList,
    mouseStatus: user.mouseStatus
});


const mapDispatchToProps = dispatch => ({
    imgAction: bindActionCreators(imgAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelBox);

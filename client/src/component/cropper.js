import "./cropper.css"
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useRef } from "react";
import { useState, useCallback, useMemo } from 'react';
import { MenuItem } from "react-contextmenu";
import LabelBox from "./labelBox";
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';
import ContextMenu from './contextMenu';
import 'react-image-crop/dist/ReactCrop.css';

const mouseFlagHandle = (mouseFlag) => {
    return mouseFlag === "0" ? true : false;
}

export const CropperComponent = ({ imgIndex, imgBase64, onSliderImage, onSaveLabel, mouseFlag }) => {
    const containerRef = useRef();
    const inputClassNameRef = useRef();
    const cropperImgRef = useRef(null);
    const imageRef = useRef();
    const [imageSize, setImage] = useState();
    const [show, setShow] = useState(false);
    const [contextMenuBoxOut, setcontextMenuBoxOut] = useState({
        contextMenuVisibility: false,
        contextMenuTop: 0,
        contextMenuLeft: 0,
    });
    const [crop, setCrop] = useState({
        unit: '%',
        width: 30,
        disabled: false
        // aspect: 16 / 9,
    })
    const [position, setPosition] = useState({
        oldX: 0,
        oldY: 0,
        x: 0,
        y: 0,
        z: 1,
    });
    const [mouseDragImgIndex, setMouseDragImgIndex] = useState({
        oldX: 0,
        oldY: 0,
        newX: 0,
        newY: 0
    });
    const [movingViewFlag, setMovingViewFlag] = useState("0");



    // https://github.com/DominicTobias/react-image-crop/issues/360
    // https://yeri-kim.github.io/posts/react-hooks/


    const onWheel = useCallback((e) => {
        if (e.deltaY) {
            const sign = Math.sign(e.deltaY) / 10;
            const scale = 1 - sign;
            const rect = containerRef.current.getBoundingClientRect();
            // setImage({
            //     width: imageSize.width + 10,
            //     height: imageSize.height + 10,
            // })
            setPosition({
                ...position,
                x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
                y: position.y * scale - (imageSize.height * rect.width / imageSize.width / 2 - e.clientY + rect.y) * sign,
                z: position.z * scale,
            });
        }
    }, [imageSize, position, setPosition]);

    const handleDragStart = (event) => {
        setMouseDragImgIndex({
            ...mouseDragImgIndex,
            oldX: event.clientX,
            oldY: event.clientY,
        })
    }
    const handleDragEnd = (event) => {
        if (!cropDisable) {
            return;
        }
        setMouseDragImgIndex({
            ...mouseDragImgIndex,
            newX: event.clientX,
            newY: event.clientY
        })
        event.preventDefault();
        setShow(false)
        if (movingViewFlag === "1") {
            let nextOrPreFlag = mouseDragImgIndex.oldX - mouseDragImgIndex.newX < 0 ? "p" : "n";
            if (nextOrPreFlag === "p") {
                if (imgIndex > 0) {
                    let imgIdx = imgIndex - 1;
                    console.log(imgIdx)
                    onSliderImage(imgIdx)
                } else { 
                    return;
                }
            } else if (nextOrPreFlag === "n") {
                let imgIdx = imgIndex + 1;
                console.log(imgIdx)
                onSliderImage(imgIdx)
            }
            setCrop({ disabled: false })
        }
    }
    const onImageLoaded = image => {
        // this.imageRef = image;
        try {

            // imgRef = image;
            // console.log("=======================imgRefimgRefimgRefimgRef")
            // console.log(image)
            // console.log(imgRef.current)
            // console.log("=======================imgRefimgRefimgRefimgRef")
        } catch (error) {
            console.log(error)
        }
        setImage({
            width: image.width,
            height: image.height,
        });
        // imageRef = img
    };

    const onCropComplete = useCallback((crop) => {
        if (crop.height !== 0 && crop.x !== 0) {
            setShow(true)
            inputClassNameRef.current.focus()
            inputClassNameRef.current.style.top = `${crop.y + 80}px`;
            inputClassNameRef.current.style.left = `${crop.x + crop.width + 284}px`;
        } else {
            setShow(false)
        }
        // makeClientCrop(crop);
        // setShow('true')
        // setShow('false')
    }, [setShow]);

    const onCropChange = (crop, percentCrop) => {
        setCrop(percentCrop)
        setShow(true)
    };
    const guid_create = () => {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = ((d + Math.random() * 16) % 16) | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    useEffect(() => {
        const KEY_ESCAPE = 32;
        const handleKeyDown = (event) => {
            if (event.keyCode === KEY_ESCAPE) {
                setMovingViewFlag("1");
            };
        }
        const handleKeyUP = (event) => {
            setMovingViewFlag("0");
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUP);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUP);
        };
    }, []);

    const addinputClass = (eve) => {
        if (eve.charCode === 13) {
            let x1 = (cropperImgRef.current.evData.clientStartX).toFixed(0)
            let y1 = (cropperImgRef.current.evData.clientStartY).toFixed(0);
            let x2 = (cropperImgRef.current.evData.clientStartX + cropperImgRef.current.evData.cropStartX).toFixed(0);
            let y2 = (cropperImgRef.current.evData.clientStartY).toFixed(0);
            let x3 = (cropperImgRef.current.evData.clientStartX).toFixed(0);
            let y3 = (cropperImgRef.current.evData.clientStartY + cropperImgRef.current.evData.cropStartY).toFixed(0);
            let list = [
                [parseInt(x1), parseInt(y1)],
                [parseInt(x2), parseInt(y2)],
                [parseInt(x3), parseInt(y3)]
            ]
            const labelPointList = pointSolution(list);
            const classUuid = guid_create();

            list.push(labelPointList);
            let lebleBoxClass = {
                classUuid: classUuid,
                className: inputClassNameRef.current.value,
                label: list,
                viewFlag: false
            }
            onSaveLabel(lebleBoxClass);
            inputClassNameRef.current.value = "";
            setShow(false);
            setCrop({
                disabled: false
            })
        }
    }

    const pointSolution = (v) => {
        var a = {}
        var b = {}
        const answer = []
        v.forEach(r => {
            if (a[r[0]]) {
                a[r[0]] = a[r[0]] + 1
            } else {
                a[r[0]] = 1
            }
            if (b[r[1]]) {
                b[r[1]] = b[r[1]] + 1
            } else {
                b[r[1]] = 1
            }
        });
        for (var i in a) {
            if (a[i] === 1) {
                answer.push(Number(i))
                break;
            }
        }
        for (var j in b) {
            if (b[j] === 1) {
                answer.push(Number(j))
                break;
            }
        }
        return answer
    }
    const onRightClickBoxOut = useCallback(
        (event) => {
            event.preventDefault();
            setcontextMenuBoxOut({
                contextMenuVisibility: true,
                contextMenuTop: event.clientY,
                contextMenuLeft: event.clientX,
            });
        },
        [setcontextMenuBoxOut]

    );
    const onClose = useCallback(() => {
        setcontextMenuBoxOut({
            contextMenuVisibility: false,
            contextMenuTop: 0,
            contextMenuLeft: 0,
        });
    }, [setcontextMenuBoxOut]);
    const boxInconTextMenuClick = useCallback((data) => {
        console.log(`clicked`, { data });
        onClose()
    }, [onClose]);
    const {
        contextMenuTop,
        contextMenuLeft,
        contextMenuVisibility,
    } = contextMenuBoxOut;
    const cropDisable = useMemo(() => mouseFlagHandle(mouseFlag), [mouseFlag]);
    return (
        <>
            < div className="container">
                <LabelBox></LabelBox>
                {
                    !cropDisable && (
                        show && (
                            <input ref={inputClassNameRef} onKeyPress={addinputClass} type="text" className="input-tagging" placeholder="Input Class Name" />
                        )
                    )
                }
                <div onContextMenu={onRightClickBoxOut}>
                    <Grid item xl={7} onDragStart={handleDragStart} onDragEnd={handleDragEnd} ref={containerRef} onWheel={onWheel}>
                        <div className="cropper-container">
                            <ReactCrop
                                ref={cropperImgRef}
                                src={imgBase64}
                                crop={crop}
                                ruleOfThirds
                                disabled={cropDisable}
                                onImageLoaded={onImageLoaded}
                                onComplete={onCropComplete}
                                onChange={onCropChange}
                                style={{
                                    transform: `scale(${position.z})`
                                }} />
                        </div>
                    </Grid>
                </div>
                {contextMenuVisibility && (
                    <ContextMenu
                        className="react-contextmenu"
                        top={contextMenuTop}
                        left={contextMenuLeft}
                        close={onClose}>
                        <MenuItem onClick={boxInconTextMenuClick} data={{ item: 'item 2' }}>Paste<span>Ctrl + v</span></MenuItem>
                    </ContextMenu>
                )}
            </div>
        </>
    );
}
CropperComponent.propTypes = {
    imgIndex: PropTypes.number,
    imgBase64: PropTypes.string,
    onSliderImage: PropTypes.func,
    onSaveLabel: PropTypes.func,
    mouseFlag: PropTypes.string,
}

CropperComponent.defaultProps = {
    imgIndex: 0,
    imgBase64: "",
    onSliderImage: () => { },
    onSaveLabel: () => { },
    mouseFlag: "0",
};
export default CropperComponent;
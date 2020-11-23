import React from 'react';
import cursorImg from '../assets/img/cursor.png';
import frameImg from '../assets/img/frame.png';

export const SideMenu = ({ onClickMouseAct, mouseFlag }) => {
    return (
        <>
            <div className={[
                'unitMenu',
                mouseFlag == "0" ? 'unitMenuAct' : '',
            ].join(' ')}>
                <img src={cursorImg} alt="포인트" onClick={() => onClickMouseAct("0")} />
            </div>
            <div className={[
                'unitMenu',
                mouseFlag == "1" ? 'unitMenuAct' : '',
            ].join(' ')}>
                <img src={frameImg} alt="그룹" onClick={() => onClickMouseAct("1")} />
            </div>
        </>
    );
};

export default SideMenu;

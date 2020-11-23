import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import "./contextMenu.css"
import { useState, useMemo, useEffect } from 'react';
// import { OutsideContext } from '../../contexts';
// import { useOutside } from '../../hooks';

const ContextMenuContainer = styled.div`
    position: absolute;
    width: 232px;
    height: 214px;
	z-index: 100;
    box-shadow: 0 0 2px 2px black;
    background: #FCFCFC 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 4px;
    opacity: 100;
	${(props) => `
    top: ${props.top || 0}px;
    left: ${props.left || 0}px;
  `}
`;

function ContextMenu({ children, top, left, close }) {
    const contextMenuRef = useRef(null);
    function handleClickOutside(event) {
        if (
            !contextMenuRef?.current?.contains(event.target)
        ) {
            close();
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
    return (
        <ContextMenuContainer className="react-contextmenu" ref={contextMenuRef} top={top} left={left}>
            {children}
        </ContextMenuContainer>
    );
}

ContextMenu.propTypes = {
    children: PropTypes.node,
    top: PropTypes.number,
    left: PropTypes.number,
    close: PropTypes.func,
};

ContextMenu.defaultProps = {
    children: null,
    top: 0,
    left: 0,
    close: () => { },
};

export default ContextMenu;
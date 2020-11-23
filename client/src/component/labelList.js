import { useDispatch } from "react-redux";
import React, { useMemo, } from "react";
import * as img_actions from '../modules/_actions/img_action';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const LabalFilterList = (labalList) => {
    return labalList
}

const LabelList = ({ primaryStr, secondaryStr, onSelect, viewFlag }) => {
    // console.log(secondaryStr)
    return (
        <ListItem button selected={viewFlag} onClick={onSelect}>
            <ListItemText primary={primaryStr} secondary={secondaryStr} />
        </ListItem>
    );
};

export const LabelListComponent = ({ labalList }) => {
    const dispatch = useDispatch();
    const labelItem = useMemo(() => LabalFilterList(labalList), [labalList]);

    const onSelect = (valeu) => {
        dispatch(img_actions.viewLabelBoxHandle(valeu))
    }

    const labelItems = labelItem.map(w => (
        <LabelList
            id={w.classUuid}
            key={w.classUuid}
            primaryStr={w.className}
            secondaryStr={`(${w.label[0][0]}, ${w.label[0][1]})
         (${w.label[1][0]}, ${w.label[1][1]})
          (${w.label[2][0]}, ${w.label[2][1]}) 
          (${w.label[3][0]}, ${w.label[3][1]})`}
            viewFlag={w.viewFlag}
            onSelect={() => onSelect(w.classUuid)}
        />

    ));

    return (
        <>
            <div className="lable">
                <div className="box">
                    <ListItem >
                        <ListItemText primary="Label" />
                    </ListItem>
                    {labelItems}
                </div>
            </div>
        </>
    );
}

export default LabelListComponent;

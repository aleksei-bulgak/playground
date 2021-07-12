import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        background: 'transparent',

        overflow: 'hidden',
    },
});

const Overlay: React.FC<{ zIndex: number }> = ({ zIndex }) => (
    <div className={useStyles().overlay} style={{ zIndex: zIndex }}></div>
);

export default Overlay;

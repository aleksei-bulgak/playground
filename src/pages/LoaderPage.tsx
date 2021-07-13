import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    loader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const LoaderPage: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <div className={classes.loader}>
            <h1>Loading session info!</h1>
            <p>Please wait....</p>
        </div>
    );
};

export default LoaderPage;

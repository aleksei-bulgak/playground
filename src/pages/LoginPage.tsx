import { TextField, Fab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { useAppDispatch } from '../store/hooks';
import { cleareError } from '../store/slices/commonSlice';
import { onGameInfoChange } from '../store/slices/gameSlice';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1rem',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '30%',
        },
    },
    submit: {
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        backgroundColor: 'purple',
        color: 'white',
        '&:hover': {
            backgroundColor: 'purple',
            filter: 'brightness(1.4)',
        },
    },
}));

const Login: React.FC<{}> = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [serverUrl, setServerUrl] = useState<string>('');
    const [gameId, setGameId] = useState<number | undefined>();

    const onLogin = useCallback(
        (e) => {
            e.preventDefault();
            if (!!gameId && !!serverUrl) {
                dispatch(onGameInfoChange({ gameId, serverUrl }));
                dispatch(cleareError());
                history.replace('/game');
            }
        },
        [dispatch, gameId, serverUrl, history],
    );

    return (
        <>
            <section className={`login ${classes.root}`}>
                <form onSubmit={onLogin} className={`${classes.form}`}>
                    <TextField
                        id="url"
                        className="login__url"
                        label="WebSocket server URL"
                        fullWidth={true}
                        required={true}
                        onChange={(e) => setServerUrl(e.target.value)}
                        value={serverUrl}
                    />
                    <TextField
                        id="gameId"
                        className="login__game-id"
                        label="Game ID"
                        fullWidth={true}
                        required={true}
                        onChange={(e) => setGameId(+e.target.value)}
                        value={gameId}
                        type="number"
                    />
                    <Fab
                        className={`login__button ${classes.submit}`}
                        aria-label="login__button"
                        onClick={onLogin}
                        variant="circular"
                    >
                        <ArrowRightAltIcon />
                    </Fab>
                </form>
            </section>
        </>
    );
};

export default Login;

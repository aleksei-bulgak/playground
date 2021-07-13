import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectError, cleareError } from '../../store/slices/commonSlice';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    alert: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});

const ErrorAlert: React.FC<{}> = () => {
    const classes = useStyles();
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    return (
        <>
            {!!error && (
                <Alert severity="error" className={classes.alert} onClose={() => dispatch(cleareError())}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
        </>
    );
};

export default ErrorAlert;

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styled from './BackdropSpinner.module.scss';

interface BackdropSpinnerProps {
  open: boolean;
}

const BackdropSpinner = (props: BackdropSpinnerProps): JSX.Element => {
  const { open } = props;
  return (
    <div className={styled.wrapper} aria-label="Backdrop Spinner">
      <Backdrop open={open} className="custom-backdrop">
        <CircularProgress className="custom-circular-progress" />
      </Backdrop>
    </div>
  );
};

export default BackdropSpinner;

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UploadForm from "./UploadForm";
import { setVisibilitySubmit, setDetails } from "../../redux/actions/upload";
import ImagePicker from "../ImagePicker";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Details", "Visiblity"];
}

export default function HorizontalLinearStepper({ filename }) {
  const classes = useStyles();
  const formRef = useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

  const isLoading = useSelector(({ upload }) => upload.isLoading);
  const thumbnails = useSelector(({ upload }) => upload.thumbnails);
  const steps = getSteps();

  const handleNext = () => {
    formRef.current.submitForm();
    if (!Object.keys(formRef.current.errors).length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = () => {
    formRef.current.submitForm();
  };

  const submitInfo = ({ visibility }) => {
    dispatch(setVisibilitySubmit(visibility));
  };

  const setDetailsRx = (details) => {
    dispatch(setDetails(details));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>{filename}</div>
        {activeStep === steps.length - 1 ? (
          <div>
            <Typography className={classes.instructions}>
              {
                <UploadForm
                  type="visibility"
                  formRef={formRef}
                  onSubmit={submitInfo}
                />
              }
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                className={classes.button}
              >
                Finish
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              <div>
                <UploadForm
                  type="details"
                  formRef={formRef}
                  onSubmit={setDetailsRx}
                />
                Pick an thumbnail:
                <ImagePicker list={thumbnails || new Array(3).fill({})} />}
              </div>
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isLoading}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

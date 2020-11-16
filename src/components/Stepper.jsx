import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  return ['Select campaign settings', 'Create an ad group', 'Create an ad', 'step4'];
}




export default function HorizontalLinearStepper() {
  const [mainMeal, setmainMeal] = useState('');
  const [order, setOrder] = useState('');
  const classes = useStyles();
  const [restaurant, setRestaurant] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (validate(activeStep) === true) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
    }


    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    // console.log(activeStep)
    // setSkipped(newSkipped);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getOrder(data) {
    // console.log(data)
    setOrder(data)
  }
  function getRes(data) {
    // console.log(data)
    setRestaurant(data)
  }
  function getData3(arrData) {
    // console.log(arrData)
    setmainMeal(arrData);

  }
  // console.log(mainMeal)
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step1 getOrder={getOrder} />;
      case 1:
        return <Step2 order={order} getRes={getRes} />;
      case 2:
        return <Step3 restaurant={restaurant} order={order}
          getData3={(arrData) => getData3(arrData)} />;
      case 3:
        return <Step4 mainMeal={mainMeal} restaurant={restaurant}
          order={order} />;
      default:
        return 'Unknown step';
    }
  }
  function validate(activeStep) {
    console.log(activeStep);
    if (activeStep === 0) {
      console.log(order)
      if(!order.meal || !order.num ) {
        alert("please fill all form")
        return false
      }
      // console.log('hi');
    }
    if (activeStep === 1) {
      if (!restaurant) {
        alert("please fill all form")
      }
    }
    if (activeStep === 2) {
      if (!mainMeal) {
        alert("pleasee fill all form")
      }
    }
    return true
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div className="btn">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
              </Button>
                {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
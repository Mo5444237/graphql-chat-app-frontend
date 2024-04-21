import { useState } from "react";

const useInput = (inputValidate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = inputValidate(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
    setIsTouched(true);
  };

  const valueBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError,
    valueBlurHandler,
    valueChangeHandler,
    reset,
  };
};

export default useInput;

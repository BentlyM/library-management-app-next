import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { Dispatch, SetStateAction, useState } from 'react';

function GroupedButtons({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
}) {
  const displayCounter = counter > 0;

  const handleIncrement = () => {
    setCounter((count: number) => count + 1); // Correct increment
  };

  const handleDecrement = () => {
    setCounter((count: number) => Math.max(count - 1, 0)); // Correct decrement, preventing negative values
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleIncrement}>+</Button>
      {displayCounter && <Button disabled>{counter}</Button>}
      {displayCounter && <Button onClick={handleDecrement}>-</Button>}
    </ButtonGroup>
  );
}

export default GroupedButtons;

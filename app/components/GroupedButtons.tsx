import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { Dispatch, SetStateAction } from 'react';

function GroupedButtons({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
}) {
  const displayCounter = counter > 0;

  const handleIncrement = () => {
    if (counter < 100) {
      // Prevent incrementing above 100
      setCounter((count: number) => count + 1);
    }
  };

  const handleDecrement = () => {
    setCounter((count: number) => Math.max(count - 1, 0)); // Prevent negative values
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleIncrement} disabled={counter >= 100}>
        +
      </Button>
      {displayCounter && <Button disabled>{counter}</Button>}
      {displayCounter && <Button onClick={handleDecrement}>-</Button>}
    </ButtonGroup>
  );
}

export default GroupedButtons;

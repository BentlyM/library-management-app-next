'use client';

import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function ErrorPage() {
  const [redirectionTimer, setRedirectionTimer] = useState(5);
  const [err , setErr] = useState<Error>();

  const increment = useCallback(() => {
    if (redirectionTimer > 0) {
      setRedirectionTimer((c) => c - 1);
    }
  }, [redirectionTimer, setRedirectionTimer]);

  useEffect(() => {
    const key = setInterval(increment, 1000);

    return () => {
      clearInterval(key);
    };
  }, [increment]);

  useEffect(() => {
    if (redirectionTimer === 0) {
       window.location.href = '/';
    }
  }, [redirectionTimer]);

  if (!err) {
    return <div>No error found</div>;
  }

  const errorMUI = {
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: "100%"
  };

  return (
    <Box sx={errorMUI}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{err?.message}</i>
      </p>
      <span>Redirecting in {redirectionTimer}</span>
    </Box>
  );
}
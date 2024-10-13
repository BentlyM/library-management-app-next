'use client'
import { Container } from '@mui/material';
import React from 'react';
import defaultImage from '../public/DefaultDisplayImage.svg';
import Image from 'next/image';

const DefaultDashPage = () => {
  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}>
        <Image src={defaultImage} alt="default" style={{width: '35vw'}} />
        <p>Manage your library efficiently with the following options:</p>
        <ul>
          <li>Add new books to the library collection.</li>
          <li>View and manage the current list of books.</li>
          <li>Send books to other locations or libraries.</li>
          <li>Discover books from our library&apos;s.</li>
        </ul>
      </Container>
    </>
  );
};

export default DefaultDashPage;

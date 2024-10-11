// HomePage.tsx
import React from 'react';
import NavBar from '@/app/components/NavBar';
import InfoCard from './_components/InfoCard';
import { Container } from '@mui/material';
import FooterContent from './_components/FooterContent';
import Image from 'next/image';
import bookReadingSvg from '../public/book-reading.svg';
import creativeThinkingSvg from '../public/creative-thinking.svg';
import barnesAndNoblesPng from '../public/Barnes-Noble-Logo.png';
import yalePng from '../public/yale-university-logo.png';
import harvardPng from '../public/Harvard-Logo.png';
import readingTimeSvg from '../public/reading-time.svg'

const HomePage = () => {
  return (
    <div
      className="home-layout"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <NavBar />
      <Container
        className="navigation-content"
        sx={{
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '15px',
          gap: '20%',
        }}
      >
        <InfoCard
          title="Welcome"
          titleHook="Welcome to Our Library Management System!"
          sentence="We're glad you're here! Our library management system is designed to make it easy for you to manage your book collections, borrow and return books, and access your account information. Take a look around and explore our features to get started!"
          width={'450px'}
        />
        <Image
          src={bookReadingSvg}
          height={300}
          width={350}
          style={{ border: 'transparent' }}
          alt="Group Book Reading"
        />
      </Container>
      <Container
        className="main-content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.default',
          color: 'text.primary',
          gap: '20px',
          maxWidth: '100%',
        }}
      >
        <InfoCard
          title="Partners"
          titleHook="Partnering with Us: Empowering a Love of Reading"
          sentence="We're proud to collaborate with partners who share our passion for making books accessible to everyone. Together, we can create a world where reading is a fundamental part of every community. Explore our partnership opportunities and discover how we can work together to inspire a love of reading."
          align={'center'}
          width="50%"
          images={[barnesAndNoblesPng.src, yalePng.src, harvardPng.src]}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Image
            src={creativeThinkingSvg}
            height={300}
            width={350}
            style={{ border: 'transparent' }}
            alt="undecided"
          />
          <InfoCard
            titleHook="Join the Conversation: Collaborate with Fellow Book Lovers"
            sentence="Our community is built on the idea that sharing ideas and perspectives is just as important as reading itself. Join discussions, participate in book clubs, and connect with fellow readers to enhance your reading experience. Share your thoughts, learn from others, and discover new titles to add to your reading list."
            align={'center'}
            width={'30vw'}
            title={''}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap-reverse',
            width: '100%',
          }}
        >
          <InfoCard
            titleHook="Your Personal Reading Sanctuary: Explore and Discover at Your Own Pace"
            sentence="Sometimes, the best way to enjoy a good book is in quiet solitude. Our website is designed to provide a peaceful and personalized reading experience, tailored to your interests and preferences. Browse our collections, create your own reading lists, and track your progress &#45; all at your own pace, and in the comfort of your own space."
            align={'center'}
            width={'30vw'}
            title={''}
          />
          <Image
            src={readingTimeSvg}
            height={300}
            width={350}
            style={{ border: 'transparent' }}
            alt="undecided"
          />
        </div>
        <div>
          <InfoCard
            title={'Team'}
            titleHook={'Our Talent'}
            sentence={'our talent was just me. this was pretty fun!'}
            align={'center'}
            images={[]}
          />
        </div>
      </Container>
      <Container className="foot-content">
        <FooterContent />
      </Container>
    </div>
  );
};

export default HomePage;

import React from 'react';
import NavBar from './_components/NavBar';
import InfoCard from './_components/InfoCard';
import { Container } from '@mui/material';
import FooterContent from './_components/FooterContent';
import Image from 'next/image';

const HomePage = async () => {
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
          sentence="We're glad you're here! Our library management system is designed to make it easy for you to manage your book collections, discover books, and access your account information. Take a look around and explore our features to get started!"
          width={'450px'}
          align='center'
        />
        <Image
          src="/image/book-reading.svg"
          height={300}
          width={350}
          style={{ border: 'transparent' }}
          alt="Group Book Reading"
          priority
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
          width={'450px'}
          images={[
            '/image/Barnes-Noble-Logo.png',
            '/image/yale-university-logo.png',
            '/image/Harvard-Logo.png',
          ]}
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
            src={'/image/creative-thinking.svg'}
            height={300}
            width={350}
            style={{ border: 'transparent' }}
            alt="undecided"
          />
          <InfoCard
            titleHook="Join the Conversation: Collaborate with Fellow Book Lovers"
            sentence="Our community is built on the idea that sharing ideas and perspectives is just as important as reading itself. Join discussions, participate in book clubs, and connect with fellow readers to enhance your reading experience. Share your thoughts, learn from others, and discover new titles to add to your reading list."
            align={'center'}
            width={'450px'}
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
            width={'450px'}
            title={''}
          />
          <Image
            src={'/image/reading-time.svg'}
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
            width={'450px'}
            center={true}
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

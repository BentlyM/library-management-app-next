import React from 'react';
import NavBar from '../(landing)/_components/NavBar';
import InfoCard from '../(landing)/_components/InfoCard';
import ServiceTierCard from './_components/ServiceTierCard';
import FooterContent from '../(landing)/_components/FooterContent';

const ServicePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
      <NavBar />
      <InfoCard
        title={'Plans'}
        titleHook={'Our Services'}
        sentence={
          'These services are great to enhance your reading experience, helping you track progress, discover new books, and connect with fellow readers.'
        }
        align="center"
        hasButton={false}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <ServiceTierCard
          title={'Basic'}
          tierRate={5}
          sentence={
            'a book tier for moderate readers who love to read but also do not have much time for it i guess lol'
          }
          perks={[
            'Monthly Reading Progress Tracking: progress for up to 5 books.',
            'Access to Reading Stats: Basic statistics',
            'Book Recommendations: A limited selection of book recommendations',
            'User Community: Access to a forums',
            'Email Newsletter: Monthly updates with reading tips and highlights.',
          ]}
        />
        <ServiceTierCard
          title={'Premium'}
          tierRate={15}
          sentence={
            'a book tier for advance readers who love to read and have a lot of time to read great books!'
          }
          perks={[
            'Unlimited Reading Progress Tracking: progress for up to unlimited books.',
            'Access to Reading Stats: : Detailed analytics on reading habits',
            'Book Recommendations: Tailored recommendation',
            'Exclusive Content: Access to articles, interviews, and podcasts with authors and book experts.',
          ]}
        />
        <ServiceTierCard
          title={'Pro'}
          tierRate={25}
          sentence={
            'a book tier for professional/education readers who love to read and have a community'
          }
          perks={[
            'All Features from Premium Access: Includes everything from the Premium tier.',
            'Goal Setting and Reminders: set reading goals and receive reminders',
            'Enhanced Community Features: Participation in book clubs, reading challenges, and events.',
            'User Community: Access to a forums',
            'Email Newsletter: Monthly updates with reading tips and highlights.',
          ]}
        />
      </div>
      <FooterContent />
    </div>
  );
};

export default ServicePage;

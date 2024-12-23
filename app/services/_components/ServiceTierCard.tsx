import { createClient } from '@/utils/supabase/server';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import ButtonLink from './ButtonLink';

const ServiceTierCard = async ({
  title,
  tierRate,
  sentence,
  perks,
  paymentLink,
}: {
  title: string;
  tierRate: number;
  sentence: string;
  perks: string[];
  paymentLink: string;
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
          width: '250px',
          padding: '10px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          {title && (
            <Typography fontSize={'14px'} align="center">
              {title}
            </Typography>
          )}
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 'bold',
            }}
          >
            ${tierRate}{' '}
            <div
              style={{
                fontSize: 'medium',
                opacity: '0.5',
                fontWeight: 'normal',
              }}
            >
              /month
            </div>
          </Typography>
          <Typography align="center" sx={{ opacity: '0.5' }}>
            {sentence}
          </Typography>
        </div>
        <ul style={{ listStyle: 'none', padding: '0px'}}>
          {perks.map((perk: string) => (
            <li key={perk}>✔️ {perk}</li>
          ))}
        </ul>
        <ButtonLink user={user} paymentLink={paymentLink} title={title}/>
      </Box>
  );
};

export default ServiceTierCard;

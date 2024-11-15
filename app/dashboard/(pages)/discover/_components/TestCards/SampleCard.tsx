import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const SampleCard = ({
  coverUrl,
  title,
}: {
  coverUrl: string;
  title: string;
}) => {
  return (
    <Card
      sx={{
        height: 200,
        maxWidth: 300,
        minWidth: 200,
        padding: 1,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 !important',
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          gutterBottom
        >
          {title || 'rendering...'}
        </Typography>
        <Image src={coverUrl} alt={'image'} width={100} height={120} />
        <CardActions>
          <Button size="small">More</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SampleCard;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

const SampleCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 200,
        padding: 1,
      }}
    >
      <CardContent>
        <Typography
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          gutterBottom
        >
          Sample Card
        </Typography>
        <Typography variant="h5" component="h2" textAlign={'center'}>
          PAM
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );
};

export default SampleCard;

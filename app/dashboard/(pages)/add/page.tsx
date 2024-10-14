'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [manualCover, setManualCover] = useState<string>();

  const handleGenreChange = (event: any) => {
    setGenres(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<{ files: any }>) => {
    if (event.target.files[0]) {
      setManualCover(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fetchCoverQuery = useQuery({
    queryKey: ['cover', title, author],
    queryFn: () =>
      fetch(`/api/cover?title=${title}&author=${author}
`).then((res) => res.json()),
    enabled: !!title && !!author, // Only run the query if both title and author are present
  });

  return (
    <form
      style={{
        display: 'flex',
        maxWidth: 1200,
        margin: 'auto',
        padding: '16px',
        borderRadius: '4px',
      }}
    >
      <Box style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
        {manualCover ? (
          <img
            src={manualCover}
            alt="Book Cover"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        ) : fetchCoverQuery.isLoading ? (
          <SkeletonWrapper isLoading={fetchCoverQuery.isLoading}>
            <div style={{ width: '100%', maxHeight: '400px'}}>Loading....</div>
          </SkeletonWrapper>
        ) : fetchCoverQuery.data && fetchCoverQuery.data.url ? (
          <img
            src={fetchCoverQuery.data.url}
            alt="Book Cover"
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
            }}
          />
        ) : (
          <Typography>No cover available</Typography>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ marginTop: '1rem' }}
          onChange={handleFileChange}
        />
      </Box>

      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: '16px', fontWeight: 600 }}
        >
          Add a New Book
        </Typography>
        <Box style={{ width: '100%', marginBottom: '16px' }}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box style={{ width: '100%', marginBottom: '16px' }}>
          <TextField
            fullWidth
            id="author"
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Box>
        <Box style={{ width: '100%', marginBottom: '16px' }}>
          <TextField
            fullWidth
            id="summary"
            label="Summary"
            variant="outlined"
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Box>
        <Box style={{ width: '100%', marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              id="genre"
              labelId="genre-label"
              label="Genre"
              multiple
              value={genres}
              onChange={handleGenreChange}
            >
              <MenuItem value="1">Genre 1</MenuItem>
              <MenuItem value="2">Genre 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => fetchCoverQuery.refetch()}
          >
            Fetch Cover
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '16px' }}
          >
            Create Book
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default BookForm;

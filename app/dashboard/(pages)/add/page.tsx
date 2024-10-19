'use client';

import React, { FormEvent, useState } from 'react';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';
import { useDebounce } from 'use-debounce';
import { CreateBook } from './_actions/addBook';
import toast from 'react-hot-toast';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [genre, setGenre] = useState<string>('');
  const [manualCover, setManualCover] = useState<string | undefined>();
  const [fetchedCoverUrl, setFetchedCoverUrl] = useState<string | undefined>();
  const [fileInputKey, setFileInputKey] = useState(0);

  // Debounce
  const [debounceTitle] = useDebounce(title, 500);
  const [debounceAuthor] = useDebounce(author, 500);

  const fetchCoverQuery = useQuery({
    queryKey: ['cover', debounceTitle, debounceAuthor],
    queryFn: () =>
      fetch(`/api/cover?title=${debounceTitle}&author=${debounceAuthor}`).then(
        (res) => res.json().then((data) => setFetchedCoverUrl(data.url))
      ),
    enabled: !!debounceTitle && !!debounceAuthor,
  });

  const mutation = useMutation({
    mutationFn: CreateBook,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Book Created Successfully');
      } else {
        toast.error(data.message!);
      }
    },
    onError: () => toast.error('An unexpected error occurred'),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setManualCover(URL.createObjectURL(file));
    }
  };

  const handleGenreChange = (event: { target: { value: string } }) => {
    setGenre(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('summary', summary);
    formData.append('genre', genre);

    if (manualCover) {
      try {
        const blob = await (await fetch(manualCover)).blob();
        formData.append('cover', blob, 'cover.jpg');
      } catch (error) {
        console.error('Error fetching the manual cover:', error);
      }
    } else if (fetchedCoverUrl) {
      formData.append('cover', fetchedCoverUrl);
    }

    mutation.mutate(formData);
    resetForm();
  };

  const handleCoverDeletion = () => {
    setManualCover(undefined);
    setFetchedCoverUrl(undefined);
    setFileInputKey((prev) => prev + 1);
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setSummary('');
    setGenre('');
    setManualCover(undefined);
    setFetchedCoverUrl(undefined);
    setFileInputKey((prev) => prev + 1);
  };

  return (
    <form
      style={{
        display: 'flex',
        maxWidth: 1200,
        margin: 'auto',
        padding: '16px',
        borderRadius: '4px',
      }}
      onSubmit={handleSubmit}
    >
      <Box style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
        {manualCover ? (
          <img
            src={manualCover}
            alt="Book Cover"
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'contain',
              height: 'fit-content',
            }}
          />
        ) : (
          <SkeletonWrapper isLoading={fetchCoverQuery.isLoading}>
            {fetchedCoverUrl ? (
              <img
                src={fetchedCoverUrl}
                alt="Book Cover"
                style={{
                  maxHeight: '400px',
                  objectFit: 'contain',
                  height: 'fit-content',
                  width: '100%',
                }}
              />
            ) : (
              <Typography>No cover available</Typography>
            )}
          </SkeletonWrapper>
        )}
        <input
          key={fileInputKey}
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
        <TextField
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '16px' }}
          required
        />
        <TextField
          fullWidth
          id="author"
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginBottom: '16px' }}
          required
        />
        <TextField
          fullWidth
          id="summary"
          label="Summary"
          variant="outlined"
          multiline
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ marginBottom: '16px' }}
          required
        />
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: '16px' }}
        >
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            id="genre"
            labelId="genre-label"
            label="Genre"
            value={genre}
            onChange={handleGenreChange}
            required
          >
            {[
              'Fiction',
              'Non-Fiction',
              'Fantasy',
              'Mystery',
              'Romance',
              'Science Fiction',
              'Horror',
            ].map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fetchCoverQuery.refetch()}
            >
              Fetch Cover
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCoverDeletion}
              style={{ borderColor: 'red', color: 'red' }}
            >
              Delete Cover
            </Button>
          </div>
          <Button variant="contained" color="primary" type="submit">
            Create Book
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default BookForm;

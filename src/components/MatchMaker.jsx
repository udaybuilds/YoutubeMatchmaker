import React, { useContext, useEffect, useState } from 'react';
import matchmaker from '../utils/matchmaker';
import { SessionContext } from '@toolpad/core';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

export default function MatchMaker() {
  const Sess = useContext(SessionContext);
  const email = Sess?.user?.email;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchMatches = async () => {
      try {
        const res = await matchmaker({ email });
        console.log(res);
        setResponse(res.data);
        // console.log(response.data.top_matches);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError(err);
      }
    };

    fetchMatches();
  }, [email]);

  if (!email) {
    return <p>Please log in to see your matches.</p>;
  }

  if (error) {
    return <p>Error loading matches: {error.message}</p>;
  }

  if (!response) {
    return <p>Loading matches...</p>;
  }

  return (
    <div>
      <h2>Your Matches</h2>
      {response && response.top_matches && response.top_matches.length > 0 ? (
        <Grid container spacing={3}>
          {response.top_matches.map((match, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {match.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {match.email}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body1">
                      Similarity: {match.similarity * 100}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No similar users found.</Typography>
      )}
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState,useEffect} from 'react';
import { AuthenticationContext,SessionContext } from "@toolpad/core";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import { SignIn } from "./components";
import { SignUp } from "./components";
import { reload } from './utils/authenticate';
import { History } from "./components";
import { MatchMaker } from "./components"

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const user = await reload();
      console.log(user.data)
      if (user) {
        setSession({
          user: {
            name: user.data.name,
            email: user.data.email,
            image: user.data.image,
          },
        });
      } else {
        setSession(null);
      }
    };
    fetchSession();
  }, []);
  

  const authentication = {
    signIn: (newSession) => setSession(newSession),
    signOut: () => setSession(null),
  };
  return ( 
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        <BrowserRouter>
          <Box sx={{ backgroundColor: '#000' }}>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Feed />} />
              <Route exact path='/history' element={<History />} />
              <Route exact path='/matchmaker' element={<MatchMaker />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/video/:id' element={<VideoDetail />} />
              <Route path='/channel/:id' element={<ChannelDetail />} />
              <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export default App;

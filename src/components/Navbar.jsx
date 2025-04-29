import { Stack,Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react';
import { logo } from "../utils/constants";
import { SearchBar } from "./";
import AccountSlotsAccountSwitcher from './AccountSlotsAccountSwitcher';
// import { SignIn } from "./SignIn";
// import MatchMaker from "./MatchMaker";
// import History from "./History";
import { useNavigate } from 'react-router-dom';
import { SessionContext } from "@toolpad/core";


const Navbar = () => {
  const navigate = useNavigate();
  const Sess = React.useContext(SessionContext);
  return(
  <Stack direction="row" alignItems="center" p={2} sx={{ position:  "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBar />
    {Sess && (
  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
    <Button 
      variant="contained" 
      color="primary" 
      sx={{ borderRadius: 2, px: 3, py: 1, textTransform: "none" }}
      onClick={() => navigate('/history')}
    >
      Interest Analysis
    </Button>
    <Button 
      variant="contained" 
      color="secondary" 
      sx={{ borderRadius: 2, px: 3, py: 1, textTransform: "none" }}
      onClick={() => navigate('/matchmaker')}
    >
      MatchMaker
    </Button>
  </Stack>
)}
    <AccountSlotsAccountSwitcher />
  </Stack>
  );
};

export default Navbar;

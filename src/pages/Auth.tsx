import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  setAuthToken: any;
  setRefreshToken:any;
}
const Auth = ({
  setAuthToken,
  setRefreshToken,
}: Props) => {
  const [inputAuth, setInputAuth] = useState('');
  const [inputRefresh, setInputRefresh] = useState('');

  const submit = () => {
    setAuthToken(inputAuth);
    setRefreshToken(inputRefresh);
  }


  return (
    <div>
      <FormControl size="medium" variant="outlined" >
        <TextField
          value={inputAuth}
          size="medium"
          variant="outlined"
          onChange={(e) => setInputAuth(e.target.value)}
          label="auth"
        />
        <TextField
          value={inputRefresh}
          size="medium"
          variant="outlined"
          onChange={(e) => setInputRefresh(e.target.value)}
          label="refresh"
        />
        
      </FormControl>
      <Button onClick={submit}>
        Save Auth
      </Button>
    </div>
  );
};

export default Auth;

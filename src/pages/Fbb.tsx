// Contact.js
import React, { useState } from 'react';
import axios from 'axios';

const Fbb = () => {

  const [teams, setTeams] = useState([]);


  const getTeams = () => {
    try {

      const response = axios.get('https://localhost:3000/fbb_teams');
      response.then((response) => {
        console.log(response)

      })
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div>
      <h1>FBB</h1>
      <button onClick={() => {getTeams()}}>
        Fetch Teams
      </button>
    </div>
  );
};

export default Fbb;

'use client'
import React, { useEffect, useState } from 'react';

function App() {
  const [decisions, setDecisions] = useState([]);
  const [latestDecisionId, setLatestDecisionId] = useState(null);

  useEffect(() => {
   // const ws = new WebSocket('wss://socialbenefitssamir.onrender.com');
   const ws = new WebSocket('ws://localhost:3006');
    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
      const newDecision = JSON.parse(event.data);
      console.log(newDecision.data)
      if(newDecision.event=='new_decision'){
      setLatestDecisionId(newDecision.data.id);
      setDecisions((prevDecisions) => [...prevDecisions, newDecision.data]);}
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    const fetchDecisions = async () => {
      try {
        const response = await fetch('https://server-social-benefits.vercel.app/decisions');
        const data = await response.json();
        setDecisions(data);
      } catch (error) {
        console.error('Error fetching decisions:', error);
      }
    };

    fetchDecisions();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Decisions</h1>
      <ul>
        {decisions.map((decision) => (
          <li key={decision.id}>
            {decision.user_email}
            {decision.id === latestDecisionId && <span style={{ color: 'red' }}> new!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';

function PingComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
  fetch('/api/ping')
    .then(res => {
      console.log("HTTP status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Dữ liệu nhận được:", data);
      setMessage(data.message);
    })
    .catch(err => {
      console.error('API error:', err);
    });
}, []);


  return (
    <div>
      <h1>Ping API Result:</h1>
      <p>{message}</p>
    </div>
  );
}

export default PingComponent;

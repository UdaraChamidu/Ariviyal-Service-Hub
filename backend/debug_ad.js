const fetch = require('node-fetch');

async function testCreateAd() {
  const loginUrl = 'http://localhost:3000/auth/login';
  const adUrl = 'http://localhost:3000/ads';

  // 1. Login to get token
  // Use a user you know exists or register one (I'll assume the one from my previous test exists or register a new one)
  const user = {
    email: 'test_ad_poster_' + Date.now() + '@example.com',
    password: 'password123',
    name: 'Ad Poster',
    phoneNumber: '9998887777'
  };

  // Register first to be safe
  const registerUrl = 'http://localhost:3000/auth/register';
  let token = '';

  try {
      console.log("Registering...");
      const regRes = await fetch(registerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
      });
      const regData = await regRes.json();
      if (regRes.ok) {
          token = regData.access_token;
          console.log("Registered/Logged in, Got Token");
      } else {
           // Login if exists
           console.log("Registration failed (maybe exists), logging in...");
           const loginRes = await fetch(loginUrl, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: user.email, password: user.password })
           });
           const loginData = await loginRes.json();
           token = loginData.access_token;
      }
  } catch (e) {
      console.log("Auth error:", e);
      return;
  }

  // 2. Post Ad with suspicious payload
  const adData = {
    title: "Test Ad Title",
    category: "boarding", // LOWERCASE - Suspected Issue
    price: 5000,
    priceType: "month",
    description: "This is a test description",
    location: "Test Location",
    locationLink: "",
    distance: "1km",
    phone: "1234567890",
    images: [],
    contact: "1234567890",
    latitude: 0,
    longitude: 0,
  };

  console.log("Posting Ad with data:", adData);
  try {
      const res = await fetch(adUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(adData)
      });

      const text = await res.text();
      console.log("Status:", res.status);
      console.log("Response:", text);
  } catch (e) {
      console.log("Post Ad Error:", e);
  }
}

testCreateAd();

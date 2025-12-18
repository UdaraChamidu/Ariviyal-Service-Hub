
async function verifyAdCreation() {
  const baseUrl = 'http://localhost:3000';
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'password123';

  console.log('1. Registering user:', email);
  try {
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name: 'Test User',
        phoneNumber: '1234567890'
      })
    });

    if (!regRes.ok) {
      const txt = await regRes.text();
      console.error('Registration failed:', regRes.status, txt);
      return;
    }

    const regData = await regRes.json();
    const token = regData.access_token;
    console.log('Registration successful. Token received.');

    console.log('2. Posting Ad...');
    const adRes = await fetch(`${baseUrl}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: "Verified Ad",
        category: "BOARDING", // Uppercase to match Enum
        price: 1000,
        priceType: "month",
        description: "Test description",
        location: "Test Location",
        phone: "1234567890",
        images: []
      })
    });

    if (!adRes.ok) {
      const txt = await adRes.text();
      console.error('Ad creation failed:', adRes.status, txt);
    } else {
      const adData = await adRes.json();
      console.log('Ad created successfully:', adData);
    }

  } catch (err) {
    console.error('Script error:', err);
  }
}

verifyAdCreation();

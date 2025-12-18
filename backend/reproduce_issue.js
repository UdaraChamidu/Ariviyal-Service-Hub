

async function testRegister() {
  const url = 'http://localhost:3000/auth/register';
  const body = {
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User',
    phoneNumber: '1234567890'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
    } else {
      console.log('Registration failed:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error connecting to backend:', error);
  }
}

testRegister();

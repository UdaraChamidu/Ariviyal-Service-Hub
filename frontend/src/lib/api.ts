const API_URL = 'http://localhost:3000';

export async function createAd(adData: any, token: string) {
  const response = await fetch(`${API_URL}/ads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(adData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error createAd:', response.status, errorText);
    throw new Error(`Failed to create ad: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function getAds() {
  const response = await fetch(`${API_URL}/ads`);

  if (!response.ok) {
    throw new Error('Failed to fetch ads');
  }

  return response.json();
}

export async function updateAd(id: string, adData: any, token: string) {
  const response = await fetch(`${API_URL}/ads/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(adData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error updateAd:', response.status, errorText);
    throw new Error(`Failed to update ad: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function deleteAd(id: string, token: string) {
  const response = await fetch(`${API_URL}/ads/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error deleteAd:', response.status, errorText);
    throw new Error(`Failed to delete ad: ${response.status} ${errorText}`);
  }
}

export async function getUserAds(token: string) {
  const response = await fetch(`${API_URL}/ads/user/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user ads');
  }

  return response.json();
}

export async function updateUserProfile(data: any, token: string) {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error updateUserProfile:', response.status, errorText);
    throw new Error(`Failed to update profile: ${response.status} ${errorText}`);
  }

  return response.json();
}

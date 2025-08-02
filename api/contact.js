export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Forward the form data to your DevLeads API
    const response = await fetch('https://www.devleads.site/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.json();
      return res.status(200).json(result);
    } else {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        message: errorText || 'Failed to submit form' 
      });
    }
  } catch (error) {
    console.error('Error forwarding to DevLeads:', error);
    return res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
}
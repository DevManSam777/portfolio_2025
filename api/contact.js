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
    
    // Process your form data here
    console.log('Received form data:', formData);
    
    // You can send emails, save to database, etc.
    
    return res.status(200).json({ 
      message: 'Message sent successfully!',
      data: formData 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
}
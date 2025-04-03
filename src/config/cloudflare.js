require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data'); // Asegúrate de que esta dependencia esté instalada

// Obtén las variables de entorno
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const uploadImage = async (file) => {
  try {
    // Verifica que las variables de entorno estén definidas
    if (!ACCOUNT_ID || !API_TOKEN) {
      throw new Error('Variables de entorno CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN no están definidas');
    }

    // Crea un nuevo FormData
    const formData = new FormData();
    
    // Agrega el archivo usando el buffer y el nombre de archivo original
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    
    console.log('Uploading file:', file.originalname, 'mime:', file.mimetype);
    
    const response = await axios.post('', formData, {
      baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        // No establezca 'Content-Type' manualmente, FormData lo hará automáticamente
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

const getImages = async () => {
  try {
    // Verifica que las variables de entorno estén definidas
    if (!ACCOUNT_ID || !API_TOKEN) {
      throw new Error('Variables de entorno CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN no están definidas');
    }

    const response = await axios.get('', {
      baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting images:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

module.exports = {
  uploadImage,
  getImages
};
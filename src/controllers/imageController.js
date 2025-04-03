const cloudflare = require('../config/cloudflare');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
    }
    
    const result = await cloudflare.uploadImage(req.file);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return res.status(500).json({ message: 'Error al subir imagen' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const imagesData = await cloudflare.getImages();
    
    // Registra la estructura completa para depuración
    console.log('Data from Cloudflare:', JSON.stringify(imagesData, null, 2));
    
    // Manejar la estructura específica de Cloudflare Images
    if (imagesData && imagesData.result && imagesData.result.images && Array.isArray(imagesData.result.images)) {
      // Transformamos la respuesta para mantener la estructura pero con el array directamente en result
      return res.json({
        success: imagesData.success,
        result: imagesData.result.images,
        errors: imagesData.errors,
        messages: imagesData.messages
      });
    } else if (imagesData && Array.isArray(imagesData)) {
      // Si por alguna razón es directamente un array
      return res.json({ success: true, result: imagesData });
    } else {
      // Cualquier otra estructura inesperada
      console.warn('Unexpected data structure from Cloudflare:', imagesData);
      return res.json({ 
        success: true, 
        result: [], 
        messages: ['No se encontraron imágenes o formato inesperado']
      });
    }
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al obtener imágenes', 
      error: error.message 
    });
  }
};
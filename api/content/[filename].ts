import { VercelRequest, VercelResponse } from '@vercel/node';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = req.query;
    
    if (!filename || typeof filename !== 'string') {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Security: Only allow specific file extensions and no path traversal
    const allowedExtensions = ['.md', '.json'];
    const fileExtension = path.extname(filename);
    
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Prevent path traversal attacks
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    // Build the file path
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, filename);

    // Check if file exists and read it
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Set appropriate content type
    const contentType = fileExtension === '.json' ? 'application/json' : 'text/plain';
    res.setHeader('Content-Type', contentType);
    
    // Set cache headers for better performance
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return res.status(200).send(fileContent);

  } catch (error) {
    console.error('Error serving content file:', error);
    
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return res.status(404).json({ error: 'Content file not found' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}
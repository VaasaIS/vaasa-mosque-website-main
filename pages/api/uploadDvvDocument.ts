import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import multer from 'multer'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'

const sanityConfig = {
  apiVersion: '2024-01-01',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(sanityConfig)

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.includes('document') || 
        file.mimetype.includes('word')) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents are allowed'))
    }
  }
})

// Create a promise-based wrapper for multer
const uploadMiddleware = (req: any, res: any) => {
  return new Promise((resolve, reject) => {
    upload.single('documentFile')(req, res, (err) => {
      if (err) reject(err)
      else resolve(true)
    })
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function uploadDvvDocument(
  req: NextApiRequest & { file?: Express.Multer.File },
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Parse the multipart form data
    await uploadMiddleware(req, res)
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const { title, description } = req.body
    const file = req.file

    // Upload file to Sanity's asset pipeline
    const asset = await client.assets.upload('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    })

    // Format file size for display
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Create the document entry with the asset reference
    const documentData = {
      _type: 'dvvDocument',
      title: title || `DVV Document - ${file.originalname}`,
      description: description || 'DVV related document uploaded by newcomer',
      documentFile: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      uploadDate: new Date().toISOString(),
      status: 'pending',
      uploadedBy: 'newcomer',
      fileSize: formatFileSize(file.size),
      fileType: file.mimetype,
    }

    const result = await client.create(documentData)
    
    res.status(200).json({ 
      message: 'Document uploaded successfully',
      documentId: result._id,
      assetId: asset._id,
      fileSize: formatFileSize(file.size),
      fileType: file.mimetype
    })
  } catch (error) {
    console.error('Error uploading DVV document:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({ message: 'Failed to upload document', error: errorMessage })
  }
} 
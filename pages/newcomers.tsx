import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'

const NewcomersPage = () => {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB')
      return
    }

    if (!file.type.includes('pdf') && !file.type.includes('document')) {
      toast.error('Please upload a PDF or Word document')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('title', `DVV Document - ${file.name}`)
    formData.append('description', 'DVV related document uploaded by newcomer')
    formData.append('documentFile', file)

    try {
      const response = await fetch('/api/uploadDvvDocument', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Document uploaded successfully!')
        event.target.value = '' // Reset input
      } else {
        toast.error('Failed to upload document')
      }
    } catch (error) {
      toast.error('Error uploading document')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Layout pageTitle="Newcomers to Vaasa | Vaasa Islamic Society" title="Newcomers to Vaasa">
      <div className="mx-auto">
        <section className="mt-8 grid gap-8">
          <div className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-color">Welcome to Vaasa</h2>
            <p className="text-text-color">
              This guide will help you settle in Vaasa: key services, community contacts, and important documents.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact-us/be-a-member" className="btn-small">
                Be a Member
              </Link>
              <Link href="/contact-us" className="btn-small">
                Contact VIS
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mb-2 text-lg font-semibold text-text-color">Essential Information</h3>
            <ul className="list-disc space-y-2 pl-6 text-text-color">
              <li>Prayer times and locations</li>
              <li>Halal shops and restaurants</li>
              <li>Schools and language courses</li>
              <li>Healthcare and emergency contacts</li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mb-2 text-lg font-semibold text-text-color">Downloads</h3>
            <p className="mb-3 text-sm text-text-color">Useful documents to get started:</p>
            <div className="grid gap-3 md:grid-cols-2">
              <a className="rounded border border-gray-200 p-3 hover:bg-gray-50" href="#" download>
                Newcomer Checklist (PDF)
              </a>
              <a className="rounded border border-gray-200 p-3 hover:bg-gray-50" href="#" download>
                VIS Community Guide (PDF)
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mb-2 text-lg font-semibold text-text-color">DVV Document Upload</h3>
            <p className="mb-3 text-sm text-text-color">
              Upload DVV-related documents (PDF, Word) for processing and assistance.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="block w-full text-sm text-text-color file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary-variant-100"
              />
              {isUploading && (
                <div className="text-sm text-text-color">Uploading...</div>
              )}
            </div>
            <p className="mt-2 text-xs text-text-color">
              Supported formats: PDF, DOC, DOCX (Max size: 10MB)
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mb-2 text-lg font-semibold text-text-color">Get Involved</h3>
            <p className="text-text-color">Join our activities, volunteer, and connect with the community.</p>
            <div className="mt-4">
              <Link href="/contact-us/be-a-member" className="btn-small">
                Register as a Member
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default NewcomersPage


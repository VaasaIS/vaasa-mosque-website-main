import { useState } from 'react'

import { MdContentCopy } from 'react-icons/md'

import toast from 'react-hot-toast'

const CopyComponent = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!text) return
    try {
      navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(() => (
        <span>
          Copied <b>{text}</b> to clipboard!
        </span>
      ))
    } catch (error) {
      console.error('Failed to copy text: ', error)
      toast.error(`Failed to copy text!`)
    }
  }

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={handleCopy}
    >
      <button>
        <MdContentCopy className="h-[15px] w-[15px]" />
      </button>
      <span
        className={`text-[12px] ${copied ? 'font-semibold text-primary' : ''}`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </div>
  )
}

export default CopyComponent

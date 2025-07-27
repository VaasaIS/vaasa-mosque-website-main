import React from 'react'
import { VideoCameraIcon, DocumentTextIcon, VolumeUpIcon } from '@heroicons/react/outline'
import { Update } from '../typings'

interface UpdatesProps {
  updates: Update[]
}

const Updates = ({ updates }: UpdatesProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="mr-2 h-5" />
      case 'audio':
        return <VolumeUpIcon className="mr-2 h-5" />
      case 'text':
        return <DocumentTextIcon className="mr-2 h-5" />
      default:
        return <DocumentTextIcon className="mr-2 h-5" />
    }
  }

  if (!updates || updates.length === 0) {
    return null
  }

  return (
    <section className="mt-20">
      <div className="mb-4 flex items-center justify-between border-b-2">
        <h2 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-bold md:text-2xl">
          Updates
        </h2>
      </div>

      <ul className="mb-3">
        {updates.map((update) => (
          <li
            key={update._id}
            className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl"
            onClick={() => window.open(update.url, '_blank')}
          >
            {update.title}
            <span className="font-sm ml-2 flex items-center text-xs md:text-base">
              {getIcon(update.type)}
              {update.duration}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Updates 
import Image from 'next/image'

const Official = ({ data }) => {
  const { name, pic, phone, title } = data
  return (
    <div className="mb-12 flex w-full border md:block md:w-1/4 md:border-none">
      <div className="flex w-1/3 md:w-full">
        <Image
          src={pic}
          style={{ objectFit: 'cover' }}
          height={370}
          width={300}
          className="object-cover w-full"
        />
      </div>
      <div className="w-2/3 md:w-full">
        <div className="mt-4 mb-1 hidden text-lg font-bold md:block lg:text-2xl">
          {name}
        </div>
        <ul className="flex flex-col content-start whitespace-normal px-5 md:block md:p-0">
          <li className="mt-4 mb-1 block text-lg font-bold md:hidden md:text-xl lg:text-2xl">
            {name}
          </li>
          <li className="text-lg font-medium lg:text-xl">{title}</li>
          <li className="break-words pr-2 text-sm md:text-base">{phone}</li>
        </ul>
      </div>
    </div>
  )
}

export default Official

import officialsData from '../lib/officialsData'

import Official from './Official'

export const Officials = () => {
  return (
    <>
      <div className="mb-6 text-lg font-bold uppercase md:text-xl lg:text-3xl">
        vaasa islamic society officials
      </div>
      <div className="flex w-full flex-col flex-wrap md:flex-row">
        {officialsData.map((data) => (
          <Official key={data.name} data={data} />
        ))}
      </div>
    </>
  )
}

export default Officials

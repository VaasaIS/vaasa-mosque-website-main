import React from 'react'

const HeroGeneric = ({ title }) => {
  return (
    <section className="bg-[url('../assets/header-img.png')] bg-cover bg-center bg-no-repeat p-10 px-5 md:px-10  2xl:px-0 2xl:py-20">
      <h1 className="mx-auto text-xl font-bold text-white max-w-7xl md:text-2xl lg:text-3xl xl:text-4xl">
        {title}
      </h1>
    </section>
  )
}

export default HeroGeneric

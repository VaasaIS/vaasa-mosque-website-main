import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const Hero = ({ weeklyReminderImage, urlFor }) => {
  return (
    <div className="mb-10 h-4/6">
      <div className="">
        <Carousel
          infiniteLoop={true}
          //showIndicators={false}
          autoPlay={true}
          interval={2500}
          emulateTouch={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          <div>
            <img
              className="max-h-[75vh] object-cover"
              src={
                weeklyReminderImage.weeklyReminderImage &&
                urlFor(weeklyReminderImage.weeklyReminderImage).url()
              }
            />
          </div>
          <div>
            <img
              className="max-h-[75vh] object-cover"
              src="https://images.unsplash.com/photo-1596193433486-02333accdc13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          </div>
          <div>
            <img
              className="max-h-[75vh] object-cover"
              src="https://images.unsplash.com/photo-1526677504211-233c8477c61b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          </div>
          <div>
            <img
              className="max-h-[75vh] object-cover"
              src="https://images.unsplash.com/photo-1581073107630-95747d589483?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
export default Hero

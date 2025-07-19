const ContactInfo = () => {
  return (
    <section>
      <div id="contact-information" className="my-16">
        <h2 className="mb-2 text-2xl font-bold">Contact Details</h2>
        <p className="py-2">
          Phone Number: <span className="font-bold">+358 46 6127473</span>
        </p>
        <p>
          Email: <span className="font-bold">vaasa.moskeija@gmail.com</span>
        </p>
      </div>

      <div id="our-locations">
        <h2 className="mb-2 text-2xl font-bold">Our Locations</h2>
        <div className="flex space-x-16">
          <div className="w-1/2 md:w-1/4">
            <p className="text-lg font-bold">Location 1</p>
            <p className="mt-1">Palosaarentie 66,</p>
            <p>65230,</p>
            <p>Vaasa,</p>
            <p>Finland.</p>
          </div>
          <div className="w-1/2 md:w-1/4">
            <p className="text-lg font-bold">Location 2</p>
            <p className="mt-1">Tiilitehtaankatu 25,</p>
            <p>65100,</p>
            <p>Vaasa,</p>
            <p>Finland.</p>
          </div>
        </div>
      </div>

      <div className="my-16 mb-20">
        <iframe
          className="h-[350px] w-full rounded-lg border-0 md:h-[600px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.2075831610064!2d21.607548252005834!3d63.11488948305676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467d60553dfe90b7%3A0xac27cda0a7d2e25!2sVaasa%20mosque!5e0!3m2!1sen!2sfi!4v1656346701814!5m2!1sen!2sfi"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <iframe
          className="h-[350px] w-full rounded-lg border-0 md:h-[600px]"
          src="https://www.google.com/maps/d/u/0/embed?mid=1vx5hxCqX0Q9BDsO5XrE8X8nvIAiZ1_c&ehbc=2E312F"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe> */}
      </div>
    </section>
  )
}

export default ContactInfo

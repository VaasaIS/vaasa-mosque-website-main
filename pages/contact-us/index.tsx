import Layout from '../../components/Layout'
import ContactInfo from '../../components/ContactInfo'
import ContactMiniNav from '../../components/ContactMiniNav'

const ContactUsIndex = () => {
  return (
    <Layout pageTitle="Contact Us | Vaasa Islamic Society" title="Contact Us">
      <div className="mx-auto">
        <ContactMiniNav />
        <ContactInfo />
      </div>
    </Layout>
  )
}

export default ContactUsIndex


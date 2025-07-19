import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'

const contactUs = () => {
  return (
    <Layout pageTitle="Contact Us | Vaasa Islamic Society" title="Contact Us">
      <div className="mx-auto">
        <ContactForm />
        <ContactInfo />
      </div>
    </Layout>
  )
}

export default contactUs

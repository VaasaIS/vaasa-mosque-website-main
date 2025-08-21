import Layout from '../../components/Layout'
import ContactForm from '../../components/ContactForm'
import ContactMiniNav from '../../components/ContactMiniNav'

const SendInquiryPage = () => {
  return (
    <Layout pageTitle="Send Inquiry | Vaasa Islamic Society" title="Send Inquiry">
      <div className="mx-auto">
        <ContactMiniNav />
        <ContactForm />
      </div>
    </Layout>
  )
}

export default SendInquiryPage


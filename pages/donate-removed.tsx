import Layout from '../components/Layout'
import Donate from '../components/Donate'
import DirectBankDeposit from '../components/DirectBankDeposit'

const DonatePage = () => {
  return (
    <Layout pageTitle="Donate | Vaasa Islamic Society" title="Donate">
      <Donate />
      <DirectBankDeposit />
    </Layout>
  )
}

export default DonatePage

import CopyComponent from './CopyComponent'

const DirectBankDeposit = () => {
  return (
    <section className="my-10 rounded-[1rem] bg-[url('../assets/donate-bg.svg')] p-4 md:p-14 lg:p-14">
      <p className="mb-3 text-left text-2xl font-bold text-text-color md:mt-0 md:text-3xl lg:text-4xl">
        Direct Bank Deposit
      </p>
      <ul className="flex flex-col space-y-2">
        <li className="flex items-center">
          <span className="mr-1">IBAN:</span>
          <span className="mr-2 text-base font-semibold md:text-lg">
            FI87 2052 1800 1343 80
          </span>
          <CopyComponent text={'FI87 2052 1800 1343 80'} />
        </li>
        <li className="flex items-center">
          <span className="mr-1">Account Name:</span>
          <span className="mr-2 text-base font-semibold md:text-lg">
            Vaasa Islamic Society
          </span>
          <CopyComponent text={'Vaasa Islamic Society'} />
        </li>
      </ul>
    </section>
  )
}

export default DirectBankDeposit

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import getStripe from '../lib/getStripe'
import { PayPalButton } from 'react-paypal-button-v2'

import DonateImg from '../assets/donate-img.png'
import StripeDonateBtn from '../assets/stripe-donate-btn.svg'

const donationOptions = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypal-card', label: 'Paypal/Card' },
]
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid rgb(68, 64, 83, 0.2)',
    color: state.isSelected ? '#025A3B' : '#444053',
    backgroundColor: state.isSelected ? 'rgb(202, 233, 222, 0.5)' : 'white',
    background: state.isFocused
      ? 'rgb(202, 233, 222, 0.5)'
      : state.isSelected
      ? '#AADBC9'
      : undefined,
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused
      ? '2px solid #025A3B'
      : '2px solid rgb(209, 213, 219)',
    // This line disable the blue border
    boxShadow: state.isFocused ? '0' : '0',
    '&:hover': {
      border: state.isFocused
        ? '2px solid #025A3B'
        : '2px solid rgb(209, 213, 219)',
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}

const Donate = () => {
  const router = useRouter()
  const [channel, setChannel] = useState('stripe')
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [otherAmount, setOtherAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('15')

  const donationData = [
    {
      id: uuidv4(),
      quantity: 1,
      price: Number(selectedAmount),
    },
  ]
  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AY1823cys46CESeKkp5qhaVjK0xCyn1vSAUlK7CWGeP7ILUTV4CS8jJ5LRnLm67LbKHQuSEdB2hiCV6w'
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)
  }

  useEffect(() => {
    addPaypalScript()
  }, [])

  const handleDonate = async () => {
    if (channel === 'stripe') {
      const stripe = await getStripe()

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      })

      if (response.statusCode === 500) return

      const data = await response.json()

      toast.loading('Redirecting...')

      stripe.redirectToCheckout({ sessionId: data.id })
    }
  }

  const handleChange = (event) => {
    setSelectedAmount(event.target.value)
    setOtherAmount('')
    setError(false)
  }
  const handleChangeOA = (event) => {
    if (event.target.value > 0) {
      setOtherAmount(event.target.value)
      setSelectedAmount(event.target.value)
      setError(false)
    } else if (event.target.value.length === 0) {
      setOtherAmount('')
      setSelectedAmount(1)
      setError(false)
    } else {
      toast.error('Minimum amount is €1')
      setOtherAmount(event.target.value)
      setSelectedAmount(1)
      setError(true)
    }
  }

  const handleChannelChange = (option) => {
    setChannel(option.value)
  }

  return (
    <section
      id="donate"
      className="my-10 flex space-x-10 rounded-[1rem] bg-[url('../assets/donate-bg.svg')] p-5 md:p-10 lg:p-20"
    >
      <div className="w-full md:w-1/2">
        <p className="mt-4 mb-3 text-left text-2xl font-bold text-text-color md:mt-0 md:text-3xl lg:text-4xl">
          Donate Now!
        </p>
        <div className="mb-5 block md:hidden">
          <Image
            src={DonateImg}
            alt="a man holding donation bucket"
            className="object-cover"
          />
        </div>
        <p className="mb-5 text-left text-sm text-text-color md:mb-12 md:text-lg">
          We hope to raise funds to maintain the mosque recurring expenses and
          services we offer to our community. Prophet Muhammad said: “Allah
          said: ‘Spend, O son of Adam, and I shall spend on you.’”{' '}
          <span className="text-[1rem] font-semibold">
            (Ṣaḥīḥ al-Bukhārī, 5073; Ṣaḥīḥ Muslim, 993).
          </span>
        </p>
        <fieldset className="mt-8 flex items-center justify-between space-x-0 lg:justify-start lg:space-x-5">
          <div className="flex flex-grow-0">
            <input
              type="radio"
              id="one-time-donation-0"
              className="peer hidden"
              name="one-time-donation"
              value="15"
              checked={selectedAmount === '15'}
              onChange={handleChange}
            />
            <label
              className="btn flex h-full items-center rounded-lg bg-white px-3 py-0 text-lg font-bold text-primary peer-checked:bg-primary peer-checked:text-white md:px-5 md:py-3 md:text-2xl lg:text-3xl"
              htmlFor="one-time-donation-0"
            >
              15 €
            </label>
          </div>
          <div className="flex flex-grow-0">
            <input
              type="radio"
              id="one-time-donation-1"
              className="peer hidden"
              name="one-time-donation"
              value="25"
              checked={selectedAmount === '25'}
              onChange={handleChange}
            />
            <label
              className="btn flex h-full items-center rounded-lg bg-white px-3 py-0 text-lg font-bold text-primary peer-checked:bg-primary peer-checked:text-white md:px-5 md:py-3 md:text-2xl lg:text-3xl"
              htmlFor="one-time-donation-1"
            >
              25 €
            </label>
          </div>
          <div className="flex flex-grow-0">
            <input
              type="radio"
              id="one-time-donation-2"
              className="peer hidden"
              name="one-time-donation"
              value="100"
              checked={selectedAmount === '100'}
              onChange={handleChange}
            />
            <label
              className="btn flex h-full items-center rounded-lg bg-white px-3 py-0 text-lg font-bold text-primary peer-checked:bg-primary peer-checked:text-white md:px-5 md:py-3 md:text-2xl lg:text-3xl"
              htmlFor="one-time-donation-2"
            >
              100 €
            </label>
          </div>
        </fieldset>

        <div className="mt-6 flex items-center space-x-3 rounded-md bg-white p-3">
          <p className="flex-1 text-left text-lg font-bold text-primary md:text-2xl">
            Other Amount
          </p>
          <input
            type="number"
            placeholder={10}
            value={otherAmount}
            onChange={handleChangeOA}
            className="border-grey-300 w-32 rounded-md border-2 p-1 text-center text-lg font-bold text-text-color placeholder-text-color-variant-100 shadow outline-none ring-primary focus:border-white focus:ring md:text-2xl"
          />
        </div>
        <div className="mt-1">
          {error && (
            <span className="block text-left text-red-500">
              Minimum amount is 1 €
            </span>
          )}
        </div>

        <div className="mt-20 mb-1 flex items-center space-x-3 rounded-md bg-white p-3">
          <p className="flex-1 text-left text-lg font-bold text-primary md:text-2xl">
            Selected Amount
          </p>
          <input
            type="text"
            value={`${new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR',
            }).format(selectedAmount)}`}
            disabled
            className="border-grey-500 w-32 rounded-md border-2 p-1 text-center text-lg font-bold text-text-color md:text-2xl"
          />
        </div>
        <div className="my-5 mt-6 flex items-center space-x-3 rounded-md bg-white p-3">
          <p className="flex-1 text-left text-lg font-bold text-primary md:text-2xl">
            Channel
          </p>
          <Select
            id="channel"
            instanceId="channel"
            styles={customStyles}
            options={donationOptions}
            defaultValue={donationOptions[0]}
            className="w-40 text-left text-lg text-text-color"
            onChange={handleChannelChange}
          />
        </div>
        {channel === 'stripe' && (
          <div className="mt-24 mb-5 flex">
            <button
              className="w-[200px] text-left md:w-[250px]"
              onClick={handleDonate}
            >
              <Image
                src={StripeDonateBtn}
                objectFit="cover"
                className="rounded-md"
              />
            </button>
          </div>
        )}
        {scriptLoaded && channel === 'paypal-card' && (
          <div className="mt-24 mb-0 ">
            <PayPalButton
              style={{ shape: 'pill' }}
              amount={selectedAmount}
              onClick={() => {
                toast.loading('Paypal handling payment...')
              }}
              onSuccess={(details, data) => {
                console.log(details)
                toast.success('Donation Successful!')
                router.push('/success')
              }}
              onError={(error) => {
                // consoel.log(error)
                toast.error('Something went wrong!')
              }}
              onCancel={() => {
                toast.error('Donation Cancelled!')
                router.push('/cancelled')
              }}
            />
          </div>
        )}
      </div>

      <div className="hidden w-1/2 md:block md:px-0 lg:px-6">
        <Image
          src={DonateImg}
          alt="a man holding donation bucket"
          className="object-cover"
        />
      </div>
    </section>
  )
}

export default Donate

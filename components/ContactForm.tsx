import React from 'react'
import { v4 } from 'uuid'
import Select, { StylesConfig } from 'react-select'
import { InformationCircleIcon } from '@heroicons/react/outline'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import toast from 'react-hot-toast'

import startsWith from 'lodash.startswith'
interface IEventOptions {
  value: string
  label: string
}
const options: IEventOptions[] = [
  { value: 'Naming ceremony', label: 'Naming Ceremony' },
  { value: 'Solatul janaazah', label: 'Solatul Janaazah' },
  { value: 'Nikah ceremony', label: 'Nikah Ceremony' },
  { value: 'Events', label: 'Events' },
  { value: 'Other', label: 'Other' },
]

type IsMulti = false
const customStyles: StylesConfig<IEventOptions, IsMulti> = {
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

interface FormData {
  id: string
  date: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  message: string
  image: File
  category: string
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch('/api/createInquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data)
        toast.success('Inquiry submitted successfully')
      })
      .catch((err) => {
        // console.log(err)
        toast.error('Inquiry submission FAILED')
      })
    reset()
  }

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mt-8 -mb-3">
        <InformationCircleIcon className="h-5 text-primary" />
        <p className="text-sm text-riant-100">
          Required fields are marked with an asterisk (*)
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-6"
        name="contact-us"
      >
        <p className="my-2 text-lg font-bold text-left text-text-color">
          Your Details<sup>*</sup>
        </p>

        <input
          {...register('id')}
          type="hidden"
          name="id"
          value={`inquiry-${v4().slice(0, 5)}-${new Date().toLocaleDateString(
            'fi'
          )}`}
        />
        <input
          {...register('date')}
          type="hidden"
          name="date"
          value={new Date().toISOString()}
        />
        <div className="flex flex-col gap-4 mb-5 md:flex-row md:gap-10">
          <div className="flex flex-col items-start w-full md:w-1/2">
            <label
              htmlFor="firstname"
              className="py-1 text-sm text-text-color-variant-100"
            >
              First Name<sup>*</sup>:
            </label>
            <input
              {...register('firstName', { required: true })}
              type="text"
              id="firstname"
              name="firstName"
              className="w-full px-3 py-1 font-light border-2 border-gray-300 rounded-md shadow text-md text-text-color placeholder-text-color-variant-100 outline-primary ring-secondary focus:border-white focus:ring"
              placeholder="Abdullahi"
            />
            {errors?.firstName && (
              <span className="text-red-500">First Name Field is required</span>
            )}
          </div>

          <div className="flex flex-col items-start w-full md:w-1/2">
            <label
              htmlFor="lastname"
              className="py-1 text-sm text-text-color-variant-100"
            >
              Last Name<sup>*</sup>:
            </label>
            <input
              {...register('lastName', { required: true })}
              type="text"
              id="lastname"
              name="lastName"
              className="w-full px-3 py-1 font-light border-2 border-gray-300 rounded-md shadow text-md text-text-color placeholder-text-color-variant-100 outline-primary ring-secondary focus:border-white focus:ring"
              placeholder="Abbas"
            />
            {errors?.lastName && (
              <span className="text-red-500">
                The First Name Field is required
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-5 md:flex-row md:gap-10">
          <div className="flex flex-col items-start w-full md:w-1/2">
            <label
              htmlFor="email-address"
              className="py-1 text-sm text-text-color-variant-100"
            >
              Email Address<sup>*</sup>:
            </label>
            <input
              {...register('email', {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              type="email"
              id="email-address"
              name="email"
              className="w-full px-3 py-1 font-light border-2 border-gray-300 rounded-md shadow text-md text-text-color placeholder-text-color-variant-100 outline-primary ring-secondary focus:border-white focus:ring"
              placeholder="abdullahi.abbas@gmail.com"
            />
            {errors?.email && (
              <span className="text-red-500">Enter a valid email</span>
            )}
          </div>

          <div className="flex flex-col items-start w-full md:w-1/2">
            <label
              htmlFor="phone-number"
              className="py-1 text-sm text-text-color-variant-100"
            >
              Phone Number<sup>*</sup>:
            </label>
            <div className="w-full">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    containerClass="input-phone"
                    country={'fi'}
                    value={value}
                    enableSearch
                    disableSearchIcon
                    placeholder="+358 687 0788 93"
                    onChange={onChange}
                  />
                )}
              />
            </div>
            {errors?.phoneNumber && (
              <span className="text-red-500">Invalid Phone Number</span>
            )}
          </div>
        </div>

        <p className="my-2 mt-10 text-lg font-bold text-left text-text-color">
          Your Inquiries<sup>*</sup>
        </p>
        <div className="flex flex-col gap-4 mb-5 md:flex-row md:gap-10">
          <div className="flex flex-col items-start w-full md:w-1/2">
            <label
              htmlFor="more-info"
              className="py-1 text-sm text-text-color-variant-100"
            >
              Category:
            </label>
            <div className="w-full">
              <Controller
                control={control}
                name="category"
                defaultValue={options[0].value}
                render={({ field: { onChange, name, value, ref } }) => (
                  <Select
                    id="category"
                    name={name}
                    instanceId="category"
                    options={options}
                    isSearchable
                    styles={customStyles}
                    value={options.find((c) => c.value === value)}
                    onChange={(selectedOption: IEventOptions | null) => {
                      onChange(selectedOption?.value)
                    }}
                    className="h-auto text-left border-2 rounded-md shadow text-md text-text-color outline-secondary ring-secondary focus-within:border-white focus-within:ring"
                  />
                )}
              />
            </div>
          </div>
          <div className="md:w-1/2"></div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="more-info"
            className="py-1 text-sm text-text-color-variant-100"
          >
            Message<sup>*</sup>:
          </label>
          <textarea
            {...register('message', { required: true })}
            name="message"
            id="more-info"
            rows={10}
            className="w-full px-3 py-1 font-light border-2 border-gray-300 rounded-md shadow text-md text-text-color placeholder-text-color-variant-100 outline-primary ring-secondary focus:border-white focus:ring"
            placeholder="Extra info. For example: special requests and so on."
          />
          {errors?.message && (
            <span className="text-red-500">Message is required</span>
          )}
        </div>
        <button className="mt-10 btn-small focus:shadow-outline" type="submit">
          Send enquiry
        </button>
      </form>
    </section>
  )
}

export default ContactForm

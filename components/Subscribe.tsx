import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  email: string
}

function Subscribe() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch('/api/createSubscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data)
        setSubmitted(true)
        toast.success('Subscribed successfully!')
      })
      .catch((err) => {
        toast.error('Subscription FAILED!')
        setSubmitted(false)
      })
  }

  return (
    <section className="mt-12 w-full bg-[#F1F3F1] p-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between py-4 md:flex-row">
        <p className="mb-4 text-center text-xl font-bold text-text-color md:mb-0 md:text-lg xl:text-2xl">
          Subscribe to our emailing list
        </p>
        {submitted ? (
          <p className="rounded-lg bg-primary p-8 py-6 text-white">
            Thank you for your subscription!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center space-x-4 space-y-3 md:flex-row md:space-y-0">
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
                id="email"
                className="w-[300px] rounded-md border-2 border-gray-300 px-2 py-1 text-lg font-light text-text-color placeholder-text-color-variant-100 outline-primary ring-secondary focus:border-white focus:ring"
                placeholder="abdullahi.abbas@gmail.com"
              />
              <button className="btn-small" type="submit">
                Submit
              </button>
            </div>

            {errors.email && (
              <span className="block text-red-500">Enter a valid email</span>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

export default Subscribe

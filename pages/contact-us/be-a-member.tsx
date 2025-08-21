import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { v4 } from 'uuid'
import Layout from '../../components/Layout'
import ContactMiniNav from '../../components/ContactMiniNav'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

interface MemberFormData {
  id: string
  date: string
  fullName: string
  email: string
  phone: string
  gender: 'Male' | 'Female'
  nationality?: string
  ageGroup: 'under_18' | '18_24' | '25_34' | '35_44' | '45_plus'
  hasSpouse: 'yes' | 'no'
  spouseFullName?: string
  spouseEmploymentStatus?: 'student' | 'employed' | 'self_employed' | 'unemployed' | 'homemaker' | 'retired' | 'other'
  spouseOccupation?: string
  spouseOrganization?: string
  hasChildren: 'yes' | 'no'
  childrenDetails?: string
  children?: { name: string; age: string; occupation?: string }[]
  gdprConsent: boolean
  muslimInVaasa: 'yes' | 'no'
  employmentStatus?: 'student' | 'employed' | 'self_employed' | 'unemployed' | 'homemaker' | 'retired' | 'other'
  occupation?: string
  organization?: string
}

const BeAMemberPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<MemberFormData>({
    defaultValues: {
      id: `registration-${v4().slice(0, 5)}-${new Date().toLocaleDateString('fi')}`,
      date: new Date().toISOString(),
    },
  })

  const hasSpouse = watch('hasSpouse') === 'yes'
  const hasChildren = watch('hasChildren') === 'yes'
  const muslimInVaasa = watch('muslimInVaasa')
  const gdprConsent = watch('gdprConsent')

  const { fields: childFields, append: appendChild, remove: removeChild } = useFieldArray({
    control,
    name: 'children',
  })

  const onSubmit = async (data: MemberFormData) => {
    if (muslimInVaasa !== 'yes') {
      toast.error('This form is only for Muslims currently living in Vaasa')
      return
    }
    if (!gdprConsent) {
      toast.error('You must consent to GDPR to continue')
      return
    }

    const payload = {
      id: data.id,
      date: data.date,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      nationality: data.nationality ?? '',
      ageGroup: data.ageGroup,
      hasSpouse: data.hasSpouse === 'yes',
      spouseFullName: hasSpouse ? data.spouseFullName ?? '' : '',
      spouse: hasSpouse
        ? {
            fullName: data.spouseFullName ?? '',
            employmentStatus: data.spouseEmploymentStatus ?? '',
            occupation: data.spouseOccupation ?? '',
            organization: data.spouseOrganization ?? '',
          }
        : null,
      hasChildren: data.hasChildren === 'yes',
      childrenDetails: hasChildren ? data.childrenDetails ?? '' : '',
      children: hasChildren ? data.children ?? [] : [],
      gdprConsent: !!data.gdprConsent,
      muslimInVaasa: data.muslimInVaasa === 'yes',
      employmentStatus: data.employmentStatus ?? '',
      occupation: data.occupation ?? '',
      organization: data.organization ?? '',
    }

    await fetch('/api/createMember', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(() => {
        toast.success('Registration submitted successfully')
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } })
        reset()
      })
      .catch(() => toast.error('Registration submission FAILED'))
  }

  return (
    <Layout pageTitle="Be a Member | Vaasa Islamic Society" title="Be a Member">
      <section className="mt-12">
        <ContactMiniNav />
        {!isOpen && (
          <div className="mt-8 flex w-full justify-center">
            <button className="btn-small" onClick={() => setIsOpen(true)}>
              Open Registration Form
            </button>
          </div>
        )}

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 sm:items-center sm:p-6">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <Dialog.Title className="text-xl font-bold text-text-color">
                          VIS Member Counting Form
                        </Dialog.Title>
                        <p className="mt-1 text-sm text-text-color">
                          We only collect basic information for counting purposes. No sensitive data will be asked.
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Close"
                        className="rounded-full p-1 text-text-color hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mb-4 flex items-center gap-2 rounded-md bg-secondary/30 p-3 text-sm text-text-color">
                      <InformationCircleIcon className="h-5 text-primary" />
                      <p>Only valid for Muslims currently living in Vaasa.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="py-2" name="be-a-member">
                      <input {...register('id')} type="hidden" name="id" />
                      <input {...register('date')} type="hidden" name="date" />

                      <div className="grid gap-5">
                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">User's Information</p>
                          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                            <div className="flex w-full flex-col md:w-1/2">
                              <label htmlFor="fullName" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Full Name<sup>*</sup>
                              </label>
                              <input
                                {...register('fullName', { required: true })}
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="Your full name"
                              />
                              {errors?.fullName && <span className="mt-1 text-xs text-red-500">Full name is required</span>}
                            </div>
                            <div className="flex w-full flex-col md:w-1/2">
                              <label htmlFor="email" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Email<sup>*</sup>
                              </label>
                              <input
                                {...register('email', { required: true })}
                                type="email"
                                id="email"
                                name="email"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="you@example.com"
                              />
                              {errors?.email && <span className="mt-1 text-xs text-red-500">Email is required</span>}
                            </div>
                          </div>
                          <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-6">
                            <div className="flex w-full flex-col md:w-1/2">
                              <label htmlFor="phone" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Phone Number<sup>*</sup>
                              </label>
                              <input
                                {...register('phone', { required: true })}
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="+358 ..."
                              />
                              {errors?.phone && <span className="mt-1 text-xs text-red-500">Phone number is required</span>}
                            </div>
                            <div className="flex w-full flex-col md:w-1/2">
                              <label htmlFor="nationality" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Nationality
                              </label>
                              <input
                                {...register('nationality')}
                                type="text"
                                id="nationality"
                                name="nationality"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="e.g., Finnish, Somali, Iraqi, etc."
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <span className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Gender<sup>*</sup></span>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="radio" value="Male" {...register('gender', { required: true })} />
                                Male
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" value="Female" {...register('gender', { required: true })} />
                                Female
                              </label>
                            </div>
                            {errors?.gender && <span className="mt-1 text-xs text-red-500">Gender is required</span>}
                          </div>
                          <div className="mt-4">
                            <span className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Age Group</span>
                            <div className="mt-2 grid gap-2 sm:grid-cols-3">
                              <label className="flex items-center gap-2 text-sm">
                                <input type="radio" value="under_18" {...register('ageGroup')} /> Under 18
                              </label>
                              <label className="flex items-center gap-2 text-sm">
                                <input type="radio" value="18_24" {...register('ageGroup')} /> 18 - 24
                              </label>
                              <label className="flex items-center gap-2 text-sm">
                                <input type="radio" value="25_34" {...register('ageGroup')} /> 25 - 34
                              </label>
                              <label className="flex items-center gap-2 text-sm">
                                <input type="radio" value="35_44" {...register('ageGroup')} /> 35 - 44
                              </label>
                              <label className="flex items-center gap-2 text-sm">
                                <input type="radio" value="45_plus" {...register('ageGroup')} /> 45+
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">Work / Study</p>
                          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                            <div className="flex w-full flex-col md:w-1/3">
                              <label htmlFor="employmentStatus" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Status
                              </label>
                              <select
                                id="employmentStatus"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                {...register('employmentStatus')}
                              >
                                <option value="">Select...</option>
                                <option value="student">Student</option>
                                <option value="employed">Employed</option>
                                <option value="self_employed">Self-employed</option>
                                <option value="unemployed">Unemployed</option>
                                <option value="homemaker">Homemaker</option>
                                <option value="retired">Retired</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div className="flex w-full flex-col md:w-1/3">
                              <label htmlFor="occupation" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Occupation / Field of Study
                              </label>
                              <input
                                type="text"
                                id="occupation"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="e.g., Software Engineer"
                                {...register('occupation')}
                              />
                            </div>
                            <div className="flex w-full flex-col md:w-1/3">
                              <label htmlFor="organization" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                Workplace / University
                              </label>
                              <input
                                type="text"
                                id="organization"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                placeholder="e.g., University of Vaasa"
                                {...register('organization')}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">Household Information</p>
                          <div className="mb-3">
                            <span className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Spouse living with you in Vaasa?</span>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="radio" value="yes" {...register('hasSpouse')} /> Yes
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" value="no" {...register('hasSpouse')} /> No
                              </label>
                            </div>
                          </div>
                          {hasSpouse && (
                            <div className="mt-2 grid gap-4 md:grid-cols-3">
                              <div className="col-span-3 md:col-span-1">
                                <label htmlFor="spouseFullName" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                  Spouse Full name<sup>*</sup>
                                </label>
                                <input
                                  {...register('spouseFullName', { required: hasSpouse })}
                                  type="text"
                                  id="spouseFullName"
                                  name="spouseFullName"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                  placeholder="Spouse full name"
                                />
                                {errors?.spouseFullName && <span className="mt-1 text-xs text-red-500">Spouse name is required</span>}
                              </div>
                              <div>
                                <label htmlFor="spouseEmploymentStatus" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                  Status
                                </label>
                                <select
                                  id="spouseEmploymentStatus"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                  {...register('spouseEmploymentStatus')}
                                >
                                  <option value="">Select...</option>
                                  <option value="student">Student</option>
                                  <option value="employed">Employed</option>
                                  <option value="self_employed">Self-employed</option>
                                  <option value="unemployed">Unemployed</option>
                                  <option value="homemaker">Homemaker</option>
                                  <option value="retired">Retired</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="spouseOccupation" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                  Occupation / Field of Study
                                </label>
                                <input
                                  type="text"
                                  id="spouseOccupation"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                  placeholder="e.g., Nurse"
                                  {...register('spouseOccupation')}
                                />
                              </div>
                              <div>
                                <label htmlFor="spouseOrganization" className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">
                                  Workplace / University
                                </label>
                                <input
                                  type="text"
                                  id="spouseOrganization"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                  placeholder="e.g., Vaasa Central Hospital"
                                  {...register('spouseOrganization')}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">Children</p>
                          <div className="mb-3">
                            <span className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Children living with you in Vaasa?<sup>*</sup></span>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="radio" value="yes" {...register('hasChildren', { required: true })} /> Yes
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" value="no" {...register('hasChildren', { required: true })} /> No
                              </label>
                            </div>
                            {errors?.hasChildren && <span className="mt-1 text-xs text-red-500">Please select yes or no</span>}
                          </div>
                          {hasChildren && (
                            <div>
                              <div className="mb-3 flex items-center justify-between">
                                <label className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Child Registration</label>
                                <button
                                  type="button"
                                  className="btn-small"
                                  onClick={() => appendChild({ name: '', age: '', occupation: '' })}
                                >
                                  Add Child
                                </button>
                              </div>
                              <div className="space-y-4">
                                {childFields.map((field, index) => (
                                  <div key={field.id} className="rounded-md border border-gray-200 p-3">
                                    <div className="grid gap-3 md:grid-cols-3">
                                      <div>
                                        <label className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Name</label>
                                        <input
                                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                          {...register(`children.${index}.name` as const, { required: true })}
                                          placeholder="Child name"
                                        />
                                      </div>
                                      <div>
                                        <label className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Age</label>
                                        <input
                                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                          {...register(`children.${index}.age` as const, { required: true })}
                                          placeholder="e.g., 8"
                                        />
                                      </div>
                                      <div>
                                        <label className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Occupation / School</label>
                                        <input
                                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-text-color shadow-sm outline-primary ring-secondary focus:border-white focus:ring"
                                          {...register(`children.${index}.occupation` as const)}
                                          placeholder="e.g., Primary school"
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                      <button
                                        type="button"
                                        className="rounded-full border border-gray-300 px-3 py-1 text-xs text-text-color hover:bg-gray-50"
                                        onClick={() => removeChild(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">GDPR Consent</p>
                          <div className="space-y-3 text-sm text-text-color">
                            <p>
                              In accordance with the General Data Protection Regulation (GDPR). The information collected in this form will only be used for member counting purposes by Vaasa Islamic Society (VIS). Your data will not be shared with any third party. You have the right to request correction or deletion of your data at any time by contacting us at <a className="underline" href="mailto:vaasa.moskeija@gmail.com">vaasa.moskeija@gmail.com</a>.
                            </p>
                            <label className="flex items-start gap-2">
                              <input type="checkbox" {...register('gdprConsent', { required: true })} />
                              <span>✅ I consent to Vaasa Islamic Society collecting and processing my data for the purpose stated above.<sup>*</sup></span>
                            </label>
                            {errors?.gdprConsent && <span className="mt-1 text-xs text-red-500">Consent is required</span>}
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="mb-3 text-base font-semibold text-text-color">Eligibility</p>
                          <div>
                            <span className="py-1 text-xs uppercase tracking-wide text-text-color-variant-100">Only valid for Muslims currently living in Vaasa.<sup>*</sup></span>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="radio" value="yes" {...register('muslimInVaasa', { required: true })} /> I am Muslim Living in Vaasa
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" value="no" {...register('muslimInVaasa', { required: true })} /> No
                              </label>
                            </div>
                            {errors?.muslimInVaasa && <span className="mt-1 text-xs text-red-500">Please confirm to proceed</span>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          className="rounded-full border border-gray-300 px-4 py-2 text-sm text-text-color hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                        <button className="btn-small" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </section>
    </Layout>
  )
}

export default BeAMemberPage


import Link from 'next/link'
import { useRouter } from 'next/router'

const ContactMiniNav = () => {
  const router = useRouter()
  const isInquiry = router.pathname === '/contact-us/send-inquiry'
  const isMember = router.pathname === '/contact-us/be-a-member'

  return (
    <nav className="mt-8 mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
      <Link
        href="/contact-us/send-inquiry"
        className={`btn-small ${
          isInquiry ? 'bg-secondary-variant-100 text-text-color' : ''
        }`}
      >
        Send Inquiry
      </Link>
      <Link
        href="/contact-us/be-a-member"
        className={`btn-small ${
          isMember ? 'bg-secondary-variant-100 text-text-color' : ''
        }`}
      >
        Be a Member
      </Link>
    </nav>
  )
}

export default ContactMiniNav


import React, { useState } from 'react'
import { MessageSquare, Check, Copy } from 'lucide-react'
import { SkeletonBanner } from '../SkeletonBanner'
import styles from './ContactUsBanner.module.css'

interface ContactUsBannerProps {
  onContactSupport?: () => void
}

export const ContactUsBanner: React.FC<ContactUsBannerProps> = ({
  onContactSupport,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('velopprewardsofficial@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Top Status Badge: [ 3 ] CONTACT US
  const badgeNode = (
    <div className={`d-inline-flex align-items-center gap-2 ${styles.badgeGroup}`}>
      <div className={`d-inline-flex align-items-center justify-content-center px-2 py-1 rounded-2 ${styles.badgeNumBox}`}>
        <span className={`fw-bold ${styles.badgeNum}`}>3</span>
      </div>
      <span className={`text-uppercase fw-semibold ${styles.badgeCategory}`}>CONTACT US</span>
    </div>
  )

  // Left Content: Headline, Description, Quick Email Chip, CTA
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Need Help? </span>
          <span className={styles.titleHighlight}>We're Here.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Have a question, concern, or need assistance? Get in touch with the VELOOP Rewards team.
        </p>
      </div>

      {/* Quick Email Pill with Copy Action */}
      <div className={`d-inline-flex align-items-center justify-content-between gap-2 px-3 py-2 rounded-3 ${styles.emailPill}`}>
        <span className={styles.emailText}>veloprewardsofficial@gmail.com</span>
        <button
          type="button"
          className={`btn p-0 border-0 d-inline-flex align-items-center ${styles.copyBtn}`}
          onClick={handleCopyEmail}
          title="Copy support email"
        >
          {copied ? <Check size={14} className={styles.copiedIcon} /> : <Copy size={14} className={styles.copyIcon} />}
        </button>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`btn d-inline-flex align-items-center gap-2 rounded-3 fw-bold ${styles.ctaButton}`}
          onClick={onContactSupport}
        >
          <span>Contact Support</span>
          <MessageSquare size={16} className={styles.ctaIcon} />
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Support Specialist & Help Options Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/customer-support.png"
        alt="Customer Support Specialist and Help Center"
        className={styles.supportImage}
        loading="eager"
      />
    </div>
  )

  return (
    <SkeletonBanner
      badge={badgeNode}
      leftContent={leftContentNode}
      rightContent={rightContentNode}
      className={styles.bannerBackground}
    />
  )
}

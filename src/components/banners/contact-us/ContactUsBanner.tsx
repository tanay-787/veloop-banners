import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { BaseBanner } from '../BaseBanner'
import styles from './ContactUsBanner.module.css'

interface ContactUsBannerProps {
  onContactSupport?: () => void
}

export const ContactUsBanner: React.FC<ContactUsBannerProps> = ({
  onContactSupport,
}) => {
  // Top Status Badge: [ 03 ] [ 📞 CONTACT SUPPORT ]
  const badgeNode = (
    <div className={`d-inline-flex align-items-center flex-nowrap gap-2 ${styles.badgeGroup}`}>
      <div className={styles.badgeNumBox}>
        <span className={`fw-bold ${styles.badgeNum}`}>03</span>
      </div>
      <div className={`d-inline-flex align-items-center text-nowrap pe-3 py-1 rounded-pill ${styles.statusBadge}`}>
        <div className={styles.iconEllipse}>
          <Phone size={14} className={styles.statusIcon} />
        </div>
        <span className="text-uppercase fw-semibold text-nowrap">CONTACT SUPPORT</span>
      </div>
    </div>
  )

  // Left Content: Headline, Description, CTA Button
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Need Help?</span><br />
          <span className={styles.titleHighlight}>We're Here.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Have a question, concern, or need assistance? Get in touch with the VELOOP Rewards team.
        </p>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`d-inline-flex align-items-center ${styles.ctaButton}`}
          onClick={onContactSupport}
        >
          <span className={styles.ctaText}>Contact Support</span>
          <span className={styles.ctaDivider} />
          <span className={styles.ctaIconWrapper}>
            <MessageCircle size={17} className={styles.ctaIcon} />
          </span>
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Support Specialist & Help Options Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/customer-support.webp"
        alt="Customer Support Specialist and Help Center"
        className={styles.supportImage}
        loading="lazy"
      />
    </div>
  )

  return (
    <BaseBanner
      badge={badgeNode}
      leftContent={leftContentNode}
      rightContent={rightContentNode}
      className={styles.bannerBackground}
    />
  )
}

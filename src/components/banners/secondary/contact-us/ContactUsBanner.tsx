import React from 'react'
import { MessageCircle } from 'lucide-react'
import { SkeletonBanner } from '../SkeletonBanner'
import styles from './ContactUsBanner.module.css'

interface ContactUsBannerProps {
  onContactSupport?: () => void
}

export const ContactUsBanner: React.FC<ContactUsBannerProps> = ({
  onContactSupport,
}) => {
  // Left Badge Box: [ 3 ]SSSS
  const badgeNode = (
    <div className={`d-flex align-items-center justify-content-center ${styles.badgeNumBox}`}>
      <span className={styles.badgeNum}>3</span>
    </div>
  )

  // Left Content: Category, Headline, Description, CTA Button
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <span className={`text-uppercase fw-semibold ${styles.badgeCategory}`}>CONTACT US</span>
        <h2 className={`m-0 ${styles.title}`}>
          <span>Need Help? </span>
          <span className={styles.titleHighlight}>We're Here.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Have a question, concern, or need assistance? Get in touch with the VELOOP Rewards team.
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-2 pt-md-3">
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
    <div className={`w-100 h-100 d-flex ${styles.graphicWrapper}`}>
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

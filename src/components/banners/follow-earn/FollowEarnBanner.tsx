import React from 'react'
import confetti from 'canvas-confetti'
import { ArrowRight, Share2 } from 'lucide-react'
import { BaseBanner } from '../BaseBanner'
import styles from './FollowEarnBanner.module.css'

interface FollowEarnBannerProps {
  onExploreChannels?: () => void
}

export const FollowEarnBanner: React.FC<FollowEarnBannerProps> = ({
  onExploreChannels,
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#A855F7', '#C084FC', '#E879F9', '#FEFDFC'],
      ticks: 200,
    })

    onExploreChannels?.()
  }

  // Top Status Badge: [ 04 ] [ 🌐 FOLLOW & EARN ]
  const badgeNode = (
    <div className={`d-inline-flex align-items-center flex-nowrap gap-2 ${styles.badgeGroup}`}>
      <div className={styles.badgeNumBox}>
        <span className={`fw-bold ${styles.badgeNum}`}>04</span>
      </div>
      <div className={`d-inline-flex align-items-center text-nowrap pe-3 py-1 rounded-pill ${styles.statusBadge}`}>
        <div className={styles.iconEllipse}>
          <Share2 size={14} className={styles.statusIcon} />
        </div>
        <span className="text-uppercase fw-semibold text-nowrap">FOLLOW &amp; EARN</span>
      </div>
    </div>
  )

  // Left Content: Headline, Description, CTA Button
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Follow &amp; Earn.</span><br />
          <span className={styles.titleHighlight}>Unlock Rewards.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Follow VELOOP Rewards on our official channels and participate in eligible social campaigns to unlock rewards.
        </p>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`d-inline-flex align-items-center ${styles.ctaButton}`}
          onClick={handleCtaClick}
        >
          <span className={styles.ctaText}>Explore Our Channels</span>
          <span className={styles.ctaDivider} />
          <span className={styles.ctaIconWrapper}>
            <div className={`d-flex align-items-center justify-content-center rounded-circle ${styles.arrowCircle}`}>
              <ArrowRight size={14} className={styles.ctaArrow} />
            </div>
          </span>
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Smartphone & Social Campaign Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/social-campaign.webp"
        alt="VELOOP Social Campaign and SVE Rewards"
        className={styles.socialImage}
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

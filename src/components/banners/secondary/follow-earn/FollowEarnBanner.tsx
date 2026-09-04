import React from 'react'
import confetti from 'canvas-confetti'
import { ArrowRight } from 'lucide-react'
import { SkeletonBanner } from '../SkeletonBanner'
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

  // Top Status Badge: [ 4 ] FOLLOW & EARN
  const badgeNode = (
    <div className={`d-inline-flex align-items-center gap-2 ${styles.badgeGroup}`}>
      <div className={`d-inline-flex align-items-center justify-content-center px-2 py-1 rounded-2 ${styles.badgeNumBox}`}>
        <span className={`fw-bold ${styles.badgeNum}`}>4</span>
      </div>
      <span className={`text-uppercase fw-semibold ${styles.badgeCategory}`}>FOLLOW & EARN</span>
    </div>
  )

  // Left Content: Headline, Description, CTA
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          Follow &amp; Earn
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Follow VELOOP Rewards on our official channels and participate in eligible social campaigns to unlock rewards.
        </p>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-2">
        <button
          type="button"
          className={`btn d-inline-flex align-items-center gap-2 rounded-pill fw-bold ${styles.ctaButton}`}
          onClick={handleCtaClick}
        >
          <span>Explore Our Channels</span>
          <div className={`d-flex align-items-center justify-content-center rounded-circle ${styles.arrowCircle}`}>
            <ArrowRight size={13} className={styles.ctaArrow} />
          </div>
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Smartphone & Social Campaign Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/social-campaign.png"
        alt="VELOOP Social Campaign and SVE Rewards"
        className={styles.socialImage}
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

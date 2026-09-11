import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Gift, Check } from 'lucide-react'
import { BaseBanner } from '../BaseBanner'
import styles from './DailyBonusBanner.module.css'

interface DailyBonusBannerProps {
  onClaimBonus?: () => void
}

export const DailyBonusBanner: React.FC<DailyBonusBannerProps> = ({
  onClaimBonus,
}) => {
  const [claimed, setClaimed] = useState(false)

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (claimed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#EEB71B', '#FAD055', '#FED426', '#FEFDFC'],
      ticks: 200,
    })

    setClaimed(true)
    onClaimBonus?.()
  }

  // Top Status Badge: [ 05 ] [ 🎁 DAILY BONUS ]
  const badgeNode = (
    <div className={`d-inline-flex align-items-center flex-nowrap gap-2 ${styles.badgeGroup}`}>
      <div className={styles.badgeNumBox}>
        <span className={`fw-bold ${styles.badgeNum}`}>05</span>
      </div>
      <div className={`d-inline-flex align-items-center text-nowrap pe-3 py-1 rounded-pill ${styles.statusBadge}`}>
        <div className={styles.iconEllipse}>
          <Gift size={14} className={styles.statusIcon} />
        </div>
        <span className="text-uppercase fw-semibold text-nowrap">DAILY BONUS</span>
      </div>
    </div>
  )

  // Left Content: Headline, Description, CTA Button
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Your Daily Bonus.</span><br />
          <span className={styles.titleHighlight}>Is Waiting.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Check in regularly and claim your available daily bonus before the opportunity resets.
        </p>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`d-inline-flex align-items-center ${styles.ctaButton} ${claimed ? styles.claimedButton : ''}`}
          onClick={handleCtaClick}
        >
          <span className={styles.ctaText}>{claimed ? 'Bonus Claimed' : 'Claim Bonus'}</span>
          <span className={styles.ctaDivider} />
          <span className={styles.ctaIconWrapper}>
            {claimed ? <Check size={18} className={styles.ctaIcon} /> : <Gift size={18} className={styles.ctaIcon} />}
          </span>
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Gift Box & 7-Day Streak Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/daily-streak.webp"
        alt="Daily Bonus Gift Box and 7-Day Streak Tracker"
        className={styles.streakImage}
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

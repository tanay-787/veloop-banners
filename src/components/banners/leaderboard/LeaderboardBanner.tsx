import React from 'react'
import confetti from 'canvas-confetti'
import { ArrowRight, Coins, Trophy } from 'lucide-react'
import { BaseBanner } from '../BaseBanner'
import styles from './LeaderboardBanner.module.css'

interface LeaderboardBannerProps {
  onCheckRankings?: () => void
}

export const LeaderboardBanner: React.FC<LeaderboardBannerProps> = ({
  onCheckRankings,
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#EEB71B', '#FAD055', '#93CAED', '#FEFDFC'],
      ticks: 200,
    })

    onCheckRankings?.()
  }

  // Top Status Badge: [ 01 ] [ 🏆 COMPETITION STAGE ACTIVE ]
  const badgeNode = (
    <div className={`d-inline-flex align-items-center flex-nowrap gap-2 ${styles.badgeGroup}`}>
      <div className={styles.badgeNumBox}>
        <span className={`fw-bold ${styles.badgeNum}`}>01</span>
      </div>
      <div className={`d-inline-flex align-items-center text-nowrap pe-3 py-1 rounded-pill ${styles.statusBadge}`}>
        <div className={styles.trophyEllipse}>
          <Trophy fill="#EEB71B" color="#EEB71B" className={styles.trophyIcon} />
        </div>
        <span className="text-uppercase fw-semibold text-nowrap">COMPETITION STAGE ACTIVE</span>
      </div>
    </div>
  )

  // Left Content: Headline, Description, Prize Pool Metric, CTA
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Rank Higher.</span><br />
          <span className={styles.titleHighlight}>Earn More.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Complete activities, earn rewards, gain XP, and compete with other users to climb the leaderboard.
        </p>
      </div>

      {/* Prize Pool Metric Pill */}
      <div className={`d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 ${styles.poolPill}`}>
        <Coins size={16} className={styles.poolIcon} />
        <span className={styles.poolText}>
          Current pool: <strong className={styles.poolHighlight}>50,000 VEs</strong> in prizes
        </span>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`d-inline-flex align-items-center gap-2 rounded-3 fw-bold ${styles.ctaButton}`}
          onClick={handleCtaClick}
        >
          <span>Check Rankings</span>
          <ArrowRight className={styles.ctaArrow} />
        </button>
      </div>
    </>
  )

  // Right Content: Official 3D Trophy Podium Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/trophy-podium.webp"
        alt="Leaderboard Trophy and Top 3 Podium"
        className={styles.podiumImage}
        loading="eager"
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

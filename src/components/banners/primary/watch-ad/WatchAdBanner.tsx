import React from 'react'
import confetti from 'canvas-confetti'
import { Play, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { SkeletonBanner } from '../SkeletonBanner'
import styles from './WatchAdBanner.module.css'

interface WatchAdBannerProps {
  onWatchAndEarn?: () => void
}

export const WatchAdBanner: React.FC<WatchAdBannerProps> = ({
  onWatchAndEarn,
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#93CAED', '#1886FF', '#60A5FA', '#FEFDFC'],
      ticks: 200,
    })

    onWatchAndEarn?.()
  }

  // Top Status Badge: [ 02 ] [ ▷ ON-DEMAND REWARDS ]
  const badgeNode = (
    <div className={`d-inline-flex align-items-center flex-nowrap gap-2 ${styles.badgeGroup}`}>
      <div className={styles.badgeNumBox}>
        <span className={`fw-bold ${styles.badgeNum}`}>02</span>
      </div>
      <div className={`d-inline-flex align-items-center text-nowrap pe-3 py-1 rounded-pill ${styles.statusBadge}`}>
        <div className={styles.playEllipse}>
          <Play fill="#1886FF" color="#1886FF" className={styles.playIcon} />
        </div>
        <span className="text-uppercase fw-semibold text-nowrap">ON-DEMAND REWARDS</span>
      </div>
    </div>
  )

  // Left Content: Headline, Description, Feature Pills, CTA
  const leftContentNode = (
    <>
      <div className="d-flex flex-column gap-2">
        <h2 className={`fw-extrabold m-0 ${styles.title}`}>
          <span>Watch Ads.</span><br />
          <span className={styles.titleHighlight}>Earn VEs.</span>
        </h2>
        <p className={`m-0 ${styles.description}`}>
          Watch eligible advertisements and earn VEs for completing ad activities.
        </p>
      </div>

      {/* Feature Badges: "No Daily Cap" & "Instant Credits" */}
      <div className="d-flex flex-wrap align-items-center gap-2">
        <div className={`d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 ${styles.featurePill}`}>
          <ShieldCheck size={16} className={styles.pillIcon} />
          <span className={styles.pillText}>No Daily Cap</span>
        </div>
        <div className={`d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 ${styles.featurePill}`}>
          <Zap size={16} className={styles.pillIcon} />
          <span className={styles.pillText}>Instant Credits</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="d-flex align-items-center gap-3 pt-1">
        <button
          type="button"
          className={`d-inline-flex align-items-center gap-2 rounded-3 fw-bold ${styles.ctaButton}`}
          onClick={handleCtaClick}
        >
          <span>Watch &amp; Earn</span>
          <ArrowRight className={styles.ctaArrow} />
        </button>
      </div>
    </>
  )

  // Right Content: Official Video Player & VE Wallet Graphic
  const rightContentNode = (
    <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.graphicWrapper}`}>
      <div className={styles.ambientGlow} />
      <img
        src="/ve-wallet.png"
        alt="Watch Ads Video Player and VE Wallet"
        className={styles.walletImage}
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

import React from 'react'
import styles from './SkeletonBanner.module.css'

export interface SecondarySkeletonBannerProps {
  /** Optional compact category badge (e.g., "3 CONTACT US", "4 FOLLOW & EARN") */
  badge?: React.ReactNode
  /** Left column content: titles, description, info items, CTAs */
  leftContent?: React.ReactNode
  /** Right column content: modular interactive widget panels */
  rightContent?: React.ReactNode
  /** Custom children override if full layout customization is needed */
  children?: React.ReactNode
  /** Optional additional CSS class */
  className?: string
}

export const SkeletonBanner: React.FC<SecondarySkeletonBannerProps> = ({
  badge,
  leftContent,
  rightContent,
  children,
  className = '',
}) => {
  return (
    <div className={`w-100 position-relative ${styles.card} ${className}`}>
      {children ? (
        children
      ) : (
        <div className="container-fluid flex-grow-1 h-100 p-0 d-flex flex-column">
          {/* Main 2-Column Responsive Layout (5:7 ratio for wide visual cards) */}
          <div className="row gx-4 gy-3 gy-lg-0 flex-grow-1 h-100 m-0">
            {/* Left Column: Typography & Action items */}
            <div className={`col-12 col-lg-5 d-flex flex-column h-100 p-0 ${styles.leftCol}`}>
              <div className={styles.leftContentGrid}>
                {badge && <div className={styles.badgeCol}>{badge}</div>}
                <div className={styles.contentCol}>
                  {leftContent}
                </div>
              </div>
            </div>

            {/* Right Column: Modular Interactive Widget */}
            <div className={`col-12 col-lg-7 d-flex align-items-center justify-content-center h-100 ${styles.rightCol}`}>
              <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.widgetContainer}`}>
                {rightContent}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

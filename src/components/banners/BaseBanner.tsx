import React from 'react'
import styles from './BaseBanner.module.css'

export interface BaseBannerProps {
  /** Optional top status badge (e.g., "01 COMPETITION STAGE ACTIVE") */
  badge?: React.ReactNode
  /** Left column content: titles, description, metrics, CTAs */
  leftContent?: React.ReactNode
  /** Right column content: large 3D visual or interactive illustration */
  rightContent?: React.ReactNode
  /** Custom children override if full layout customization is needed */
  children?: React.ReactNode
  /** Optional additional CSS class */
  className?: string
}

export const BaseBanner: React.FC<BaseBannerProps> = ({
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
        <div className="container-fluid h-100 flex-grow-1 p-0 d-flex flex-column">
          {/* Main 2-Column Responsive Layout: 5:7 split for tablet landscape and desktop */}
          <div className="row g-2 g-md-4 align-items-center flex-grow-1 h-100">
            {/* Left Column: Badge, Typography & CTAs */}
            <div className={`col-12 col-md-5 d-flex flex-column justify-content-center h-100 ${styles.leftCol}`}>
              {badge && <div className="mb-2 mb-md-2">{badge}</div>}
              <div className="d-flex flex-column gap-2 gap-md-3">
                {leftContent}
              </div>
            </div>

            {/* Right Column: Large Illustrative Visual */}
            <div className={`col-12 col-md-7 d-flex align-items-center justify-content-center h-100 ${styles.rightCol}`}>
              <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.visualContainer}`}>
                {rightContent}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

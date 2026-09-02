import React from 'react'
import styles from './SkeletonBanner.module.css'

export interface PrimarySkeletonBannerProps {
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

export const SkeletonBanner: React.FC<PrimarySkeletonBannerProps> = ({
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
        <div className="container-fluid h-100 p-0 d-flex flex-column justify-content-between">
          {/* Top Badge Slot */}
          {badge && <div className="mb-2 mb-md-3">{badge}</div>}

          {/* Main 2-Column Responsive Layout */}
          <div className="row g-4 align-items-center flex-grow-1">
            {/* Left Column: Typography & CTAs */}
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
              <div className="d-flex flex-column gap-3">
                {leftContent}
              </div>
            </div>

            {/* Right Column: Large Illustrative Visual */}
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
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

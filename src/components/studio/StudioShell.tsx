import React, { useState } from 'react'
import { StudioHeader, type ViewMode, type BannerId } from '@/components/studio/header/StudioHeader'
import { ViewportSandbox } from '@/components/studio/sandbox/ViewportSandbox'
import styles from './StudioShell.module.css'

interface StudioShellProps {
  renderBanner?: (bannerId: BannerId) => React.ReactNode
  renderAllBanners?: () => React.ReactNode
}

export const StudioShell: React.FC<StudioShellProps> = ({
  renderBanner,
  renderAllBanners,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('feed')
  const [activeBanner, setActiveBanner] = useState<BannerId>('leaderboard')
  const [activePreset, setActivePreset] = useState<'desktop' | 'tablet' | 'mobile' | 'fluid'>('desktop')

  const handleResetView = () => {
    setActivePreset('desktop')
  }

  return (
    <div className={`min-vh-100 d-flex flex-column w-100 ${styles.shell}`}>
      {/* Studio Header Toolbar */}
      <StudioHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeBanner={activeBanner}
        onBannerSelect={setActiveBanner}
        activePreset={activePreset}
        onPresetChange={setActivePreset}
        onResetView={handleResetView}
      />

      {/* Main Content Area */}
      <main className={`flex-grow-1 d-flex flex-column w-100 ${styles.mainContent}`}>
        {viewMode === 'feed' ? (
          /* Feed Mode: Full-width stacked view of all banners */
          <div className="container-fluid px-3 px-md-4 py-4">
            <div className={`d-flex flex-column gap-4 w-100 mx-auto ${styles.feedContainer}`}>
              {renderAllBanners ? (
                renderAllBanners()
              ) : (
                <div className={`w-100 d-flex align-items-center justify-content-center rounded-4 ${styles.placeholderCard}`}>
                  <p className="m-0">All banners feed will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Studio Mode: Resizable Sandbox Viewport */
          <div className={`w-100 flex-grow-1 d-flex flex-column ${styles.studioContainer}`}>
            <ViewportSandbox preset={activePreset}>
              {renderBanner ? (
                renderBanner(activeBanner)
              ) : (
                <div className={`w-100 d-flex align-items-center justify-content-center rounded-4 ${styles.placeholderCard}`}>
                  <p className="m-0">Active Banner: {activeBanner}</p>
                </div>
              )}
            </ViewportSandbox>
          </div>
        )}
      </main>
    </div>
  )
}

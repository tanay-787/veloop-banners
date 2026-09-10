import { StudioShell } from '@/components/studio/StudioShell'
import { LeaderboardBanner } from '@/components/banners/leaderboard/LeaderboardBanner'
import { WatchAdBanner } from '@/components/banners/watch-ad/WatchAdBanner'
import { ContactUsBanner } from '@/components/banners/contact-us/ContactUsBanner'
import { FollowEarnBanner } from '@/components/banners/follow-earn/FollowEarnBanner'
import { DailyBonusBanner } from '@/components/banners/daily-bonus/DailyBonusBanner'
import type { BannerId } from '@/components/studio/header/StudioHeader'
import './App.css'

export default function App() {
  const renderBanner = (bannerId: BannerId) => {
    switch (bannerId) {
      case 'leaderboard':
        return <LeaderboardBanner />
      case 'watch-ads':
        return <WatchAdBanner />
      case 'contact-us':
        return <ContactUsBanner />
      case 'follow-earn':
        return <FollowEarnBanner />
      case 'daily-bonus':
        return <DailyBonusBanner />
      default:
        return (
          <div className="w-100 d-flex align-items-center justify-content-center p-5 rounded-4 border border-secondary border-opacity-25">
            <p className="text-secondary m-0">Banner {bannerId} is currently under construction.</p>
          </div>
        )
    }
  }

  const renderAllBanners = () => {
    return (
      <div className="d-flex flex-column gap-4 w-100">
        <LeaderboardBanner />
        <WatchAdBanner />
        <ContactUsBanner />
        <FollowEarnBanner />
        <DailyBonusBanner />
      </div>
    )
  }

  return (
    <div className="app-container">
      <StudioShell
        renderBanner={renderBanner}
        renderAllBanners={renderAllBanners}
      />
    </div>
  )
}

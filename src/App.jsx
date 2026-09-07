// App.jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import PageVisibilityGate from './components/PageVisibilityGate'
import AppShell from './components/AppShell'

// Public Pages
import HomePage from './pages/HomePage'
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'))
const MyCoursesPage = lazy(() => import('./pages/MyCoursesPage'))
const MockTestsPage = lazy(() => import('./pages/MockTestsPage'))
const HseTopicPracticeHub = lazy(() => import('./pages/HseTopicPracticeHub'))
const TopicTestPage = lazy(() => import('./pages/TopicTestPage'))
const CardsPage = lazy(() => import('./pages/CardsPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const DynamicPage = lazy(() => import('./pages/DynamicPage'))
const StudyGuidePage = lazy(() => import('./pages/StudyGuidePage'))
const ChapterDetailPage = lazy(() => import('./pages/ChapterDetailPage'))
const GuestTestPage = lazy(() => import('./pages/GuestTestPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const GreenCardMockTest = lazy(() => import('./pages/GreenCardMockTest'))
const SkilledWorkerTest = lazy(() => import('./pages/SkilledWorkerTest'))
const SupervisorTest = lazy(() => import('./pages/SupervisorTest'))
const BlackCardMockTest = lazy(() => import('./pages/BlackCardMockTest'))
const ManagerTest = lazy(() => import('./pages/ManagerTest'))
const BookPage = lazy(() => import('./pages/BookPage'))
const ECSCardBookingPage = lazy(() => import('./pages/ECSCardBookingPage'))
const CardApplicationTrackerPage = lazy(() => import('./pages/CardApplicationTrackerPage'))
const SmartPracticePage = lazy(() => import('./pages/SmartPracticePage'))
const ECSTestBookingPage = lazy(() => import('./pages/ECSTestBookingPage'))
const TestCentreFinderPage = lazy(() => import('./pages/TestCentreFinderPage'))
const CardRenewalReminderPage = lazy(() => import('./pages/CardRenewalReminderPage'))
const PricingPlansPage = lazy(() => import('./pages/PricingPlansPage'))
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'))
const CertificatePage = lazy(() => import('./pages/CertificatePage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const CookiesPage = lazy(() => import('./pages/CookiesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const SafetySignsPage = lazy(() => import('./pages/SafetySignsPage'))
const StudyMaterialPage = lazy(() => import('./pages/StudyMaterialPage'))
const VideoLibraryPage = lazy(() => import('./pages/VideoLibraryPage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const ECSCardInfoPage = lazy(() => import('./pages/ECSCardInfoPage'))
const CardEligibilityWizardPage = lazy(() => import('./pages/CardEligibilityWizardPage'))
const ExamDayChecklistPage = lazy(() => import('./pages/ExamDayChecklistPage'))
const TeamDashboardPage = lazy(() => import('./pages/TeamDashboardPage'))
const TeamAuditReportPage = lazy(() => import('./pages/TeamAuditReportPage'))
const TeamInviteAcceptPage = lazy(() => import('./pages/TeamInviteAcceptPage'))
const LabourerPage = lazy(() => import('./pages/ecs-cards/LabourerPage'))
const ElectricalLabourerPage = lazy(() => import('./pages/ecs-cards/ElectricalLabourerPage'))
const ApprenticePage = lazy(() => import('./pages/ecs-cards/ApprenticePage'))
const TraineeElectricianPage = lazy(() => import('./pages/ecs-cards/TraineeElectricianPage'))
const IndustryPlacementTLevelPage = lazy(() => import('./pages/ecs-cards/IndustryPlacementTLevelPage'))
const ExperiencedWorkerGoldStripeTempPage = lazy(() => import('./pages/ecs-cards/ExperiencedWorkerGoldStripeTempPage'))
const SiteSupportOccupationsPage = lazy(() => import('./pages/ecs-cards/SiteSupportOccupationsPage'))
const ProvisionalInstallationElectricianPage = lazy(() => import('./pages/ecs-cards/ProvisionalInstallationElectricianPage'))
const InstallationElectricianGoldPage = lazy(() => import('./pages/ecs-cards/InstallationElectricianGoldPage'))
const ApprovedElectricianGoldPage = lazy(() => import('./pages/ecs-cards/ApprovedElectricianGoldPage'))
const RegisteredElectricianGoldPage = lazy(() => import('./pages/ecs-cards/RegisteredElectricianGoldPage'))
const TechnicianGoldPage = lazy(() => import('./pages/ecs-cards/TechnicianGoldPage'))
const MaintenanceElectricianPage = lazy(() => import('./pages/ecs-cards/MaintenanceElectricianPage'))
const ElectricalFitterPage = lazy(() => import('./pages/ecs-cards/ElectricalFitterPage'))
const EngineeringMaintenanceElectricianPage = lazy(() => import('./pages/ecs-cards/EngineeringMaintenanceElectricianPage'))
const WiremanAndPanelBuilderPage = lazy(() => import('./pages/ecs-cards/WiremanAndPanelBuilderPage'))
const MarineElectricianPage = lazy(() => import('./pages/ecs-cards/MarineElectricianPage'))
const AutoElectricianPage = lazy(() => import('./pages/ecs-cards/AutoElectricianPage'))
const ElectricalProductServiceEngineerPage = lazy(() => import('./pages/ecs-cards/ElectricalProductServiceEngineerPage'))
const ElectricalWinderPage = lazy(() => import('./pages/ecs-cards/ElectricalWinderPage'))
const DistributionNetworksElectricianPage = lazy(() => import('./pages/ecs-cards/DistributionNetworksElectricianPage'))
const InstrumentsMechanicPage = lazy(() => import('./pages/ecs-cards/InstrumentsMechanicPage'))
const FessApprenticePage = lazy(() => import('./pages/ecs-cards/FessApprenticePage'))
const FessLabourerPage = lazy(() => import('./pages/ecs-cards/FessLabourerPage'))
const FessSystemsOperativePage = lazy(() => import('./pages/ecs-cards/FessSystemsOperativePage'))
const FessSystemsTechnicianEngineerPage = lazy(() => import('./pages/ecs-cards/FessSystemsTechnicianEngineerPage'))
const BuildingControlsInstallerEngineerPage = lazy(() => import('./pages/ecs-cards/BuildingControlsInstallerEngineerPage'))
const NetworkInfrastructureAssistantPage = lazy(() => import('./pages/ecs-cards/NetworkInfrastructureAssistantPage'))
const NetworkInfrastructureInstallerPage = lazy(() => import('./pages/ecs-cards/NetworkInfrastructureInstallerPage'))
const LvJointerPage = lazy(() => import('./pages/ecs-cards/LvJointerPage'))
const TelecommunicationsFitterPage = lazy(() => import('./pages/ecs-cards/TelecommunicationsFitterPage'))
const CellularNetworkFieldEngineerPage = lazy(() => import('./pages/ecs-cards/CellularNetworkFieldEngineerPage'))
const SignalDistributionSpecialistPage = lazy(() => import('./pages/ecs-cards/SignalDistributionSpecialistPage'))
const TelecomsOperativePage = lazy(() => import('./pages/ecs-cards/TelecomsOperativePage'))
const AvOperativeAvTechnicianPage = lazy(() => import('./pages/ecs-cards/AvOperativeAvTechnicianPage'))
const BroadcastAndMediaSupervisorPage = lazy(() => import('./pages/ecs-cards/BroadcastAndMediaSupervisorPage'))
const CreativeProductionOperativePage = lazy(() => import('./pages/ecs-cards/CreativeProductionOperativePage'))
const CreativeProductionTechnicianPage = lazy(() => import('./pages/ecs-cards/CreativeProductionTechnicianPage'))
const CreativeProductionManagerPage = lazy(() => import('./pages/ecs-cards/CreativeProductionManagerPage'))
const IscveAvEngineerPage = lazy(() => import('./pages/ecs-cards/IscveAvEngineerPage'))
const IscveSoundEngineerPage = lazy(() => import('./pages/ecs-cards/IscveSoundEngineerPage'))
const AvixaCommercialAvIntegratorPage = lazy(() => import('./pages/ecs-cards/AvixaCommercialAvIntegratorPage'))
const RadioAndTelevisionElectricianPage = lazy(() => import('./pages/ecs-cards/RadioAndTelevisionElectricianPage'))
const SiteSupervisorPage = lazy(() => import('./pages/ecs-cards/SiteSupervisorPage'))
const SiteManagerPage = lazy(() => import('./pages/ecs-cards/SiteManagerPage'))
const ContractsManagerPage = lazy(() => import('./pages/ecs-cards/ContractsManagerPage'))
const ProjectManagerPage = lazy(() => import('./pages/ecs-cards/ProjectManagerPage'))
const AcademicallyQualifiedPersonAqpPage = lazy(() => import('./pages/ecs-cards/AcademicallyQualifiedPersonAqpPage'))
const ProfessionallyQualifiedPersonPqpPage = lazy(() => import('./pages/ecs-cards/ProfessionallyQualifiedPersonPqpPage'))
const VehicleInstallerPage = lazy(() => import('./pages/ecs-cards/VehicleInstallerPage'))
const GateSafeInstallerPage = lazy(() => import('./pages/ecs-cards/GateSafeInstallerPage'))
const SllLightingProfessionalPage = lazy(() => import('./pages/ecs-cards/SllLightingProfessionalPage'))
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'))
const AM2SimulatorPage = lazy(() => import('./pages/AM2SimulatorPage'))

// User Dashboard Pages
const ECSDashboard = lazy(() => import('./pages/ECSDashboard'))
const StudyPlanPage = lazy(() => import('./pages/StudyPlanPage'))
const AIQuizGeneratorPage = lazy(() => import('./pages/AIQuizGeneratorPage'))
const AffiliatePage = lazy(() => import('./pages/AffiliatePage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const MyLibraryPage = lazy(() => import('./pages/MyLibraryPage'))
const MyMistakesPage = lazy(() => import('./pages/MyMistakesPage'))
const QuickReviewPage = lazy(() => import('./pages/QuickReviewPage'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'))
const WrongQuestionsPage = lazy(() => import('./pages/WrongQuestionsPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const SignOutPage = lazy(() => import('./pages/SignOutPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))

// Auth Pages
const RegisterPage = lazy(() => import('./pages/admin/RegisterPage'))
const LoginPage = lazy(() => import('./pages/admin/LoginPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminUserDetail = lazy(() => import('./pages/admin/AdminUserDetail'))
const AdminTests = lazy(() => import('./pages/admin/AdminTests'))
const AdminQuestions = lazy(() => import('./pages/admin/AdminQuestions'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'))
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))
const AdminFestivals = lazy(() => import('./pages/admin/AdminFestivals'))
const AdminPaymentRequests = lazy(() => import('./pages/admin/AdminPaymentRequests'))
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'))
const AdminCourseRequests = lazy(() => import('./pages/admin/AdminCourseRequests'))
const AdminInvoices = lazy(() => import('./pages/admin/AdminInvoices'))
const AdminQuotes = lazy(() => import('./pages/admin/AdminQuotes'))
const AdminRams = lazy(() => import('./pages/admin/AdminRams'))
const AdminPages = lazy(() => import('./pages/admin/AdminPages'))
const AdminAuditLog = lazy(() => import('./pages/admin/AdminAuditLog'))
const AdminBroadcast = lazy(() => import('./pages/admin/AdminBroadcast'))
const AdminSupportTickets = lazy(() => import('./pages/admin/AdminSupportTickets'))
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'))
const AdminQuestionReports = lazy(() => import('./pages/admin/AdminQuestionReports'))
const AdminCardApplications = lazy(() => import('./pages/admin/AdminCardApplications'))
const AdminTestBookings = lazy(() => import('./pages/admin/AdminTestBookings'))
const AdminSeoManager = lazy(() => import('./pages/admin/AdminSeoManager'))
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'))
const AdminSystemHealth = lazy(() => import('./pages/admin/AdminSystemHealth'))

import Header from './components/Header'
import Footer from './components/Footer'
import ImpersonationBanner from './components/ImpersonationBanner'
import MobileBottomNav from './components/MobileBottomNav'
import ProtectedRoute from './components/ProtectedRoute'
import AIAssistant from './components/AIAssistant'
import PageTranslator from './components/PageTranslator'
import CookieConsent from './components/CookieConsent'
import XPToast from './components/XPToast'
import SiteThemeLoader from './components/SiteThemeLoader'
import AccessibilityToolbar from './components/AccessibilityToolbar'
import OfflineStatusBanner from './components/OfflineStatusBanner'
import { extraTestRoutePaths } from './data/extraTestsRoutes'

// Lazy-loaded: GenericMockTest pulls in every "extra practice" question
// bank (extraTests.js and everything it imports — 3,000+ questions,
// 30,000+ lines). Previously imported eagerly above, which meant that
// entire dataset was downloaded on every single page view, not just when
// a visitor opened one of these tests. See data/extraTestsRoutes.js for
// why route paths are listed separately from the test data itself.
const GenericMockTest = lazy(() => import('./components/GenericMockTest'))

// Routes that render their own sidebar shell (AppShell) instead of the
// public marketing Header/Footer — the signed-in "app" area.
const APP_SHELL_PREFIXES = [
  '/dashboard', '/my-mistakes', '/my-library', '/quick-review', '/analytics', '/affiliate',
  '/flashcards', '/revision', '/achievements', '/ai-quiz-generator',
]

function SiteChrome() {
  const location = useLocation()
  const isAppShell = APP_SHELL_PREFIXES.some((p) => location.pathname.startsWith(p))
  if (isAppShell) return null
  return (
    <>
      <Header />
      <MobileBottomNav />
    </>
  )
}

function SiteFooter() {
  const location = useLocation()
  const isAppShell = APP_SHELL_PREFIXES.some((p) => location.pathname.startsWith(p))
  if (isAppShell) return null
  return <Footer />
}

function App() {
  return (
    <BrowserRouter>
      <SiteThemeLoader />
      <PageTranslator />
      <SiteChrome />
      <ImpersonationBanner />
      <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-gray-400 text-sm">Loading…</div>}>
      <Routes>
        {/* Public + User Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="courses" element={<PageVisibilityGate pageKey="courses" title="Courses"><CoursesPage /></PageVisibilityGate>} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="my-courses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
          <Route path="mock-test" element={<MockTestsPage />} />
          <Route path="ecs-hse-practice" element={<HseTopicPracticeHub />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="guest-test" element={<GuestTestPage />} />
          <Route path="ecs-green-card-mock-test" element={<GreenCardMockTest />} />
          <Route path="ecs-skilled-worker-test" element={<SkilledWorkerTest />} />
          <Route path="ecs-supervisor-test" element={<SupervisorTest />} />
          <Route path="ecs-black-card-mock-test" element={<BlackCardMockTest />} />
          <Route path="ecs-managers-and-professionals-test" element={<ManagerTest />} />
          {extraTestRoutePaths.map((path) => (
            <Route key={path} path={path.replace(/^\//, '')} element={<GenericMockTest />} />
          ))}
          <Route path="topic/:slug" element={<TopicTestPage />} />
          <Route path="study-guide" element={<ProtectedRoute requirePro><StudyGuidePage /></ProtectedRoute>} />
          <Route path="study-guide/:chapterId" element={<ProtectedRoute requirePro><ChapterDetailPage /></ProtectedRoute>} />
          <Route path="quick-review" element={<ProtectedRoute><AppShell><QuickReviewPage /></AppShell></ProtectedRoute>} />
          <Route path="flashcards" element={<ProtectedRoute><AppShell><FlashcardsPage /></AppShell></ProtectedRoute>} />
          <Route path="revision/wrong-questions" element={<ProtectedRoute><AppShell><WrongQuestionsPage /></AppShell></ProtectedRoute>} />
          <Route path="smart-practice" element={<ProtectedRoute><AppShell><SmartPracticePage /></AppShell></ProtectedRoute>} />
          <Route path="bookmarks" element={<ProtectedRoute><AppShell><BookmarksPage /></AppShell></ProtectedRoute>} />
          <Route path="achievements" element={<ProtectedRoute><AppShell><AchievementsPage /></AppShell></ProtectedRoute>} />
          <Route path="my-mistakes" element={<ProtectedRoute><AppShell><MyMistakesPage /></AppShell></ProtectedRoute>} />
          <Route path="my-library" element={<ProtectedRoute><AppShell><MyLibraryPage /></AppShell></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute><AppShell><AnalyticsPage /></AppShell></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><ECSDashboard /></ProtectedRoute>} />
          <Route path="study-plan" element={<ProtectedRoute><AppShell><StudyPlanPage /></AppShell></ProtectedRoute>} />
          <Route path="ai-quiz-generator" element={<ProtectedRoute requirePro><AIQuizGeneratorPage /></ProtectedRoute>} />
          <Route path="affiliate" element={<ProtectedRoute><AppShell><PageVisibilityGate pageKey="affiliate" title="Affiliate"><AffiliatePage /></PageVisibilityGate></AppShell></ProtectedRoute>} />
          <Route path="refer" element={<Navigate to="/affiliate" replace />} />
          <Route path="pricing" element={<PageVisibilityGate pageKey="pricing" title="Pricing"><PricingPage /></PageVisibilityGate>} />
          <Route path="plans" element={<PageVisibilityGate pageKey="plans" title="Pricing Plans"><PricingPlansPage /></PageVisibilityGate>} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="leaderboard" element={<PageVisibilityGate pageKey="leaderboard" title="Leaderboard"><LeaderboardPage /></PageVisibilityGate>} />
          <Route path="certificate" element={<ProtectedRoute requirePro><PageVisibilityGate pageKey="certificate" title="Certificate"><CertificatePage /></PageVisibilityGate></ProtectedRoute>} />
          <Route path="book" element={<PageVisibilityGate pageKey="book" title="Book"><BookPage /></PageVisibilityGate>} />
          <Route path="ecscardbooking" element={<PageVisibilityGate pageKey="ecs-card-booking" title="Book Your ECS Card"><ECSCardBookingPage /></PageVisibilityGate>} />
          <Route path="my-card-application" element={<ProtectedRoute><AppShell><CardApplicationTrackerPage /></AppShell></ProtectedRoute>} />
          <Route path="ecstestbooking" element={<PageVisibilityGate pageKey="ecs-test-booking" title="Book Your ECS Test"><ECSTestBookingPage /></PageVisibilityGate>} />
          <Route path="test-centre-finder" element={<TestCentreFinderPage />} />
          <Route path="card-renewal-reminder" element={<ProtectedRoute><AppShell><CardRenewalReminderPage /></AppShell></ProtectedRoute>} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="types-of-ecs-cards" element={<CardsPage />} />
          <Route path="ecs-card-info" element={<PageVisibilityGate pageKey="ecs-card-info" title="ECS Card Info"><ECSCardInfoPage /></PageVisibilityGate>} />
          <Route path="which-ecs-card" element={<PageVisibilityGate pageKey="which-ecs-card" title="Which ECS Card Do I Need?"><CardEligibilityWizardPage /></PageVisibilityGate>} />
          <Route path="exam-day-checklist" element={<PageVisibilityGate pageKey="exam-day-checklist" title="Exam Day Checklist"><ExamDayChecklistPage /></PageVisibilityGate>} />
          <Route path="team" element={<ProtectedRoute requirePro><AppShell><TeamDashboardPage /></AppShell></ProtectedRoute>} />
          <Route path="team/audit-report" element={<ProtectedRoute requirePro><AppShell><TeamAuditReportPage /></AppShell></ProtectedRoute>} />
          <Route path="team/accept/:inviteId" element={<ProtectedRoute><AppShell><TeamInviteAcceptPage /></AppShell></ProtectedRoute>} />
          <Route path="ecs-cards/labourer" element={<LabourerPage />} />
          <Route path="ecs-cards/electrical-labourer" element={<ElectricalLabourerPage />} />
          <Route path="ecs-cards/apprentice" element={<ApprenticePage />} />
          <Route path="ecs-cards/trainee-electrician" element={<TraineeElectricianPage />} />
          <Route path="ecs-cards/industry-placement-t-level" element={<IndustryPlacementTLevelPage />} />
          <Route path="ecs-cards/experienced-worker-gold-stripe-temp" element={<ExperiencedWorkerGoldStripeTempPage />} />
          <Route path="ecs-cards/site-support-occupations" element={<SiteSupportOccupationsPage />} />
          <Route path="ecs-cards/provisional-installation-electrician" element={<ProvisionalInstallationElectricianPage />} />
          <Route path="ecs-cards/installation-electrician-gold" element={<InstallationElectricianGoldPage />} />
          <Route path="ecs-cards/approved-electrician-gold" element={<ApprovedElectricianGoldPage />} />
          <Route path="ecs-cards/registered-electrician-gold" element={<RegisteredElectricianGoldPage />} />
          <Route path="ecs-cards/technician-gold" element={<TechnicianGoldPage />} />
          <Route path="ecs-cards/maintenance-electrician" element={<MaintenanceElectricianPage />} />
          <Route path="ecs-cards/electrical-fitter" element={<ElectricalFitterPage />} />
          <Route path="ecs-cards/engineering-maintenance-electrician" element={<EngineeringMaintenanceElectricianPage />} />
          <Route path="ecs-cards/wireman-and-panel-builder" element={<WiremanAndPanelBuilderPage />} />
          <Route path="ecs-cards/marine-electrician" element={<MarineElectricianPage />} />
          <Route path="ecs-cards/auto-electrician" element={<AutoElectricianPage />} />
          <Route path="ecs-cards/electrical-product-service-engineer" element={<ElectricalProductServiceEngineerPage />} />
          <Route path="ecs-cards/electrical-winder" element={<ElectricalWinderPage />} />
          <Route path="ecs-cards/distribution-networks-electrician" element={<DistributionNetworksElectricianPage />} />
          <Route path="ecs-cards/instruments-mechanic" element={<InstrumentsMechanicPage />} />
          <Route path="ecs-cards/fess-apprentice" element={<FessApprenticePage />} />
          <Route path="ecs-cards/fess-labourer" element={<FessLabourerPage />} />
          <Route path="ecs-cards/fess-systems-operative" element={<FessSystemsOperativePage />} />
          <Route path="ecs-cards/fess-systems-technician-engineer" element={<FessSystemsTechnicianEngineerPage />} />
          <Route path="ecs-cards/building-controls-installer-engineer" element={<BuildingControlsInstallerEngineerPage />} />
          <Route path="ecs-cards/network-infrastructure-assistant" element={<NetworkInfrastructureAssistantPage />} />
          <Route path="ecs-cards/network-infrastructure-installer" element={<NetworkInfrastructureInstallerPage />} />
          <Route path="ecs-cards/lv-jointer" element={<LvJointerPage />} />
          <Route path="ecs-cards/telecommunications-fitter" element={<TelecommunicationsFitterPage />} />
          <Route path="ecs-cards/cellular-network-field-engineer" element={<CellularNetworkFieldEngineerPage />} />
          <Route path="ecs-cards/signal-distribution-specialist" element={<SignalDistributionSpecialistPage />} />
          <Route path="ecs-cards/telecoms-operative" element={<TelecomsOperativePage />} />
          <Route path="ecs-cards/av-operative-av-technician" element={<AvOperativeAvTechnicianPage />} />
          <Route path="ecs-cards/broadcast-and-media-supervisor" element={<BroadcastAndMediaSupervisorPage />} />
          <Route path="ecs-cards/creative-production-operative" element={<CreativeProductionOperativePage />} />
          <Route path="ecs-cards/creative-production-technician" element={<CreativeProductionTechnicianPage />} />
          <Route path="ecs-cards/creative-production-manager" element={<CreativeProductionManagerPage />} />
          <Route path="ecs-cards/iscve-av-engineer" element={<IscveAvEngineerPage />} />
          <Route path="ecs-cards/iscve-sound-engineer" element={<IscveSoundEngineerPage />} />
          <Route path="ecs-cards/avixa-commercial-av-integrator" element={<AvixaCommercialAvIntegratorPage />} />
          <Route path="ecs-cards/radio-and-television-electrician" element={<RadioAndTelevisionElectricianPage />} />
          <Route path="ecs-cards/site-supervisor" element={<SiteSupervisorPage />} />
          <Route path="ecs-cards/site-manager" element={<SiteManagerPage />} />
          <Route path="ecs-cards/contracts-manager" element={<ContractsManagerPage />} />
          <Route path="ecs-cards/project-manager" element={<ProjectManagerPage />} />
          <Route path="ecs-cards/academically-qualified-person-aqp" element={<AcademicallyQualifiedPersonAqpPage />} />
          <Route path="ecs-cards/professionally-qualified-person-pqp" element={<ProfessionallyQualifiedPersonPqpPage />} />
          <Route path="ecs-cards/vehicle-installer" element={<VehicleInstallerPage />} />
          <Route path="ecs-cards/gate-safe-installer" element={<GateSafeInstallerPage />} />
          <Route path="ecs-cards/sll-lighting-professional" element={<SllLightingProfessionalPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="page/:slug" element={<DynamicPage />} />
          <Route path="safety-signs" element={<PageVisibilityGate pageKey="safety-signs" title="Safety Signs"><SafetySignsPage /></PageVisibilityGate>} />
          <Route path="calculators" element={<PageVisibilityGate pageKey="calculators" title="Calculators"><CalculatorsPage /></PageVisibilityGate>} />
          <Route path="calculators/:calcId" element={<PageVisibilityGate pageKey="calculators" title="Calculators"><CalculatorsPage /></PageVisibilityGate>} />
          <Route path="am2-simulator" element={<PageVisibilityGate pageKey="am2-simulator" title="AM2 Simulator"><AM2SimulatorPage /></PageVisibilityGate>} />
          <Route path="study-material" element={<PageVisibilityGate pageKey="study-material" title="Study Material"><StudyMaterialPage /></PageVisibilityGate>} />
          <Route path="videos" element={<PageVisibilityGate pageKey="videos" title="Video Library"><VideoLibraryPage /></PageVisibilityGate>} />
          <Route path="community" element={<PageVisibilityGate pageKey="community" title="Community"><CommunityPage /></PageVisibilityGate>} />
          <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="about" element={<PageVisibilityGate pageKey="about" title="About"><AboutPage /></PageVisibilityGate>} />
          <Route path="contact" element={<PageVisibilityGate pageKey="contact" title="Contact"><ContactPage /></PageVisibilityGate>} />
          <Route path="terms" element={<PageVisibilityGate pageKey="terms" title="Terms"><TermsPage /></PageVisibilityGate>} />
          <Route path="privacy" element={<PageVisibilityGate pageKey="privacy" title="Privacy"><PrivacyPage /></PageVisibilityGate>} />
          <Route path="cookies" element={<PageVisibilityGate pageKey="cookies" title="Cookies"><CookiesPage /></PageVisibilityGate>} />
          <Route path="signout" element={<SignOutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ProtectedRoute requireSuperAdmin><AdminUsers /></ProtectedRoute>} />
          <Route path="users/:id" element={<ProtectedRoute requireSuperAdmin><AdminUserDetail /></ProtectedRoute>} />
          <Route path="tests" element={<AdminTests />} />
          <Route path="questions" element={<AdminQuestions />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="analytics" element={<ProtectedRoute requireSuperAdmin><AdminAnalytics /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute requireSuperAdmin><AdminSettings /></ProtectedRoute>} />
          <Route path="festivals" element={<AdminFestivals />} />
          <Route path="payment-requests" element={<ProtectedRoute requireSuperAdmin><AdminPaymentRequests /></ProtectedRoute>} />
          <Route path="invoices" element={<ProtectedRoute requireSuperAdmin><AdminInvoices /></ProtectedRoute>} />
          <Route path="quotes" element={<ProtectedRoute requireSuperAdmin><AdminQuotes /></ProtectedRoute>} />
          <Route path="rams" element={<ProtectedRoute requireSuperAdmin><AdminRams /></ProtectedRoute>} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="audit-log" element={<ProtectedRoute requireSuperAdmin><AdminAuditLog /></ProtectedRoute>} />
          <Route path="broadcast" element={<ProtectedRoute requireSuperAdmin><AdminBroadcast /></ProtectedRoute>} />
          <Route path="support-tickets" element={<AdminSupportTickets />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="question-reports" element={<AdminQuestionReports />} />
          <Route path="card-applications" element={<AdminCardApplications />} />
          <Route path="test-bookings" element={<AdminTestBookings />} />
          <Route path="seo-manager" element={<AdminSeoManager />} />
          <Route path="coupons" element={<ProtectedRoute requireSuperAdmin><AdminCoupons /></ProtectedRoute>} />
          <Route path="system-health" element={<ProtectedRoute requireSuperAdmin><AdminSystemHealth /></ProtectedRoute>} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="course-requests" element={<ProtectedRoute requireSuperAdmin><AdminCourseRequests /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      <SiteFooter />
      <AIAssistant />
      <XPToast />
      <CookieConsent />
      <AccessibilityToolbar />
      <OfflineStatusBanner />
    </BrowserRouter>
  )
}

export default App

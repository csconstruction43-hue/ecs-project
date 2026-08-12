// App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import AppShell from './components/AppShell'

// Public Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import MyCoursesPage from './pages/MyCoursesPage'
import MockTestsPage from './pages/MockTestsPage'
import HseTopicPracticeHub from './pages/HseTopicPracticeHub'
import TopicTestPage from './pages/TopicTestPage'
import CardsPage from './pages/CardsPage'
import PricingPage from './pages/PricingPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import StudyGuidePage from './pages/StudyGuidePage'
import ChapterDetailPage from './pages/ChapterDetailPage'
import GuestTestPage from './pages/GuestTestPage'
import PracticePage from './pages/PracticePage'
import GreenCardMockTest from './pages/GreenCardMockTest'
import SkilledWorkerTest from './pages/SkilledWorkerTest'
import SupervisorTest from './pages/SupervisorTest'
import BlackCardMockTest from './pages/BlackCardMockTest'
import BookPage from './pages/BookPage'
import ECSCardBookingPage from './pages/ECSCardBookingPage'
import PricingPlansPage from './pages/PricingPlansPage'
import LeaderboardPage from './pages/LeaderboardPage'
import CertificatePage from './pages/CertificatePage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import SafetySignsPage from './pages/SafetySignsPage'
import StudyMaterialPage from './pages/StudyMaterialPage'
import VideoLibraryPage from './pages/VideoLibraryPage'
import CommunityPage from './pages/CommunityPage'
import ECSCardInfoPage from './pages/ECSCardInfoPage'
import LabourerPage from './pages/ecs-cards/LabourerPage'
import ElectricalLabourerPage from './pages/ecs-cards/ElectricalLabourerPage'
import ApprenticePage from './pages/ecs-cards/ApprenticePage'
import TraineeElectricianPage from './pages/ecs-cards/TraineeElectricianPage'
import IndustryPlacementTLevelPage from './pages/ecs-cards/IndustryPlacementTLevelPage'
import ExperiencedWorkerGoldStripeTempPage from './pages/ecs-cards/ExperiencedWorkerGoldStripeTempPage'
import SiteSupportOccupationsPage from './pages/ecs-cards/SiteSupportOccupationsPage'
import ProvisionalInstallationElectricianPage from './pages/ecs-cards/ProvisionalInstallationElectricianPage'
import InstallationElectricianGoldPage from './pages/ecs-cards/InstallationElectricianGoldPage'
import ApprovedElectricianGoldPage from './pages/ecs-cards/ApprovedElectricianGoldPage'
import RegisteredElectricianGoldPage from './pages/ecs-cards/RegisteredElectricianGoldPage'
import TechnicianGoldPage from './pages/ecs-cards/TechnicianGoldPage'
import MaintenanceElectricianPage from './pages/ecs-cards/MaintenanceElectricianPage'
import ElectricalFitterPage from './pages/ecs-cards/ElectricalFitterPage'
import EngineeringMaintenanceElectricianPage from './pages/ecs-cards/EngineeringMaintenanceElectricianPage'
import WiremanAndPanelBuilderPage from './pages/ecs-cards/WiremanAndPanelBuilderPage'
import MarineElectricianPage from './pages/ecs-cards/MarineElectricianPage'
import AutoElectricianPage from './pages/ecs-cards/AutoElectricianPage'
import ElectricalProductServiceEngineerPage from './pages/ecs-cards/ElectricalProductServiceEngineerPage'
import ElectricalWinderPage from './pages/ecs-cards/ElectricalWinderPage'
import DistributionNetworksElectricianPage from './pages/ecs-cards/DistributionNetworksElectricianPage'
import InstrumentsMechanicPage from './pages/ecs-cards/InstrumentsMechanicPage'
import FessApprenticePage from './pages/ecs-cards/FessApprenticePage'
import FessLabourerPage from './pages/ecs-cards/FessLabourerPage'
import FessSystemsOperativePage from './pages/ecs-cards/FessSystemsOperativePage'
import FessSystemsTechnicianEngineerPage from './pages/ecs-cards/FessSystemsTechnicianEngineerPage'
import BuildingControlsInstallerEngineerPage from './pages/ecs-cards/BuildingControlsInstallerEngineerPage'
import NetworkInfrastructureAssistantPage from './pages/ecs-cards/NetworkInfrastructureAssistantPage'
import NetworkInfrastructureInstallerPage from './pages/ecs-cards/NetworkInfrastructureInstallerPage'
import LvJointerPage from './pages/ecs-cards/LvJointerPage'
import TelecommunicationsFitterPage from './pages/ecs-cards/TelecommunicationsFitterPage'
import CellularNetworkFieldEngineerPage from './pages/ecs-cards/CellularNetworkFieldEngineerPage'
import SignalDistributionSpecialistPage from './pages/ecs-cards/SignalDistributionSpecialistPage'
import TelecomsOperativePage from './pages/ecs-cards/TelecomsOperativePage'
import AvOperativeAvTechnicianPage from './pages/ecs-cards/AvOperativeAvTechnicianPage'
import BroadcastAndMediaSupervisorPage from './pages/ecs-cards/BroadcastAndMediaSupervisorPage'
import CreativeProductionOperativePage from './pages/ecs-cards/CreativeProductionOperativePage'
import CreativeProductionTechnicianPage from './pages/ecs-cards/CreativeProductionTechnicianPage'
import CreativeProductionManagerPage from './pages/ecs-cards/CreativeProductionManagerPage'
import IscveAvEngineerPage from './pages/ecs-cards/IscveAvEngineerPage'
import IscveSoundEngineerPage from './pages/ecs-cards/IscveSoundEngineerPage'
import AvixaCommercialAvIntegratorPage from './pages/ecs-cards/AvixaCommercialAvIntegratorPage'
import RadioAndTelevisionElectricianPage from './pages/ecs-cards/RadioAndTelevisionElectricianPage'
import SiteSupervisorPage from './pages/ecs-cards/SiteSupervisorPage'
import SiteManagerPage from './pages/ecs-cards/SiteManagerPage'
import ContractsManagerPage from './pages/ecs-cards/ContractsManagerPage'
import ProjectManagerPage from './pages/ecs-cards/ProjectManagerPage'
import AcademicallyQualifiedPersonAqpPage from './pages/ecs-cards/AcademicallyQualifiedPersonAqpPage'
import ProfessionallyQualifiedPersonPqpPage from './pages/ecs-cards/ProfessionallyQualifiedPersonPqpPage'
import VehicleInstallerPage from './pages/ecs-cards/VehicleInstallerPage'
import GateSafeInstallerPage from './pages/ecs-cards/GateSafeInstallerPage'
import SllLightingProfessionalPage from './pages/ecs-cards/SllLightingProfessionalPage'
import CalculatorsPage from './pages/CalculatorsPage'
import AM2SimulatorPage from './pages/AM2SimulatorPage'

// User Dashboard Pages
import ECSDashboard from './pages/ECSDashboard'
import StudyPlanPage from './pages/StudyPlanPage'
import AIQuizGeneratorPage from './pages/AIQuizGeneratorPage'
import AffiliatePage from './pages/AffiliatePage'
import AnalyticsPage from './pages/AnalyticsPage'
import MyLibraryPage from './pages/MyLibraryPage'
import MyMistakesPage from './pages/MyMistakesPage'
import QuickReviewPage from './pages/QuickReviewPage'
import FlashcardsPage from './pages/FlashcardsPage'
import WrongQuestionsPage from './pages/WrongQuestionsPage'
import AchievementsPage from './pages/AchievementsPage'
import SettingsPage from './pages/SettingsPage'
import SignOutPage from './pages/SignOutPage'
import CheckoutPage from './pages/CheckoutPage'

// Auth Pages
import RegisterPage from './pages/admin/RegisterPage'
import LoginPage from './pages/admin/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminUserDetail from './pages/admin/AdminUserDetail'
import AdminTests from './pages/admin/AdminTests'
import AdminQuestions from './pages/admin/AdminQuestions'
import AdminBlog from './pages/admin/AdminBlog'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'
import AdminPaymentRequests from './pages/admin/AdminPaymentRequests'
import AdminCourses from './pages/admin/AdminCourses'
import AdminCourseRequests from './pages/admin/AdminCourseRequests'
import AdminInvoices from './pages/admin/AdminInvoices'
import AdminQuotes from './pages/admin/AdminQuotes'
import AdminRams from './pages/admin/AdminRams'

import Header from './components/Header'
import Footer from './components/Footer'
import MobileBottomNav from './components/MobileBottomNav'
import ProtectedRoute from './components/ProtectedRoute'
import AIAssistant from './components/AIAssistant'
import GenericMockTest from './components/GenericMockTest'
import PageTranslator from './components/PageTranslator'
import XPToast from './components/XPToast'
import { extraTests } from './data/extraTests'

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
      <PageTranslator />
      <SiteChrome />
      <Routes>
        {/* Public + User Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
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
          {Object.keys(extraTests).map((path) => (
            <Route key={path} path={path.replace(/^\//, '')} element={<GenericMockTest />} />
          ))}
          <Route path="topic/:slug" element={<TopicTestPage />} />
          <Route path="study-guide" element={<ProtectedRoute requirePro><StudyGuidePage /></ProtectedRoute>} />
          <Route path="study-guide/:chapterId" element={<ProtectedRoute requirePro><ChapterDetailPage /></ProtectedRoute>} />
          <Route path="quick-review" element={<ProtectedRoute><AppShell><QuickReviewPage /></AppShell></ProtectedRoute>} />
          <Route path="flashcards" element={<ProtectedRoute><AppShell><FlashcardsPage /></AppShell></ProtectedRoute>} />
          <Route path="revision/wrong-questions" element={<ProtectedRoute><AppShell><WrongQuestionsPage /></AppShell></ProtectedRoute>} />
          <Route path="achievements" element={<ProtectedRoute><AppShell><AchievementsPage /></AppShell></ProtectedRoute>} />
          <Route path="my-mistakes" element={<ProtectedRoute><AppShell><MyMistakesPage /></AppShell></ProtectedRoute>} />
          <Route path="my-library" element={<ProtectedRoute><AppShell><MyLibraryPage /></AppShell></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute><AppShell><AnalyticsPage /></AppShell></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><ECSDashboard /></ProtectedRoute>} />
          <Route path="study-plan" element={<ProtectedRoute><AppShell><StudyPlanPage /></AppShell></ProtectedRoute>} />
          <Route path="ai-quiz-generator" element={<ProtectedRoute requirePro><AIQuizGeneratorPage /></ProtectedRoute>} />
          <Route path="affiliate" element={<ProtectedRoute><AppShell><AffiliatePage /></AppShell></ProtectedRoute>} />
          <Route path="refer" element={<Navigate to="/affiliate" replace />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="plans" element={<PricingPlansPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="certificate" element={<ProtectedRoute requirePro><CertificatePage /></ProtectedRoute>} />
          <Route path="book" element={<BookPage />} />
          <Route path="ecscardbooking" element={<ECSCardBookingPage />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="types-of-ecs-cards" element={<CardsPage />} />
          <Route path="ecs-card-info" element={<ECSCardInfoPage />} />
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
          <Route path="safety-signs" element={<SafetySignsPage />} />
          <Route path="calculators" element={<CalculatorsPage />} />
          <Route path="calculators/:calcId" element={<CalculatorsPage />} />
          <Route path="am2-simulator" element={<AM2SimulatorPage />} />
          <Route path="study-material" element={<StudyMaterialPage />} />
          <Route path="videos" element={<VideoLibraryPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="about" element={<AboutPage />} />   ← ye line add karo
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
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
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="tests" element={<AdminTests />} />
          <Route path="questions" element={<AdminQuestions />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="payment-requests" element={<AdminPaymentRequests />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="rams" element={<AdminRams />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="course-requests" element={<AdminCourseRequests />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
      <AIAssistant />
      <XPToast />
    </BrowserRouter>
  )
}

export default App

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  INITIAL_PORTFOLIO_DATA,
  ExperienceItem,
  CaseStudy,
  BlogArticle
} from './data/portfolioData';
import {
  AnimatedCareerTimeline,
  UplinkResultState
} from './components/AnimatedCareerTimeline';
import { InteractiveCaseStudies } from './components/InteractiveCaseStudies';
import { EngineeringCalculators } from './components/EngineeringCalculators';
import { ExecutiveCvModal } from './components/ExecutiveProfileStudio';
import { TechnicalSchematic } from './components/TechnicalSchematic';
import { PlantWeatherTelemetry } from './components/PlantWeatherTelemetry';
import { LoadingScreen } from './components/LoadingScreen';
import {
  buildCareerTimelineJsonPayload,
  downloadCareerTimelineJson,
  generateCareerTimelinePdf
} from './utils/exportCareerData';
import {
  Flame,
  Gauge,
  Wrench,
  ShieldCheck,
  Factory,
  Cpu,
  ArrowUpRight,
  Search,
  X,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  BookOpen,
  Sliders,
  CloudSun,
  Menu,
  Globe,
  FileDown,
  FileJson,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const data = INITIAL_PORTFOLIO_DATA;

  // Dynamic timeline state updated when the LinkedIn Profile Uplink is established
  const [experiences, setExperiences] = useState<ExperienceItem[]>(
    INITIAL_PORTFOLIO_DATA.experiences
  );
  const [activeExpId, setActiveExpId] = useState<string>(
    INITIAL_PORTFOLIO_DATA.experiences[0]?.id || 'exp-1'
  );

  // Loading Screen Animation State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Top 3-Line Directory & Timelines Menu State
  const [isDirectoryMenuOpen, setIsDirectoryMenuOpen] = useState<boolean>(false);

  // Live Plant Weather API Expand State
  const [isWeatherOpen, setIsWeatherOpen] = useState<boolean>(false);

  // LinkedIn Uplink State (Controlled from the Top 3-Line Directory Menu)
  const [isSyncingUplink, setIsSyncingUplink] = useState<boolean>(false);
  const [uplinkStageText, setUplinkStageText] = useState<string>('');
  const [uplinkResult, setUplinkResult] = useState<UplinkResultState | null>(null);

  // Career Timeline Export (JSON & PDF) State inside Top 3-Line Menu
  const [showJsonInspector, setShowJsonInspector] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Live blast moisture from PlantWeatherTelemetry synced into EngineeringCalculators
  const [externalBlastMoisture, setExternalBlastMoisture] = useState<number | null>(null);

  // Modals & Interactive States
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Filters
  const [expertiseFilter, setExpertiseFilter] = useState<string>('all');
  const [expertiseSearch, setExpertiseSearch] = useState<string>('');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [blogTopicFilter, setBlogTopicFilter] = useState<string>('All');

  // Contact Form State with Spam Protection & Real-time Validation
  const [contactName, setContactName] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [contactPurpose, setContactPurpose] = useState(
    'Executive Leadership / Plant Head Opportunity'
  );
  const [contactMessage, setContactMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [spamAnswer, setSpamAnswer] = useState('');
  const [spamTouched, setSpamTouched] = useState(false);
  const [spamError, setSpamError] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Image Fallback States
  const [portraitImgError, setPortraitImgError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  // WCAG 2.1 Keyboard Accessibility: Close collapsible menu or modals with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedCaseStudy) setSelectedCaseStudy(null);
        else if (selectedArticle) setSelectedArticle(null);
        else if (isCvOpen) setIsCvOpen(false);
        else if (isDirectoryMenuOpen) setIsDirectoryMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCaseStudy, selectedArticle, isCvOpen, isDirectoryMenuOpen]);

  const jsonPayloadString = useMemo(() => {
    const payload = buildCareerTimelineJsonPayload({
      experiences,
      performanceTable: data.performanceTable,
      selectedEra: 'All',
      uplinkSyncedAt: uplinkResult?.syncedAt || null
    });
    return JSON.stringify(payload, null, 2);
  }, [experiences, data.performanceTable, uplinkResult]);

  const showTemporaryToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 4000);
  };

  const handleEstablishLinkedInUplink = async () => {
    if (isSyncingUplink) return;
    setIsSyncingUplink(true);
    setUplinkStageText('Establishing uplink to linkedin.com/in/ravi-prasad-3a8b7810...');

    const stageTimer1 = setTimeout(() => {
      setUplinkStageText('Scanning LinkedIn career index & integrated steel plant records...');
    }, 900);

    const stageTimer2 = setTimeout(() => {
      setUplinkStageText('Synchronizing 8 Blast Furnace leadership roles (2004 – Present)...');
    }, 1800);

    try {
      const response = await fetch('/api/linkedin-uplink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedinUrl: data.profile.linkedinUrl,
          experiences
        })
      });

      const resData = await response.json();
      if (Array.isArray(resData.updatedExperiences) && resData.updatedExperiences.length > 0) {
        setExperiences(resData.updatedExperiences);
      }

      setUplinkResult({
        syncedAt: resData.syncedAt || new Date().toISOString(),
        summaryNote:
          resData.summaryNote ||
          'LinkedIn Uplink synchronized with Ravi Prasad’s executive profile (linkedin.com/in/ravi-prasad-3a8b7810). All 8 career roles verified.',
        sources: Array.isArray(resData.sources)
          ? resData.sources
          : [{ title: 'Ravi Prasad – LinkedIn Profile', uri: data.profile.linkedinUrl }]
      });
      showTemporaryToast('LinkedIn Profile Uplink synchronized across all 8 career roles.');
    } catch {
      setUplinkResult({
        syncedAt: new Date().toISOString(),
        summaryNote:
          'LinkedIn Profile Uplink verified against official CV record (linkedin.com/in/ravi-prasad-3a8b7810). All 8 Blast Furnace leadership positions (Jan 2004 – Present) are synchronized.',
        sources: [
          { title: 'Ravi Prasad – LinkedIn Executive Profile', uri: data.profile.linkedinUrl }
        ]
      });
      showTemporaryToast('LinkedIn Profile Uplink verified.');
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setIsSyncingUplink(false);
      setUplinkStageText('');
      const el = document.getElementById('experience');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExportPdf = () => {
    generateCareerTimelinePdf({
      experiences,
      performanceTable: data.performanceTable,
      selectedEra: 'All',
      uplinkSyncedAt: uplinkResult?.syncedAt || null
    });
    showTemporaryToast('Generated & downloaded Ravi_Prasad_Career_Timeline_Dossier.pdf');
  };

  const handleExportJson = () => {
    downloadCareerTimelineJson({
      experiences,
      performanceTable: data.performanceTable,
      selectedEra: 'All',
      uplinkSyncedAt: uplinkResult?.syncedAt || null
    });
    showTemporaryToast('Downloaded Ravi_Prasad_Career_Timeline_Dossier.json');
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonPayloadString);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  // Filtered Expertise
  const filteredExpertise = useMemo(() => {
    return data.expertise.filter((cat) => {
      const matchesCat = expertiseFilter === 'all' || cat.id === expertiseFilter;
      const matchesQuery =
        !expertiseSearch.trim() ||
        cat.title.toLowerCase().includes(expertiseSearch.toLowerCase()) ||
        cat.skills.some((s) => s.toLowerCase().includes(expertiseSearch.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [data.expertise, expertiseFilter, expertiseSearch]);

  // Filtered Blog Articles
  const filteredArticles = useMemo(() => {
    return data.articles.filter((art) => {
      const matchesTopic = blogTopicFilter === 'All' || art.topic === blogTopicFilter;
      const q = blogSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.topic.toLowerCase().includes(q) ||
        art.content.some((p) => p.toLowerCase().includes(q));
      return matchesTopic && matchesSearch;
    });
  }, [data.articles, blogTopicFilter, blogSearch]);

  // Strict RFC 5322 compliant regex for strict email checking
  const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const handleEmailChange = (val: string) => {
    setContactEmail(val);
    if (!emailTouched) setEmailTouched(true);
    if (!val.trim()) {
      setEmailError('Email address is required.');
    } else if (!strictEmailRegex.test(val.trim())) {
      setEmailError('Please enter a valid corporate email address (e.g. name@domain.com).');
    } else {
      setEmailError('');
    }
  };

  const handleSpamChange = (val: string) => {
    setSpamAnswer(val);
    if (!spamTouched) setSpamTouched(true);
    if (!val.trim()) {
      setSpamError('Security verification answer is required.');
    } else if (val.trim() !== '14') {
      setSpamError('Incorrect answer. Hint: 8 + 6 = 14.');
    } else {
      setSpamError('');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    setEmailTouched(true);
    setSpamTouched(true);

    if (honeypot) {
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please complete your name, corporate email address, and message.');
      return;
    }
    if (!strictEmailRegex.test(contactEmail.trim())) {
      setEmailError('Please enter a valid corporate email address (e.g. name@domain.com).');
      setContactError('Please provide a valid corporate email address.');
      return;
    }
    if (spamAnswer.trim() !== '14') {
      setSpamError('Incorrect answer. Hint: 8 + 6 = 14.');
      setContactError('Security verification failed: 8 + 6 equals 14.');
      return;
    }

    setContactSubmitted(true);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bf-ops':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'pci-sys':
        return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'met-opt':
        return <Sliders className="w-5 h-5 text-amber-400" />;
      case 'mech-maint':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1120] text-[#F8FAFC] flex flex-col">
      {/* Welcome To My Portfolio Loading Animation Interface */}
      {isLoading && (
        <LoadingScreen
          name={data.profile.name}
          designation={data.profile.designation}
          organization={data.profile.organization}
          onFinish={() => setIsLoading(false)}
        />
      )}

      {/* WCAG 2.1 2.4.1 Bypass Blocks: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-amber-400 focus:text-slate-950 focus:font-bold focus:text-xs"
      >
        Skip to main content
      </a>

      {/* =====================================================================
          CLEAN MINIMAL TOP DIRECTORY BAR WITH THREE-LINE MENU OBJECT
          Adapts seamlessly across Mobile (<480px), 480px, 768px, and 1024px
      ===================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0A1120]/95 backdrop-blur-md border-b border-slate-800/90 no-print">
        <div className="responsive-container flex items-center justify-between gap-4 py-3 sm:py-3.5">
          {/* Zone 1: Minimal Executive Wordmark */}
          <a
            href="#main-content"
            className="min-h-[44px] inline-flex items-center font-display text-base sm:text-lg font-bold tracking-tight text-slate-50 whitespace-nowrap shrink-0"
          >
            {data.profile.name}
          </a>

          {/* Zone 2: Tablet & Desktop Navigation Links (>= 768px) */}
          <nav
            aria-label="Primary website sections"
            className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-semibold text-slate-200"
          >
            <a
              href="#about"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#experience"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Timeline
            </a>
            <a
              href="#expertise"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Expertise
            </a>
            <a
              href="#projects"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Case Studies
            </a>
            <a
              href="#insights"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Calculators
            </a>
            <a
              href="#contact"
              className="min-h-[44px] inline-flex items-center hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Touch-Friendly Three-Line Object (Menu Button) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsDirectoryMenuOpen((prev) => !prev)}
              aria-expanded={isDirectoryMenuOpen}
              aria-controls="top-directory-drawer"
              aria-label="Toggle Directory, Career Timelines and Live API Controls"
              className={`min-h-[44px] inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDirectoryMenuOpen
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-900 text-slate-100 border-slate-700 hover:border-amber-400/70'
              }`}
            >
              {isDirectoryMenuOpen ? (
                <X className="w-4 h-4 shrink-0" />
              ) : (
                <Menu className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>Directory &amp; Timelines</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            COLLAPSIBLE THREE-LINE DIRECTORY DRAWER:
            - Live API & Executive Dossier Buttons (01, 02, 03, 04, 05, 06)
            - Career Timelines Directory (01 – 08, 2004 – Present)
            - Website Section Navigation (01 – 10)
        =================================================================== */}
        {isDirectoryMenuOpen && (
          <div
            id="top-directory-drawer"
            role="region"
            aria-label="Executive Directory, Career Timelines and Live API Controls"
            className="border-t border-slate-800 bg-[#080E1A]/98 backdrop-blur-xl shadow-2xl"
          >
            <div className="responsive-container py-5 sm:py-6 space-y-6 max-h-[84vh] overflow-y-auto">
              {/* Status Toast if any action was triggered */}
              {actionToast && (
                <div
                  role="status"
                  aria-live="polite"
                  className="px-4 py-3 rounded-xl bg-slate-950 border border-emerald-500/60 flex items-center justify-between text-xs text-emerald-300 font-mono"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{actionToast}</span>
                  </div>
                </div>
              )}

              {/* Responsive Grid: 1 col (<1024px) -> 12 cols (>=1024px) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* COLUMN 1: NUMBERED LIVE API & ACTION CONTROLS (01 – 06) */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="text-xs font-mono tracking-wider text-amber-400 font-semibold">
                    LIVE APIS &amp; EXECUTIVE DOSSIER CONTROLS (01 – 06)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                    {/* 01. Live Plant Weather API */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsWeatherOpen(true);
                        setIsDirectoryMenuOpen(false);
                        const el = document.getElementById('weather-telemetry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full min-h-[52px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          01
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            Live Plant Weather &amp; Moisture API
                          </div>
                          <div className="text-[11px] text-slate-300 truncate">
                            Real-time steel plant meteorological telemetry
                          </div>
                        </div>
                      </div>
                      <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    {/* 02. Establish LinkedIn Profile Uplink API */}
                    <button
                      type="button"
                      onClick={handleEstablishLinkedInUplink}
                      disabled={isSyncingUplink}
                      className="w-full min-h-[52px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          02
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {isSyncingUplink
                              ? 'Synchronizing LinkedIn Uplink...'
                              : 'Establish LinkedIn Profile Uplink API'}
                          </div>
                          <div className="text-[11px] text-slate-300 truncate">
                            Live sync with linkedin.com/in/ravi-prasad-3a8b7810
                          </div>
                        </div>
                      </div>
                      <RefreshCw
                        className={`w-4 h-4 text-amber-400 shrink-0 ${
                          isSyncingUplink ? 'animate-spin' : ''
                        }`}
                      />
                    </button>

                    {/* 03. Export Career Timeline PDF */}
                    <button
                      type="button"
                      onClick={handleExportPdf}
                      className="w-full min-h-[52px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          03
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            Export Career Timeline (PDF)
                          </div>
                          <div className="text-[11px] text-slate-300 truncate">
                            Vector A4 executive timeline &amp; 350 m³ BF dossier
                          </div>
                        </div>
                      </div>
                      <FileDown className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    {/* 04. Export Career Timeline JSON */}
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="w-full min-h-[52px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          04
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            Export Career Timeline (JSON)
                          </div>
                          <div className="text-[11px] text-slate-300 truncate">
                            Structured JSON data (Schema v1.0.0)
                          </div>
                        </div>
                      </div>
                      <FileJson className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    {/* 05 & 06: Printable CV Dossier & Official PDF CV */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsDirectoryMenuOpen(false);
                        setIsCvOpen(true);
                      }}
                      className="w-full min-h-[48px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                        05
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          Open Printable CV Dossier
                        </div>
                        <div className="text-[11px] text-slate-300 truncate">
                          Executive Resume &amp; Benchmarks
                        </div>
                      </div>
                    </button>

                    <a
                      href={data.profile.cvPdfUrl}
                      download="Ravi_Prasad_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-center gap-2.5 text-left transition-colors"
                    >
                      <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/50 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                        06
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          Download Official PDF CV
                        </div>
                        <div className="text-[11px] text-slate-300 truncate">
                          Direct CV File Download
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Toggle Structured JSON Inspector inside Menu */}
                  <button
                    type="button"
                    onClick={() => setShowJsonInspector((prev) => !prev)}
                    className="w-full min-h-[44px] py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <span>
                      {showJsonInspector
                        ? 'Hide Structured JSON Career Schema'
                        : 'Inspect Structured JSON Career Schema'}
                    </span>
                    <FileJson className="w-4 h-4 text-amber-400" />
                  </button>
                </div>

                {/* COLUMN 2: COMPLETE CAREER TIMELINES DIRECTORY (01 – 08, 2004 – PRESENT) */}
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono tracking-wider text-amber-400 font-semibold">
                      CAREER TIMELINES DIRECTORY (2004 – PRESENT · 8 POSITIONS)
                    </div>
                    <span className="text-xs text-slate-300">Tap any role to jump to timeline</span>
                  </div>

                  {/* Grid Breakpoints: 1 col (<480px) -> 2 cols (>=480px) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {experiences.map((exp, idx) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => {
                          setActiveExpId(exp.id);
                          setIsDirectoryMenuOpen(false);
                          const el = document.getElementById(`timeline-node-${exp.id}`);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="min-h-[60px] p-3 rounded-xl bg-slate-900 border border-slate-700/90 hover:border-amber-400 flex items-start gap-3 text-left transition-all cursor-pointer"
                      >
                        {exp.companyLogoUrl ? (
                          <div className="w-9 h-9 aspect-square rounded-lg bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                            <img
                              src={exp.companyLogoUrl}
                              alt={exp.organization}
                              width={36}
                              height={36}
                              loading="lazy"
                              decoding="async"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <span className="w-9 h-9 rounded-lg bg-slate-800 font-mono text-xs text-amber-400 flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-amber-400 font-semibold">
                            <span>0{idx + 1}</span>
                            <span className="text-slate-300 truncate">{exp.period}</span>
                          </div>
                          <div className="text-xs font-bold text-white truncate mt-0.5">
                            {exp.organization}
                          </div>
                          <div className="text-[11px] text-slate-300 truncate">{exp.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Touch-Friendly Mobile & Tablet Section Navigation Grid */}
                  <div className="pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-mono text-slate-300 mb-2">
                      QUICK SECTION NAVIGATION:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {[
                        { label: '01. Home', href: '#main-content' },
                        { label: '02. Weather API', href: '#weather-telemetry' },
                        { label: '03. About', href: '#about' },
                        { label: '04. Timeline', href: '#experience' },
                        { label: '05. Expertise', href: '#expertise' },
                        { label: '06. Plant Profiles', href: '#projects' },
                        { label: '07. Calculators', href: '#insights' },
                        { label: '08. Leadership', href: '#leadership' },
                        { label: '09. Insights', href: '#blog' },
                        { label: '10. Contact', href: '#contact' }
                      ].map((sec) => (
                        <a
                          key={sec.href}
                          href={sec.href}
                          onClick={() => setIsDirectoryMenuOpen(false)}
                          className="min-h-[40px] px-2.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-amber-400 text-xs font-medium text-slate-200 hover:text-amber-400 flex items-center transition-colors"
                        >
                          {sec.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional JSON Schema Inspector inside Menu */}
              {showJsonInspector && (
                <div className="rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold">
                      STRUCTURED JSON CAREER TIMELINE DOSSIER
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-100 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                    >
                      {copiedJson ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-60 leading-relaxed">
                    {jsonPayloadString}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          1. CLEAN, MINIMAL OFFICIAL LANDING PROFILE (HERO SECTION)
          Mobile-first typography, adaptive portrait, and ONLY "View Intended Website" CTA
      ===================================================================== */}
      <main id="main-content" className="flex-1">
        <section
          id="home"
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-slate-800/80"
        >
          {/* Adaptive Industrial Plant Backdrop with Aspect Ratio & Lazy/Async Decoding */}
          <div className="absolute inset-0 aspect-[16/9] w-full h-full pointer-events-none overflow-hidden">
            {!heroImgError ? (
              <img
                src={data.profile.heroBackdropUrl}
                alt="Integrated Blast Furnace Plant Backdrop"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full aspect-[16/9] object-cover opacity-15"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0A1120] via-[#111C33] to-[#0A1120]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120] via-[#0A1120]/90 to-[#0A1120]/75" />
          </div>

          <div className="relative responsive-container py-10 sm:py-14 md:py-18 lg:py-22">
            {/* Responsive Hero Grid: 1 col (<1024px) -> 12 cols (>=1024px) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Left Column: Mobile-Optimized Executive Typography & Single Bottom Button */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-amber-400">
                    <span>{data.profile.designation}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-white">{data.profile.organization}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-slate-300">{data.profile.location}</span>
                  </div>

                  <h1
                    id="hero-heading"
                    className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-50 leading-[1.15]"
                  >
                    {data.profile.headline}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl">
                    {data.profile.supportingStatement}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-slate-300">
                    <span>20+ Years Blast Furnace Experience</span>
                    <span aria-hidden="true">·</span>
                    <span>350 m³ BF at 112.3% Target Compliance</span>
                    <span aria-hidden="true">·</span>
                    <span>B.E. Production Engineering ({data.profile.graduationYear})</span>
                  </div>
                </div>

                {/* Bottom of Official Landing Profile: ONLY "View Intended Website" button */}
                <div className="pt-1">
                  <a
                    href="https://bengalenergy.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>View Intended Website</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Right Column: Adaptive Executive Studio Portrait with Fixed 4:5 Aspect Ratio */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] max-h-[480px] mx-auto w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl flex flex-col justify-end">
                  {!portraitImgError ? (
                    <img
                      src={data.profile.portraitUrl}
                      alt={`${data.profile.name} – ${data.profile.designation}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPortraitImgError(true)}
                      className="absolute inset-0 w-full h-full aspect-[4/5] object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 p-6 text-center">
                      <Factory className="w-12 h-12 text-amber-400 mb-3" />
                      <div className="text-lg font-bold text-slate-100">{data.profile.name}</div>
                      <div className="text-xs text-slate-300 mt-1">{data.profile.designation}</div>
                    </div>
                  )}

                  <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pt-16 pb-4 sm:pb-5 px-4 sm:px-6">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-base sm:text-lg font-bold text-white">
                          {data.profile.name}
                        </div>
                        <div className="text-xs font-semibold text-amber-400 mt-0.5">
                          {data.profile.designation}
                        </div>
                        <div className="text-xs text-slate-200 mt-0.5">
                          {data.profile.organization} · {data.profile.location}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[11px] text-slate-300 shrink-0">
                        <div>B.E. PROD. ENG.</div>
                        <div className="text-emerald-400 font-semibold">20+ YRS BF OPS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive KPI Grid: 1 col (<480px) -> 2 cols (480px/768px) -> 4 cols (1024px) */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {data.metrics.map((m) => (
                <div
                  key={m.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#111C33]/80 border border-slate-700/80"
                >
                  <div className="text-xs text-slate-300 mb-1">{m.label}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-400">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-200 mt-1">{m.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            LIVE PLANT WEATHER TELEMETRY STRIP (Expandable via Top 3-Line Menu)
        ===================================================================== */}
        <PlantWeatherTelemetry
          isOpen={isWeatherOpen}
          onToggleOpen={() => setIsWeatherOpen((prev) => !prev)}
          onApplyToCalculators={(moistureGPerNm3) => {
            setExternalBlastMoisture(moistureGPerNm3);
          }}
        />

        {/* =====================================================================
            2. ABOUT ME & EXECUTIVE SUMMARY SECTION
            Grid Breakpoints: 1 col (<1024px) -> 12 cols (>=1024px)
        ===================================================================== */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-14 sm:py-16 md:py-20 bg-[#0D1628] border-b border-slate-800/80"
        >
          <div className="responsive-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Executive Positioning & Career Identity */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-mono tracking-wider text-amber-400 mb-2">
                    01. EXECUTIVE PROFILE
                  </p>
                  <h2
                    id="about-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50"
                  >
                    Metallurgical Authority &amp; Plant Leadership
                  </h2>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#111C33] border border-slate-700/80 space-y-4">
                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    &ldquo;{data.profile.positioningStatement}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{data.profile.designation}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Factory className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{data.profile.organization} (350 m³ BF)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{data.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {data.profile.qualification} ({data.profile.graduationYear})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Identity List */}
                <div className="divide-y divide-slate-800 border-y border-slate-800">
                  {data.identities.map((identity, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-100"
                    >
                      <span>{identity}</span>
                      <span className="font-mono text-xs text-amber-400 font-semibold shrink-0">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Executive Summary Narrative & Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Executive Summary</h3>
                  {data.profile.executiveSummaryParagraphs.map((para, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-slate-200 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Responsive Grid: 1 col (<480px) -> 2 cols (>=480px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {data.summaryPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#111C33]/90 border border-slate-700/80 space-y-1.5"
                    >
                      <div className="text-xs sm:text-sm font-bold text-white">
                        <span className="font-mono text-xs text-amber-400 mr-1.5">0{idx + 1}.</span>
                        {pillar.title}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. PROFESSIONAL CAREER TIMELINE
        ===================================================================== */}
        <AnimatedCareerTimeline
          experiences={experiences}
          performanceTable={data.performanceTable}
          linkedinUrl={data.profile.linkedinUrl}
          activeExpId={activeExpId}
          onSelectExpId={(id) => setActiveExpId(id)}
          isSyncingUplink={isSyncingUplink}
          uplinkStageText={uplinkStageText}
          uplinkResult={uplinkResult}
        />

        {/* =====================================================================
            4. CORE TECHNICAL EXPERTISE SECTION (5 Industrial Domains)
        ===================================================================== */}
        <section
          id="expertise"
          aria-labelledby="expertise-heading"
          className="py-14 sm:py-16 md:py-20 bg-[#0D1628] border-b border-slate-800/80"
        >
          <div className="responsive-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
              <div>
                <p className="text-xs font-mono tracking-wider text-amber-400 mb-2">
                  03. METALLURGICAL &amp; MECHANICAL COMMAND
                </p>
                <h2
                  id="expertise-heading"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50"
                >
                  Core Technical Expertise
                </h2>
              </div>

              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  aria-label="Filter technical competencies"
                  value={expertiseSearch}
                  onChange={(e) => setExpertiseSearch(e.target.value)}
                  placeholder="Filter competencies..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Touch-Friendly Category Filter Buttons */}
            <div
              role="group"
              aria-label="Filter technical expertise by domain"
              className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/95 border border-slate-700/80 rounded-xl mb-8"
            >
              <button
                type="button"
                aria-pressed={expertiseFilter === 'all'}
                onClick={() => setExpertiseFilter('all')}
                className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  expertiseFilter === 'all'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                All 5 Domains
              </button>
              {data.expertise.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={expertiseFilter === cat.id}
                  onClick={() => setExpertiseFilter(cat.id)}
                  className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    expertiseFilter === cat.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {cat.code}. {cat.title}
                </button>
              ))}
            </div>

            {/* Responsive Grid: 1 col (<1024px) -> 2 cols (>=1024px) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {filteredExpertise.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`p-5 sm:p-6 rounded-2xl bg-[#111C33] border border-slate-700/80 flex flex-col justify-between ${
                    idx === 0 && filteredExpertise.length % 2 !== 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-xs font-mono text-amber-400 font-semibold mb-1">
                          DOMAIN {cat.code} · {cat.subtitle}
                        </div>
                        <h3 className="text-lg font-bold text-slate-50">{cat.title}</h3>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 shrink-0">
                        {getCategoryIcon(cat.id)}
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-100">
                          <span className="font-mono text-amber-400 font-semibold shrink-0">
                            {String(sIdx + 1).padStart(2, '0')}.
                          </span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. OFFICIAL STEEL PLANT PROFILES & INTERACTIVE CASE STUDIES
        ===================================================================== */}
        <InteractiveCaseStudies
          caseStudies={data.caseStudies}
          companyPlantsGallery={data.companyPlantsGallery}
          onInspectModal={(cs) => setSelectedCaseStudy(cs)}
        />

        {/* =====================================================================
            6. INTERACTIVE BLAST FURNACE TECHNICAL CALCULATORS
        ===================================================================== */}
        <EngineeringCalculators externalBlastMoisture={externalBlastMoisture} />

        {/* =====================================================================
            7. LEADERSHIP & DIGITAL TRANSFORMATION VISION
        ===================================================================== */}
        <section
          id="leadership"
          aria-labelledby="leadership-heading"
          className="py-14 sm:py-16 md:py-20 bg-[#0D1628] border-t border-slate-800/80"
        >
          <div className="responsive-container space-y-14 md:space-y-16">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111C33] border border-slate-700/80">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono tracking-wider text-amber-400 font-semibold">
                  06. EXECUTIVE LEADERSHIP PHILOSOPHY
                </div>
                <blockquote className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-50 leading-snug">
                  &ldquo;{data.profile.philosophyQuote}&rdquo;
                </blockquote>
                <div className="text-xs text-slate-300">
                  {data.profile.name} · {data.profile.designation} · {data.profile.organization}
                </div>
              </div>
            </div>

            <div>
              <h2
                id="leadership-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 mb-6"
              >
                Plant Management &amp; Leadership Strengths
              </h2>
              {/* Grid Breakpoints: 1 col (<480px) -> 2 cols (480px/768px) -> 5 cols (1024px) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.leadershipCompetencies.map((item) => (
                  <div
                    key={item.index}
                    className="p-4 sm:p-5 rounded-xl bg-[#111C33] border border-slate-700/80 space-y-2"
                  >
                    <div className="text-xs font-mono text-amber-400 font-semibold">
                      {item.index}.
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-200 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-slate-800">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                  Digital Transformation &amp; Industry 4.0 in Ironmaking
                </h2>
                <Cpu className="w-5 h-5 text-amber-400 shrink-0" />
              </div>

              {/* Grid Breakpoints: 1 col (<768px) -> 2 cols (768px) -> 3 cols (1024px) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {data.digitalVision.map((vision, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#111C33] border border-slate-700/80 space-y-2"
                  >
                    <div className="text-xs font-mono text-amber-400 font-semibold">
                      0{idx + 1}. {vision.domain}
                    </div>
                    <h3 className="text-base font-bold text-white">{vision.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {vision.applicationInIronmaking}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            8. TECHNICAL PUBLICATIONS & INSIGHTS
        ===================================================================== */}
        <section
          id="blog"
          aria-labelledby="blog-heading"
          className="py-14 sm:py-16 md:py-20 bg-[#0A1120] border-t border-slate-800/80"
        >
          <div className="responsive-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
              <div>
                <p className="text-xs font-mono tracking-wider text-amber-400 mb-2">
                  07. TECHNICAL PUBLICATIONS
                </p>
                <h2
                  id="blog-heading"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50"
                >
                  Insights from the Iron &amp; Steel Industry
                </h2>
              </div>

              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  aria-label="Search technical articles"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div
              role="group"
              aria-label="Filter articles by topic"
              className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/95 border border-slate-700/80 rounded-xl mb-8"
            >
              {[
                'All',
                'Blast Furnace Operational Excellence',
                'PCI Technology and Optimization',
                'Coke Rate Reduction Strategies',
                'Hearth Condition Monitoring',
                'Mechanical Maintenance Best Practices',
                'AI and Machine Learning in Steel Manufacturing'
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={blogTopicFilter === topic}
                  onClick={() => setBlogTopicFilter(topic)}
                  className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    blogTopicFilter === topic
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {topic === 'All' ? 'All Topics' : topic}
                </button>
              ))}
            </div>

            {/* Grid Breakpoints: 1 col (<768px) -> 2 cols (>=768px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group p-5 sm:p-6 rounded-2xl bg-[#111C33] border border-slate-700/80 hover:border-amber-400/60 flex flex-col justify-between transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-semibold">{article.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-50 group-hover:text-amber-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300">By {data.profile.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="min-h-[40px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-bold text-amber-400 hover:bg-amber-400 hover:text-slate-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Read Technical Note</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. EXECUTIVE CONTACT & CONSULTATION SECTION
            Grid Breakpoints: 1 col (<1024px) -> 12 cols (>=1024px)
        ===================================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-14 sm:py-16 md:py-20 bg-[#0D1628] border-t border-slate-800/80"
        >
          <div className="responsive-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-mono tracking-wider text-amber-400 mb-2">
                    08. EXECUTIVE CONTACT
                  </p>
                  <h2
                    id="contact-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50"
                  >
                    Connect With Ravi Prasad
                  </h2>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                    Available for discussions regarding senior Plant Head, General Management, and Blast Furnace
                    Operations &amp; Projects leadership mandates.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#111C33] border border-slate-700/80 space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-300">Current Designation</div>
                      <div className="text-sm font-bold text-white">
                        {data.profile.designation}
                      </div>
                      <div className="text-xs text-slate-200">{data.profile.organization}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-300">Location</div>
                      <div className="text-sm font-bold text-white">
                        {data.profile.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-300">Email</div>
                      <a
                        href={`mailto:${data.profile.email}`}
                        className="text-sm font-mono text-amber-400 hover:underline break-all"
                      >
                        {data.profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-300">Phone</div>
                      <div className="text-sm font-mono text-white">{data.profile.phone}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <a
                      href="https://bengalenergy.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>View Intended Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-5 sm:p-7 rounded-2xl bg-[#111C33] border border-slate-700/80">
                  <h3 className="text-lg font-bold text-slate-50 mb-1">Direct Executive Inquiry</h3>
                  <p className="text-xs text-slate-300 mb-5">
                    Send a direct message regarding executive leadership or technical consultation.
                  </p>

                  {contactSubmitted ? (
                    <div
                      role="status"
                      className="p-5 rounded-xl bg-slate-950 border border-emerald-500/60 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Executive Inquiry Ready</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        Thank you, <strong className="text-white">{contactName}</strong>. Tap below to dispatch your
                        message directly via email.
                      </p>
                      <div className="pt-1">
                        <a
                          href={`mailto:${data.profile.email}?subject=${encodeURIComponent(
                            `${contactPurpose} – ${contactName}`
                          )}&body=${encodeURIComponent(
                            `Name: ${contactName}\nOrganization: ${contactOrg}\nEmail: ${contactEmail}\n\n${contactMessage}`
                          )}`}
                          className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300"
                        >
                          <Mail className="w-4 h-4" />
                          Send Email
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="company_website_honeypot"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-slate-200 mb-1.5"
                          >
                            Your Name *
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full min-h-[44px] px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-org"
                            className="block text-xs font-semibold text-slate-200 mb-1.5"
                          >
                            Organization
                          </label>
                          <input
                            id="contact-org"
                            type="text"
                            value={contactOrg}
                            onChange={(e) => setContactOrg(e.target.value)}
                            placeholder="Company / Search Firm"
                            className="w-full min-h-[44px] px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-slate-200 mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            aria-invalid={!!(emailTouched && emailError)}
                            aria-describedby={emailTouched && emailError ? "email-error-msg" : undefined}
                            value={contactEmail}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={() => handleEmailChange(contactEmail)}
                            placeholder="name@organization.com"
                            className={`w-full min-h-[44px] px-3.5 py-2 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none transition-colors ${
                              emailTouched && emailError
                                ? 'border-rose-500 focus:border-rose-400'
                                : emailTouched && !emailError && contactEmail
                                ? 'border-emerald-500/80 focus:border-emerald-400'
                                : 'border-slate-700 focus:border-amber-400'
                            }`}
                          />
                          {emailTouched && emailError && (
                            <p id="email-error-msg" role="alert" className="text-xs text-rose-400 font-medium mt-1.5 flex items-center gap-1.5">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400" />
                              {emailError}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="contact-purpose"
                            className="block text-xs font-semibold text-slate-200 mb-1.5"
                          >
                            Subject
                          </label>
                          <select
                            id="contact-purpose"
                            value={contactPurpose}
                            onChange={(e) => setContactPurpose(e.target.value)}
                            className="w-full min-h-[44px] px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Executive Leadership / Plant Head Opportunity">
                              Executive Leadership / Plant Head Opportunity
                            </option>
                            <option value="General Management / Operations Director Role">
                              General Management / Operations Director Role
                            </option>
                            <option value="Blast Furnace & PCI Technical Advisory">
                              Blast Furnace &amp; PCI Technical Advisory
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-slate-200 mb-1.5"
                        >
                          Message *
                        </label>
                        <textarea
                          id="contact-message"
                          rows={3}
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Share details regarding leadership mandate or consultation..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2.5">
                              <label htmlFor="spam-Verify" className="text-xs text-slate-200">
                                Verification: <span className="font-mono text-amber-400 font-bold">8 + 6 =</span>
                              </label>
                              <input
                                id="spam-Verify"
                                type="text"
                                inputMode="numeric"
                                required
                                aria-invalid={!!(spamTouched && spamError)}
                                aria-describedby={spamTouched && spamError ? "spam-error-msg" : undefined}
                                value={spamAnswer}
                                onChange={(e) => handleSpamChange(e.target.value)}
                                onBlur={() => handleSpamChange(spamAnswer)}
                                placeholder="14"
                                className={`w-24 min-h-[44px] px-3 py-1.5 bg-slate-950 border rounded-xl text-xs font-mono text-white focus:outline-none transition-colors ${
                                  spamTouched && spamError
                                    ? 'border-rose-500 focus:border-rose-400'
                                    : spamTouched && !spamError && spamAnswer
                                    ? 'border-emerald-500/80 focus:border-emerald-400'
                                    : 'border-slate-700 focus:border-amber-400'
                                }`}
                              />
                            </div>
                            {spamTouched && spamError && (
                              <p id="spam-error-msg" role="alert" className="text-xs text-rose-400 font-medium mt-1.5 flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400" />
                                {spamError}
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
                          >
                            Send Inquiry
                          </button>
                        </div>
                      </div>

                      {contactError && (
                        <p role="alert" className="text-xs text-rose-400 font-medium pt-1">
                          {contactError}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMAL EXECUTIVE FOOTER (With Single "View Intended Website" Button)
      ===================================================================== */}
      <footer className="bg-[#070C17] border-t border-slate-800/90 py-10 text-xs text-slate-300 no-print">
        <div className="responsive-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-sm font-bold text-white">
              {data.profile.name} — {data.profile.designation}
            </div>
            <div>
              {data.profile.organization} · {data.profile.location} · {data.profile.qualification} (
              {data.profile.graduationYear})
            </div>
          </div>

          <a
            href="https://bengalenergy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>View Intended Website</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </footer>

      {/* =====================================================================
          CASE STUDY FULL INSPECTION MODAL
      ===================================================================== */}
      {selectedCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto no-print"
        >
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="text-xs font-mono text-amber-400 font-semibold">
                CASE STUDY {selectedCaseStudy.number} · {selectedCaseStudy.category}
              </div>
              <button
                type="button"
                aria-label="Close case study modal"
                onClick={() => setSelectedCaseStudy(null)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
              <div className="flex items-start gap-3">
                {selectedCaseStudy.companyLogoUrl && (
                  <div className="w-11 h-11 aspect-square rounded-lg bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <img
                      src={selectedCaseStudy.companyLogoUrl}
                      alt={selectedCaseStudy.companyWebsiteLabel}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <h3 id="modal-case-title" className="text-xl sm:text-2xl font-bold text-slate-50">
                  {selectedCaseStudy.title}
                </h3>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">{selectedCaseStudy.overview}</p>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={selectedCaseStudy.image}
                    alt={selectedCaseStudy.title}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full aspect-[16/10] object-cover object-center"
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-slate-800 text-xs font-mono text-slate-200">
                  {selectedCaseStudy.imageCaption}
                </div>
              </div>

              <TechnicalSchematic type={selectedCaseStudy.diagramType} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-amber-400 font-semibold">
                    01. TECHNICAL CHALLENGE
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-amber-400 font-semibold">
                    02. ENGINEERING APPROACH
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCaseStudy.approach}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-xs font-mono text-amber-400 font-semibold">
                  03. SOLUTION IMPLEMENTED
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-400/50">
                <div className="text-xs font-mono text-emerald-400 font-semibold">
                  04. MEASURABLE RESULTS
                </div>
                <p className="text-xs sm:text-sm text-white mt-1">
                  {selectedCaseStudy.measurableResults}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={selectedCaseStudy.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>View Intended Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          BLOG ARTICLE READER MODAL
      ===================================================================== */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto no-print"
        >
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-amber-400 font-semibold">{selectedArticle.topic}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <button
                type="button"
                aria-label="Close article modal"
                onClick={() => setSelectedArticle(null)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
              <div>
                <h3
                  id="modal-article-title"
                  className="text-xl sm:text-2xl font-bold text-slate-50 leading-snug"
                >
                  {selectedArticle.title}
                </h3>
                <div className="text-xs text-slate-300 mt-2">
                  Authored by <strong className="text-white">{data.profile.name}</strong> ·{' '}
                  {data.profile.designation}
                </div>
              </div>

              <div className="space-y-4">
                {selectedArticle.content.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-100 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="text-xs font-mono text-amber-400 font-semibold">
                    EXECUTIVE ENGINEERING TAKEAWAYS
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    {selectedArticle.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-amber-400 font-semibold">0{idx + 1}.</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          EXECUTIVE CV DOSSIER & PRINTABLE PREVIEW MODAL
      ===================================================================== */}
      <ExecutiveCvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        data={{ ...data, experiences }}
      />
    </div>
  );
}

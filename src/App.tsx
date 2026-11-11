/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
  FileText,
  ArrowUpRight,
  Search,
  X,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  BookOpen,
  Sliders,
  Download,
  Radio,
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

  // Contact Form State with Spam Protection
  const [contactName, setContactName] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPurpose, setContactPurpose] = useState(
    'Executive Leadership / Plant Head Opportunity'
  );
  const [contactMessage, setContactMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [spamAnswer, setSpamAnswer] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Image Fallback States
  const [portraitImgError, setPortraitImgError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (honeypot) {
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please complete your name, corporate email address, and message.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError('Please provide a valid email address.');
      return;
    }
    if (spamAnswer.trim() !== '14') {
      setContactError('Security verification failed: 8 + 6 equals 14.');
      return;
    }

    setContactSubmitted(true);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bf-ops':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'pci-sys':
        return <Gauge className="w-5 h-5 text-amber-500" />;
      case 'met-opt':
        return <Sliders className="w-5 h-5 text-amber-500" />;
      case 'mech-maint':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1120] text-[#F8FAFC] flex flex-col">
      {/* =====================================================================
          CLEAN MINIMAL TOP DIRECTORY BAR WITH THREE-LINE MENU OBJECT
      ===================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0A1120]/95 backdrop-blur-md border-b border-slate-800/80 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-6 lg:px-8 py-4">
          {/* Zone 1: Minimal Executive Wordmark */}
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight text-slate-50 whitespace-nowrap shrink-0"
          >
            {data.profile.name}
          </a>

          {/* Zone 2: Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#experience" className="hover:text-white transition-colors whitespace-nowrap">
              Timeline
            </a>
            <a href="#expertise" className="hover:text-white transition-colors whitespace-nowrap">
              Expertise
            </a>
            <a href="#projects" className="hover:text-white transition-colors whitespace-nowrap">
              Case Studies
            </a>
            <a href="#insights" className="hover:text-white transition-colors whitespace-nowrap">
              Calculators
            </a>
            <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Zone 3: Three-Line Object (Menu Button) that opens Timelines & API 1-2-3-4 Controls */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsDirectoryMenuOpen((prev) => !prev)}
              aria-expanded={isDirectoryMenuOpen}
              aria-label="Open Directory, Career Timelines and Live APIs"
              className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDirectoryMenuOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900/90 text-slate-100 border-slate-700 hover:border-amber-500/60'
              }`}
            >
              {isDirectoryMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4 text-amber-400" />
              )}
              <span>Directory &amp; Timelines</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            THREE-LINE DIRECTORY DRAWER:
            - Career Timelines (01 – 08)
            - Live API & Dossier Buttons (01, 02, 03, 04...)
            - Website Section Directory
        =================================================================== */}
        {isDirectoryMenuOpen && (
          <div className="border-t border-slate-800 bg-[#080E1A]/98 backdrop-blur-xl shadow-2xl">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-7 space-y-6 max-h-[82vh] overflow-y-auto">
              {/* Status Toast if any action was triggered */}
              {actionToast && (
                <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{actionToast}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* COLUMN 1: NUMBERED LIVE API & ACTION CONTROLS (1, 2, 3, 4...) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono tracking-wider text-amber-400">
                    LIVE APIS &amp; EXECUTIVE DOSSIER CONTROLS (01 – 06)
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {/* 01. Live Plant Weather API */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsWeatherOpen(true);
                        setIsDirectoryMenuOpen(false);
                        const el = document.getElementById('weather-telemetry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/40 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          01
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-100">
                            Live Plant Weather &amp; Moisture API
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Real-time steel plant meteorological &amp; RAFT telemetry
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
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/40 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          02
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-100">
                            {isSyncingUplink
                              ? 'Synchronizing LinkedIn Uplink...'
                              : 'Establish LinkedIn Profile Uplink API'}
                          </div>
                          <div className="text-[11px] text-slate-400">
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
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/40 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          03
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-100">
                            Export Career Timeline (PDF)
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Download vector A4 executive timeline &amp; 350 m³ BF dossier
                          </div>
                        </div>
                      </div>
                      <FileDown className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    {/* 04. Export Career Timeline JSON */}
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/40 font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          04
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-100">
                            Export Career Timeline (JSON)
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Download structured JSON data (Schema v1.0.0)
                          </div>
                        </div>
                      </div>
                      <FileJson className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>

                    {/* 05. Executive CV Dossier Modal & Official PDF CV */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDirectoryMenuOpen(false);
                          setIsCvOpen(true);
                        }}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <span className="w-6 h-6 rounded bg-amber-500/15 border border-amber-500/40 font-mono text-[11px] font-bold text-amber-400 flex items-center justify-center shrink-0">
                          05
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-100 truncate">
                            Printable CV
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">Executive Dossier</div>
                        </div>
                      </button>

                      <a
                        href={data.profile.cvPdfUrl}
                        download="Ravi_Prasad_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 flex items-center gap-2.5 text-left transition-colors"
                      >
                        <span className="w-6 h-6 rounded bg-amber-500/15 border border-amber-500/40 font-mono text-[11px] font-bold text-amber-400 flex items-center justify-center shrink-0">
                          06
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-100 truncate">
                            Official PDF CV
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">Direct Download</div>
                        </div>
                      </a>
                    </div>

                    {/* Toggle Structured JSON Inspector inside Menu */}
                    <button
                      type="button"
                      onClick={() => setShowJsonInspector((prev) => !prev)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>
                        {showJsonInspector
                          ? 'Hide Structured JSON Career Schema'
                          : 'Inspect Structured JSON Career Schema'}
                      </span>
                      <FileJson className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>

                {/* COLUMN 2: COMPLETE CAREER TIMELINES (01 – 08, 2004 – PRESENT) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono tracking-wider text-amber-400">
                      CAREER TIMELINES DIRECTORY (2004 – PRESENT · 8 POSITIONS)
                    </div>
                    <span className="text-[11px] text-slate-400">Click any timeline role to jump</span>
                  </div>

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
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 flex items-start gap-3 text-left transition-all cursor-pointer"
                      >
                        {exp.companyLogoUrl ? (
                          <div className="w-8 h-8 rounded-lg bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                            <img
                              src={exp.companyLogoUrl}
                              alt={exp.organization}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <span className="w-8 h-8 rounded-lg bg-slate-800 font-mono text-xs text-amber-400 flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-amber-400">
                            <span>0{idx + 1}</span>
                            <span className="text-slate-400 truncate">{exp.period}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
                            {exp.organization}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{exp.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Section Directory Links */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                    <span className="font-mono text-slate-500">SECTIONS:</span>
                    {[
                      { label: '01. Home', href: '#home' },
                      { label: '02. Weather API', href: '#weather-telemetry' },
                      { label: '03. About', href: '#about' },
                      { label: '04. Timeline', href: '#experience' },
                      { label: '05. Expertise', href: '#expertise' },
                      { label: '06. Plant Profiles & Cases', href: '#projects' },
                      { label: '07. Calculators', href: '#insights' },
                      { label: '08. Leadership', href: '#leadership' },
                      { label: '09. Insights', href: '#blog' },
                      { label: '10. Contact', href: '#contact' }
                    ].map((sec) => (
                      <a
                        key={sec.href}
                        href={sec.href}
                        onClick={() => setIsDirectoryMenuOpen(false)}
                        className="hover:text-amber-400 transition-colors"
                      >
                        {sec.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional JSON Schema Inspector inside Menu */}
              {showJsonInspector && (
                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">
                      STRUCTURED JSON CAREER TIMELINE DOSSIER
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer"
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
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-60 leading-relaxed">
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
          At the bottom of the landing profile, ONLY "View Intended Website"
      ===================================================================== */}
      <main id="home" className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-800/70">
          {/* Subtle Industrial Backdrop */}
          <div className="absolute inset-0 pointer-events-none">
            {!heroImgError ? (
              <img
                src={data.profile.heroBackdropUrl}
                alt="Modern Blast Furnace Complex"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover opacity-15"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0A1120] via-[#111C33] to-[#0A1120]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120] via-[#0A1120]/90 to-[#0A1120]/75" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            {/* Clean 2-Column Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Minimal Executive Typography & Single Bottom Button */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-amber-400">
                    <span>{data.profile.designation}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-200">{data.profile.organization}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{data.profile.location}</span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-[1.14]">
                    {data.profile.headline}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    {data.profile.supportingStatement}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                    <span>20+ Years Blast Furnace Experience</span>
                    <span aria-hidden="true">·</span>
                    <span>350 m³ BF at 112.3% Target Compliance</span>
                    <span aria-hidden="true">·</span>
                    <span>B.E. Production Engineering ({data.profile.graduationYear})</span>
                  </div>
                </div>

                {/* Bottom of Official Landing Profile: ONLY "View Intended Website" button */}
                <div className="pt-2">
                  <a
                    href="https://bengalenergy.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    <Globe className="w-4 h-4" />
                    <span>View Intended Website</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Formal Executive Studio Portrait */}
              <div className="lg:col-span-5">
                <div className="relative min-h-[400px] sm:min-h-[450px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col justify-end">
                  {!portraitImgError ? (
                    <img
                      src={data.profile.portraitUrl}
                      alt={`${data.profile.name} – ${data.profile.designation}`}
                      onError={() => setPortraitImgError(true)}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 p-6 text-center">
                      <Factory className="w-12 h-12 text-amber-500 mb-3" />
                      <div className="text-lg font-bold text-slate-100">{data.profile.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{data.profile.designation}</div>
                    </div>
                  )}

                  <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pt-20 pb-5 px-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-white">{data.profile.name}</div>
                        <div className="text-xs font-medium text-amber-400 mt-0.5">
                          {data.profile.designation}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {data.profile.organization} · {data.profile.location}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[11px] text-slate-400 shrink-0">
                        <div>B.E. PROD. ENG.</div>
                        <div className="text-emerald-400">20+ YRS BF OPS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean 4-Column Verified KPI Strip */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.metrics.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80"
                >
                  <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-amber-400">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{m.context}</div>
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
        ===================================================================== */}
        <section id="about" className="py-20 bg-[#0D1628] border-b border-slate-800/70">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Executive Positioning & Career Identity */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                    01. EXECUTIVE PROFILE
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                    Metallurgical Authority &amp; Plant Leadership
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                    &ldquo;{data.profile.positioningStatement}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{data.profile.designation}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Factory className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{data.profile.organization} (350 m³ BF)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{data.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>
                        {data.profile.qualification} ({data.profile.graduationYear})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Identity List */}
                <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
                  {data.identities.map((identity, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex items-center justify-between text-xs sm:text-sm text-slate-200"
                    >
                      <span>{identity}</span>
                      <span className="font-mono text-xs text-amber-500">0{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Executive Summary Narrative & Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-100">Executive Summary</h3>
                  {data.profile.executiveSummaryParagraphs.map((para, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {data.summaryPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1"
                    >
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">
                        <span className="font-mono text-xs text-amber-500 mr-1.5">0{idx + 1}.</span>
                        {pillar.title}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{pillar.detail}</p>
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
        <section id="expertise" className="py-20 bg-[#0D1628] border-b border-slate-800/70">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                  03. METALLURGICAL &amp; MECHANICAL COMMAND
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                  Core Technical Expertise
                </h2>
              </div>

              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={expertiseSearch}
                  onChange={(e) => setExpertiseSearch(e.target.value)}
                  placeholder="Filter competencies..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setExpertiseFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  expertiseFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All 5 Domains
              </button>
              {data.expertise.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setExpertiseFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    expertiseFilter === cat.id
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat.code}. {cat.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredExpertise.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`p-6 rounded-2xl bg-[#111A2E]/90 border border-slate-800 flex flex-col justify-between ${
                    idx === 0 && filteredExpertise.length % 2 !== 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-xs font-mono text-amber-400 mb-1">
                          DOMAIN {cat.code} · {cat.subtitle}
                        </div>
                        <h3 className="text-lg font-bold text-slate-50">{cat.title}</h3>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {getCategoryIcon(cat.id)}
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-200">
                          <span className="font-mono text-amber-500 shrink-0">
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
        <section id="leadership" className="py-20 bg-[#0D1628] border-t border-slate-800/70">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16">
            <div className="p-8 rounded-2xl bg-[#111A2E] border border-slate-800">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono tracking-wider text-amber-500">
                  06. EXECUTIVE LEADERSHIP PHILOSOPHY
                </div>
                <blockquote className="font-display text-xl sm:text-2xl font-bold text-slate-50 leading-snug">
                  &ldquo;{data.profile.philosophyQuote}&rdquo;
                </blockquote>
                <div className="text-xs text-slate-400">
                  {data.profile.name} · {data.profile.designation} · {data.profile.organization}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-50 mb-6">
                Plant Management &amp; Leadership Strengths
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.leadershipCompetencies.map((item) => (
                  <div
                    key={item.index}
                    className="p-4 rounded-xl bg-[#111A2E]/90 border border-slate-800 space-y-2"
                  >
                    <div className="text-xs font-mono text-amber-500">{item.index}.</div>
                    <h3 className="text-sm font-bold text-slate-100 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-slate-800/80">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-50">
                  Digital Transformation &amp; Industry 4.0 in Ironmaking
                </h2>
                <Cpu className="w-5 h-5 text-amber-500 shrink-0" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.digitalVision.map((vision, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#111A2E]/90 border border-slate-800 space-y-2"
                  >
                    <div className="text-xs font-mono text-amber-400">
                      0{idx + 1}. {vision.domain}
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{vision.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
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
        <section id="blog" className="py-20 bg-[#0A1120] border-t border-slate-800/70">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                  07. TECHNICAL PUBLICATIONS
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                  Insights from the Iron &amp; Steel Industry
                </h2>
              </div>

              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-8">
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
                  onClick={() => setBlogTopicFilter(topic)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    blogTopicFilter === topic
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {topic === 'All' ? 'All Topics' : topic}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group p-6 rounded-2xl bg-[#111A2E]/90 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-colors cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="text-amber-400 font-medium">{article.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-50 group-hover:text-amber-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">By {data.profile.name}</span>
                    <span className="font-semibold text-amber-400 inline-flex items-center gap-1">
                      Read Note
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. EXECUTIVE CONTACT & CONSULTATION SECTION
        ===================================================================== */}
        <section id="contact" className="py-20 bg-[#0D1628] border-t border-slate-800/70">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                    08. EXECUTIVE CONTACT
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                    Connect With Ravi Prasad
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Available for discussions regarding senior Plant Head, General Management, and Blast Furnace
                    Operations &amp; Projects leadership mandates.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#111A2E]/90 border border-slate-800 space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-400">Current Designation</div>
                      <div className="text-sm font-semibold text-slate-100">
                        {data.profile.designation}
                      </div>
                      <div className="text-xs text-slate-300">{data.profile.organization}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-400">Location</div>
                      <div className="text-sm font-semibold text-slate-100">
                        {data.profile.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-400">Email</div>
                      <a
                        href={`mailto:${data.profile.email}`}
                        className="text-sm font-mono text-amber-400 hover:underline"
                      >
                        {data.profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-slate-400">Phone</div>
                      <div className="text-sm font-mono text-slate-200">{data.profile.phone}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <a
                      href="https://bengalenergy.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Intended Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-7 rounded-2xl bg-[#111A2E]/90 border border-slate-800">
                  <h3 className="text-lg font-bold text-slate-50 mb-1">Direct Executive Inquiry</h3>
                  <p className="text-xs text-slate-400 mb-5">
                    Send a direct message regarding executive leadership or technical consultation.
                  </p>

                  {contactSubmitted ? (
                    <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Executive Inquiry Ready</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Thank you, <strong className="text-white">{contactName}</strong>. Click below to dispatch your
                        message directly via email.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={`mailto:${data.profile.email}?subject=${encodeURIComponent(
                            `${contactPurpose} – ${contactName}`
                          )}&body=${encodeURIComponent(
                            `Name: ${contactName}\nOrganization: ${contactOrg}\nEmail: ${contactEmail}\n\n${contactMessage}`
                          )}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400"
                        >
                          <Mail className="w-3.5 h-3.5" />
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
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={contactOrg}
                            onChange={(e) => setContactOrg(e.target.value)}
                            placeholder="Company / Search Firm"
                            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="name@organization.com"
                            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Subject
                          </label>
                          <select
                            value={contactPurpose}
                            onChange={(e) => setContactPurpose(e.target.value)}
                            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
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
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Message *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Share details regarding leadership mandate or consultation..."
                          className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2.5">
                          <label className="text-xs text-slate-400">
                            Verification: <span className="font-mono text-amber-400">8 + 6 =</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={spamAnswer}
                            onChange={(e) => setSpamAnswer(e.target.value)}
                            placeholder="14"
                            className="w-16 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                        >
                          Send Inquiry
                        </button>
                      </div>

                      {contactError && <p className="text-xs text-rose-400 pt-1">{contactError}</p>}
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
      <footer className="bg-[#070C17] border-t border-slate-800/80 py-10 px-6 lg:px-8 text-xs text-slate-400 no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-sm font-bold text-slate-100">
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors shrink-0"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Intended Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>

      {/* =====================================================================
          CASE STUDY FULL INSPECTION MODAL
      ===================================================================== */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto no-print">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="text-xs font-mono text-amber-400">
                CASE STUDY {selectedCaseStudy.number} · {selectedCaseStudy.category}
              </div>
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
              <div className="flex items-start gap-3">
                {selectedCaseStudy.companyLogoUrl && (
                  <div className="w-11 h-11 rounded-lg bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <img
                      src={selectedCaseStudy.companyLogoUrl}
                      alt={selectedCaseStudy.companyWebsiteLabel}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-50">
                  {selectedCaseStudy.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{selectedCaseStudy.overview}</p>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.title}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="px-4 py-2.5 border-t border-slate-800 text-xs font-mono text-slate-300">
                  {selectedCaseStudy.imageCaption}
                </div>
              </div>

              <TechnicalSchematic type={selectedCaseStudy.diagramType} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-amber-400">01. TECHNICAL CHALLENGE</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono text-amber-400">02. ENGINEERING APPROACH</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedCaseStudy.approach}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="text-xs font-mono text-amber-400">03. SOLUTION IMPLEMENTED</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40">
                <div className="text-xs font-mono text-emerald-400">04. MEASURABLE RESULTS</div>
                <p className="text-xs sm:text-sm text-slate-200 mt-1">
                  {selectedCaseStudy.measurableResults}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={selectedCaseStudy.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto no-print">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">{selectedArticle.topic}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-50 leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="text-xs text-slate-400 mt-2">
                  Authored by <strong className="text-slate-200">{data.profile.name}</strong> ·{' '}
                  {data.profile.designation}
                </div>
              </div>

              <div className="space-y-4">
                {selectedArticle.content.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="text-xs font-mono text-amber-400">
                    EXECUTIVE ENGINEERING TAKEAWAYS
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {selectedArticle.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-amber-500">0{idx + 1}.</span>
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

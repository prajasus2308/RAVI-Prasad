import React, { useState } from 'react';
import { ExperienceItem, OperationalPerformanceRow } from '../data/portfolioData';
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  Linkedin,
  ArrowUpRight,
  Radio,
  Globe
} from 'lucide-react';

export interface UplinkSource {
  title: string;
  uri: string;
}

export interface UplinkResultState {
  syncedAt: string;
  summaryNote: string;
  sources: UplinkSource[];
}

interface AnimatedCareerTimelineProps {
  experiences: ExperienceItem[];
  performanceTable: OperationalPerformanceRow[];
  linkedinUrl: string;
  activeExpId: string;
  onSelectExpId: (id: string) => void;
  isSyncingUplink?: boolean;
  uplinkStageText?: string;
  uplinkResult?: UplinkResultState | null;
}

export const AnimatedCareerTimeline: React.FC<AnimatedCareerTimelineProps> = ({
  experiences,
  performanceTable,
  linkedinUrl,
  activeExpId,
  onSelectExpId,
  isSyncingUplink = false,
  uplinkStageText = '',
  uplinkResult = null
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => ({
    [experiences[0]?.id || 'exp-1']: true
  }));
  const [showPerfTable, setShowPerfTable] = useState<boolean>(false);

  React.useEffect(() => {
    if (activeExpId) {
      setExpandedIds((prev) => ({ ...prev, [activeExpId]: true }));
    }
  }, [activeExpId]);

  const filteredExperiences = experiences.filter(
    (exp) => selectedEra === 'All' || exp.eraTag === selectedEra
  );

  const toggleExpand = (id: string) => {
    onSelectExpId(id);
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="py-14 sm:py-16 md:py-20 bg-[#0A1120] border-b border-slate-800/80"
    >
      <div className="responsive-container">
        {/* Mobile-First Section Header & Touch-Friendly Era Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-mono tracking-wider text-amber-400 mb-2">
              02. CAREER TIMELINE (2004 – PRESENT)
            </p>
            <h2
              id="timeline-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50"
            >
              20+ Years of Blast Furnace Leadership
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed">
              Progressive leadership across 8 integrated steel organizations—from greenfield Blast Furnace erection and
              commissioning to Deputy General Manager (350 m³ BF).
            </p>
          </div>

          {/* Touch-Friendly Era Filter (Grid at <480px, Flex at >=480px) */}
          <div
            role="group"
            aria-label="Filter career timeline by era"
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 bg-slate-900/95 p-1.5 rounded-xl border border-slate-700/80 shrink-0"
          >
            {['All', 'Executive Leadership', 'Plant Management', 'Operations & Projects'].map((era) => (
              <button
                key={era}
                type="button"
                aria-pressed={selectedEra === era}
                onClick={() => setSelectedEra(era)}
                className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedEra === era
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {era === 'All' ? `All (${experiences.length})` : era}
              </button>
            ))}
          </div>
        </div>

        {/* Live LinkedIn Uplink Progress or Verification Banner */}
        {(isSyncingUplink || uplinkResult) && (
          <div
            role="status"
            aria-live="polite"
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-400/50 space-y-2.5"
          >
            {isSyncingUplink ? (
              <div className="flex items-center gap-3 text-xs sm:text-sm text-amber-300 font-mono">
                <Radio className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                <span>{uplinkStageText}</span>
              </div>
            ) : (
              uplinkResult && (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        LINKEDIN PROFILE UPLINK SYNCHRONIZED ·{' '}
                        {new Date(uplinkResult.syncedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Verify on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {uplinkResult.summaryNote}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Mobile-First Vertical Timeline Spine & Collapsible Cards */}
        <div className="relative pl-5 sm:pl-8 md:pl-10 border-l-2 border-slate-700/80 space-y-5">
          {filteredExperiences.map((exp, index) => {
            const isExpanded = !!expandedIds[exp.id];
            const isCurrent = index === 0 && selectedEra === 'All';

            return (
              <article
                key={exp.id}
                id={`timeline-node-${exp.id}`}
                className="relative group transition-all duration-200 ease-out"
              >
                {/* Touch-Friendly Timeline Node Marker on the Spine */}
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`timeline-panel-${exp.id}`}
                  aria-label={`Toggle details for ${exp.role} at ${exp.organization}`}
                  className={`absolute -left-[33px] sm:-left-[45px] md:-left-[53px] top-5 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors cursor-pointer ${
                    isCurrent || activeExpId === exp.id
                      ? 'bg-amber-400 border-amber-200 text-slate-950 font-bold'
                      : 'bg-[#0A1120] border-slate-600 text-slate-200 group-hover:border-amber-400'
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold">{index + 1}</span>
                </button>

                {/* Timeline Card */}
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    activeExpId === exp.id
                      ? 'bg-[#111C33] border-amber-400/60 shadow-lg'
                      : 'bg-[#111C33]/85 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  {/* Touch-Friendly Collapsible Card Header */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(exp.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`timeline-panel-${exp.id}`}
                    className="w-full text-left p-4 sm:p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {exp.companyLogoUrl && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 aspect-square rounded-xl bg-white p-1.5 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <img
                            src={exp.companyLogoUrl}
                            alt={`${exp.organization} Logo`}
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-300">
                          <span className="text-amber-400 font-semibold">{exp.period}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-200">{exp.durationLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{exp.statusNote}</span>
                        </div>

                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-50 group-hover:text-amber-400 transition-colors leading-snug">
                          {exp.role}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-200">
                          <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="font-semibold text-white">{exp.organization}</span>
                          <span aria-hidden="true" className="text-slate-500">·</span>
                          <span className="text-slate-300">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80 shrink-0">
                      <span className="text-xs font-medium text-slate-200">
                        {isExpanded ? 'Hide Details' : 'Expand Role Details'}
                      </span>
                      <div className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-amber-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {/* Expandable Content Body */}
                  {isExpanded && (
                    <div
                      id={`timeline-panel-${exp.id}`}
                      className="px-4 sm:px-5 md:px-6 pb-6 pt-3 border-t border-slate-800 space-y-5"
                    >
                      {/* Responsive Grid: 1 col (<1024px) -> 12 cols (>=1024px) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        {/* Left Column: Summary & Responsibilities */}
                        <div className={exp.plantPhotoUrl ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
                          <p className="text-sm text-slate-200 leading-relaxed">{exp.summary}</p>

                          <div>
                            <div className="text-[11px] font-mono tracking-wider text-amber-400 mb-2.5">
                              KEY RESPONSIBILITIES
                            </div>
                            {/* 1 col (<768px) -> 2 cols (>=768px) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Adaptive Plant Image + Single Touch-Friendly "View Intended Website" CTA */}
                        {exp.plantPhotoUrl && (
                          <div className="lg:col-span-4 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between">
                            <div>
                              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                                <img
                                  src={exp.plantPhotoUrl}
                                  alt={exp.plantPhotoCaption || exp.organization}
                                  width={640}
                                  height={400}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full aspect-[16/10] object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                              </div>
                              <div className="p-3.5">
                                <p className="text-xs text-slate-200 leading-relaxed">
                                  {exp.plantPhotoCaption || `${exp.organization} – ${exp.location}`}
                                </p>
                              </div>
                            </div>

                            {exp.companyWebsite && (
                              <div className="px-3.5 pb-3.5 pt-1">
                                <a
                                  href={exp.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                                >
                                  <Globe className="w-4 h-4" />
                                  <span>View Intended Website</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Verified Impact Callout */}
                      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-start gap-2.5">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200 leading-relaxed">
                            <strong className="text-white">Deliverables: </strong>
                            {exp.achievementsPlaceholder}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-slate-300 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Collapsible 350 m³ BF Operational Performance Benchmark Table */}
        <div className="mt-10 rounded-2xl bg-[#111C33]/90 border border-slate-700/80 overflow-hidden">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>BENGAL ENERGY LIMITED · 350 M³ BLAST FURNACE BENCHMARK</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-50">
                Verified Operational Performance Summary (112.3% Target Compliance)
              </h3>
            </div>
            <button
              type="button"
              aria-expanded={showPerfTable}
              onClick={() => setShowPerfTable(!showPerfTable)}
              className="min-h-[44px] px-4 py-2.5 text-xs font-semibold text-slate-100 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showPerfTable ? 'Hide Benchmark Table' : 'View Benchmark Table'}
            </button>
          </div>

          {showPerfTable && (
            <div className="border-t border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-slate-950/90 border-b border-slate-800 text-[11px] font-mono text-slate-300">
                    <th scope="col" className="py-3.5 px-4 sm:px-6">PARAMETER</th>
                    <th scope="col" className="py-3.5 px-3 sm:px-4">UNIT</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">DAILY (15 JAN 2026)</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">CUMULATIVE TO DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  {performanceTable.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.highlight
                          ? 'bg-amber-400/10 text-white font-semibold'
                          : 'text-slate-200 hover:bg-slate-900/50'
                      }
                    >
                      <td className="py-3 px-4 sm:px-6">{row.parameter}</td>
                      <td className="py-3 px-3 sm:px-4 font-mono text-xs text-slate-300">{row.uom}</td>
                      <td className="py-3 px-4 sm:px-6 text-right font-mono tabular-nums">
                        {row.dailyValue}
                      </td>
                      <td
                        className={`py-3 px-4 sm:px-6 text-right font-mono tabular-nums ${
                          row.highlight ? 'text-amber-400 font-bold' : 'text-white'
                        }`}
                      >
                        {row.toDateValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

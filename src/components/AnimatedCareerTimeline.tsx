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

  // Ensure whenever activeExpId changes from the top 3-line directory menu, it expands automatically
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
    <section id="experience" className="py-20 bg-[#0A1120] border-b border-slate-800/70">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Clean Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
              02. CAREER TIMELINE (2004 – PRESENT)
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              20+ Years of Blast Furnace Leadership
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Progressive leadership across 8 integrated steel organizations—from greenfield Blast Furnace erection and
              commissioning to Deputy General Manager (350 m³ BF).
            </p>
          </div>

          {/* Minimal Era Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
            {['All', 'Executive Leadership', 'Plant Management', 'Operations & Projects'].map((era) => (
              <button
                key={era}
                type="button"
                onClick={() => setSelectedEra(era)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedEra === era
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {era === 'All' ? `All (${experiences.length})` : era}
              </button>
            ))}
          </div>
        </div>

        {/* Live LinkedIn Uplink Progress or Verification Banner (Triggered via Top 3-Line Menu) */}
        {(isSyncingUplink || uplinkResult) && (
          <div className="mb-10 p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2.5">
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Verify on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {uplinkResult.summaryNote}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Clean Minimal Vertical Timeline Spine & Cards */}
        <div className="relative pl-6 sm:pl-9 border-l border-slate-800 space-y-5">
          {filteredExperiences.map((exp, index) => {
            const isExpanded = !!expandedIds[exp.id];
            const isCurrent = index === 0 && selectedEra === 'All';

            return (
              <div
                key={exp.id}
                id={`timeline-node-${exp.id}`}
                className="relative group transition-all duration-200 ease-out"
              >
                {/* Timeline Node Marker on the Spine */}
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-label={`Toggle details for ${exp.role} at ${exp.organization}`}
                  className={`absolute -left-[35px] sm:-left-[47px] top-6 w-6 h-6 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                    isCurrent || activeExpId === exp.id
                      ? 'bg-amber-500 border-amber-300 text-slate-950'
                      : 'bg-[#0A1120] border-slate-700 text-slate-400 group-hover:border-amber-500'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">{index + 1}</span>
                </button>

                {/* Timeline Card */}
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    activeExpId === exp.id
                      ? 'bg-[#111A2E] border-amber-500/50 shadow-md'
                      : 'bg-[#111A2E]/75 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header (Clickable to Expand/Collapse) */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      {exp.companyLogoUrl && (
                        <div className="w-11 h-11 rounded-xl bg-white p-1.5 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <img
                            src={exp.companyLogoUrl}
                            alt={`${exp.organization} Official Logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                          <span className="text-amber-400 font-semibold">{exp.period}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-300">{exp.durationLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{exp.statusNote}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-50 group-hover:text-amber-400 transition-colors">
                          {exp.role}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="font-medium text-slate-100">{exp.organization}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-slate-400">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
                      <span className="text-xs text-slate-400 group-hover:text-slate-200">
                        {isExpanded ? 'Hide' : 'Details'}
                      </span>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content Body */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Summary & Responsibilities */}
                        <div className={exp.plantPhotoUrl ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
                          <p className="text-sm text-slate-300 leading-relaxed">{exp.summary}</p>

                          <div>
                            <div className="text-[11px] font-mono tracking-wider text-slate-400 mb-2.5">
                              KEY RESPONSIBILITIES
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-200 leading-relaxed"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Official Company Plant Profile with Single "View Intended Website" Button */}
                        {exp.plantPhotoUrl && (
                          <div className="lg:col-span-4 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between">
                            <div>
                              <div className="relative h-40 bg-slate-900 overflow-hidden">
                                <img
                                  src={exp.plantPhotoUrl}
                                  alt={exp.plantPhotoCaption || exp.organization}
                                  className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                              </div>
                              <div className="p-3.5">
                                <p className="text-xs text-slate-300 leading-relaxed">
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
                                  className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
                                >
                                  <Globe className="w-3.5 h-3.5" />
                                  <span>View Intended Website</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Verified Impact Callout */}
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">
                            <strong className="text-slate-100">Deliverables: </strong>
                            {exp.achievementsPlaceholder}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Collapsible 350 m³ BF Operational Performance Benchmark Table */}
        <div className="mt-12 rounded-2xl bg-[#111A2E]/90 border border-slate-800 overflow-hidden">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              onClick={() => setShowPerfTable(!showPerfTable)}
              className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showPerfTable ? 'Hide Benchmark Table' : 'View Benchmark Table'}
            </button>
          </div>

          {showPerfTable && (
            <div className="border-t border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <th className="py-3 px-6">PARAMETER</th>
                    <th className="py-3 px-4">UNIT</th>
                    <th className="py-3 px-6 text-right">DAILY (15 JAN 2026)</th>
                    <th className="py-3 px-6 text-right">CUMULATIVE TO DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                  {performanceTable.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.highlight
                          ? 'bg-amber-500/5 text-slate-100 font-semibold'
                          : 'text-slate-300 hover:bg-slate-900/40'
                      }
                    >
                      <td className="py-3 px-6">{row.parameter}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-400">{row.uom}</td>
                      <td className="py-3 px-6 text-right font-mono tabular-nums">
                        {row.dailyValue}
                      </td>
                      <td
                        className={`py-3 px-6 text-right font-mono tabular-nums ${
                          row.highlight ? 'text-amber-400 font-bold' : 'text-slate-100'
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

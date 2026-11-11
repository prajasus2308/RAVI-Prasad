import React, { useState } from 'react';
import { CaseStudy, CompanyPlantShowcase } from '../data/portfolioData';
import { TechnicalSchematic } from './TechnicalSchematic';
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Image as ImageIcon,
  Cpu,
  CheckCircle2,
  Globe,
  ArrowUpRight
} from 'lucide-react';

interface InteractiveCaseStudiesProps {
  caseStudies: CaseStudy[];
  companyPlantsGallery?: CompanyPlantShowcase[];
  onInspectModal: (cs: CaseStudy) => void;
}

export const InteractiveCaseStudies: React.FC<InteractiveCaseStudiesProps> = ({
  caseStudies,
  companyPlantsGallery = [],
  onInspectModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [visualMode, setVisualMode] = useState<Record<string, 'photo' | 'diagram'>>({});

  const filtered =
    selectedCategory === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === selectedCategory);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const setCardVisualMode = (id: string, mode: 'photo' | 'diagram', e: React.MouseEvent) => {
    e.stopPropagation();
    setVisualMode((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section id="projects" className="py-20 bg-[#0A1120] border-b border-slate-800/70">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-20">
        {/* =================================================================
            PART A: OFFICIAL STEEL PLANT PROFILES & PHOTOGRAPHS
            (At the bottom of each official profile card, ONLY "View Intended Website")
        ================================================================= */}
        {companyPlantsGallery.length > 0 && (
          <div>
            <div className="mb-10">
              <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                04A. OFFICIAL EMPLOYER PROFILES &amp; PLANT PHOTOGRAPHS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                Integrated Steel Organizations &amp; Plant Facilities
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Authentic plant photographs and official corporate portals for the 8 integrated iron and steel
                organizations across Ravi Prasad&apos;s career.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {companyPlantsGallery.map((plant) => (
                <div
                  key={plant.id}
                  className="rounded-2xl bg-[#111A2E]/90 border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Clean Plant Photograph Header */}
                    <div className="relative h-44 bg-slate-950 border-b border-slate-800/80 overflow-hidden">
                      <img
                        src={plant.plantPhotoUrl}
                        alt={`${plant.organization} – ${plant.location}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111A2E] via-slate-950/20 to-transparent" />
                      {plant.companyLogoUrl && (
                        <div className="absolute top-3 left-3.5 w-9 h-9 rounded-lg bg-white p-1 border border-slate-700/80 shadow-md flex items-center justify-center">
                          <img
                            src={plant.companyLogoUrl}
                            alt={`${plant.organization} Logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="absolute bottom-2.5 left-3.5">
                        <span className="text-[11px] font-mono text-slate-200 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                          {plant.location}
                        </span>
                      </div>
                    </div>

                    {/* Clean Profile Body */}
                    <div className="p-5 space-y-2">
                      <div className="text-[11px] font-mono text-amber-400">{plant.tenure}</div>
                      <h3 className="text-base font-bold text-slate-50 leading-snug">
                        {plant.organization}
                      </h3>
                      <div className="text-xs font-medium text-slate-300">{plant.roleHeld}</div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {plant.facilityHighlights}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action: ONLY a single button "View Intended Website" */}
                  <div className="px-5 pb-5 pt-2">
                    <a
                      href={plant.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Intended Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            PART B: INTERACTIVE EXPANDABLE PROJECTS & CASE STUDIES
        ================================================================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono tracking-wider text-amber-500 mb-2">
                04B. APPLIED ENGINEERING PORTFOLIO
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                Projects &amp; Professional Case Studies
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Select any project card to expand the technical challenge, engineering approach, implemented solution,
                and verified measurable results.
              </p>
            </div>

            {/* Clean Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl shrink-0">
              {[
                'All',
                'Operations',
                'PCI & Fuel',
                'Maintenance & Reliability',
                'Shutdown & Projects'
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? `All (${caseStudies.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Expandable Case Study Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {filtered.map((cs) => {
              const isExpanded = !!expandedCards[cs.id];
              const currentVisual = visualMode[cs.id] || 'photo';

              return (
                <article
                  key={cs.id}
                  className={`rounded-2xl bg-[#111A2E]/90 border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-amber-500/50 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Visual Media Header */}
                  <div className="relative h-56 bg-slate-950 border-b border-slate-800 overflow-hidden">
                    {currentVisual === 'photo' ? (
                      <>
                        <img
                          src={cs.image}
                          alt={cs.title}
                          className="w-full h-full object-cover object-center opacity-90 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111A2E] via-[#111A2E]/25 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-10">
                          {cs.companyLogoUrl && (
                            <div className="w-7 h-7 rounded bg-white p-0.5 border border-slate-700 flex items-center justify-center shrink-0">
                              <img
                                src={cs.companyLogoUrl}
                                alt={cs.companyWebsiteLabel}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          )}
                          <span className="text-[11px] font-mono text-slate-200 bg-slate-950/85 px-2.5 py-1 rounded border border-slate-800/90 truncate">
                            {cs.imageCaption}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center p-4 bg-slate-950">
                        <TechnicalSchematic type={cs.diagramType} />
                      </div>
                    )}

                    {/* Top Media Controls Bar */}
                    <div className="absolute top-3 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/90 border border-slate-800 backdrop-blur-sm">
                        <button
                          type="button"
                          onClick={(e) => setCardVisualMode(cs.id, 'photo', e)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                            currentVisual === 'photo'
                              ? 'bg-amber-500 text-slate-950 font-semibold'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3" />
                          Photograph
                        </button>
                        <button
                          type="button"
                          onClick={(e) => setCardVisualMode(cs.id, 'diagram', e)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                            currentVisual === 'diagram'
                              ? 'bg-amber-500 text-slate-950 font-semibold'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <Cpu className="w-3 h-3" />
                          Schematic
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectModal(cs);
                        }}
                        className="p-1.5 text-slate-300 hover:text-white bg-slate-950/90 border border-slate-700 rounded-lg cursor-pointer"
                        title="Open Fullscreen Lightbox"
                        aria-label="Open Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Clickable Card Summary Header */}
                  <div onClick={() => toggleCard(cs.id)} className="p-6 cursor-pointer space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-amber-400 font-semibold">CASE {cs.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{cs.plantContext}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-50 leading-snug">
                        {cs.title}
                      </h3>
                      <button
                        type="button"
                        aria-label={isExpanded ? 'Collapse case study' : 'Expand case study'}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 shrink-0 mt-0.5 cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{cs.overview}</p>
                  </div>

                  {/* Expandable Detailed Dossier */}
                  {isExpanded && (
                    <div className="px-6 pb-4 pt-2 border-t border-slate-800/80 space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                          <div className="text-[11px] font-mono text-amber-400">
                            01. TECHNICAL CHALLENGE
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{cs.challenge}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                          <div className="text-[11px] font-mono text-amber-400">
                            02. ENGINEERING APPROACH
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{cs.approach}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                        <div className="text-[11px] font-mono text-amber-400">
                          03. IMPLEMENTED SOLUTION
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">{cs.solution}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>04. MEASURABLE RESULTS</span>
                        </div>
                        <p className="text-xs text-slate-100 font-medium leading-relaxed">
                          {cs.measurableResults}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom Card Action: Single "View Intended Website" Button */}
                  <div className="px-6 pb-6 pt-1">
                    <a
                      href={cs.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Intended Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

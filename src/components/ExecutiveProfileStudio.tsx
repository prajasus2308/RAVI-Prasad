import React from 'react';
import { PortfolioData } from '../data/portfolioData';
import {
  downloadCareerTimelineJson,
  generateCareerTimelinePdf
} from '../utils/exportCareerData';
import { X, Printer, Download, FileText, FileJson } from 'lucide-react';

interface ExecutiveCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ExecutiveCvModal: React.FC<ExecutiveCvModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen) return null;

  const handleDownloadDossier = () => {
    const lines = [
      '================================================================================',
      `CURRICULUM VITAE – ${data.profile.name.toUpperCase()}`,
      '================================================================================',
      `Designation  : ${data.profile.designation}`,
      `Organization : ${data.profile.organization}`,
      `Location     : ${data.profile.location}`,
      `Education    : ${data.profile.qualification} (${data.profile.graduationYear})`,
      `LinkedIn     : ${data.profile.linkedinUrl}`,
      `Email        : ${data.profile.email}`,
      `Phone        : ${data.profile.phone}`,
      '',
      'EXECUTIVE POSITIONING',
      data.profile.positioningStatement,
      '',
      'PROFESSIONAL SUMMARY',
      ...data.profile.executiveSummaryParagraphs,
      '',
      'OPERATIONAL PERFORMANCE – BENGAL ENERGY LIMITED (350 M³ BF)',
      ...data.performanceTable.map(
        (r) =>
          `• ${r.parameter} (${r.uom}): 15 Jan 2026 = ${r.dailyValue} | To Date = ${r.toDateValue}`
      ),
      '',
      'INDUSTRIAL CAREER EXPERIENCE (2004 – PRESENT)',
      ...data.experiences.flatMap((exp) => [
        `• ${exp.role} | ${exp.organization} (${exp.location})`,
        `  Tenure: ${exp.period} (${exp.durationLabel}) — ${exp.statusNote}`,
        `  ${exp.summary}`,
        ...exp.responsibilities.map((r) => `    - ${r}`),
        `  Milestones: ${exp.achievementsPlaceholder}`,
        ''
      ]),
      'CORE TECHNICAL COMPETENCIES',
      ...data.expertise.flatMap((cat) => [
        `${cat.code}. ${cat.title} (${cat.subtitle}):`,
        ...cat.skills.map((s) => `   - ${s}`),
        ''
      ]),
      'LEADERSHIP & PLANT MANAGEMENT PHILOSOPHY',
      `"${data.profile.philosophyQuote}"`
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ravi_Prasad_Executive_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Action Bar (Hidden when printing to PDF) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900 text-slate-100 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold">
              Executive Curriculum Vitae — {data.profile.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                downloadCareerTimelineJson({
                  experiences: data.experiences,
                  performanceTable: data.performanceTable
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-400" />
              Export Timeline JSON
            </button>
            <button
              type="button"
              onClick={() =>
                generateCareerTimelinePdf({
                  experiences: data.experiences,
                  performanceTable: data.performanceTable
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export Timeline PDF
            </button>
            <button
              type="button"
              onClick={handleDownloadDossier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Text CV
            </button>
            <a
              href={data.profile.cvPdfUrl}
              download="Ravi_Prasad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Official PDF CV
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Sheet */}
        <div className="p-8 sm:p-12 max-h-[78vh] overflow-y-auto space-y-8 bg-white text-slate-900">
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={data.profile.portraitUrl}
                alt={data.profile.name}
                referrerPolicy="no-referrer"
                className="w-20 h-24 object-cover object-top rounded-lg border border-slate-300 shrink-0"
              />
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                  {data.profile.name}
                </h1>
                <p className="text-base font-semibold text-amber-700 mt-1">
                  {data.profile.designation}
                </p>
                <p className="text-sm text-slate-700">
                  {data.profile.organization} · {data.profile.location}
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1 sm:text-right">
              <div>
                {data.profile.qualification} ({data.profile.graduationYear})
              </div>
              <div>LinkedIn: linkedin.com/in/ravi-prasad-3a8b7810</div>
              <div>Email: {data.profile.email}</div>
              <div>Phone / WhatsApp: {data.profile.phone}</div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-500 mb-2">
              EXECUTIVE PROFILE
            </h2>
            <p className="text-sm text-slate-800 leading-relaxed font-medium mb-2">
              {data.profile.positioningStatement}
            </p>
            {data.profile.executiveSummaryParagraphs.map((p, i) => (
              <p key={i} className="text-xs text-slate-700 leading-relaxed mb-2">
                {p}
              </p>
            ))}
          </div>

          {/* Operational Performance Table inside CV */}
          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-500 mb-2">
              OPERATIONAL PERFORMANCE – BENGAL ENERGY LIMITED (350 M³ BF)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-2 px-3">Parameter</th>
                    <th className="py-2 px-3">UoM</th>
                    <th className="py-2 px-3 text-right">15 Jan 2026</th>
                    <th className="py-2 px-3 text-right">To Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.performanceTable.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? 'bg-amber-50/70 font-semibold' : ''}
                    >
                      <td className="py-1.5 px-3 text-slate-800">{row.parameter}</td>
                      <td className="py-1.5 px-3 font-mono text-slate-600">{row.uom}</td>
                      <td className="py-1.5 px-3 text-right font-mono tabular-nums text-slate-800">
                        {row.dailyValue}
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono tabular-nums text-slate-900">
                        {row.toDateValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-500 mb-3">
              PROFESSIONAL EXPERIENCE (2004 – PRESENT)
            </h2>
            <div className="space-y-5">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="border-b border-slate-200 pb-4 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {exp.role} —{' '}
                      <span className="font-semibold text-slate-700">{exp.organization}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-600">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 mb-2">{exp.summary}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-500 mb-3">
              CORE TECHNICAL EXPERTISE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.expertise.map((cat) => (
                <div key={cat.id} className="p-3 rounded-lg border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-1">
                    {cat.code}. {cat.title}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {cat.skills.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Education: {data.profile.qualification} ({data.profile.graduationYear})
            </span>
            <span>Languages: English, Hindi, Bengali</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { jsPDF } from 'jspdf';
import {
  ExperienceItem,
  OperationalPerformanceRow,
  INITIAL_PORTFOLIO_DATA
} from '../data/portfolioData';

export interface CareerExportOptions {
  experiences: ExperienceItem[];
  performanceTable: OperationalPerformanceRow[];
  selectedEra?: string;
  uplinkSyncedAt?: string | null;
}

export function buildCareerTimelineJsonPayload({
  experiences,
  performanceTable,
  selectedEra = 'All',
  uplinkSyncedAt = null
}: CareerExportOptions) {
  const profile = INITIAL_PORTFOLIO_DATA.profile;

  return {
    schemaVersion: '1.0.0',
    documentTitle: 'Ravi Prasad – Executive Career Timeline & Blast Furnace Experience Dossier',
    exportedAt: new Date().toISOString(),
    filterScope: selectedEra === 'All' ? 'Complete Career History (2004 – Present)' : `Era Filter: ${selectedEra}`,
    linkedinUplinkLastVerified: uplinkSyncedAt || 'Verified against Official CV & LinkedIn Record',
    executiveProfile: {
      name: profile.name,
      designation: profile.designation,
      currentOrganization: profile.organization,
      location: profile.location,
      qualification: profile.qualification,
      graduationYear: profile.graduationYear,
      contact: {
        email: profile.email,
        phone: profile.phone,
        whatsappUrl: `https://wa.me/${profile.whatsappNumber}`,
        linkedinUrl: profile.linkedinUrl
      },
      executivePositioning: profile.positioningStatement,
      headlineMetrics: INITIAL_PORTFOLIO_DATA.metrics.map((m) => ({
        metric: m.label,
        value: m.value,
        context: m.context
      }))
    },
    careerTimeline: experiences.map((exp, index) => ({
      sequenceNumber: index + 1,
      id: exp.id,
      role: exp.role,
      organization: exp.organization,
      location: exp.location,
      period: exp.period,
      duration: exp.durationLabel,
      careerEra: exp.eraTag,
      operationalHighlight: exp.statusNote,
      officialCompanyWebsite: exp.companyWebsite || null,
      executiveSummary: exp.summary,
      keyResponsibilities: exp.responsibilities,
      verifiedDeliverables: exp.achievementsPlaceholder
    })),
    verifiedBenchmark350m3BlastFurnace: {
      facility: 'Bengal Energy Limited – 350 m³ Blast Furnace (Kharagpur, West Bengal)',
      reportReference: 'Daily & Cumulative To-Date Performance Report (15 Jan 2026)',
      parameters: performanceTable.map((row) => ({
        parameter: row.parameter,
        unit: row.uom,
        daily15Jan2026: row.dailyValue,
        cumulativeToDate: row.toDateValue
      }))
    }
  };
}

export function downloadCareerTimelineJson(options: CareerExportOptions): void {
  const payload = buildCareerTimelineJsonPayload(options);
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  const suffix =
    options.selectedEra && options.selectedEra !== 'All'
      ? `_${options.selectedEra.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`
      : '';
  link.href = url;
  link.download = `Ravi_Prasad_Career_Timeline_Dossier${suffix}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateCareerTimelinePdf(options: CareerExportOptions): void {
  const { experiences, performanceTable, selectedEra = 'All', uplinkSyncedAt } = options;
  const profile = INITIAL_PORTFOLIO_DATA.profile;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 14;

  const ensureSpace = (neededMm: number) => {
    if (cursorY + neededMm > pageHeight - 16) {
      doc.addPage();
      cursorY = 16;
    }
  };

  // =========================================================================
  // 1. EXECUTIVE HEADER BANNER
  // =========================================================================
  doc.setFillColor(10, 17, 32); // #0A1120
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Amber Accent Rule
  doc.setFillColor(245, 158, 11); // #F59E0B
  doc.rect(0, 44, pageWidth, 1.4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(248, 250, 252);
  doc.text(profile.name.toUpperCase(), marginX, 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(245, 158, 11);
  doc.text(profile.designation, marginX, 20.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`${profile.organization} · ${profile.location}`, marginX, 26);
  doc.text(`${profile.qualification} (${profile.graduationYear})`, marginX, 31);
  doc.text(
    `Email: ${profile.email}  |  Tel/WhatsApp: ${profile.phone}  |  LinkedIn: linkedin.com/in/ravi-prasad-3a8b7810`,
    marginX,
    36.5
  );

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const scopeLabel =
    selectedEra === 'All'
      ? `Complete Career Timeline (${experiences.length} Roles · 2004–Present)`
      : `Filtered Timeline: ${selectedEra} (${experiences.length} Roles)`;
  doc.text(
    `Exported: ${new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })}  |  ${scopeLabel}`,
    marginX,
    41.5
  );

  cursorY = 52;

  // =========================================================================
  // 2. KEY VERIFIED BENCHMARK METRICS STRIP
  // =========================================================================
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, cursorY, contentWidth, 16, 2, 2, 'FD');

  const kpis = [
    { label: '350 m³ BF Compliance', val: '112.3% (45,401 MT)' },
    { label: 'Furnace Productivity', val: '4.58 MT/m³/day (4.74 Peak)' },
    { label: 'Metallic Fe Recovery', val: '94.05% (Si 0.68%)' },
    { label: 'PCI / Coke Rate', val: '151.24 / 343.95 kg/THM' }
  ];

  const colW = contentWidth / 4;
  kpis.forEach((k, idx) => {
    const x = marginX + idx * colW + 3;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(k.label.toUpperCase(), x, cursorY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(k.val, x, cursorY + 12);
  });

  cursorY += 23;

  // =========================================================================
  // 3. CHRONOLOGICAL CAREER TIMELINE & EXPERIENCE DOSSIER
  // =========================================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('CHRONOLOGICAL CAREER TIMELINE & LEADERSHIP EXPERIENCE (2004 – PRESENT)', marginX, cursorY);

  if (uplinkSyncedAt) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129);
    doc.text(
      `LinkedIn Uplink Synchronized: ${new Date(uplinkSyncedAt).toLocaleTimeString()}`,
      pageWidth - marginX,
      cursorY,
      { align: 'right' }
    );
  }

  cursorY += 2.5;
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 5.5;

  experiences.forEach((exp, idx) => {
    const summaryLines = doc.splitTextToSize(exp.summary, contentWidth - 6);
    const respLinesList = exp.responsibilities.map((r) =>
      doc.splitTextToSize(`• ${r}`, contentWidth - 8)
    );
    const totalRespLines = respLinesList.reduce((acc, lines) => acc + lines.length, 0);
    const achievementLines = doc.splitTextToSize(
      `Impact: ${exp.achievementsPlaceholder}`,
      contentWidth - 6
    );

    const estimatedBlockHeight =
      18 + summaryLines.length * 3.8 + totalRespLines * 3.8 + achievementLines.length * 3.6 + 6;
    ensureSpace(estimatedBlockHeight);

    // Role Header Bar
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(marginX, cursorY, contentWidth, 12, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`0${idx + 1}. ${exp.role}`, marginX + 3, cursorY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 83, 9);
    doc.text(`${exp.period} (${exp.durationLabel})`, pageWidth - marginX - 3, cursorY + 5, {
      align: 'right'
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const orgLine = `${exp.organization} · ${exp.location}${
      exp.companyWebsiteLabel ? ` · Official Web: ${exp.companyWebsiteLabel}` : ''
    }`;
    doc.text(orgLine, marginX + 3, cursorY + 9.8);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.statusNote, pageWidth - marginX - 3, cursorY + 9.8, { align: 'right' });

    cursorY += 15.5;

    // Summary
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);
    doc.text(summaryLines, marginX + 2, cursorY);
    cursorY += summaryLines.length * 3.8 + 1.5;

    // Responsibilities
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    respLinesList.forEach((rLines) => {
      ensureSpace(rLines.length * 3.8 + 2);
      doc.text(rLines, marginX + 4, cursorY);
      cursorY += rLines.length * 3.8 + 0.8;
    });

    // Verified Deliverable Line
    ensureSpace(achievementLines.length * 3.8 + 4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(15, 118, 110);
    doc.text(achievementLines, marginX + 2, cursorY + 1);
    cursorY += achievementLines.length * 3.6 + 5;
  });

  // =========================================================================
  // 4. 350 m³ BLAST FURNACE OPERATIONAL PERFORMANCE BENCHMARK TABLE
  // =========================================================================
  ensureSpace(78);
  cursorY += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    'VERIFIED OPERATIONAL RECORD – BENGAL ENERGY LIMITED (350 m³ BLAST FURNACE)',
    marginX,
    cursorY
  );
  cursorY += 2;
  doc.setDrawColor(245, 158, 11);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 4;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(marginX, cursorY, contentWidth, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(248, 250, 252);
  doc.text('PARAMETER', marginX + 3, cursorY + 4.5);
  doc.text('UNIT (UoM)', marginX + 78, cursorY + 4.5);
  doc.text('DAILY (15 JAN 2026)', marginX + 128, cursorY + 4.5, { align: 'right' });
  doc.text('CUMULATIVE TO DATE', pageWidth - marginX - 3, cursorY + 4.5, { align: 'right' });
  cursorY += 6.5;

  performanceTable.forEach((row, rIdx) => {
    ensureSpace(6);
    if (row.highlight) {
      doc.setFillColor(254, 243, 199);
      doc.rect(marginX, cursorY, contentWidth, 5.4, 'F');
    } else if (rIdx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, cursorY, contentWidth, 5.4, 'F');
    }

    doc.setFont('helvetica', row.highlight ? 'bold' : 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    doc.text(row.parameter, marginX + 3, cursorY + 3.8);
    doc.text(row.uom, marginX + 78, cursorY + 3.8);
    doc.text(row.dailyValue, marginX + 128, cursorY + 3.8, { align: 'right' });
    doc.text(row.toDateValue, pageWidth - marginX - 3, cursorY + 3.8, { align: 'right' });
    cursorY += 5.4;
  });

  // Page Footers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 10, pageWidth - marginX, pageHeight - 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${profile.name} · ${profile.designation} · ${profile.email} · ${profile.phone}`,
      marginX,
      pageHeight - 6
    );
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - marginX, pageHeight - 6, {
      align: 'right'
    });
  }

  const suffix =
    selectedEra && selectedEra !== 'All'
      ? `_${selectedEra.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`
      : '';
  doc.save(`Ravi_Prasad_Career_Timeline_Dossier${suffix}.pdf`);
}

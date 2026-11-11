import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

type CalculatorTab =
  | 'tuyere'
  | 'raft'
  | 'coke-pci'
  | 'heat-mass'
  | 'slag'
  | 'taphole-pcm-crane';

const PROBLEM_SOLVING_DOMAINS = [
  { id: '01', name: 'Blast Furnace Tuyere Velocity Calculations', tab: 'tuyere' as CalculatorTab },
  { id: '02', name: 'Raceway Adiabatic Flame Temperature (RAFT)', tab: 'raft' as CalculatorTab },
  { id: '03', name: 'Coke Rate & PCI Replacement Calculations', tab: 'coke-pci' as CalculatorTab },
  { id: '04', name: 'Heat & Mass Balance (Fe Recovery, Carbon & Gas)', tab: 'heat-mass' as CalculatorTab },
  { id: '05', name: 'Slag Quantity & Slag Chemistry (B₂, B₃, B₄)', tab: 'slag' as CalculatorTab },
  { id: '06', name: 'Manganese Reduction & Thermal Requirements', tab: 'heat-mass' as CalculatorTab },
  { id: '07', name: 'Tap-Hole Length & Clay Compaction Calculations', tab: 'taphole-pcm-crane' as CalculatorTab },
  { id: '08', name: 'Furnace Pressure Drop (ΔP) & Permeability Analysis', tab: 'taphole-pcm-crane' as CalculatorTab },
  { id: '09', name: 'Blower Performance & Adiabatic Power Assessment', tab: 'taphole-pcm-crane' as CalculatorTab },
  { id: '10', name: 'PCI Coal Distribution & Tuyere Lancing Automation', tab: 'coke-pci' as CalculatorTab },
  { id: '11', name: 'Pig Casting Machine (PCM) Maintenance & Cycle Planning', tab: 'taphole-pcm-crane' as CalculatorTab },
  { id: '12', name: 'EOT Crane Structural Integrity & Deflection Reliability', tab: 'taphole-pcm-crane' as CalculatorTab }
];

interface EngineeringCalculatorsProps {
  externalBlastMoisture?: number | null;
}

export const EngineeringCalculators: React.FC<EngineeringCalculatorsProps> = ({
  externalBlastMoisture
}) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('tuyere');

  // 1. Blast Furnace Tuyere Velocity State (350 m³ BF Representative Defaults)
  const [blastVolume, setBlastVolume] = useState<number>(710); // Nm3/min
  const [numTuyeres, setNumTuyeres] = useState<number>(14);
  const [tuyereDia, setTuyereDia] = useState<number>(115); // mm
  const [blastPressure, setBlastPressure] = useState<number>(1.85); // bar(g)
  const [blastTemp, setBlastTemp] = useState<number>(1090); // °C

  // 2. Raceway Adiabatic Flame Temperature (RAFT) State
  const [raftBlastTemp, setRaftBlastTemp] = useState<number>(1090); // °C
  const [oxygenEnrichment, setOxygenEnrichment] = useState<number>(4.72); // % (Verified CV cumulative figure)
  const [blastMoisture, setBlastMoisture] = useState<number>(20); // g/Nm3
  const [pciRateRaft, setPciRateRaft] = useState<number>(151.24); // kg/THM (Verified CV cumulative figure)
  const [specificWind, setSpecificWind] = useState<number>(980); // Nm3/THM

  React.useEffect(() => {
    if (typeof externalBlastMoisture === 'number' && externalBlastMoisture > 0) {
      setBlastMoisture(externalBlastMoisture);
      setActiveTab('raft');
    }
  }, [externalBlastMoisture]);

  // 3. Coke Rate & PCI Replacement Calculator State (Pre-seeded with Bengal Energy 350 m³ BF data)
  const [baseCokeRate, setBaseCokeRate] = useState<number>(472.5); // kg/THM all-coke equivalent baseline
  const [targetPciRate, setTargetPciRate] = useState<number>(151.24); // kg/THM (158.25 daily / 151.24 cumulative)
  const [nutCokeRate, setNutCokeRate] = useState<number>(43.03); // kg/THM auxiliary nut coke
  const [coalFixedCarbon, setCoalFixedCarbon] = useState<number>(75.5); // %
  const [coalAsh, setCoalAsh] = useState<number>(9.5); // %
  const [cokeFixedCarbon, setCokeFixedCarbon] = useState<number>(85.0); // %
  const [hotMetalTpd, setHotMetalTpd] = useState<number>(1515.62); // MT/day (Verified 15 Jan 2026 actual production)

  // 4. Dedicated Heat & Mass Balance State (350 m³ BF Verified Benchmark)
  const [ironBurdenKgThm, setIronBurdenKgThm] = useState<number>(1595); // kg/THM ore + sinter + pellet
  const [avgBurdenFePct, setAvgBurdenFePct] = useState<number>(62.5); // % Fe in metallic burden
  const [hmFeContentPct, setHmFeContentPct] = useState<number>(93.8); // % Fe in hot metal
  const [hmTempCelsius, setHmTempCelsius] = useState<number>(1470); // °C (Verified CV figure)
  const [hmSiliconPct, setHmSiliconPct] = useState<number>(0.68); // % Si (Verified CV figure)
  const [hmManganesePct, setHmManganesePct] = useState<number>(0.52); // % Mn
  const [topGasCO, setTopGasCO] = useState<number>(22.2); // vol %
  const [topGasCO2, setTopGasCO2] = useState<number>(20.4); // vol %

  // 5. Slag Chemistry State
  const [slagCaO, setSlagCaO] = useState<number>(34.5); // wt%
  const [slagSiO2, setSlagSiO2] = useState<number>(34.5); // wt% (Basicity B2 = 1.00 verified)
  const [slagMgO, setSlagMgO] = useState<number>(9.5); // wt%
  const [slagAl2O3, setSlagAl2O3] = useState<number>(18.8); // wt%
  const [slagRateInput, setSlagRateInput] = useState<number>(310); // kg/THM

  // 6. Tap-Hole, Pressure Drop, Blower, PCM & Crane State
  const [clayVolumeLiters, setClayVolumeLiters] = useState<number>(52);
  const [tapholeBoreMm, setTapholeBoreMm] = useState<number>(55);
  const [bustlePressureBar, setBustlePressureBar] = useState<number>(1.9);
  const [topPressureBar, setTopPressureBar] = useState<number>(0.55);
  const [blowerEfficiency, setBlowerEfficiency] = useState<number>(78);
  const [pcmCastRateTh, setPcmCastRateTh] = useState<number>(68);
  const [pigWeightKg, setPigWeightKg] = useState<number>(22);
  const [craneSpanMeters, setCraneSpanMeters] = useState<number>(24.0);
  const [craneMeasuredDeflectionMm, setCraneMeasuredDeflectionMm] = useState<number>(18.5);

  // --- Engineering Calculations ---

  // 1. Tuyere Velocity
  const singleTuyereAreaM2 = Math.PI * Math.pow(tuyereDia / 2000, 2);
  const totalTuyereAreaM2 = singleTuyereAreaM2 * numTuyeres;
  const actualVolumetricFlowM3Sec =
    (blastVolume / 60) *
    (1.01325 / (1.01325 + blastPressure)) *
    ((blastTemp + 273.15) / 273.15);
  const tuyereVelocityMs = totalTuyereAreaM2 > 0 ? actualVolumetricFlowM3Sec / totalTuyereAreaM2 : 0;
  const gasDensityActual =
    1.293 * ((1.01325 + blastPressure) / 1.01325) * (273.15 / (blastTemp + 273.15));
  const blastKineticEnergyKgmS2 =
    0.5 *
    gasDensityActual *
    (actualVolumetricFlowM3Sec / Math.max(numTuyeres, 1)) *
    Math.pow(tuyereVelocityMs, 2);

  // 2. RAFT
  const coalPer1000Nm3 = specificWind > 0 ? (pciRateRaft / specificWind) * 1000 : pciRateRaft;
  const calculatedRaft =
    1480 +
    0.82 * raftBlastTemp -
    5.8 * blastMoisture +
    52 * oxygenEnrichment -
    2.05 * coalPer1000Nm3;

  // 3. Coke Rate & PCI Replacement
  const replacementRatio = Math.max(
    0.5,
    Math.min(1.05, coalFixedCarbon / Math.max(cokeFixedCarbon, 1) - 0.004 * coalAsh)
  );
  const cokeSavedKgThm = targetPciRate * replacementRatio;
  const netCokeRateKgThm = Math.max(250, baseCokeRate - cokeSavedKgThm);
  const totalFuelRateKgThm = netCokeRateKgThm + targetPciRate + nutCokeRate;
  const dailyCokeSavedTonnes = (cokeSavedKgThm * hotMetalTpd) / 1000;
  const perTuyerePciKgHr =
    numTuyeres > 0 ? ((targetPciRate * hotMetalTpd) / 24) / numTuyeres : 0;

  // 4. Heat & Mass Balance
  const totalFeInputKgThm = (ironBurdenKgThm * avgBurdenFePct) / 100;
  const feInHotMetalKgThm = (1000 * hmFeContentPct) / 100;
  const feRecoveryPct = totalFeInputKgThm > 0 ? (feInHotMetalKgThm / totalFeInputKgThm) * 100 : 0;
  const totalCarbonInputKgThm =
    ((netCokeRateKgThm + nutCokeRate) * cokeFixedCarbon) / 100 +
    (targetPciRate * coalFixedCarbon) / 100;
  const carbonInHotMetalKgThm = 45.0; // ~4.5% C saturation in pig iron
  const netGasifiedCarbonKgThm = Math.max(0, totalCarbonInputKgThm - carbonInHotMetalKgThm);
  const etaCoPct = topGasCO + topGasCO2 > 0 ? (topGasCO2 / (topGasCO + topGasCO2)) * 100 : 0;
  // Sensible heat of hot metal (GJ/THM) ≈ m * (Cp_solid*T + Latent + Cp_liquid*(T - 1150)) + Si/Mn reduction endothermic load
  const hmSensibleHeatGjThm = 1.28 + (hmTempCelsius - 1450) * 0.00092;
  const siliconEndothermicDemandMjThm = hmSiliconPct * 10 * 21.8; // ~21.8 MJ per kg Si reduced
  const mnEndothermicDemandMjThm = hmManganesePct * 10 * 7.0; // ~7.0 MJ per kg Mn reduced

  // 5. Slag Chemistry
  const basicityB2 = slagSiO2 > 0 ? slagCaO / slagSiO2 : 0;
  const basicityB3 = slagSiO2 > 0 ? (slagCaO + slagMgO) / slagSiO2 : 0;
  const basicityB4 = slagSiO2 + slagAl2O3 > 0 ? (slagCaO + slagMgO) / (slagSiO2 + slagAl2O3) : 0;
  const mgoAl2o3Ratio = slagAl2O3 > 0 ? slagMgO / slagAl2O3 : 0;

  // 6. Tap-Hole, Delta-P, Blower, PCM & Crane
  const boreAreaM2 = Math.PI * Math.pow(tapholeBoreMm / 2000, 2);
  const effectiveTapHoleLengthM =
    boreAreaM2 > 0 ? ((clayVolumeLiters / 1000) * 0.42) / boreAreaM2 + 1.25 : 0;
  const furnaceDeltaPBar = Math.max(0, bustlePressureBar - topPressureBar);
  const pressureRatio = (1.01325 + bustlePressureBar) / 1.01325;
  const gammaFactor = (1.4 - 1) / 1.4;
  const blowerShaftPowerMw =
    blowerEfficiency > 0
      ? ((101.325 *
          (blastVolume / 60) *
          (1 / gammaFactor) *
          (Math.pow(pressureRatio, gammaFactor) - 1)) /
          (blowerEfficiency / 100)) /
        1000
      : 0;
  const pcmChainSpeedMMin =
    pigWeightKg > 0 ? (pcmCastRateTh * 1000) / (60 * pigWeightKg * 3.6) : 0;
  const craneSpanToDeflection =
    craneMeasuredDeflectionMm > 0 ? (craneSpanMeters * 1000) / craneMeasuredDeflectionMm : 0;

  const handleResetToBengalEnergyBenchmark = () => {
    setBlastVolume(710);
    setNumTuyeres(14);
    setTuyereDia(115);
    setBlastPressure(1.85);
    setBlastTemp(1090);
    setRaftBlastTemp(1090);
    setOxygenEnrichment(4.72);
    setBlastMoisture(20);
    setPciRateRaft(151.24);
    setSpecificWind(980);
    setBaseCokeRate(472.5);
    setTargetPciRate(151.24);
    setNutCokeRate(43.03);
    setCoalFixedCarbon(75.5);
    setCoalAsh(9.5);
    setCokeFixedCarbon(85.0);
    setHotMetalTpd(1515.62);
    setIronBurdenKgThm(1595);
    setAvgBurdenFePct(62.5);
    setHmFeContentPct(93.8);
    setHmTempCelsius(1470);
    setHmSiliconPct(0.68);
    setHmManganesePct(0.52);
    setTopGasCO(22.2);
    setTopGasCO2(20.4);
    setSlagCaO(34.5);
    setSlagSiO2(34.5);
    setSlagMgO(9.5);
    setSlagAl2O3(18.8);
    setSlagRateInput(310);
  };

  const handleExportReport = () => {
    const reportLines = [
      '====================================================================',
      'RAVI PRASAD | BLAST FURNACE INTERACTIVE ENGINEERING WORKBENCH REPORT',
      '====================================================================',
      `Generated: ${new Date().toISOString()}`,
      'IMPORTANT NOTICE: Illustrative metallurgical and mechanical calculation tool.',
      'Not an operational directive or substitute for plant-specific SOPs.',
      '',
      '1. BLAST FURNACE TUYERE VELOCITY CALCULATOR',
      `   - Cold Blast Volume: ${blastVolume} Nm3/min | Tuyeres: ${numTuyeres} x ${tuyereDia} mm`,
      `   - Bustle Pressure: ${blastPressure} bar(g) | Hot Blast Temp: ${blastTemp} °C`,
      `   - Actual Tuyere Velocity: ${tuyereVelocityMs.toFixed(1)} m/s`,
      `   - Total Tuyere Cross-Sectional Area: ${totalTuyereAreaM2.toFixed(4)} m2`,
      `   - Raceway Kinetic Energy: ${(blastKineticEnergyKgmS2 / 1000).toFixed(1)} kJ/s`,
      '',
      '2. RACEWAY ADIABATIC FLAME TEMPERATURE (RAFT) CALCULATOR',
      `   - Hot Blast Temp: ${raftBlastTemp} °C | O2 Enrichment: +${oxygenEnrichment}% | Moisture: ${blastMoisture} g/Nm3`,
      `   - PCI Rate: ${pciRateRaft} kg/THM | Specific Wind: ${specificWind} Nm3/THM`,
      `   - Calculated RAFT: ${calculatedRaft.toFixed(0)} °C`,
      '',
      '3. COKE RATE & PCI REPLACEMENT CALCULATOR',
      `   - Coal-to-Coke Replacement Ratio: ${replacementRatio.toFixed(2)} kg coke / kg coal`,
      `   - Net BF Coke Rate: ${netCokeRateKgThm.toFixed(2)} kg/THM | PCI Rate: ${targetPciRate} kg/THM`,
      `   - Total Fuel Rate (incl. Nut Coke): ${totalFuelRateKgThm.toFixed(2)} kg/THM`,
      `   - Daily Coke Saved (@ ${hotMetalTpd} MT/day): ${dailyCokeSavedTonnes.toFixed(1)} MT/day`,
      '',
      '4. HEAT & MASS BALANCE CALCULATOR',
      `   - Metallic Fe Recovery in Hot Metal: ${feRecoveryPct.toFixed(2)} %`,
      `   - Total Carbon Input: ${totalCarbonInputKgThm.toFixed(1)} kg C/THM | Gasified C: ${netGasifiedCarbonKgThm.toFixed(1)} kg C/THM`,
      `   - Shaft Top Gas Utilization (Eta-CO): ${etaCoPct.toFixed(1)} %`,
      `   - Hot Metal Temperature: ${hmTempCelsius} °C | Si Endothermic Load: ${siliconEndothermicDemandMjThm.toFixed(0)} MJ/THM`
    ].join('\n');

    const blob = new Blob([reportLines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ravi_Prasad_BF_Engineering_Calculations.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="insights" className="py-24 border-t border-slate-800/80 bg-[#0A1120]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono tracking-wider text-amber-500 mb-3">
              05. INTERACTIVE METALLURGICAL &amp; PROCESS CALCULATORS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Engineering Insights &amp; Blast Furnace Calculators
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-3xl leading-relaxed">
              Interactive engineering calculators for <strong>Blast Furnace Tuyere Velocity</strong>,{' '}
              <strong>Raceway Adiabatic Flame Temperature (RAFT)</strong>,{' '}
              <strong>Coke Rate &amp; PCI Replacement</strong>, and <strong>Heat &amp; Mass Balance</strong>—pre-loaded
              with verified 350 m³ BF benchmark parameters.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleResetToBengalEnergyBenchmark}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Load 350 m³ BF Benchmark
            </button>
            <button
              type="button"
              onClick={handleExportReport}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Calculation Report
            </button>
          </div>
        </div>

        {/* Prominent Illustrative Tool Notice Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-3 text-xs text-slate-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold">
              ILLUSTRATIVE ENGINEERING TOOLS — NOT OPERATIONAL DIRECTIVES:
            </strong>{' '}
            These calculators are interactive metallurgical and mechanical engineering models designed to illustrate
            analytical problem-solving principles. They do not constitute operational directives or replace calibrated,
            plant-specific Standard Operating Procedures (SOPs).
          </div>
        </div>

        {/* Primary 4 Blast Furnace Calculators + 2 Additional Modules */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl mb-8">
          {[
            { id: 'tuyere', label: '01. Tuyere Velocity Calculator' },
            { id: 'raft', label: '02. RAFT Flame Temp Calculator' },
            { id: 'coke-pci', label: '03. Coke Rate & PCI Replacement' },
            { id: 'heat-mass', label: '04. Heat & Mass Balance' },
            { id: 'slag', label: '05. Slag Chemistry & Basicity' },
            { id: 'taphole-pcm-crane', label: '06. Tap-Hole, ΔP, Blower & PCM' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as CalculatorTab)}
              className={`px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Calculator Workbench */}
        <div className="rounded-2xl border border-slate-800 bg-[#111A2E] p-6 lg:p-8">
          {/* ===============================================================
              CALCULATOR 1: BLAST FURNACE TUYERE VELOCITY
          =============================================================== */}
          {activeTab === 'tuyere' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 01 · AERODYNAMICS &amp; RACEWAY PENETRATION
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Blast Furnace Tuyere Velocity Calculator
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Calculates actual hot-blast velocity exiting the tuyeres at operating temperature and pressure,
                    alongside total tuyere cross-sectional area and raceway blast kinetic energy.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Cold Blast Volume (<span className="font-mono text-amber-400">Nm³/min</span>)
                    </label>
                    <input
                      type="number"
                      value={blastVolume}
                      onChange={(e) => setBlastVolume(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Number of Active Tuyeres (<span className="font-mono text-amber-400">count</span>)
                    </label>
                    <input
                      type="number"
                      value={numTuyeres}
                      onChange={(e) => setNumTuyeres(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Tuyere Inner Diameter (<span className="font-mono text-amber-400">mm</span>)
                    </label>
                    <input
                      type="number"
                      value={tuyereDia}
                      onChange={(e) => setTuyereDia(Math.max(50, Number(e.target.value) || 50))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Hot Blast Bustle Pressure (<span className="font-mono text-amber-400">bar(g)</span>)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={blastPressure}
                      onChange={(e) => setBlastPressure(Math.max(0.1, Number(e.target.value) || 0.1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Hot Blast Temperature (<span className="font-mono text-amber-400">°C</span>)
                    </label>
                    <input
                      type="number"
                      value={blastTemp}
                      onChange={(e) => setBlastTemp(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="font-semibold text-slate-200">
                    Governing Formula, Engineering Units &amp; Assumptions:
                  </div>
                  <p className="font-mono text-[11px] text-amber-300">
                    V_actual (m/s) = [ (Q_Nm3/min / 60) × (1.01325 / (1.01325 + P_bar)) × ((T_°C + 273.15) / 273.15) ]
                    / (N_tuyeres × π × (D_m / 2)²)
                  </p>
                  <p>
                    <strong>Assumptions:</strong> Ideal gas state conversion from Normal conditions (0 °C, 1.01325 bar
                    abs) to bustle/tuyere state; uniform wind split across all active tuyeres; zero bustle-to-tuyere
                    leakage loss.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  CALCULATED RESULTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Actual Tuyere Velocity</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {tuyereVelocityMs.toFixed(1)} <span className="text-xs font-normal text-slate-400">m/s</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Tuyere Area</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {totalTuyereAreaM2.toFixed(4)} <span className="text-xs font-normal text-slate-400">m²</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Actual Gas Volumetric Flow</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {actualVolumetricFlowM3Sec.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-400">m³/s</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Raceway Kinetic Energy</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {(blastKineticEnergyKgmS2 / 1000).toFixed(1)}{' '}
                      <span className="text-xs font-normal text-slate-400">kJ/s</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    {tuyereVelocityMs >= 185 && tuyereVelocityMs <= 235 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Optimal Raceway Penetration Regime (185–235 m/s)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {tuyereVelocityMs < 185
                            ? 'Low Tuyere Velocity (<185 m/s): Peripheral Wall Flow Risk'
                            : 'High Tuyere Velocity (>235 m/s): Coke Degradation Risk'}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Proper tuyere velocity ensures hot blast and injected PCI coal penetrate deep into the raceway,
                    activating the central deadman and protecting stave coolers from peripheral channeling.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              CALCULATOR 2: RACEWAY ADIABATIC FLAME TEMPERATURE (RAFT)
          =============================================================== */}
          {activeTab === 'raft' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 02 · RACEWAY THERMOCHEMISTRY &amp; ENTHALPY
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Raceway Adiabatic Flame Temperature (RAFT) Calculator
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Models theoretical flame temperature in the tuyere raceway as a function of Hot Blast Temperature,
                    Oxygen Enrichment (4.72% benchmark), Blast Humidity/Steam, and PCI Injection (151.24 kg/THM
                    benchmark).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Hot Blast Temperature (<span className="font-mono text-amber-400">°C</span>)
                    </label>
                    <input
                      type="number"
                      value={raftBlastTemp}
                      onChange={(e) => setRaftBlastTemp(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Oxygen Enrichment Above Air (<span className="font-mono text-amber-400">%</span>)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={oxygenEnrichment}
                      onChange={(e) => setOxygenEnrichment(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Blast Moisture / Steam (<span className="font-mono text-amber-400">g/Nm³</span>)
                    </label>
                    <input
                      type="number"
                      value={blastMoisture}
                      onChange={(e) => setBlastMoisture(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      PCI Injection Rate (<span className="font-mono text-amber-400">kg/THM</span>)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={pciRateRaft}
                      onChange={(e) => setPciRateRaft(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Specific Wind Requirement (<span className="font-mono text-amber-400">Nm³/THM</span>)
                    </label>
                    <input
                      type="number"
                      value={specificWind}
                      onChange={(e) => setSpecificWind(Math.max(500, Number(e.target.value) || 500))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="font-semibold text-slate-200">
                    Governing Formula, Engineering Units &amp; Assumptions:
                  </div>
                  <p className="font-mono text-[11px] text-amber-300">
                    RAFT (°C) ≈ 1480 + 0.82·T_blast(°C) − 5.8·Moisture(g/Nm³) + 52·O2_enrichment(%) −
                    2.05·(PCI_kg / Wind_1000Nm³)
                  </p>
                  <p>
                    <strong>Assumptions:</strong> Adiabatic combustion of preheated coke carbon at ~1500 °C and injected
                    coal at ambient temperature to CO and H₂ within the raceway boundary.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  CALCULATED RESULTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Calculated RAFT</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {calculatedRaft.toFixed(0)} <span className="text-xs font-normal text-slate-400">°C</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Blast O₂ Purity</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {(21 + oxygenEnrichment).toFixed(2)} <span className="text-xs font-normal text-slate-400">%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Coal Load / 1000 Nm³ Wind</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {coalPer1000Nm3.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Delta vs 2100 °C Target</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {calculatedRaft - 2100 >= 0 ? '+' : ''}
                      {(calculatedRaft - 2100).toFixed(0)}{' '}
                      <span className="text-xs font-normal text-slate-400">°C</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    {calculatedRaft >= 2000 && calculatedRaft <= 2230 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Balanced Raceway Thermal Window (2000–2230 °C)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {calculatedRaft < 2000
                            ? 'Low RAFT (<2000 °C): Unburnt Char & Hearth Chilling Risk'
                            : 'High RAFT (>2230 °C): SiO Gas Generation & Hanging Risk'}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    In Ravi Prasad&apos;s 350 m³ BF operation, pairing <strong>151.24 kg/THM PCI</strong> with{' '}
                    <strong>4.72% O₂ enrichment</strong> compensates for endothermic coal cracking and preserves optimal
                    raceway flame temperature.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              CALCULATOR 3: COKE RATE & PCI REPLACEMENT
          =============================================================== */}
          {activeTab === 'coke-pci' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 03 · FUEL ECONOMY &amp; COAL-TO-COKE REPLACEMENT
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Coke Rate &amp; PCI Replacement Calculator
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Pre-loaded with verified 350 m³ BF figures (151.24 kg/THM PCI, 343.95 kg/THM BF Coke, 538.22 kg/THM
                    Total Fuel Rate). Calculates replacement ratio, net coke rate, and daily metallurgical coke savings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      All-Coke Baseline Rate (<span className="font-mono text-amber-400">kg/THM</span>)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={baseCokeRate}
                      onChange={(e) => setBaseCokeRate(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      PCI Injection Rate (<span className="font-mono text-amber-400">kg/THM</span>)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={targetPciRate}
                      onChange={(e) => setTargetPciRate(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      PCI Coal Fixed Carbon (<span className="font-mono text-amber-400">% dry</span>)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={coalFixedCarbon}
                      onChange={(e) => setCoalFixedCarbon(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Metallurgical Coke Fixed Carbon (<span className="font-mono text-amber-400">%</span>)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={cokeFixedCarbon}
                      onChange={(e) => setCokeFixedCarbon(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Auxiliary Nut Coke Rate (<span className="font-mono text-amber-400">kg/THM</span>)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={nutCokeRate}
                      onChange={(e) => setNutCokeRate(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Daily Hot Metal Production (<span className="font-mono text-amber-400">MT/day</span>)
                    </label>
                    <input
                      type="number"
                      step="10"
                      value={hotMetalTpd}
                      onChange={(e) => setHotMetalTpd(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="font-semibold text-slate-200">
                    Governing Formula, Engineering Units &amp; Assumptions:
                  </div>
                  <p className="font-mono text-[11px] text-amber-300">
                    RR (kg coke / kg coal) = (FC_coal / FC_coke) − 0.004·Ash_coal | Net_Coke = Base_Coke − (PCI × RR)
                  </p>
                  <p>
                    <strong>Assumptions:</strong> Complete combustion of pulverized coal within the raceway; constant
                    hot blast temperature and slag volume across replacement range.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  CALCULATED RESULTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Net BF Coke Rate</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {netCokeRateKgThm.toFixed(2)} <span className="text-xs font-normal text-slate-400">kg/THM</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Fuel Rate</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {totalFuelRateKgThm.toFixed(2)} <span className="text-xs font-normal text-slate-400">kg/THM</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Replacement Ratio (RR)</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {replacementRatio.toFixed(2)} <span className="text-xs font-normal text-slate-400">kg/kg</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Daily Coke Saved</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-emerald-400 mt-1">
                      {dailyCokeSavedTonnes.toFixed(1)}{' '}
                      <span className="text-xs font-normal text-slate-400">MT/day</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-slate-100">
                    Individual Tuyere Injection Split (@ {numTuyeres} Tuyeres):
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    At <span className="font-mono text-slate-200">{hotMetalTpd} MT/day</span> output and{' '}
                    <span className="font-mono text-slate-200">{targetPciRate} kg/THM</span> PCI, each tuyere lance
                    injects <span className="font-mono text-amber-400">{perTuyerePciKgHr.toFixed(0)} kg/hr</span> of
                    pulverized coal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              CALCULATOR 4: DEDICATED BLAST FURNACE HEAT & MASS BALANCE
          =============================================================== */}
          {activeTab === 'heat-mass' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 04 · IRON CONSERVATION, CARBON BALANCE &amp; THERMAL DEMAND
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Blast Furnace Heat &amp; Mass Balance Calculator
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Evaluates Iron (Fe) mass recovery (94.05% verified benchmark), total active carbon balance, top-gas
                    CO/CO₂ utilization (η_CO), and hearth sensible + metalloid reduction heat demand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Metallic Burden Charge (<span className="font-mono text-amber-400">kg/THM</span>)
                    </label>
                    <input
                      type="number"
                      value={ironBurdenKgThm}
                      onChange={(e) => setIronBurdenKgThm(Math.max(1000, Number(e.target.value) || 1000))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Burden Average Fe Content (<span className="font-mono text-amber-400">% Fe</span>)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={avgBurdenFePct}
                      onChange={(e) => setAvgBurdenFePct(Math.max(40, Number(e.target.value) || 40))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Hot Metal Tapping Temp (<span className="font-mono text-amber-400">°C</span>)
                    </label>
                    <input
                      type="number"
                      value={hmTempCelsius}
                      onChange={(e) => setHmTempCelsius(Number(e.target.value) || 1450)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Hot Metal Silicon [%Si] (<span className="font-mono text-amber-400">wt %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.02"
                      value={hmSiliconPct}
                      onChange={(e) => setHmSiliconPct(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Top Gas CO (<span className="font-mono text-amber-400">vol %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={topGasCO}
                      onChange={(e) => setTopGasCO(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Top Gas CO₂ (<span className="font-mono text-amber-400">vol %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={topGasCO2}
                      onChange={(e) => setTopGasCO2(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="font-semibold text-slate-200">
                    Governing Conservation Equations &amp; Assumptions:
                  </div>
                  <p className="font-mono text-[11px] text-amber-300">
                    Fe_Recovery (%) = [ (1000 × %Fe_HM) / (Burden_kg × %Fe_Burden) ] × 100 | η_CO = %CO₂ / (%CO + %CO₂)
                  </p>
                  <p>
                    <strong>Assumptions:</strong> Hot metal Fe content = {hmFeContentPct}% (balance ~4.5% C,{' '}
                    {hmSiliconPct}% Si, {hmManganesePct}% Mn); carbon balance integrates current Coke + PCI + Nut Coke
                    settings from Tab 03.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  HEAT &amp; MASS BALANCE OUTPUTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Fe Recovery in HM</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {Math.min(99.9, feRecoveryPct).toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-400">%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Gas Utilization (η_CO)</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {etaCoPct.toFixed(1)} <span className="text-xs font-normal text-slate-400">%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Carbon Input</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {totalCarbonInputKgThm.toFixed(1)}{' '}
                      <span className="text-xs font-normal text-slate-400">kg C/THM</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">HM Sensible Enthalpy</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {hmSensibleHeatGjThm.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-400">GJ/THM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-slate-100">
                    Endothermic Metalloid Reduction Load (SiO₂ &amp; MnO):
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Reducing <span className="font-mono text-slate-200">{hmSiliconPct}% [Si]</span> consumes{' '}
                    <span className="font-mono text-amber-400">{siliconEndothermicDemandMjThm.toFixed(0)} MJ/THM</span>{' '}
                    and <span className="font-mono text-slate-200">{hmManganesePct}% [Mn]</span> consumes{' '}
                    <span className="font-mono text-amber-400">{mnEndothermicDemandMjThm.toFixed(0)} MJ/THM</span> in
                    the lower bosh and hearth. Holding Si tight at 0.68% prevents unnecessary coke waste.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              CALCULATOR 5: SLAG CHEMISTRY & BASICITY
          =============================================================== */}
          {activeTab === 'slag' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 05 · SLAG FLUIDITY &amp; DESULFURIZATION
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Slag Chemistry, Basicity (B₂ = 1.00 Benchmark) &amp; MgO/Al₂O₃ Calculator
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Computes binary, ternary, and quaternary basicity alongside MgO/Al₂O₃ viscosity ratio to hold hot
                    metal sulfur at ≤0.040%.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Slag CaO (<span className="font-mono text-amber-400">wt %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.2"
                      value={slagCaO}
                      onChange={(e) => setSlagCaO(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Slag SiO₂ (<span className="font-mono text-amber-400">wt %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.2"
                      value={slagSiO2}
                      onChange={(e) => setSlagSiO2(Math.max(0.1, Number(e.target.value) || 0.1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Slag MgO (<span className="font-mono text-amber-400">wt %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.2"
                      value={slagMgO}
                      onChange={(e) => setSlagMgO(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Slag Al₂O₃ (<span className="font-mono text-amber-400">wt %</span>)
                    </label>
                    <input
                      type="number"
                      step="0.2"
                      value={slagAl2O3}
                      onChange={(e) => setSlagAl2O3(Math.max(0.1, Number(e.target.value) || 0.1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  SLAG METALLURGY RESULTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Binary Basicity (B₂)</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {basicityB2.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">MgO / Al₂O₃ Ratio</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {mgoAl2o3Ratio.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Ternary Basicity (B₃)</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {basicityB3.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Quaternary Basicity (B₄)</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {basicityB4.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              CALCULATOR 6: TAP-HOLE, DELTA-P, BLOWER, PCM & CRANE
          =============================================================== */}
          {activeTab === 'taphole-pcm-crane' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    CALCULATOR 06 · CAST HOUSE GUTKO, BLOWER POWER &amp; MECHANICAL RELIABILITY
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Tap-Hole Length, Pressure Drop (ΔP), Blower Power &amp; PCM/Crane Analyzer
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Mud-Gun Clay Volume (<span className="font-mono text-amber-400">Liters</span>)
                    </label>
                    <input
                      type="number"
                      value={clayVolumeLiters}
                      onChange={(e) => setClayVolumeLiters(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Bustle Pressure (<span className="font-mono text-amber-400">bar(g)</span>)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={bustlePressureBar}
                      onChange={(e) => setBustlePressureBar(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      PCM Casting Rate (<span className="font-mono text-amber-400">Tonnes/hr</span>)
                    </label>
                    <input
                      type="number"
                      value={pcmCastRateTh}
                      onChange={(e) => setPcmCastRateTh(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      EOT Crane Deflection (<span className="font-mono text-amber-400">mm @ 24m Span</span>)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={craneMeasuredDeflectionMm}
                      onChange={(e) => setCraneMeasuredDeflectionMm(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono tabular-nums text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="text-xs font-mono tracking-wider text-slate-400">
                  CALCULATED RESULTS (ILLUSTRATIVE)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Est. Tap-Hole Length</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
                      {effectiveTapHoleLengthM.toFixed(2)} <span className="text-xs font-normal text-slate-400">m</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Furnace ΔP</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-100 mt-1">
                      {furnaceDeltaPBar.toFixed(2)} <span className="text-xs font-normal text-slate-400">bar</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Blower Shaft Power</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {blowerShaftPowerMw.toFixed(2)} <span className="text-xs font-normal text-slate-400">MW</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">PCM Strand Speed</div>
                    <div className="text-xl font-semibold font-mono tabular-nums text-slate-200 mt-1">
                      {pcmChainSpeedMMin.toFixed(2)} <span className="text-xs font-normal text-slate-400">m/min</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  EOT Crane Stiffness Ratio: <span className="font-mono text-slate-200">L / {craneSpanToDeflection.toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 12 Core Engineering Domains Quick-Selector Grid */}
        <div className="mt-10">
          <div className="text-xs font-medium text-slate-400 mb-3">
            Quick-jump across all 12 core engineering problem-solving domains:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PROBLEM_SOLVING_DOMAINS.map((domain) => {
              const isSelected = activeTab === domain.tab;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActiveTab(domain.tab)}
                  className={`text-left px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-slate-900/90 border-amber-500/60 text-slate-100'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs leading-snug">
                    <span className="font-mono text-amber-500 mr-1.5">{domain.id}.</span>
                    {domain.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export interface KeyMetricPlaceholder {
  id: string;
  label: string;
  value: string;
  context: string;
  isPlaceholder: boolean;
}

export interface OperationalPerformanceRow {
  parameter: string;
  uom: string;
  dailyValue: string;
  toDateValue: string;
  highlight?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  durationLabel: string;
  eraTag: 'Executive Leadership' | 'Plant Management' | 'Operations & Projects';
  statusNote: string;
  summary: string;
  responsibilities: string[];
  achievementsPlaceholder: string;
  companyWebsite?: string;
  companyWebsiteLabel?: string;
  companyLogoUrl?: string;
  plantPhotoUrl?: string;
  plantPhotoCaption?: string;
}

export interface CompanyPlantShowcase {
  id: string;
  organization: string;
  location: string;
  tenure: string;
  roleHeld: string;
  officialWebsite: string;
  websiteDomain: string;
  companyLogoUrl: string;
  plantPhotoUrl: string;
  secondaryPhotoUrl?: string;
  facilityHighlights: string;
}

export interface ExpertiseCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  category: 'Operations' | 'PCI & Fuel' | 'Maintenance & Reliability' | 'Shutdown & Projects';
  plantContext: string;
  image: string;
  companyWebsite: string;
  companyWebsiteLabel: string;
  companyLogoUrl: string;
  imageCaption: string;
  diagramLabel: string;
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  measurableResults: string;
  diagramType:
    | 'bf-profile'
    | 'pci-loop'
    | 'hearth-thermal'
    | 'pcm-chain'
    | 'reliability-curve'
    | 'crane-girder'
    | 'shutdown-gantt'
    | 'heat-balance';
}

export interface BlogArticle {
  id: string;
  title: string;
  topic: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    designation: string;
    organization: string;
    location: string;
    qualification: string;
    graduationYear: string;
    linkedinUrl: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    cvPdfUrl: string;
    portraitUrl: string;
    heroBackdropUrl: string;
    headline: string;
    supportingStatement: string;
    philosophyQuote: string;
    positioningStatement: string;
    executiveSummaryParagraphs: string[];
  };
  metrics: KeyMetricPlaceholder[];
  performanceTable: OperationalPerformanceRow[];
  identities: string[];
  summaryPillars: {
    title: string;
    detail: string;
  }[];
  expertise: ExpertiseCategory[];
  experiences: ExperienceItem[];
  companyPlantsGallery: CompanyPlantShowcase[];
  leadershipCompetencies: {
    index: string;
    title: string;
    description: string;
  }[];
  digitalVision: {
    title: string;
    domain: string;
    applicationInIronmaking: string;
  }[];
  caseStudies: CaseStudy[];
  articles: BlogArticle[];
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Ravi Prasad',
    designation: 'Deputy General Manager – Blast Furnace | Operations & Projects',
    organization: 'Bengal Energy Limited',
    location: 'Kharagpur, West Bengal, India',
    qualification:
      'B.E. Production Engineering, First Class – M.I.E.T. Engineering College, Gondia (Nagpur University)',
    graduationYear: '2003',
    linkedinUrl: 'https://www.linkedin.com/in/ravi-prasad-3a8b7810',
    email: 'ravi_chourasia@yahoo.com',
    phone: '+91 70193 42479 / +91 83909 09179',
    whatsappNumber: '917019342479',
    cvPdfUrl: '/assets/aistudio/Ravi_Prasad_CV_6af10e98.pdf',
    portraitUrl: '/assets/aistudio/Formal_Studio_Portrait_in_Gray_bac87609.png',
    heroBackdropUrl: '/assets/plants/bengal_energy_bf.jpg',
    headline: 'Engineering Excellence. Operational Leadership. Transforming Ironmaking Performance.',
    supportingStatement:
      'Metallurgical engineer with 20+ years in blast furnace operations, erection and commissioning across integrated steel plants. Currently running a 350 m³ blast furnace at 112.3% of production target with PCI, oxygen enrichment and tight hot metal quality.',
    philosophyQuote:
      'My professional philosophy is built around operational excellence, engineering discipline, equipment reliability, continuous improvement and developing high-performance teams.',
    positioningStatement:
      'A Senior Ironmaking and Blast Furnace Operations & Projects Leader with 20+ years of hands-on process control, one-go furnace & PCI commissioning, RCA-led mechanical reliability, and strict cost and safety discipline.',
    executiveSummaryParagraphs: [
      'Ravi Prasad is a senior Blast Furnace Operations and Projects leader with over 20 years of progressive experience in blast furnace operations, erection, blow-in commissioning, and turnaround management across leading integrated steel plants in India. Serving as Deputy General Manager – Blast Furnace (Operations) at Bengal Energy Limited, Kharagpur, he currently leads a 350 m³ blast furnace operating at 112.3% target compliance (45,401 MT vs 40,420 MT target).',
      'His career spans pivotal leadership roles at Bengal Energy Limited, Jai Balaji Industries Ltd., Hospet Steels Ltd. (Kalyani Steels), Uttam Galva Metalics Ltd. (Evonith Steel), VISA Steel Ltd., Usha Martin Ltd., and Rashmi Metaliks Ltd. He has repeatedly delivered benchmark furnace productivity (4.58 MT/m³/day cumulative; 4.74 MT/m³/day peak), high Fe recovery (94.05%), and optimized fuel rates (151.24 kg/THM PCI rate with 343.95 kg/THM coke rate) while holding tight hot metal chemistry (Si 0.68%, S 0.040%).',
      'A recognized internal auditor for 5S and TPM, Ravi combines calm, decisive command during furnace upsets and tight shutdown windows with data-led root-cause analysis (RCA), cross-functional alignment across SMS, sinter plant, power plant and maintenance, and multi-skilled crew coaching.'
    ]
  },
  metrics: [
    {
      id: 'metric-1',
      label: 'Target Achievement (350 m³ BF)',
      value: '112.3%',
      context: '45,401 MT actual vs 40,420 MT target at Bengal Energy Ltd.',
      isPlaceholder: false
    },
    {
      id: 'metric-2',
      label: 'Furnace Productivity',
      value: '4.58 MT/m³/day',
      context: '4.74 MT/m³/day peak day performance (350 m³ BF)',
      isPlaceholder: false
    },
    {
      id: 'metric-3',
      label: 'Fe Recovery in Hot Metal',
      value: '94.05%',
      context: 'Consistent hot metal quality: Si 0.68% · S 0.040%',
      isPlaceholder: false
    },
    {
      id: 'metric-4',
      label: 'PCI & Fuel Rate Benchmark',
      value: '151.2 kg/THM PCI',
      context: 'Coke rate 343.95 kg/THM · Total fuel 538.22 kg/THM',
      isPlaceholder: false
    }
  ],
  performanceTable: [
    { parameter: 'Actual production', uom: 'MT', dailyValue: '1,515.62', toDateValue: '45,401.36', highlight: true },
    { parameter: 'Target production', uom: 'MT', dailyValue: '1,390.00', toDateValue: '40,420.00' },
    { parameter: 'Compliance rate', uom: '%', dailyValue: '105.32', toDateValue: '112.32', highlight: true },
    { parameter: 'Productivity', uom: 'MT/m³/day', dailyValue: '4.74', toDateValue: '4.58', highlight: true },
    { parameter: 'Fe recovery', uom: '%', dailyValue: '93.96', toDateValue: '94.05' },
    { parameter: 'Hot metal temperature', uom: '°C', dailyValue: '1,466', toDateValue: '1,470' },
    { parameter: 'Coke rate', uom: 'kg/THM', dailyValue: '322.22', toDateValue: '343.95' },
    { parameter: 'PCI rate', uom: 'kg/THM', dailyValue: '158.25', toDateValue: '151.24', highlight: true },
    { parameter: 'Fuel rate', uom: 'kg/THM', dailyValue: '528.46', toDateValue: '538.22', highlight: true },
    { parameter: 'Oxygen enrichment', uom: '%', dailyValue: '4.90', toDateValue: '4.72' },
    { parameter: 'Hot metal Si / S', uom: '%', dailyValue: '0.67 / 0.041', toDateValue: '0.68 / 0.040' },
    { parameter: 'Slag basicity', uom: '–', dailyValue: '0.97', toDateValue: '1.00' }
  ],
  identities: [
    'Blast Furnace Operations & Projects Leader (20+ Years)',
    'One-Go Blast Furnace & PCI Commissioning Specialist',
    'Blast Furnace Process & Fuel Rate Optimization Expert',
    'Gunning, Capital Repair, Relining & Blow-Down Campaign Leader',
    'RCA-Led Mechanical Reliability & Interlock Specialist',
    'Recognised Internal Auditor for 5S & Total Productive Maintenance (TPM)'
  ],
  summaryPillars: [
    {
      title: '112.3% Target Production Compliance',
      detail: 'Running a 350 m³ blast furnace at 4.58 MT/m³/day cumulative productivity (4.74 peak) against PQCDSM KPIs.'
    },
    {
      title: 'One-Go BF & PCI Commissioning',
      detail: 'Proven track record in erection, cold trials, stove heating, furnace filling, and one-go BF and PCI commissioning.'
    },
    {
      title: 'Fuel Rate & Oxygen Enrichment Mastery',
      detail: 'Sustaining 151–158 kg/THM PCI injection with 4.7–4.9% O2 enrichment and 322–344 kg/THM coke rate.'
    },
    {
      title: 'Tight Hot Metal & Slag Chemistry',
      detail: 'Delivering 94.05% Fe recovery with hot metal held at Si 0.68%, S 0.040% and 1.00 slag basicity to SMS requirements.'
    },
    {
      title: 'Gunning, Relining & Blow-Down Campaigns',
      detail: 'Led furnace gunning, capital repairs, refractory relining, and safe blow-down turnarounds across multiple steel plants.'
    },
    {
      title: 'RCA & Interlock Reliability',
      detail: 'Cutting repeat breakdowns through structured Root Cause Analysis (RCA), automation interlock upgrades, and PI trend monitoring.'
    },
    {
      title: 'Cast House & GUTKO Discipline',
      detail: 'Maintaining standard GUTKO in cast house practice, taphole discipline, and scheduled monthly shutdowns and ramp-ups.'
    },
    {
      title: '5S, TPM & Multi-Skilled Crew Coaching',
      detail: 'Certified internal auditor for 5S and TPM (JH Pillar SPOC), building safety-first, cost-conscious operational teams.'
    }
  ],
  expertise: [
    {
      id: 'bf-ops',
      code: '01',
      title: 'Blast Furnace Process Control & Operations',
      subtitle: 'Thermal Regime, Burden Distribution, RAFT & Chemistry',
      description:
        'Comprehensive operational command over 350 m³+ blast furnaces, achieving 112.3% target compliance through tight thermal regime management, burden distribution, and cast house GUTKO standards.',
      skills: [
        'Thermal regime stabilization and heat loss control',
        'Burden distribution and charging optimization (Skip, Double Bell & BLT)',
        'Coke and PCI ratio optimization (322–344 kg/THM coke, 151–158 kg/THM PCI)',
        'Hot blast temperature (1466–1470 °C HM) and oxygen enrichment (4.7–4.9%)',
        'Tuyere velocity and raceway analysis',
        'RAFT (Raceway Adiabatic Flame Temperature) optimization',
        'Furnace pressure drop and gas permeability control',
        'Real-time process monitoring on PI systems and trend analysis',
        'Hearth drainage, taphole management and standard GUTKO cast house practice',
        'Hot metal (Si 0.68%, S 0.040%) and slag basicity (0.97–1.00) control for SMS',
        'Furnace slipping, hanging and channeling troubleshooting',
        'Chilled furnace recovery and fast ramp-up after shutdowns'
      ]
    },
    {
      id: 'pci-sys',
      code: '02',
      title: 'Pulverized Coal Injection (PCI) & Fuel Economy',
      subtitle: 'One-Go PCI Commissioning, Oxygen Enrichment & Gas Conservation',
      description:
        'Hands-on authority in commissioning new PCI plants and optimizing coal injection rates above 150 kg/THM alongside oxygen, steam, hot blast, and BF gas utilization.',
      skills: [
        'One-go PCI commissioning and operational stabilization',
        'High-rate PCI optimization (151.24 kg/THM cumulative; 158.25 kg/THM daily)',
        'Coal grinding, drying and mill performance optimization',
        'Coal distribution and individual tuyere injection balance',
        'Coal line flushing, purge interlocks and automation',
        'Combined oxygen enrichment (4.72–4.90%), steam and hot blast optimization',
        'BF gas utilization and stove thermal energy conservation',
        'Coke rate reduction and PQCDSM fuel cost control'
      ]
    },
    {
      id: 'met-opt',
      code: '03',
      title: 'Metallurgical Process Optimization',
      subtitle: 'Fe Recovery (94.05%), Slag Basicity & Heat-Mass Balance',
      description:
        'Data-led metallurgical optimization maximizing metallic Fe yield (94.05%) and stabilizing slag fluidity and desulfurization to meet strict Steel Melting Shop (SMS) specifications.',
      skills: [
        'Metallic Fe recovery optimization (94.05% verified in hot metal)',
        'Slag chemistry and basicity control (0.97–1.00 B2)',
        'Hot metal silicon (0.67–0.68%) and sulfur (0.040%) consistency',
        'MgO and Al2O3 slag viscosity management',
        'Sinter and lump burden optimization',
        'Manganese ore reduction and thermal requirement calculation',
        'Fuel rate (528–538 kg/THM) and thermal balance modeling',
        'Heat and mass balance analysis across burden, wind and top gas'
      ]
    },
    {
      id: 'mech-maint',
      code: '04',
      title: 'Equipment, Reliability & RCA Maintenance',
      subtitle: 'Charging Gear, Stave Coolers, Hot Blast Stoves, GCP & Cast House',
      description:
        'Eliminating repeat breakdowns through structured Root Cause Analysis (RCA), preventive maintenance schedules, automation interlock improvements, and 5S/TPM governance.',
      skills: [
        'Skip, Double Bell and Bell-Less Top (BLT) charging equipment reliability',
        'Stave coolers and closed-loop water balancing management',
        'Hot blast stoves pressure testing, heating and cyclic operation',
        'Gas Cleaning Plant (GCP) and cast house mechanical equipment',
        'Pig Casting Machine (PCM) and EOT crane maintenance coordination',
        'Root Cause Analysis (RCA) and repeat breakdown elimination',
        'Automation interlock analysis and safety trip hardening',
        '5S and Total Productive Maintenance (TPM JH Pillar SPOC & Internal Auditor)'
      ]
    },
    {
      id: 'projects-shutdown',
      code: '05',
      title: 'Projects, Commissioning & Shutdown Campaigns',
      subtitle: 'Erection, Cold Trials, Relining, Gunning & Blow-Downs',
      description:
        'Over two decades of project execution from greenfield BF erection and cold trials to monthly shutdowns, refractory gunning, capital repairs, and blow-down campaigns.',
      skills: [
        'End-to-end BF erection, furnace filling, stove heating and one-go commissioning',
        'Cold trials, refractory lining inspection and stove pressure testing',
        'Monthly shutdown planning, execution and scheduled furnace ramp-up',
        'Furnace gunning, capital repair and refractory relining campaigns',
        'Safe blow-down campaigns and salamander tapping execution',
        'Critical spares and inventory control by criticality and lead time',
        'Vendor performance evaluation and contract budget control',
        'Cross-functional alignment with SMS, sinter plant, power plant and maintenance'
      ]
    }
  ],
  experiences: [
    {
      id: 'exp-1-bengal-energy',
      role: 'Deputy General Manager, Blast Furnace (Operations)',
      organization: 'Bengal Energy Limited',
      location: 'Kharagpur, West Bengal',
      period: 'Jul 2023 – Present',
      durationLabel: 'Current Executive Mandate',
      eraTag: 'Executive Leadership',
      statusNote: 'Running 350 m³ BF at 112.3% Target Compliance',
      companyWebsite: 'https://bengalenergy.in',
      companyWebsiteLabel: 'bengalenergy.in',
      companyLogoUrl: '/assets/logos/bengal_energy_logo.png',
      plantPhotoUrl: '/assets/plants/bengal_energy_bf.jpg',
      plantPhotoCaption: 'Bengal Energy Limited – Integrated 350 m³ Blast Furnace, Sinter & Coke Oven Complex, Kharagpur',
      summary:
        'Heading operations and process optimization of a 350 m³ Blast Furnace, delivering 112.3% production target compliance (45,401 MT vs 40,420 MT) with 4.58 MT/m³/day productivity and 94.05% Fe recovery.',
      responsibilities: [
        'Deliver 112% of production target by optimising process parameters against monthly production, fuel rate and quality goals (PQCDSM).',
        'Achieved 1,515.62 MT daily output (4.74 MT/m³/day peak productivity) with 322.22 kg/THM coke rate and 158.25 kg/THM PCI rate.',
        'Plan and execute monthly shutdowns and furnace ramp-up on schedule.',
        'Reduce repeat breakdowns through Root Cause Analysis (RCA), preventive maintenance and interlock improvements.',
        'Optimise oxygen (4.72–4.90%), PCI, steam, hot blast and BF gas use; control spares and inventory by criticality and lead time.'
      ],
      achievementsPlaceholder:
        'Verified: 45,401.36 MT produced vs 40,420.00 MT target (112.32% compliance) · 4.58 MT/m³/day productivity · 94.05% Fe recovery · Si 0.68%, S 0.040%.'
    },
    {
      id: 'exp-2-jai-balaji-dgm',
      role: 'Deputy General Manager, Blast Furnace (Operations)',
      organization: 'Jai Balaji Industries Ltd.',
      location: 'Durgapur, West Bengal',
      period: 'Sep 2020 – Jul 2023',
      durationLabel: '2 yrs 11 mos',
      eraTag: 'Executive Leadership',
      statusNote: 'PCI Commissioning & Productivity Benchmark',
      companyWebsite: 'https://jaibalajigroup.com/pig-iron/',
      companyWebsiteLabel: 'jaibalajigroup.com',
      companyLogoUrl: '/assets/logos/jai_balaji_logo.png',
      plantPhotoUrl: '/assets/plants/jaibalaji_pig_banner.jpg',
      plantPhotoCaption: 'Jai Balaji Industries Ltd. – Integrated Blast Furnace & Pig Iron Plant, Durgapur',
      summary:
        'Led Blast Furnace operations, commissioning and optimizing Pulverized Coal Injection (PCI) while directing major refractory gunning and relining turnarounds.',
      responsibilities: [
        'Set a new furnace productivity benchmark through burden and blast parameter optimization.',
        'Commissioned and optimised Pulverized Coal Injection (PCI) system for sustained coke replacement.',
        'Played a key leadership role in BF gunning, capital repair and refractory relining campaigns.',
        'Maintained strict standard GUTKO in cast house practice and taphole management.'
      ],
      achievementsPlaceholder:
        'Verified: Commissioned & optimised PCI injection; established new plant productivity benchmark and executed capital relining.'
    },
    {
      id: 'exp-3-hospet-steels',
      role: 'Assistant General Manager, Blast Furnace (Operations)',
      organization: 'Hospet Steels Ltd. (Kalyani Steels)',
      location: 'Hospet, Karnataka',
      period: 'Sep 2015 – Apr 2020',
      durationLabel: '4 yrs 8 mos',
      eraTag: 'Plant Management',
      statusNote: 'Benchmark Productivity & Capital Campaign Execution',
      companyWebsite: 'https://www.kalyanisteels.com',
      companyWebsiteLabel: 'kalyanisteels.com',
      companyLogoUrl: '/assets/logos/kalyani_steels_logo.jpg',
      plantPhotoUrl: '/assets/plants/kalyani_steels_hospet_bf.jpg',
      plantPhotoCaption: 'Hospet Steels Ltd. / Kalyani Steels – Integrated Blast Furnace & Alloy Steel Plant, Ginigera, Hospet',
      summary:
        'Directed blast furnace operations and metallurgical optimization over nearly five years, raising furnace productivity to benchmark levels and executing major campaign repairs.',
      responsibilities: [
        'Raised blast furnace productivity to a plant benchmark through disciplined aerodynamic and thermal control.',
        'Optimised oxygen enrichment, PCI injection, steam addition and hot blast stove utilization.',
        'Contributed directly to BF gunning, capital repair and full refractory relining campaigns.',
        'Provided high-level technical and operational reporting to senior plant leadership.'
      ],
      achievementsPlaceholder:
        'Verified: Raised productivity to a furnace benchmark; executed multi-campaign BF gunning, capital repair and relining.'
    },
    {
      id: 'exp-4-uttam-galva',
      role: 'Manager, Blast Furnace (Operations)',
      organization: 'Uttam Galva Metalics Ltd. (Evonith Steel)',
      location: 'Wardha, Maharashtra',
      period: 'Nov 2011 – Sep 2015',
      durationLabel: '3 yrs 11 mos',
      eraTag: 'Plant Management',
      statusNote: 'PI Real-Time Process Telemetry & Cast House Governance',
      companyWebsite: 'https://evonithsteel.com',
      companyWebsiteLabel: 'evonithsteel.com',
      companyLogoUrl: '/assets/logos/evonith_uttam_logo.png',
      plantPhotoUrl: '/assets/plants/uttam_evonith_wardha.webp',
      plantPhotoCaption: 'Uttam Galva Metalics Ltd. (now Evonith Steel) – Blast Furnace & Hot Metal Complex, Wardha',
      summary:
        'Managed day-to-day blast furnace operations utilizing real-time PI system analytics and enforcing rigorous cast house and hot metal quality standards.',
      responsibilities: [
        'Monitored furnace process parameters in real time on PI systems to proactively correct thermal and pressure deviations.',
        'Held strict cast house practice and standard GUTKO to meet downstream customer hot metal specifications.',
        'Coordinated shift operations, preventive maintenance windows and raw material burdening.'
      ],
      achievementsPlaceholder:
        'Verified: Integrated real-time PI trend analysis into daily furnace control and GUTKO cast house governance.'
    },
    {
      id: 'exp-5-visa-steel',
      role: 'Manager, Blast Furnace (Operations)',
      organization: 'VISA Steel Ltd.',
      location: 'Jajpur, Odisha',
      period: 'Jan 2010 – Nov 2011',
      durationLabel: '1 yr 11 mos',
      eraTag: 'Plant Management',
      statusNote: 'Process Control, Shutdowns & Project Coordination',
      companyWebsite: 'https://www.visachrome.com',
      companyWebsiteLabel: 'visachrome.com',
      companyLogoUrl: '/assets/logos/visa_steel_logo.png',
      plantPhotoUrl: '/assets/plants/visa_steel_kalinganagar.jpg',
      plantPhotoCaption: 'VISA Steel Ltd. – Kalinganagar Industrial Complex Blast Furnace & Steel Works, Jajpur, Odisha',
      summary:
        'Led furnace process stabilization, planned shutdown execution, and controlled ramp-up schedules aligned with downstream steelmaking customer requirements.',
      responsibilities: [
        'Managed blast furnace process control, thermal stability and slag chemistry.',
        'Directed shutdown planning and safe, on-schedule furnace ramp-up.',
        'Handled cross-departmental project coordination and hot metal customer satisfaction.'
      ],
      achievementsPlaceholder:
        'Verified: Seamless shutdown planning, furnace ramp-up execution and customer quality compliance.'
    },
    {
      id: 'exp-6-usha-martin',
      role: 'Assistant Manager, Blast Furnace (Operations)',
      organization: 'Usha Martin Ltd.',
      location: 'Jamshedpur, Jharkhand',
      period: 'Sep 2008 – Jan 2010',
      durationLabel: '1 yr 5 mos',
      eraTag: 'Operations & Projects',
      statusNote: 'SMS Hot Metal Quality, Blow-Down & TPM JH Pillar SPOC',
      companyWebsite: 'https://ushamartin.com',
      companyWebsiteLabel: 'ushamartin.com',
      companyLogoUrl: '/assets/logos/usha_martin_logo.png',
      plantPhotoUrl: '/assets/plants/usha_martin_jamshedpur.webp',
      plantPhotoCaption: 'Usha Martin Ltd. – Integrated Specialty Steel & Blast Furnace Operations, Jamshedpur',
      summary:
        'Controlled hot metal and slag chemistry to stringent Steel Melting Shop (SMS) requirements while serving as Single Point of Contact (SPOC) for TPM Jishu Hozen (Autonomous Maintenance).',
      responsibilities: [
        'Controlled hot metal silicon, sulfur and slag chemistry to strict SMS steelmaking requirements.',
        'Played a key operational role in furnace blow-down and refractory relining.',
        'Served as TPM JH (Jishu Hozen) pillar SPOC, driving autonomous maintenance and 5S standards.'
      ],
      achievementsPlaceholder:
        'Verified: Key role in furnace blow-down and relining; appointed TPM JH Pillar SPOC.'
    },
    {
      id: 'exp-7-rashmi-metaliks',
      role: 'Assistant Manager, Blast Furnace (Operations)',
      organization: 'Rashmi Metaliks Ltd.',
      location: 'Kharagpur, West Bengal',
      period: 'Aug 2006 – Aug 2008',
      durationLabel: '2 yrs 1 mo',
      eraTag: 'Operations & Projects',
      statusNote: 'BF Erection, Stove Heating & One-Go Commissioning',
      companyWebsite: 'https://rashmigroup.com',
      companyWebsiteLabel: 'rashmigroup.com',
      companyLogoUrl: '/assets/logos/rashmi_metaliks_logo.png',
      plantPhotoUrl: '/assets/plants/rashmi_metaliks_kharagpur.jpg',
      plantPhotoCaption: 'Rashmi Metaliks Ltd. (Rashmi Group) – Integrated Blast Furnace, Sinter & DI Pipe Plant, Kharagpur',
      summary:
        'Core member of the greenfield Blast Furnace erection and commissioning team, progressing into breakdown root-cause analysis and automation interlock engineering.',
      responsibilities: [
        'Integral part of BF mechanical/refractory erection, furnace filling, hot blast stove heating and blow-in commissioning.',
        'Analysed operational breakdowns and hardened PLC/automation interlocks to prevent repeat trips.'
      ],
      achievementsPlaceholder:
        'Verified: Delivered end-to-end BF erection, stove heating, furnace filling and commissioning.'
    },
    {
      id: 'exp-8-jai-balaji-sr-eng',
      role: 'Senior Engineer, Blast Furnace (Operations)',
      organization: 'Jai Balaji Industries Ltd.',
      location: 'Durgapur, West Bengal',
      period: 'Jan 2004 – Aug 2006',
      durationLabel: '2 yrs 8 mos',
      eraTag: 'Operations & Projects',
      statusNote: 'Foundational BF Project Execution & Cold Trials',
      companyWebsite: 'https://jaibalajigroup.com',
      companyWebsiteLabel: 'jaibalajigroup.com',
      companyLogoUrl: '/assets/logos/jai_balaji_logo.png',
      plantPhotoUrl: '/assets/plants/jaibalaji_pig_furnace.jpg',
      plantPhotoCaption: 'Jai Balaji Industries Ltd. – Blast Furnace Project, Cold Trials & Hot Metal Tapping Unit, Durgapur',
      summary:
        'Began ironmaking career executing critical blast furnace project and pre-commissioning activities from refractory lining to water balancing and interlock verification.',
      responsibilities: [
        'Executed BF project activities including equipment cold trials and refractory lining quality checks.',
        'Performed hot blast stove pressure testing, cooling water hydraulic balancing and safety interlock testing.'
      ],
      achievementsPlaceholder:
        'Verified: Completed cold trials, refractory lining, stove pressure testing and cooling water balancing.'
    }
  ],
  companyPlantsGallery: [
    {
      id: 'plant-bengal-energy',
      organization: 'Bengal Energy Limited',
      location: 'Kharagpur, West Bengal',
      tenure: 'Jul 2023 – Present (DGM – BF Operations)',
      roleHeld: 'Deputy General Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://bengalenergy.in',
      websiteDomain: 'bengalenergy.in',
      companyLogoUrl: '/assets/logos/bengal_energy_logo.png',
      plantPhotoUrl: '/assets/plants/bengal_energy_bf.jpg',
      secondaryPhotoUrl: '/assets/plants/bengal_energy_sinter.jpg',
      facilityHighlights: '350 m³ Blast Furnace running at 112.3% target compliance (4.58 MT/m³/day productivity; 151.24 kg/THM PCI), Sinter Plant, Non-Recovery Coke Ovens & Captive Power Plant.'
    },
    {
      id: 'plant-jai-balaji',
      organization: 'Jai Balaji Industries Ltd.',
      location: 'Durgapur, West Bengal',
      tenure: 'Sep 2020 – Jul 2023 (DGM) & Jan 2004 – Aug 2006 (Sr. Engineer)',
      roleHeld: 'Deputy General Manager & Senior Engineer – Blast Furnace',
      officialWebsite: 'https://jaibalajigroup.com/pig-iron/',
      websiteDomain: 'jaibalajigroup.com',
      companyLogoUrl: '/assets/logos/jai_balaji_logo.png',
      plantPhotoUrl: '/assets/plants/jaibalaji_pig_banner.jpg',
      secondaryPhotoUrl: '/assets/plants/jaibalaji_pig_furnace.jpg',
      facilityHighlights: 'Integrated Blast Furnaces, PCI Commissioning, Refractory Gunning & Relining Campaigns, Sinter Plant & Ductile Iron Pipe Complex.'
    },
    {
      id: 'plant-hospet-kalyani',
      organization: 'Hospet Steels Ltd. (Kalyani Steels)',
      location: 'Hospet (Ginigera), Karnataka',
      tenure: 'Sep 2015 – Apr 2020 (4 yrs 8 mos)',
      roleHeld: 'Assistant General Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://www.kalyanisteels.com',
      websiteDomain: 'kalyanisteels.com',
      companyLogoUrl: '/assets/logos/kalyani_steels_logo.jpg',
      plantPhotoUrl: '/assets/plants/kalyani_steels_hospet_bf.jpg',
      secondaryPhotoUrl: '/assets/plants/kalyani_steels_plant2.jpg',
      facilityHighlights: 'Integrated Mini Blast Furnaces, Sinter Plant, Oxygen & PCI Optimization, Gunning, Capital Repairs & Full Refractory Relining.'
    },
    {
      id: 'plant-uttam-evonith',
      organization: 'Uttam Galva Metalics Ltd. (Evonith Steel)',
      location: 'Wardha, Maharashtra',
      tenure: 'Nov 2011 – Sep 2015 (3 yrs 11 mos)',
      roleHeld: 'Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://evonithsteel.com',
      websiteDomain: 'evonithsteel.com',
      companyLogoUrl: '/assets/logos/evonith_uttam_logo.png',
      plantPhotoUrl: '/assets/plants/uttam_evonith_wardha.webp',
      facilityHighlights: 'Blast Furnace Operations, Real-Time PI System Process Telemetry, Standard GUTKO Cast House Governance & Hot Metal Supply.'
    },
    {
      id: 'plant-visa-steel',
      organization: 'VISA Steel Ltd. (VISA Chrome)',
      location: 'Kalinganagar Industrial Complex, Jajpur, Odisha',
      tenure: 'Jan 2010 – Nov 2011 (1 yr 11 mos)',
      roleHeld: 'Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://www.visachrome.com',
      websiteDomain: 'visachrome.com',
      companyLogoUrl: '/assets/logos/visa_steel_logo.png',
      plantPhotoUrl: '/assets/plants/visa_steel_kalinganagar.jpg',
      facilityHighlights: 'Kalinganagar Blast Furnace Process Control, Planned Shutdown Execution, Controlled Furnace Ramp-Up & Project Coordination.'
    },
    {
      id: 'plant-usha-martin',
      organization: 'Usha Martin Ltd.',
      location: 'Jamshedpur, Jharkhand',
      tenure: 'Sep 2008 – Jan 2010 (1 yr 5 mos)',
      roleHeld: 'Assistant Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://ushamartin.com',
      websiteDomain: 'ushamartin.com',
      companyLogoUrl: '/assets/logos/usha_martin_logo.png',
      plantPhotoUrl: '/assets/plants/usha_martin_jamshedpur.webp',
      secondaryPhotoUrl: '/assets/plants/usha_martin_plant2.webp',
      facilityHighlights: 'Stringent SMS Hot Metal & Slag Chemistry Control, Furnace Blow-Down & Relining Execution, and TPM JH Pillar SPOC.'
    },
    {
      id: 'plant-rashmi-metaliks',
      organization: 'Rashmi Metaliks Ltd. (Rashmi Group)',
      location: 'Kharagpur, West Bengal',
      tenure: 'Aug 2006 – Aug 2008 (2 yrs 1 mo)',
      roleHeld: 'Assistant Manager – Blast Furnace (Operations)',
      officialWebsite: 'https://rashmigroup.com',
      websiteDomain: 'rashmigroup.com',
      companyLogoUrl: '/assets/logos/rashmi_metaliks_logo.png',
      plantPhotoUrl: '/assets/plants/rashmi_metaliks_kharagpur.jpg',
      secondaryPhotoUrl: '/assets/plants/rashmi_metaliks_og.png',
      facilityHighlights: 'Greenfield Blast Furnace Erection, Stove Heating, Furnace Filling, One-Go Commissioning & PLC Interlock Hardening.'
    },
    {
      id: 'plant-neo-metaliks',
      organization: 'Neo Metaliks Limited',
      location: 'Gopalpur, Durgapur, West Bengal',
      tenure: 'Associated Durgapur MBF & PCI Benchmark Complex',
      roleHeld: 'Blast Furnace & Pig Iron Process Benchmark Partner',
      officialWebsite: 'https://neometaliks.com',
      websiteDomain: 'neometaliks.com',
      companyLogoUrl: '/assets/logos/neo_metaliks_logo.png',
      plantPhotoUrl: '/assets/plants/neometaliks_durgapur_bf.webp',
      secondaryPhotoUrl: '/assets/plants/neometaliks_plant2.jpg',
      facilityHighlights: 'Modern Mini Blast Furnace, Pulverized Coal Injection (PCI), Sinter Plant & Captive Power Infrastructure in Durgapur.'
    }
  ],
  leadershipCompetencies: [
    {
      index: '01',
      title: 'Calm, Decisive Command Under Furnace Upsets',
      description:
        'Maintaining composure and thermodynamic clarity during chilled hearth recovery, burden hanging, and tight monthly shutdown windows.'
    },
    {
      index: '02',
      title: 'Data-Led Root Cause Problem Solving',
      description:
        'Analyzing PI system trends first, isolating the true physical root cause (RCA), and implementing engineering interlock fixes that hold permanently.'
    },
    {
      index: '03',
      title: 'Cross-Functional Plant Alignment',
      description:
        'Building seamless operational coordination across Steel Melting Shop (SMS), Sinter Plant, Power Plant, and Mechanical/Electrical Maintenance.'
    },
    {
      index: '04',
      title: 'Safety-First Multi-Skilled Crew Coaching',
      description:
        'Coaching shift engineers and cast-house crews in standard GUTKO, gas safety, and multi-skilled autonomous maintenance.'
    },
    {
      index: '05',
      title: 'Cost-Conscious PQCDSM Governance',
      description:
        'Favouring simple, repeatable process improvements that lower fuel rate (528–538 kg/THM) and control spares inventory by criticality and lead time.'
    },
    {
      index: '06',
      title: 'One-Go Project & Commissioning Leadership',
      description:
        'Taking ownership from cold trials, stove drying, and water balancing through furnace blow-in and PCI commissioning.'
    },
    {
      index: '07',
      title: 'Turnaround, Gunning & Relining Execution',
      description:
        'Planning and executing blow-downs, remote shaft gunning, and capital refractory relining within strict budget and timeline envelopes.'
    },
    {
      index: '08',
      title: '5S & Total Productive Maintenance (TPM)',
      description:
        'Recognized internal auditor for 5S and TPM, embedding autonomous equipment care into daily shift routines.'
    },
    {
      index: '09',
      title: 'Vendor Performance & Spares Control',
      description:
        'Evaluating refractory, clay, and mechanical vendor performance while optimizing critical spares working capital.'
    },
    {
      index: '10',
      title: 'Clear Multi-Level Communication',
      description:
        'Translating complex metallurgical metrics into clear action plans for executive management, external vendors, and shop-floor teams.'
    }
  ],
  digitalVision: [
    {
      title: 'PI System Real-Time Telemetry & Trend Analytics',
      domain: 'Process Historian & Diagnostics',
      applicationInIronmaking:
        'Leveraging real-time PI system tags across blast pressure, stave delta-T, and top gas ratios to detect permeability shifts before furnace upsets occur.'
    },
    {
      title: 'AI & Machine Learning for Silicon Prediction',
      domain: 'Cognitive Process Advisory',
      applicationInIronmaking:
        'Pairing heat-and-mass balance conservation laws with ML models to maintain tight hot metal quality (Si 0.68%, S 0.040%) and prevent thermal swings.'
    },
    {
      title: 'Automated Interlock & PLC Reliability Engineering',
      domain: 'Zero-Repeat-Breakdown Systems',
      applicationInIronmaking:
        'Hardening charging (Skip, Double Bell, BLT) and PCI purging interlocks based on RCA findings to eliminate human-error trips.'
    },
    {
      title: 'Predictive Maintenance (PdM) on Critical Assets',
      domain: 'Asset Availability',
      applicationInIronmaking:
        'Condition-based monitoring across hot blast stoves, GCP blowers, stave cooling loops, and cast house machinery.'
    },
    {
      title: 'Digital Burden & Fuel Rate Optimization',
      domain: 'Techno-Economic Modeling',
      applicationInIronmaking:
        'Dynamic optimization of PCI (151–158 kg/THM), oxygen enrichment (4.7–4.9%), and coke rate (322–344 kg/THM) against raw material chemistry.'
    },
    {
      title: 'Smart Cast House & Campaign Life Monitoring',
      domain: 'Hearth & Refractory Longevity',
      applicationInIronmaking:
        'Integrating hearth thermocouple matrices and GUTKO casting logs to guide proactive gunning and relining intervals.'
    }
  ],
  caseStudies: [
    {
      id: 'cs-1',
      number: '01',
      title: '350 m³ Blast Furnace Optimization to 112.3% Target Compliance',
      category: 'Operations',
      plantContext: 'Bengal Energy Limited, Kharagpur (350 m³ BF)',
      image: '/assets/plants/bengal_energy_bf.jpg',
      companyWebsite: 'https://bengalenergy.in',
      companyWebsiteLabel: 'bengalenergy.in',
      companyLogoUrl: '/assets/logos/bengal_energy_logo.png',
      imageCaption: 'Official Plant Photograph: Bengal Energy Limited Integrated Blast Furnace Facility, Kharagpur (bengalenergy.in)',
      diagramLabel: '350 m³ BF Cohesive Zone & Aerodynamic Profile Diagram',
      overview:
        'Comprehensive optimization of a 350 m³ Blast Furnace to surpass monthly production targets while maintaining tight fuel economy and hot metal chemistry.',
      challenge:
        'Achieving >110% production target compliance without escalating specific fuel consumption or allowing hot metal silicon/sulfur drift.',
      approach:
        'Balanced high oxygen enrichment (4.72% cumulative; 4.90% daily) with high PCI injection (151.24–158.25 kg/THM), controlled hot blast temperature (1466–1470 °C HM), and maintained 1.00 slag basicity.',
      solution:
        'Synchronized burden distribution, steam/oxygen/PCI ratios, and scheduled monthly maintenance windows to sustain smooth furnace descent and 94.05% Fe recovery.',
      measurableResults:
        'Verified: 45,401.36 MT produced against 40,420.00 MT target (112.32% compliance); 4.58 MT/m³/day cumulative productivity (4.74 peak day); 94.05% Fe recovery; Si 0.68%, S 0.040%.',
      diagramType: 'bf-profile'
    },
    {
      id: 'cs-2',
      number: '02',
      title: 'One-Go PCI Commissioning & High-Rate Coal Injection (158 kg/THM)',
      category: 'PCI & Fuel',
      plantContext: 'Jai Balaji Industries Ltd. & Bengal Energy Limited',
      image: '/assets/plants/jaibalaji_pig_banner.jpg',
      companyWebsite: 'https://jaibalajigroup.com/pig-iron/',
      companyWebsiteLabel: 'jaibalajigroup.com',
      companyLogoUrl: '/assets/logos/jai_balaji_logo.png',
      imageCaption: 'Official Plant Photograph: Jai Balaji Industries Ltd. Blast Furnace & PCI Complex, Durgapur (jaibalajigroup.com)',
      diagramLabel: 'Dense-Phase PCI Grinding, Distribution & Tuyere Lance Schematic',
      overview:
        'End-to-end commissioning of Pulverized Coal Injection (PCI) systems and sustained high-rate coal replacement optimization.',
      challenge:
        'Commissioning PCI in one go without tuyere plugging or raceway chilling, and scaling injection beyond 150 kg/THM to reduce metallurgical coke dependency.',
      approach:
        'Calibrated coal mill grinding fineness, carrier gas pressure, automation purge interlocks, and raceway oxygen enrichment (+4.72% to +4.90% O2) to sustain optimal RAFT.',
      solution:
        'Executed one-go PCI commissioning and established balanced individual tuyere coal distribution with automated line-flushing sequences.',
      measurableResults:
        'Verified: One-go PCI commissioning achieved; sustained 151.24 kg/THM cumulative PCI rate (158.25 kg/THM daily) with coke rate reduced to 322.22–343.95 kg/THM (Total Fuel Rate: 528.46–538.22 kg/THM).',
      diagramType: 'pci-loop'
    },
    {
      id: 'cs-3',
      number: '03',
      title: 'Cast House GUTKO Governance & SMS Hot Metal Chemistry Control',
      category: 'Operations',
      plantContext: 'Uttam Galva Metalics (Evonith Steel), Bengal Energy & Usha Martin',
      image: '/assets/plants/uttam_evonith_wardha.webp',
      companyWebsite: 'https://evonithsteel.com',
      companyWebsiteLabel: 'evonithsteel.com',
      companyLogoUrl: '/assets/logos/evonith_uttam_logo.png',
      imageCaption: 'Official Plant Photograph: Uttam Galva Metalics / Evonith Steel Hot Metal & Steel Complex, Wardha (evonithsteel.com)',
      diagramLabel: 'Hearth Drainage, Tap-Hole Mushroom & Slag Partition Schematic',
      overview:
        'Standardizing cast house GUTKO practices, hearth drainage, and slag basicity to supply consistent, low-sulfur hot metal to downstream Steel Melting Shops (SMS) and Pig Casting.',
      challenge:
        'Preventing hearth liquid accumulation, erratic tap-hole lengths, and sulfur/silicon spikes that disrupt downstream steelmaking.',
      approach:
        'Enforced standard GUTKO casting protocols, maintained slag basicity at 0.97–1.00, and monitored real-time thermal trends via PI systems.',
      solution:
        'Stabilized tap-hole mud-gun clay practice, drill rod sizing, and hearth thermal reserve to hold hot metal temperature at 1,466–1,470 °C.',
      measurableResults:
        'Verified: Held hot metal chemistry consistently at Si 0.68% (0.67% daily) and S 0.040% with 94.05% metallic Fe recovery.',
      diagramType: 'hearth-thermal'
    },
    {
      id: 'cs-4',
      number: '04',
      title: 'BF Gunning, Capital Repair, Refractory Relining & Blow-Down Campaigns',
      category: 'Shutdown & Projects',
      plantContext: 'Hospet Steels Ltd. (Kalyani Steels), Jai Balaji & Usha Martin',
      image: '/assets/plants/kalyani_steels_hospet_bf.jpg',
      companyWebsite: 'https://www.kalyanisteels.com',
      companyWebsiteLabel: 'kalyanisteels.com',
      companyLogoUrl: '/assets/logos/kalyani_steels_logo.jpg',
      imageCaption: 'Official Plant Photograph: Hospet Steels / Kalyani Steels Integrated Blast Furnace Complex, Hospet (kalyanisteels.com)',
      diagramLabel: 'Critical-Path Blow-Down, Shaft Gunning & Relining Schedule Diagram',
      overview:
        'Multi-plant leadership of safe furnace blow-downs, remote shaft refractory gunning, capital equipment repairs, and complete refractory relining turnarounds.',
      challenge:
        'Executing high-risk blow-down and relining campaigns within tight shutdown windows while ensuring zero gas-safety incidents and rapid post-repair ramp-up.',
      approach:
        'Structured critical-path shutdown schedules, coordinated refractory and mechanical vendors, and enforced strict isolation and stove preservation protocols.',
      solution:
        'Led blow-down, gunning, stave cooler inspection, and relining execution, followed by controlled blow-in and scheduled ramp-up.',
      measurableResults:
        'Verified: Successfully led BF gunning, capital repair, relining, and blow-down campaigns across multiple integrated steel plants on schedule.',
      diagramType: 'shutdown-gantt'
    },
    {
      id: 'cs-5',
      number: '05',
      title: 'Greenfield BF Erection, Cold Trials & One-Go Commissioning',
      category: 'Shutdown & Projects',
      plantContext: 'Rashmi Metaliks Ltd. (Kharagpur) & Jai Balaji Industries (Durgapur)',
      image: '/assets/plants/rashmi_metaliks_kharagpur.jpg',
      companyWebsite: 'https://rashmigroup.com',
      companyWebsiteLabel: 'rashmigroup.com',
      companyLogoUrl: '/assets/logos/rashmi_metaliks_logo.png',
      imageCaption: 'Official Plant Photograph: Rashmi Metaliks Ltd. (Rashmi Group) Integrated Steel & Blast Furnace Complex, Kharagpur (rashmigroup.com)',
      diagramLabel: 'Stove Pressure Testing, Water Balancing & Cold Trial Verification Flow',
      overview:
        'Hands-on project execution from blast furnace mechanical/refractory erection through cold trials, stove heating, furnace filling, and one-go blow-in commissioning.',
      challenge:
        'Eliminating post-blow-in leaks, cooling water imbalances, and charging interlock failures that commonly delay newly erected blast furnaces.',
      approach:
        'Conducted rigorous pre-commissioning cold trials, hot blast stove pressure testing, closed-loop stave water hydraulic balancing, and PLC interlock verification.',
      solution:
        'Executed systematic stove drying/heating curves, precision burden filling, and synchronized blow-in commissioning.',
      measurableResults:
        'Verified: Achieved smooth one-go Blast Furnace commissioning with validated stove pressure integrity and balanced cooling water loops.',
      diagramType: 'reliability-curve'
    },
    {
      id: 'cs-6',
      number: '06',
      title: 'RCA-Led Breakdown Reduction, Automation Interlocks & 5S/TPM Governance',
      category: 'Maintenance & Reliability',
      plantContext: 'Usha Martin Ltd. (Jamshedpur), Bengal Energy & Rashmi Metaliks',
      image: '/assets/plants/usha_martin_jamshedpur.webp',
      companyWebsite: 'https://ushamartin.com',
      companyWebsiteLabel: 'ushamartin.com',
      companyLogoUrl: '/assets/logos/usha_martin_logo.png',
      imageCaption: 'Official Plant Photograph: Usha Martin Ltd. Industrial Manufacturing Complex (ushamartin.com)',
      diagramLabel: 'Root-Cause Failure Analysis (RCA) & Interlock Hardening Architecture',
      overview:
        'Eliminating chronic mechanical and automation trips across Skip, Double Bell, BLT charging, GCP, and cast house equipment through RCA and TPM.',
      challenge:
        'Repeat equipment breakdowns and spurious automation trips causing unplanned blast checks and production loss.',
      approach:
        'Combined PI system trend diagnostics with Root Cause Analysis (RCA), autonomous maintenance (TPM JH Pillar), and criticality-based spares inventory management.',
      solution:
        'Re-engineered vulnerable automation interlocks, instituted monthly preventive shutdown checklists, and audited shop-floor compliance as a recognised 5S & TPM Internal Auditor.',
      measurableResults:
        'Verified: Cut repeat breakdowns significantly, maintained scheduled monthly shutdowns, and achieved formal recognition as Internal Auditor for 5S and TPM.',
      diagramType: 'pcm-chain'
    },
    {
      id: 'cs-7',
      number: '07',
      title: 'Pig Casting Machine (PCM) & Cast House Auxiliary Reliability',
      category: 'Maintenance & Reliability',
      plantContext: 'Jai Balaji Industries Ltd., Neo Metaliks & VISA Steel Ltd.',
      image: '/assets/plants/jaibalaji_pig_furnace.jpg',
      companyWebsite: 'https://www.visachrome.com',
      companyWebsiteLabel: 'visachrome.com',
      companyLogoUrl: '/assets/logos/visa_steel_logo.png',
      imageCaption: 'Official Plant Photograph: Hot Metal & Pig Iron Casting Facility (jaibalajigroup.com / visachrome.com)',
      diagramLabel: 'PCM Strand Drive & EOT Crane Structural Deflection Inspection Diagram',
      overview:
        'Ensuring uninterrupted hot metal disposal and ladle handling through preventive mechanical maintenance of Pig Casting Machines and hot-metal EOT cranes.',
      challenge:
        'Preventing ladle turnaround bottlenecks caused by PCM chain/sprocket wear, mould sticking, or EOT crane mechanical downtime.',
      approach:
        'Aligned PCM strand speed, lime-wash coating, and sub-mould cooling sprays with furnace tapping schedules, paired with scheduled crane hoist and girder inspections.',
      solution:
        'Standardized critical spares stocking by lead time and criticality, integrating auxiliary mechanical checks into monthly furnace shutdown windows.',
      measurableResults:
        'Verified: Sustained continuous hot metal evacuation supporting 1,515.62 MT/day peak furnace output without casting bay bottlenecks.',
      diagramType: 'crane-girder'
    },
    {
      id: 'cs-8',
      number: '08',
      title: 'Thermochemical Fuel Rate & BF Gas Energy Conservation',
      category: 'PCI & Fuel',
      plantContext: 'Bengal Energy Limited & Hospet Steels Ltd. (Kalyani Steels)',
      image: '/assets/plants/bengal_energy_sinter.jpg',
      companyWebsite: 'https://bengalenergy.in',
      companyWebsiteLabel: 'bengalenergy.in',
      companyLogoUrl: '/assets/logos/bengal_energy_logo.png',
      imageCaption: 'Official Plant Photograph: Bengal Energy Limited Sinter, Coke & Blast Furnace Gas Recovery Complex (bengalenergy.in)',
      diagramLabel: 'Two-Stage Blast Furnace Heat & Mass Balance Conservation Diagram',
      overview:
        'Integrated optimization of coke rate, PCI rate, oxygen enrichment, steam addition, hot blast temperature, and BF top gas recovery.',
      challenge:
        'Minimizing total carbon consumption per tonne of hot metal while preserving hearth heat reserve (1,470 °C) under dynamic raw material conditions.',
      approach:
        'Applied heat-and-mass balance control across wind rate, oxygen enrichment (4.72–4.90%), moisture/steam modulation, and hot blast stove operation.',
      solution:
        'Achieved a highly competitive 528.46 kg/THM daily fuel rate (322.22 kg/THM coke + 158.25 kg/THM PCI) and 538.22 kg/THM cumulative fuel rate.',
      measurableResults:
        'Verified: 528.46 kg/THM daily fuel rate (538.22 kg/THM cumulative) with 94.05% Fe recovery and 112.32% target production compliance.',
      diagramType: 'heat-balance'
    }
  ],
  articles: [
    {
      id: 'art-1',
      title: 'Running a 350 m³ Blast Furnace at 112.3% Target: Process & PQCDSM Discipline',
      topic: 'Blast Furnace Operational Excellence',
      publishedDate: 'Executive Technical Note',
      readTime: '6 min read',
      summary:
        'How synchronized control of oxygen enrichment (4.72%), PCI injection (151.24 kg/THM), and monthly preventive shutdowns delivered 45,401 MT against a 40,420 MT target.',
      content: [
        'Achieving 112.3% target compliance (45,401.36 MT vs 40,420.00 MT) and 4.58 MT/m³/day productivity (4.74 peak) on a 350 m³ Blast Furnace requires disciplined alignment across all six PQCDSM pillars: Productivity, Quality, Cost, Delivery, Safety, and Morale.',
        'At the process level, high productivity cannot come at the expense of furnace stability or hot metal quality. By pairing 4.72–4.90% oxygen enrichment with 151.24–158.25 kg/THM PCI injection and holding slag basicity at 0.97–1.00, the furnace maintains an active, permeable raceway and a steady 1,466–1,470 °C hot metal thermal state.',
        'Equally decisive is mechanical reliability: planning and executing monthly shutdowns on schedule, backed by Root Cause Analysis (RCA) and criticality-based spares inventory, prevents repeat breakdowns and protects campaign continuity.'
      ],
      keyTakeaways: [
        'Balance oxygen enrichment (~4.7–4.9%) and steam with PCI rate (~151–158 kg/THM) to stabilize RAFT.',
        'Hold slag basicity near 1.00 to deliver consistent Si 0.68% and S 0.040% to downstream customers.',
        'Eliminate repeat stops through RCA, PLC interlock improvements, and scheduled monthly turnarounds.'
      ]
    },
    {
      id: 'art-2',
      title: 'One-Go PCI Commissioning & High-Rate Coal Replacement Strategies',
      topic: 'PCI Technology and Optimization',
      publishedDate: 'Executive Technical Note',
      readTime: '7 min read',
      summary:
        'Field lessons from commissioning Pulverized Coal Injection systems and sustaining 150+ kg/THM coal rates with 322–344 kg/THM coke rates.',
      content: [
        'Commissioning a Pulverized Coal Injection (PCI) system in one go demands meticulous pre-commissioning verification: coal mill drying gas balance, baghouse differential pressure control, dense-phase vessel weighing calibration, and individual tuyere purge interlocks.',
        'Once online, scaling PCI beyond 150 kg/THM (reaching 158.25 kg/THM daily and 151.24 kg/THM cumulative) shifts the thermal balance in the raceway. Every 10 kg/THM increase in coal injection requires matching oxygen enrichment and hot blast temperature to ensure complete char burnout before gas exits the raceway.',
        'Maintaining clean coal lines through automated purging and strict moisture control (<1.2%) prevents asymmetric tuyere blinding and preserves circumferential hearth balance.'
      ],
      keyTakeaways: [
        'Verify all dense-phase conveying and nitrogen/air purge interlocks during cold trials prior to coal introduction.',
        'Pair 150+ kg/THM PCI with ~4.7–4.9% oxygen enrichment to sustain raceway flame temperature.',
        'Track daily fuel rate (528.46 kg/THM achieved) alongside Fe recovery (94.05%) to verify carbon utilization.'
      ]
    },
    {
      id: 'art-3',
      title: 'Coke Rate Reduction & BF Gas Conservation in Integrated Steel Plants',
      topic: 'Coke Rate Reduction Strategies',
      publishedDate: 'Executive Technical Note',
      readTime: '6 min read',
      summary:
        'Lowering metallurgical coke consumption to 322–344 kg/THM through burden preparation, stove thermal efficiency, and top-gas utilization.',
      content: [
        'Metallurgical coke is the single largest cost driver in blast furnace ironmaking. Lowering coke rate from traditional >480 kg/THM baselines down to 322.22–343.95 kg/THM requires simultaneous progress in coal injection, hot blast stove heat input, and shaft gas utilization.',
        'With reduced coke slit thicknesses in the shaft, burden distribution (via Skip, Double Bell, or BLT charging) must preserve a permeable central coke window while protecting stave coolers from excessive peripheral heat loads.',
        'Maximizing BF gas recovery for hot blast stoves and captive power generation further improves overall plant energy conservation.'
      ],
      keyTakeaways: [
        'Screen burden fines rigorously to protect shaft permeability at low coke rates (322–344 kg/THM).',
        'Optimize hot blast stove cyclic operation and BF gas combustion to maximize blast temperature.',
        'Use two-stage heat-and-mass balance models to audit direct vs. indirect reduction daily.'
      ]
    },
    {
      id: 'art-4',
      title: 'Standard GUTKO Cast House Practice & Hearth Condition Monitoring',
      topic: 'Hearth Condition Monitoring',
      publishedDate: 'Executive Technical Note',
      readTime: '6 min read',
      summary:
        'Why disciplined cast house GUTKO execution, taphole clay management, and slag fluidity are the bedrock of blast furnace stability.',
      content: [
        'Across twenty years of operating blast furnaces at Bengal Energy, Jai Balaji, Hospet Steels, and Uttam Galva, one lesson stands above all: a blast furnace is operated from the cast house up.',
        'Holding standard GUTKO practice—ensuring timely tapping, consistent taphole length, dry hearth drainage, and disciplined trough/runner maintenance—prevents liquid iron and slag from rising toward the tuyere level and destabilizing furnace aerodynamics.',
        'Pairing GUTKO discipline with real-time PI system monitoring of hearth temperatures and cooling water heat flux protects refractory campaign life.'
      ],
      keyTakeaways: [
        'Enforce standard GUTKO checklists across all casting crews to ensure predictable liquid evacuation.',
        'Maintain hot metal temperature at 1,466–1,470 °C and basicity at 0.97–1.00 for free-flowing slag.',
        'Align taphole drill diameter and mud-gun clay volume with actual furnace melting rate.'
      ]
    },
    {
      id: 'art-5',
      title: 'Leading BF Gunning, Capital Repair, Relining & Blow-Down Campaigns',
      topic: 'Mechanical Maintenance Best Practices',
      publishedDate: 'Executive Technical Note',
      readTime: '6 min read',
      summary:
        'Practical execution blueprint for safe furnace blow-downs, remote shaft gunning, stave replacements, and one-go recommissioning.',
      content: [
        'Mid-campaign gunning repairs and end-of-campaign blow-downs and relinings are the highest-leverage projects in a blast furnace leader’s career. Every hour of outage must be engineered in advance.',
        'Safe blow-down execution requires continuous top-gas H2/CO/O2 monitoring, controlled water spray cooling at the furnace top, and precise burden lowering down to the tuyere level before salamander tapping or quench.',
        'During recommissioning, thorough cold trials, stove pressure testing, cooling water hydraulic balancing, and interlock checks ensure a smooth one-go blow-in and rapid ramp-up to target output.'
      ],
      keyTakeaways: [
        'Stage critical spares and refractory materials by lead time well ahead of planned shutdown windows.',
        'Never shortcut cold trials, water balancing, or stove pressure testing prior to blow-in.',
        'Apply 5S and TPM audit standards across contractor and in-house turnaround teams.'
      ]
    },
    {
      id: 'art-6',
      title: 'Real-Time PI Telemetry, RCA & AI in Next-Generation Ironmaking',
      topic: 'AI and Machine Learning in Steel Manufacturing',
      publishedDate: 'Executive Technical Note',
      readTime: '5 min read',
      summary:
        'Combining real-time PI process historian trends and Root Cause Analysis (RCA) with predictive analytics for zero-repeat-breakdown operations.',
      content: [
        'Data-led problem solving starts with reading the furnace trends first, isolating the physical root cause, and engineering a fix that holds. Real-time PI systems give metallurgists high-frequency visibility into blast pressure drops, stave temperatures, and charging cycles.',
        'Layering physics-informed machine learning onto clean PI historian data enables early detection of burden hanging, channeling, and silicon drift hours before tap.',
        'When combined with automated PLC interlock hardening and TPM autonomous maintenance, digital tools empower shop-floor teams to sustain >110% target compliance safely.'
      ],
      keyTakeaways: [
        'Use PI trend analysis to correlate charging sequence shifts with shaft pressure fluctuations.',
        'Convert every breakdown RCA into a permanent preventive maintenance or PLC interlock upgrade.',
        'Ground digital twin and AI models in verified blast furnace heat-and-mass balance equations.'
      ]
    }
  ]
};

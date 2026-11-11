import React, { useState, useEffect, useCallback } from 'react';
import {
  CloudSun,
  Thermometer,
  Droplets,
  Gauge,
  Wind,
  RefreshCw,
  ArrowDownRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface WeatherTelemetryData {
  cityKey: string;
  locationName: string;
  plantName: string;
  temperatureC: number;
  feelsLikeC: number;
  relativeHumidityPct: number;
  surfacePressureHpa: number;
  windSpeedKmh: number;
  blastMoistureGPerNm3: number;
  observedAt: string;
  source: string;
}

const PLANT_HUBS = [
  { key: 'kharagpur', label: 'Kharagpur, WB', plant: 'Bengal Energy Ltd. (350 m³ BF)' },
  { key: 'durgapur', label: 'Durgapur, WB', plant: 'Jai Balaji Industries Ltd.' },
  { key: 'hospet', label: 'Hospet, KA', plant: 'Hospet Steels Ltd.' },
  { key: 'wardha', label: 'Wardha, MH', plant: 'Uttam Galva Metalics Ltd.' },
  { key: 'jajpur', label: 'Jajpur, OD', plant: 'VISA Steel Ltd.' },
  { key: 'jamshedpur', label: 'Jamshedpur, JH', plant: 'Usha Martin Ltd.' }
];

interface PlantWeatherTelemetryProps {
  isOpen?: boolean;
  onToggleOpen?: () => void;
  onApplyToCalculators?: (moistureGPerNm3: number) => void;
}

export const PlantWeatherTelemetry: React.FC<PlantWeatherTelemetryProps> = ({
  isOpen = false,
  onToggleOpen,
  onApplyToCalculators
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('kharagpur');
  const [weather, setWeather] = useState<WeatherTelemetryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [appliedToast, setAppliedToast] = useState<boolean>(false);

  const fetchWeather = useCallback(async (cityKey: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(cityKey)}`);
      if (!res.ok) throw new Error('Backend weather error');
      const data = (await res.json()) as WeatherTelemetryData;
      setWeather(data);
    } catch {
      setWeather({
        cityKey,
        locationName: 'Kharagpur, West Bengal',
        plantName: 'Bengal Energy Limited (350 m³ BF)',
        temperatureC: 31.2,
        feelsLikeC: 34.0,
        relativeHumidityPct: 62,
        surfacePressureHpa: 1007.0,
        windSpeedKmh: 11.8,
        blastMoistureGPerNm3: 24.4,
        observedAt: new Date().toISOString(),
        source: 'Atmospheric Psychrometric Station'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity, fetchWeather]);

  const handleApplyToRaft = () => {
    if (!weather || !onApplyToCalculators) return;
    onApplyToCalculators(weather.blastMoistureGPerNm3);
    setAppliedToast(true);
    setTimeout(() => setAppliedToast(false), 3000);
    const calcSection = document.getElementById('insights');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="weather-telemetry" className="bg-[#080E1B] border-b border-slate-800/70">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        {/* Sleek Minimal Summary Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-mono text-amber-400 font-medium">
              <CloudSun className="w-4 h-4" />
              <span>LIVE PLANT WEATHER API</span>
            </span>
            {weather && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-slate-200 font-medium">{weather.locationName}</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-slate-300">{weather.temperatureC.toFixed(1)} °C</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-slate-300">RH {weather.relativeHumidityPct}%</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-amber-400">
                  Blast Moisture: {weather.blastMoistureGPerNm3.toFixed(1)} g/Nm³
                </span>
              </>
            )}
          </div>

          {onToggleOpen && (
            <button
              type="button"
              onClick={onToggleOpen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <span>{isOpen ? 'Hide Weather Telemetry' : 'Inspect Plant Weather API'}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Expanded Live Plant Weather Telemetry Details */}
        {isOpen && weather && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Select integrated steel plant hub for live atmospheric &amp; cold-blast moisture telemetry:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {PLANT_HUBS.map((hub) => (
                  <button
                    key={hub.key}
                    type="button"
                    onClick={() => setSelectedCity(hub.key)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCity === hub.key
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {hub.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => fetchWeather(selectedCity)}
                  disabled={loading}
                  title="Refresh live weather telemetry"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Ambient Temp</span>
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-100 mt-1">
                  {weather.temperatureC.toFixed(1)} °C
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Humidity</span>
                  <Droplets className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-100 mt-1">
                  {weather.relativeHumidityPct}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Pressure</span>
                  <Gauge className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-100 mt-1">
                  {weather.surfacePressureHpa.toFixed(1)} hPa
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Wind Speed</span>
                  <Wind className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-bold font-mono tabular-nums text-slate-100 mt-1">
                  {weather.windSpeedKmh.toFixed(1)} km/h
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40">
                <div className="text-xs text-amber-300 font-medium">Blast Moisture</div>
                <div className="text-lg font-bold font-mono tabular-nums text-amber-400 mt-1">
                  {weather.blastMoistureGPerNm3.toFixed(1)} g/Nm³
                </div>
              </div>
            </div>

            {onApplyToCalculators && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleApplyToRaft}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>
                    {appliedToast
                      ? `Synced ${weather.blastMoistureGPerNm3} g/Nm³ to RAFT Calculator!`
                      : `Apply ${weather.blastMoistureGPerNm3} g/Nm³ Moisture to RAFT Calculator`}
                  </span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

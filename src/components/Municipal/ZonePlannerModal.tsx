import React, { useState } from 'react';
import { Landmark, ShieldPlus, CheckCircle2, X } from 'lucide-react';
import { AHMEDABAD_WARDS } from '../../data/ahmedabadWards';

interface ZonePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onZoneCreated: (zoneName: string, wardName: string, capacity: number) => void;
}

export const ZonePlannerModal: React.FC<ZonePlannerModalProps> = ({
  isOpen,
  onClose,
  onZoneCreated,
}) => {
  if (!isOpen) return null;

  const [selectedWard, setSelectedWard] = useState(AHMEDABAD_WARDS[2].id); // Lambha
  const [zoneName, setZoneName] = useState('Lambha Smart Pushcart Hub #2');
  const [capacity, setCapacity] = useState(40);
  const [permittedHours, setPermittedHours] = useState('4:00 PM – 9:00 PM');
  const [dailySanitationFee, setDailySanitationFee] = useState(25);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wardObj = AHMEDABAD_WARDS.find((w) => w.id === selectedWard);
    setIsDone(true);
    setTimeout(() => {
      onZoneCreated(zoneName, wardObj?.name || 'Ahmedabad', capacity);
      setIsDone(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-blue-500/40 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <ShieldPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                AMC Urban Planning Tool
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                Designate New Vending Zone
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Vending Zone Gazetted!</h4>
            <p className="text-xs text-slate-300">
              {zoneName} added to the AMC Smart Municipal Registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Ward</label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white outline-none"
              >
                {AHMEDABAD_WARDS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.nameGu}) — {w.zone} Zone
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Corridor Name</label>
              <input
                type="text"
                required
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Thela Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sanitation Fee (₹/day)</label>
                <input
                  type="number"
                  value={dailySanitationFee}
                  onChange={(e) => setDailySanitationFee(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Operating Hours</label>
              <input
                type="text"
                value={permittedHours}
                onChange={(e) => setPermittedHours(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition transform active:scale-98"
            >
              Approve & Deploy Zone
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

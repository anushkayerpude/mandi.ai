import React, { useState } from 'react';
import { ShieldPlus, CheckCircle2, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-khaki-50 p-6 rounded-3xl border border-khaki-300 shadow-2xl space-y-5 text-stone-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-khaki-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center">
              <ShieldPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800">
                AMC Urban Planning Tool
              </span>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                Designate New Vending Zone
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-khaki-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-mandi-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-stone-900">Vending Zone Gazetted!</h4>
            <p className="text-xs text-stone-600">
              {zoneName} added to the AMC Smart Municipal Registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Target Ward</label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-khaki-100 border border-khaki-300 rounded-xl p-2.5 text-xs font-bold text-stone-900 outline-none"
              >
                {AHMEDABAD_WARDS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.nameGu}) — {w.zone} Zone
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Corridor Name</label>
              <input
                type="text"
                required
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="w-full bg-khaki-100 border border-khaki-300 rounded-xl p-2.5 text-xs font-bold text-stone-900 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Thela Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full bg-khaki-100 border border-khaki-300 rounded-xl p-2.5 text-xs font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Sanitation Fee (₹/day)</label>
                <input
                  type="number"
                  value={dailySanitationFee}
                  onChange={(e) => setDailySanitationFee(Number(e.target.value))}
                  className="w-full bg-khaki-100 border border-khaki-300 rounded-xl p-2.5 text-xs font-bold text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Operating Hours</label>
              <input
                type="text"
                value={permittedHours}
                onChange={(e) => setPermittedHours(e.target.value)}
                className="w-full bg-khaki-100 border border-khaki-300 rounded-xl p-2.5 text-xs font-bold text-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition transform active:scale-98"
            >
              Approve & Deploy Zone
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

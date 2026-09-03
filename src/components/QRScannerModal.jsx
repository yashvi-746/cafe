import React, { useState } from "react";
import { QrCode, Camera, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const QRScannerModal = ({ open, onClose, setPage }) => {
  const [scannedTable, setScannedTable] = useState(null);
  const [scanning, setScanning] = useState(false);

  if (!open) return null;

  const sampleTables = [
    { id: "T-04", name: "Table 04 · Window Booth", zone: "Main Floor" },
    { id: "T-09", name: "Table 09 · Courtyard Garden", zone: "Outdoor Terrace" },
    { id: "T-12", name: "Table 12 · Mezzanine Quiet Nook", zone: "Upper Level" },
    { id: "BAR-02", name: "Bar Stool 02 · Roastery View", zone: "Espresso Bar" }
  ];

  const handleSimulateScan = (table) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedTable(table);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md nb-fade" onClick={onClose} />
      <div className="relative nb-bg-cream w-full max-w-md p-6 rounded-xl border border-white/20 shadow-2xl z-10 nb-scale-in text-center">
        <div className="w-12 h-12 rounded-full nb-bg-brass/20 text-[#A9834C] flex items-center justify-center mx-auto mb-3">
          <QrCode size={24} />
        </div>
        <h3 className="nb-display text-2xl">Dine-In QR Scanner</h3>
        <p className="text-xs nb-text-fade mt-1">Scan your table's wooden QR plate for instant ordering & table service.</p>

        {!scannedTable ? (
          <div className="mt-6">
            <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-[#A9834C] rounded-2xl flex flex-col items-center justify-center overflow-hidden bg-black/5">
              {scanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-4">
                  <div className="w-full h-0.5 bg-[#A9834C] animate-bounce mb-3" />
                  <p className="text-xs font-semibold">Decoding QR Code...</p>
                </div>
              ) : (
                <>
                  <Camera size={32} className="nb-text-mocha animate-pulse mb-2" />
                  <p className="text-[11px] nb-text-fade">Point camera at table QR</p>
                </>
              )}
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A9834C] mt-6 mb-2">Simulate Table Scan:</p>
            <div className="grid grid-cols-2 gap-2">
              {sampleTables.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSimulateScan(t)}
                  className="p-2 border nb-border text-left hover:bg-white text-xs rounded transition-colors"
                >
                  <p className="font-bold">{t.id}</p>
                  <p className="text-[10px] nb-text-fade truncate">{t.zone}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 nb-fade-up">
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg mb-6">
              <CheckCircle2 size={24} className="mx-auto text-emerald-600 mb-1" />
              <p className="font-bold text-sm">{scannedTable.name}</p>
              <p className="text-xs text-emerald-700 mt-0.5">Zone: {scannedTable.zone}</p>
            </div>
            <button
              onClick={() => {
                onClose();
                setPage("menu");
              }}
              className="nb-btn nb-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 nb-focus"
            >
              Start Ordering for {scannedTable.id} <ArrowRight size={14} />
            </button>
          </div>
        )}

        <button onClick={onClose} className="mt-4 text-xs nb-text-fade hover:text-black">
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default QRScannerModal;

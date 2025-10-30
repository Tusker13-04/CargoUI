import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertTriangle, Calendar, MapPin, PackageSearch } from 'lucide-react';

interface LotAllocationProps {
  onNext: () => void;
  onBack: () => void;
}

// Intentional violations demo version of LotAllocation
export function LotAllocation({ onNext, onBack }: LotAllocationProps) {
  const [quantity, setQuantity] = useState<string>('');
  const [lotId, setLotId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isReserving, setIsReserving] = useState<boolean>(false);

  const handleReserve = () => {
    // VIOLATION H5: no validation against capacity, accepts any number
    setIsReserving(true);
    // VIOLATION H1: long operation without progress; ends with cryptic error sometimes
    setTimeout(() => {
      setIsReserving(false);
      if (!lotId) {
        // VIOLATION H9: cryptic code, no recovery
        setError('ALLOC_ERR_0x12 capacity_mismatch');
        return;
      }
      onNext();
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* VIOLATION H2/H8: Technical header and noisy meta */}
      <div className="mb-6">
        <h1 className="text-gray-900 text-lg font-mono">ALLOCATION_ENGINE v1.9 • NODE: SEA-WEST-02</h1>
        <p className="text-xs text-yellow-700 font-mono">⚠ sync: stale • last_update: T-07:12</p>
      </div>

      {/* VIOLATION H3: confusing back wording */}
      <button onClick={onBack} className="text-xs text-gray-500 font-mono mb-4">RETURN_PREV_STATE()</button>

      <Card>
        <CardContent className="p-6 space-y-4">
          {/* VIOLATION H6: prior selections not shown */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="font-mono text-xs">ORIGIN_PORT</Label>
              <div className="relative mt-1">
                <MapPin className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="INMAA" className="pl-8 h-10 font-mono text-xs" />
              </div>
            </div>
            <div>
              <Label className="font-mono text-xs">DEST_PORT</Label>
              <div className="relative mt-1">
                <MapPin className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="SGSIN" className="pl-8 h-10 font-mono text-xs" />
              </div>
            </div>
            <div>
              <Label className="font-mono text-xs">ETD</Label>
              <div className="relative mt-1">
                <Calendar className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="YYYY-MM-DDThh:mmZ" className="pl-8 h-10 font-mono text-xs" />
              </div>
            </div>
          </div>

          {/* VIOLATION H4: mixed controls, inconsistent alignment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-mono text-xs">LOT_ID (required)</Label>
              <Input value={lotId} onChange={(e)=>setLotId(e.target.value)} placeholder="e.g. SLOT_47A-12" className="h-10 font-mono text-xs" />
            </div>
            <div>
              <Label className="font-mono text-xs">QUANTITY_UNITS</Label>
              <Input value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="enter any number" className="h-10 font-mono text-xs" />
            </div>
          </div>

          {/* VIOLATION H8: extra debug info */}
          <div className="text-xs font-mono text-gray-500">DBG: alloc_window=[T+0,T+168] • threshold=0.72 • mode=greedy</div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs font-mono flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" /> {error}
            </div>
          )}

          <div className="flex gap-3">
            {/* VIOLATION H3: no cancel, destructive primary naming */}
            <Button className="h-11 font-mono" onClick={handleReserve} disabled={isReserving}>
              {isReserving ? 'ALLOCATING...' : 'FORCE_RESERVE()'}
            </Button>
            <Button variant="destructive" className="h-11 font-mono">RELEASE_ALL_HELD()</Button>
            {/* VIOLATION H7: no shortcut or bulk features but debug-only */}
            <Button variant="outline" className="h-11 font-mono"><PackageSearch className="w-4 h-4 mr-2" />ADVANCED_MODE</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

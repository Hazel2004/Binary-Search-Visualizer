import { useState } from 'react';

export default function App() {
  const a = Array.from({ length: 10 }, (_, i) => i);
  const [target, setTarget] = useState('');
  const [result, setResult] = useState(null);
  const [searchState, setSearchState] = useState({ low: 0, high: a.length - 1, mid: null });
  const [searchStarted, setSearchStarted] = useState(false);

  async function Binary() {
    const x = Number(target);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    setSearchStarted(true);
    setResult(null);

    let low = 0;
    let high = a.length - 1;
    let mid;

    while (high >= low) {
      mid = low + Math.floor((high - low) / 2);
      setSearchState({ low, high, mid });
      await delay(1200);

      if (a[mid] === x) {
        setResult(`Element Found! Index: ${mid}, Value: ${a[mid]}`);
        setSearchStarted(false);
        return;
      }
      if (a[mid] > x) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    setResult(`Element does not exist`);
    setSearchStarted(false);
  }

  const getElementStyle = (index) => {
    let backgroundColor = 'rgba(255, 255, 255, 0.05)';
    let borderColor = 'rgba(255, 255, 255, 0.1)';
    let boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    let transform = 'translateY(0px)';
    
    if (index === searchState.mid) {
      backgroundColor = 'rgba(255, 215, 0, 0.2)';
      borderColor = 'rgba(255, 215, 0, 0.6)';
      boxShadow = '0 0 30px rgba(255, 215, 0, 0.6), 0 8px 32px rgba(0, 0, 0, 0.2)';
      transform = 'translateY(-8px)';
    } else if (index >= searchState.low && index <= searchState.high) {
      backgroundColor = 'rgba(59, 130, 246, 0.15)';
      borderColor = 'rgba(59, 130, 246, 0.4)';
      boxShadow = '0 0 20px rgba(59, 130, 246, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15)';
    }

    return {
      padding: '16px 20px',
      backdropFilter: 'blur(20px)',
      backgroundColor,
      border: `2px solid ${borderColor}`,
      borderRadius: '16px',
      minWidth: '60px',
      textAlign: 'center',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow,
      color: 'white',
      fontWeight: '600',
      fontSize: '18px',
      transform,
      position: 'relative',
      overflow: 'hidden',
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Binary Search
          </h1>
          <h2 className="text-2xl font-light text-gray-300">
            Visualizer
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Array visualization */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex gap-4 items-center justify-center flex-wrap">
              {a.map((n, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div style={getElementStyle(index)}>
                    <div className="relative z-10">{n}</div>
                    {index === searchState.mid && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-[14px] animate-pulse"></div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-400 font-medium">
                    {index}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="relative">
            <input
              type="number"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={searchStarted}
              placeholder="Enter target number"
              className="px-6 py-4 text-lg border-2 border-white/20 rounded-2xl focus:outline-none focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 bg-white/10 backdrop-blur-lg text-white placeholder-white/50 transition-all duration-300 w-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl pointer-events-none"></div>
          </div>
          
          <button
            onClick={Binary}
            disabled={searchStarted || target === ''}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {searchStarted ? 'Searching...' : 'Start Search'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Search state display */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex gap-8 text-lg text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-semibold">Low:</span>
                <span className="font-mono bg-blue-500/20 px-3 py-1 rounded-lg">{searchState.low}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">High:</span>
                <span className="font-mono bg-purple-500/20 px-3 py-1 rounded-lg">{searchState.high}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-semibold">Mid:</span>
                <span className="font-mono bg-yellow-500/20 px-3 py-1 rounded-lg">{searchState.mid ?? '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result display */}
        {result && (
          <div className="flex justify-center">
            <div className={`${result.includes('Found') ? 'bg-green-500/20 border-green-400/40' : 'bg-red-500/20 border-red-400/40'} backdrop-blur-lg border rounded-2xl px-8 py-4 shadow-xl animate-in fade-in duration-500`}>
              <div className={`text-xl font-semibold ${result.includes('Found') ? 'text-green-300' : 'text-red-300'}`}>
                {result}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.5s ease-out forwards;
        }
        
        .fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
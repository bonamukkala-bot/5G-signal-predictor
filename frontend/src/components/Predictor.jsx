import { useState } from "react";
import axios from "axios";

const API = "https://fiveg-signal-predictor.onrender.com/api";

function signalLabel(dbm) {
  if (dbm >= -65) return { label:"Excellent", color:"#00ff9d" };
  if (dbm >= -75) return { label:"Good",      color:"#7fff00" };
  if (dbm >= -85) return { label:"Fair",      color:"#ffd700" };
  if (dbm >= -95) return { label:"Poor",      color:"#ff7c2a" };
  return           { label:"No Signal",        color:"#ff3b5c" };
}

export default function Predictor() {
  const [inputs, setInputs] = useState({
    distance:150, obstacles:2, frequency:28,
    weather:3, interference:3, tower_height:30
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/predict`, {
        ...inputs,
        weather: inputs.weather / 10   // convert 0-10 slider to 0-1 for model
      });
      setResult(res.data.signal);
    } catch { alert("❌ Make sure backend is running!"); }
    setLoading(false);
  };

  const sliders = [
    { key:"distance",     label:"Distance from Tower", min:10,  max:500, step:5,   unit:"m"   },
    { key:"obstacles",    label:"Obstacles (walls)",   min:0,   max:4,   step:1,   unit:""    },
    { key:"frequency",    label:"Frequency Band",      min:28,  max:60,  step:1,   unit:"GHz" },
    { key:"weather",      label:"Weather Severity",    min:0,   max:10,  step:0.1, unit:""    },
    { key:"interference", label:"Interference Level",  min:0,   max:10,  step:0.5, unit:"dB"  },
    { key:"tower_height", label:"Tower Height",        min:20,  max:50,  step:1,   unit:"m"   },
  ];

  const q = result !== null ? signalLabel(result) : null;
  const card = { background:"#0c1a2e", border:"1px solid #1a3a5c", borderRadius:14, padding:24 };

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

      {/* LEFT SIDE - Sliders */}
      <div style={card}>
        <div style={{ fontSize:"0.7rem", color:"#00c9ff", letterSpacing:2, marginBottom:16 }}>
          INPUT PARAMETERS
        </div>

        {sliders.map(s => (
          <div key={s.key} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:"0.78rem", color:"#7aadcc" }}>{s.label}</span>
              <span style={{ fontSize:"0.78rem", color:"#00c9ff", fontWeight:700 }}>
                {inputs[s.key]}{s.unit}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={inputs[s.key]}
              onChange={e => {
                setInputs(p => ({...p, [s.key]: parseFloat(e.target.value)}));
                setResult(null);
              }}
              style={{ width:"100%", accentColor:"#00c9ff", cursor:"pointer" }}
            />
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
              <span style={{ fontSize:"0.65rem", color:"#1a3a5c" }}>{s.min}{s.unit}</span>
              <span style={{ fontSize:"0.65rem", color:"#1a3a5c" }}>{s.max}{s.unit}</span>
            </div>
          </div>
        ))}

        <button
          onClick={predict}
          disabled={loading}
          style={{
            background:"linear-gradient(135deg,#00c9ff,#00ff9d)",
            color:"#050a14", fontWeight:700, border:"none",
            borderRadius:8, padding:"13px", width:"100%",
            fontSize:"0.95rem", cursor:"pointer", marginTop:6
          }}>
          {loading ? "⏳ Predicting..." : "⚡ Predict Signal"}
        </button>
      </div>

      {/* RIGHT SIDE - Result */}
      <div style={card}>
        <div style={{ fontSize:"0.7rem", color:"#00ff9d", letterSpacing:2, marginBottom:16 }}>
          PREDICTION RESULT
        </div>

        {q ? (
          <div style={{ textAlign:"center", paddingTop:16 }}>

            {/* Big dBm number */}
            <div style={{ fontSize:"4rem", fontWeight:700, color:q.color, marginBottom:4 }}>
              {result}
            </div>
            <div style={{ fontSize:"1rem", color:"#7aadcc", marginBottom:16 }}>dBm</div>

            {/* Quality badge */}
            <div style={{
              display:"inline-block",
              background:q.color+"22", color:q.color,
              border:`1px solid ${q.color}44`,
              borderRadius:8, padding:"8px 24px",
              fontWeight:700, fontSize:"1.1rem", marginBottom:24
            }}>
              {q.label}
            </div>

            {/* Signal scale */}
            <div style={{ background:"#091525", borderRadius:10, padding:16, textAlign:"left" }}>
              <div style={{ fontSize:"0.68rem", color:"#5a8ab0", letterSpacing:1, marginBottom:10 }}>
                SIGNAL SCALE
              </div>
              {[
                { r:"≥ −65 dBm",  l:"Excellent", c:"#00ff9d" },
                { r:"−65 to −75", l:"Good",      c:"#7fff00" },
                { r:"−75 to −85", l:"Fair",      c:"#ffd700" },
                { r:"−85 to −95", l:"Poor",      c:"#ff7c2a" },
                { r:"< −95 dBm",  l:"No Signal", c:"#ff3b5c" },
              ].map((s,i) => (
                <div key={i} style={{
                  display:"flex", justifyContent:"space-between",
                  padding:"7px 6px", borderBottom:"1px solid #1a3a5c",
                  fontSize:"0.78rem",
                  background: q.label === s.l ? s.c+"11" : "transparent",
                  borderRadius:4
                }}>
                  <span style={{ color:"#5a8ab0" }}>{s.r}</span>
                  <span style={{ color:s.c, fontWeight:700 }}>{s.l}</span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ marginTop:16, background:"#091525",
                          borderRadius:10, padding:14, textAlign:"left" }}>
              <div style={{ fontSize:"0.68rem", color:"#5a8ab0",
                            letterSpacing:1, marginBottom:8 }}>
                💡 HOW TO IMPROVE
              </div>
              {result < -85 ? (
                <div style={{ fontSize:"0.78rem", color:"#7aadcc", lineHeight:1.9 }}>
                  {inputs.distance > 200  && <div>📏 Move closer to the tower</div>}
                  {inputs.obstacles > 0   && <div>🧱 Reduce walls between you and tower</div>}
                  {inputs.weather > 5     && <div>🌧️ Bad weather is hurting your signal</div>}
                  {inputs.interference > 5 && <div>📶 Too much interference nearby</div>}
                  {inputs.frequency > 28  && <div>📡 Switch to 28GHz for better range</div>}
                  {inputs.tower_height < 35 && <div>🗼 A taller tower would help</div>}
                </div>
              ) : (
                <div style={{ fontSize:"0.78rem", color:"#00ff9d" }}>
                  ✅ Your signal conditions are good!
                </div>
              )}
            </div>

          </div>
        ) : (
          <div style={{ textAlign:"center", paddingTop:60,
                        color:"#5a8ab0", fontSize:"0.88rem" }}>
            <div style={{ fontSize:"3rem", marginBottom:12 }}>📡</div>
            <div>Adjust the sliders on the left</div>
            <div style={{ marginTop:8 }}>then click</div>
            <div style={{ marginTop:8, color:"#00c9ff",
                          fontWeight:700, fontSize:"1rem" }}>
              ⚡ Predict Signal
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
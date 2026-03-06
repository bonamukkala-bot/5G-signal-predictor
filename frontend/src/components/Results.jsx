import { useState } from "react";
import { BarChart, Bar, ScatterChart, Scatter,
         XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Results({ metrics }) {
  const [tab, setTab] = useState("metrics");
  const card = { background:"#0c1a2e", border:"1px solid #1a3a5c",
                 borderRadius:14, padding:24, marginBottom:20 };
  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {[{ label:"Test RMSE", value: metrics.testRMSE+" dBm", color:"#00c9ff" },
          { label:"R² Score",  value: metrics.r2,              color:"#00ff9d" },
          { label:"Train Size",value: metrics.trainSize,       color:"#ffd700" },
          { label:"Test Size", value: metrics.testSize,        color:"#ff7c2a" }
        ].map((m,i) => (
          <div key={i} style={{ background:"#091525", border:"1px solid #1a3a5c",
                                borderRadius:10, padding:16, textAlign:"center" }}>
            <div style={{ fontSize:"1.6rem", fontWeight:700, color:m.color }}>{m.value}</div>
            <div style={{ fontSize:"0.72rem", color:"#5a8ab0", marginTop:4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["metrics","scatter","residuals","weights"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ background: tab===t ? "#1a3a5c":"transparent",
                     color: tab===t ? "#00c9ff":"#5a8ab0",
                     border: tab===t ? "1px solid #00c9ff44":"1px solid transparent",
                     borderRadius:7, padding:"7px 16px", fontSize:"0.78rem",
                     cursor:"pointer", fontFamily:"monospace" }}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      <div style={card}>
        {tab === "scatter" && (
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3a5c" />
              <XAxis dataKey="actual"    stroke="#5a8ab0" tick={{fontSize:11}} name="Actual" />
              <YAxis dataKey="predicted" stroke="#5a8ab0" tick={{fontSize:11}} name="Predicted" />
              <Tooltip contentStyle={{background:"#0c1a2e", border:"1px solid #1a3a5c",
                                      borderRadius:8, color:"#e0eaff", fontSize:"0.78rem"}} />
              <Scatter data={metrics.scatter} fill="#00c9ff" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        )}
        {tab === "residuals" && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metrics.residuals} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3a5c" />
              <XAxis dataKey="i"      stroke="#5a8ab0" tick={{fontSize:10}} />
              <YAxis                  stroke="#5a8ab0" tick={{fontSize:10}} />
              <Tooltip contentStyle={{background:"#0c1a2e", border:"1px solid #1a3a5c",
                                      borderRadius:8, color:"#e0eaff", fontSize:"0.78rem"}} />
              <Bar dataKey="residual" fill="#00ff9d" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {tab === "weights" && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metrics.featureWeights} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3a5c" />
              <XAxis type="number"   stroke="#5a8ab0" tick={{fontSize:10}} />
              <YAxis type="category" dataKey="name"  stroke="#5a8ab0"
                     tick={{fontSize:10}} width={110} />
              <Tooltip contentStyle={{background:"#0c1a2e", border:"1px solid #1a3a5c",
                                      borderRadius:8, color:"#e0eaff", fontSize:"0.78rem"}} />
              <Bar dataKey="weight" fill="#ffd700" opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {tab === "metrics" && (
          <div>
            <div style={{ fontSize:"0.7rem", color:"#ff7c2a", letterSpacing:2, marginBottom:14 }}>
              MODEL SUMMARY
            </div>
            {[{ k:"Algorithm",   v:"Random Forest Regressor" },
              { k:"Trees",       v:"100 estimators" },
              { k:"Features",    v:"6 engineered features" },
              { k:"Train Split", v:"80% (240 samples)" },
              { k:"Test Split",  v:"20% (60 samples)" },
            ].map((row,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between",
                                    padding:"9px 0", borderBottom:"1px solid #1a3a5c",
                                    fontSize:"0.8rem" }}>
                <span style={{ color:"#5a8ab0" }}>{row.k}</span>
                <span style={{ color:"#e0eaff", fontWeight:600 }}>{row.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


import { useState } from "react";
import Pipeline from "./components/Pipeline";
import Results from "./components/Results";
import Predictor from "./components/Predictor";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function App() {
  const [stage, setStage]     = useState("intro");
  const [metrics, setMetrics] = useState(null);

  const startPipeline = async () => {
    setStage("training");
    try {
      const res = await axios.post(`${API}/train`);
      setMetrics(res.data);
      setStage("results");
    } catch {
      alert("❌ Backend not running! Open a new terminal and run: python app.py");
      setStage("intro");
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#050a14",
                  color:"#e0eaff", fontFamily:"monospace" }}>
      <div style={{ background:"#0c1a2e", borderBottom:"1px solid #1a3a5c",
                    padding:"20px 32px", display:"flex", alignItems:"center", gap:16 }}>
        <span style={{ fontSize:32 }}>📡</span>
        <div>
          <div style={{ fontSize:"1.3rem", fontWeight:700, color:"#fff" }}>
            5G Signal Strength Predictor
          </div>
          <div style={{ fontSize:"0.75rem", color:"#5a8ab0" }}>
            Python Backend · Random Forest · React Frontend
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
        {stage === "intro" && (
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:"5rem", marginBottom:16 }}>📡</div>
            <h2 style={{ color:"#fff", fontSize:"1.8rem", marginBottom:12 }}>
              5G Signal ML Pipeline
            </h2>
            <p style={{ color:"#5a8ab0", marginBottom:40, fontSize:"0.9rem" }}>
              Trains a Random Forest on 300 synthetic RF samples and predicts signal strength in dBm
            </p>
            <button onClick={startPipeline}
              style={{ background:"linear-gradient(135deg,#00c9ff,#00ff9d)",
                       color:"#050a14", fontWeight:700, border:"none",
                       borderRadius:8, padding:"14px 40px", fontSize:"1rem",
                       cursor:"pointer" }}>
              ▶ Run ML Pipeline
            </button>
          </div>
        )}

        {stage === "training" && <Pipeline />}

        {stage === "results" && metrics && (
          <>
            <Results metrics={metrics} />
            <div style={{ textAlign:"center", marginTop:24 }}>
              <button onClick={() => setStage("predict")}
                style={{ background:"linear-gradient(135deg,#00c9ff,#00ff9d)",
                         color:"#050a14", fontWeight:700, border:"none",
                         borderRadius:8, padding:"12px 32px", cursor:"pointer" }}>
                🎯 Try Live Prediction →
              </button>
            </div>
          </>
        )}

        {stage === "predict" && (
          <>
            <Predictor />
            <div style={{ textAlign:"center", marginTop:16 }}>
              <button onClick={() => setStage("results")}
                style={{ background:"transparent", color:"#00c9ff",
                         border:"1px solid #00c9ff", borderRadius:8,
                         padding:"9px 24px", cursor:"pointer", fontFamily:"monospace" }}>
                ← Back to Results
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default function Pipeline() {
  return (
    <div style={{ maxWidth:500, margin:"60px auto", background:"#0c1a2e",
                  border:"1px solid #1a3a5c", borderRadius:14, padding:32 }}>
      <div style={{ fontSize:"0.7rem", color:"#00c9ff", letterSpacing:2, marginBottom:16 }}>
        TRAINING IN PROGRESS
      </div>
      {["📦 Generating 300 RF samples...",
        "✂️  Splitting 80% train / 20% test...",
        "🌲 Training Random Forest (100 trees)...",
        "📊 Evaluating model..."].map((s,i) => (
        <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid #1a3a5c22",
                              color:"#5a8ab0", fontSize:"0.85rem" }}>
          {s}
        </div>
      ))}
      <div style={{ marginTop:20, height:6, background:"#091525",
                    borderRadius:6, overflow:"hidden" }}>
        <div style={{ height:"100%", width:"100%",
                      background:"linear-gradient(90deg,#00c9ff,#00ff9d)",
                      animation:"load 2s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes load { 0%{width:0%} 100%{width:100%} }`}</style>
    </div>
  );
}
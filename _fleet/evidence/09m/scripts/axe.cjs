const fs=require("fs");const src=fs.readFileSync("/Users/gaurabkumar/Documents/my code/common-componant-main/node_modules/axe-core/axe.min.js","utf8");
module.exports=async(p)=>{await p.viewport(1440,900);
for(const t of (process.env.THEMES||"light,blue,dark,green,mist,custom,blue-mist,green-mist,infinia-light,infinia-dark").split(",")){await p.goto(`http://localhost:6126/iframe.html?id=design-system-theme-showcase--playground&viewMode=story&globals=theme:${t}`,5000);
await p.eval(src+";1");
const r=await p.eval(`axe.run(document.querySelector('.ts-root'),{rules:{region:{enabled:false}}}).then(r=>JSON.stringify(r.violations.map(v=>({id:v.id,n:v.nodes.length,ex:[...new Set(v.nodes.map(n=>n.target.join(' ').replace(/span\[data-theme=[^\]]+\]/,'TILE').slice(-90)+' :: '+(n.any[0]?.message||'').replace(/Element has insufficient color contrast of /,'').slice(0,60)))]}))))`);
console.log(t,r);}};

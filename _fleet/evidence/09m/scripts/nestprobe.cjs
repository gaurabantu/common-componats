const fs=require("fs");
const css=fs.readFileSync("/Users/gaurabkumar/Documents/my code/common-componant-main/src/design-system/tokens.css","utf8");
const names=[...new Set([...css.matchAll(/(--(?:color|button|switch|shadow|radius|app|space|font|duration|easing|ts)-[a-z0-9-]+)\s*:/g)].map(m=>m[1]))];
const themes=["light","blue","dark","green","mist","custom","blue-mist","green-mist","infinia-light","infinia-dark"];
const MODE=process.env.MODE||"scope";
module.exports=async(p)=>{
  await p.goto("file://"+__dirname+"/nest.html",800);
  const res=await p.eval(`(()=>{const names=${JSON.stringify(names)};const themes=${JSON.stringify(themes)};const MODE=${JSON.stringify(MODE)};
   const html=document.documentElement;
   const setRoot=t=>{if(t==="light")html.removeAttribute('data-theme');else html.setAttribute('data-theme',t);};
   const probe=document.createElement('div');document.body.appendChild(probe);
   const resolve=(el,n)=>{const v=getComputedStyle(el).getPropertyValue(n).trim();return v;};
   const canon=(host,v)=>{probe.remove();host.appendChild(probe);probe.style.color='';probe.style.color=v;const c=probe.style.color?getComputedStyle(probe).color:v;return c;};
   const read=el=>{const o={};for(const n of names){const v=resolve(el,n);o[n]=(n.startsWith('--color')||n.startsWith('--button')||n.startsWith('--switch')||n.startsWith('--app'))?canon(el,v):v;}return o;};
   const build=(t)=>{const w=document.createElement('div');let inner;
     if(MODE==="naive"||MODE==="naivereset"){if(MODE==="naivereset")w.className="ts-scope";w.setAttribute('data-theme',t==="light"?"classic":t);inner=w;}
     else{w.setAttribute('data-theme','classic');const b=document.createElement('div');b.className='theme-blue';w.appendChild(b);inner=b;
       if(t==="green"){const g=document.createElement('div');g.setAttribute('data-theme','green');b.appendChild(g);inner=g;}
       else if(t!=="light"){b.setAttribute('data-theme',t);}}
     return [w,inner];};
   const ref={};for(const t of themes){setRoot(t);const d=document.createElement('div');document.body.appendChild(d);ref[t]=read(d);d.remove();}
   const out={};
   for(const O of ["light","dark","infinia-dark","green","mist"]){setRoot(O);
     for(const t of themes){const [w,inner]=build(t);document.body.appendChild(w);const v=read(inner);w.remove();
       const diff=names.filter(n=>v[n]!==ref[t][n]);out[O+" > "+t]=diff.map(n=>n+"["+v[n]+" vs "+ref[t][n]+"]");}}
   return out;})()`);
  const u={};for(const k in res){for(const d of res[k]){const n=d.split("[")[0];(u[n]=u[n]||new Set()).add(k);}}for(const n in u)console.log(n, u[n].size, [...u[n]].slice(0,4).join(" | "));
  console.log("MODE",MODE,"tokens with diffs",Object.keys(u).length);
};

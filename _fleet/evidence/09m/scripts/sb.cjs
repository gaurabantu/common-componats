const B="http://localhost:6126/iframe.html";
const CHECK=`(()=>{
 const lum=c=>{const m=c.match(/[\\d.]+/g);if(!m)return null;const [r,g,b,a=1]=m.map(Number);if(+a===0)return null;const f=v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);};
 const light=[];for(const el of document.querySelectorAll('body *')){const r=el.getBoundingClientRect();if(r.width<4||r.height<4)continue;if(el.closest('[data-ts-scope]'))continue;const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')continue;const L=lum(cs.backgroundColor);if(L!==null&&L>0.8)light.push((el.className&&el.className.baseVal===undefined?el.className:el.tagName).toString().slice(0,60));}
 const fails=[...document.querySelectorAll('.ts-ratio[data-pass=false]')].map(e=>e.closest('.ts-swatch')?.getAttribute('aria-label')?.split(',')[0]+' '+e.textContent);
 const missing=[...document.querySelectorAll('.ts-swatch__value--missing')].map(e=>e.closest('.ts-swatch').getAttribute('aria-label').split(',')[0]);
 return {theme:document.documentElement.getAttribute('data-theme'),sw:document.documentElement.scrollWidth,iw:innerWidth,tiles:document.querySelectorAll('.ts-tile').length,active:[...document.querySelectorAll('.ts-tile[aria-pressed=true] .ts-tile__name')].map(e=>e.textContent),lightBg:[...new Set(light)].slice(0,8),lightCount:light.length,ratioFails:fails,missing};})()`;
module.exports=async(p)=>{
  const mode=process.env.VM||"story";
  const id=mode==="docs"?"design-system-theme-showcase--docs":"design-system-theme-showcase--playground";
  for(const theme of (process.env.THEMES||"light,dark,infinia-dark").split(",")){
    for(const w of (process.env.WIDTHS||"375,768,1440").split(",").map(Number)){
      await p.viewport(w,900);
      await p.goto(`${B}?id=${id}&viewMode=${mode}&globals=theme:${theme}`, +(process.env.WAIT||4000));
      const r=await p.eval(CHECK);
      console.log(mode,theme,w,JSON.stringify(r));
      if(!process.env.NOSHOT) await p.shot(`${__dirname}/shots/${mode}-${theme}-${w}.png`);
    }
  }
};

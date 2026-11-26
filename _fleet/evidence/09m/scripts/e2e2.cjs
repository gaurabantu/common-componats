module.exports=async(p)=>{await p.viewport(1440,900);
await p.goto("http://localhost:6126/?path=/story/design-system-theme-showcase--compare-themes&globals=theme:light",14000);
const F=`document.querySelector('#storybook-preview-iframe').contentDocument`;
await p.eval(`(()=>{const d=${F};const b=d.querySelector('[data-ts-tile="dark"]');b.focus();b.click();})()`);
await p.sleep(2500);
console.log(await p.eval(`JSON.stringify({theme:${F}.documentElement.getAttribute('data-theme'),active:${F}.activeElement?.getAttribute('data-ts-tile'),status:${F}.querySelector('.ts-root [role=status]')?.textContent})`));
await p.eval(`(()=>{const d=${F};d.querySelector('[data-ts-tile="light"]').click();})()`);await p.sleep(1500);
};

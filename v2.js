/* DL Servicios Lingüísticos — v2 */
(function(){
const d=document,root=d.documentElement,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
root.classList.add('js');d.body.classList.add('js');
const S=[["Seguridad nacional","National security"],["Medicina forense","Forensic medicine"],["Marketing","Marketing"],["Legal","Legal"],["Farmacología","Pharmacology"],["Sustentabilidad","Sustainability"],["Medicina","Medicine"],["Antiterrorismo","Counter-terrorism"],["Violencia de género","Gender violence"],["Investigación de mercados","Market research"],["Banca y finanzas","Banking & finance"],["TI","IT"],["Recursos humanos","Human resources"],["Ecología","Ecology"],["Belleza y cosmética","Beauty & cosmetics"],["Adicciones","Addictions"],["Balística","Ballistics"],["Técnico-industrial","Technical-industrial"],["Psicología","Psychology"],["Marina","Coast guard"],["Herbolaria","Herbalism"],["Gastronomía","Gastronomy"]];
const C=[["HSBC"],["Banca Mifel"],["General Motors"],["DaimlerChrysler"],["Procter & Gamble"],["Embajada de EE. UU.","U.S. Embassy"],["Interpol"],["Embajada de Sudáfrica","Embassy of South Africa"],["Nextel"],["Banamex"],["Bancomer"],["Coca-Cola"],["Greenberg Traurig"],["Intel"],["Grupo Bimbo"]];
const T=[["Contrato de confidencialidad","Non-disclosure agreement"],["Acta de nacimiento","Birth certificate"],["Estados financieros","Financial statements"],["Consentimiento informado","Informed consent"],["Poder notarial","Power of attorney"],["Dictamen pericial","Expert witness report"],["Ficha técnica","Technical data sheet"]];
const MQ=[["Traducción","Translation"],["Interpretación","Interpreting"],["Revisión","Proofreading"],["Transcripción","Transcription"],["Subtitulaje","Subtitling"],["Renta de equipo","Equipment rental"]];
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
let es=true;const M=n=>d.querySelector('meta[name="'+n+'"]').content;
function renderLists(){
 const sl=$('#sl');sl.innerHTML=S.map(s=>`<li><span class="a">${esc(es?s[0]:s[1])}</span><span class="b" lang="${es?'en':'es'}">${esc(es?s[1]:s[0])}</span></li>`).join('');
 $('#nsec').textContent=S.length;
 $('#cl').innerHTML=C.map(c=>`<li>${esc(es?c[0]:(c[1]||c[0]))}</li>`).join('');
 const one=MQ.map(m=>`<span>${es?m[0]:m[1]}</span><span>${es?m[1]:m[0]}</span>`).join('');$('#mqt').innerHTML=one+one;
}
function splitManif(){const m=$('#manif');const txt=m.textContent.trim();
 m.innerHTML=txt.split(/\s+/).map(w=>`<span class="wd${/^(9|30|años|years|DL|traducción|interpretación|translation|interpreting\.?|interpretación\.)$/i.test(w)?' hl':''}">${esc(w)}</span>`).join(' ');
 if(!RM)m.classList.add('js');manifTick();}
function applyLang(){const L=es?'es':'en';root.lang=L;
 $$('[data-es]').forEach(e=>e.innerHTML=es?e.dataset.es:e.dataset.en);
 const lb=$('#lb');lb.children[0].classList.toggle('on',es);lb.children[1].classList.toggle('on',!es);lb.setAttribute('aria-label',es?'ES EN — switch to English':'ES EN — cambiar a español');
 d.title=M('dl-title-'+L);d.querySelector('meta[name=description]').content=M('dl-desc-'+L);
 $('#txFrom').textContent=es?'ES':'EN';$('#txTo').textContent=es?'EN':'ES';
 try{localStorage.setItem('dl-lang',L)}catch(_){}
 renderLists();splitManif();setTerm(ti,true);}
window.tog=function(){es=!es;applyLang()};
$('#lb').addEventListener('click',()=>window.tog());
/* hero term ticker with scramble */
let ti=0;const A=$('#txA'),B=$('#txB');const GL='abcdefghijklmnopqrstuvwxyzáéíóúñ';
function scramble(el,to){if(RM){el.textContent=to;return}
 const from=el.textContent,len=Math.max(from.length,to.length);let f=0;const tot=26;
 cancelAnimationFrame(el._r);const step=()=>{f++;let o='';for(let i=0;i<len;i++){const p=i/len;const k=f/tot;
  if(k>p+.25)o+=to[i]||'';else if(k>p)o+=to[i]===' '?' ':GL[(Math.random()*GL.length)|0];else o+=from[i]||'';}
  el.textContent=o;if(f<tot+8)el._r=requestAnimationFrame(step);else el.textContent=to};step();}
function setTerm(i,now){const t=T[i%T.length];const a=es?t[0]:t[1],b=es?t[1]:t[0];
 if(now){A.textContent=a;B.textContent=b;return}scramble(A,a);setTimeout(()=>scramble(B,b),420);}
if(!RM)setInterval(()=>{if(d.hidden)return;ti=(ti+1)%T.length;setTerm(ti)},3600);
/* init language */
(function(){let L=null;const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='es')L=q;else{try{L=localStorage.getItem('dl-lang')}catch(_){}}
 es=L!=='en';applyLang();})();
/* hero image: bigger file on large screens */
if(innerWidth>900||devicePixelRatio>2.5){const im=$('#mkimg');const pre=new Image();pre.onload=()=>im.setAttribute('href','img/hero-dome-1200.webp');setTimeout(()=>pre.src='img/hero-dome-1200.webp',1200)}
/* outline draw */
const ln=$('#mkline');if(ln&&!RM&&ln.getTotalLength){try{const L=ln.getTotalLength();ln.style.strokeDasharray=L;ln.style.strokeDashoffset=L;ln.getBoundingClientRect();ln.style.transition='stroke-dashoffset 3.2s cubic-bezier(.16,1,.3,1) .5s';requestAnimationFrame(()=>requestAnimationFrame(()=>ln.style.strokeDashoffset=0))}catch(_){}}
/* header */
const hd=$('#hd');const darks=$$('[data-dark]');let lastY=scrollY;
const fab=$('#waFab'),tip=$('#waTip'),small=matchMedia('(max-width:600px)');
function headerTick(){const y=scrollY;hd.classList.toggle('s',y>30);const h=small.matches&&y<innerHeight*.55;fab.classList.toggle('hid',h);tip&&tip.classList.toggle('hid',h);
 const probe=36;let dark=false;for(const s of darks){const r=s.getBoundingClientRect();if(r.top<=probe&&r.bottom>probe){dark=true;break}}
 hd.classList.toggle('lt',!dark);
 if(!d.body.classList.contains('menu-open'))hd.classList.toggle('hide',y>lastY+4&&y>600);if(y<lastY-4)hd.classList.remove('hide');lastY=y;}
/* manifesto words light up */
function manifTick(){const m=$('#manif');if(!m||RM||root.classList.contains('shot'))return;const ws=m.querySelectorAll('.wd');const r=m.getBoundingClientRect();const vh=innerHeight;
 const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const n=Math.round(p*ws.length*1.05);ws.forEach((w,i)=>w.classList.toggle('on',i<n));}
/* hero parallax */
const mk=$('#mk'),hero=$('.hero');
function heroTick(){if(RM)return;const y=scrollY;if(y>innerHeight*1.2)return;mk.style.transform=`translate3d(0,${y*.12}px,0) scale(${1+y/innerHeight*.08})`;}
let tick=false;addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{headerTick();manifTick();heroTick();tick=false})},{passive:true});
addEventListener('resize',()=>{headerTick();manifTick()});headerTick();
/* reveals */
const shot=/[?&]shot\b/.test(location.search)||location.hash==='#shot';if(shot){root.classList.add('shot');$$('img[loading=lazy]').forEach(i=>i.loading='eager');$$('#manif .wd').forEach(w=>w.classList.add('on'))}
const io=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);if(x.target.classList.contains('cntw'))count(x.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.steps,.mode').forEach((el,i)=>{el.style.transitionDelay=((i%3)*80)+'ms';if(shot||RM)el.classList.add('in');else io.observe(el)});
/* counters */
function count(el){const b=el.querySelector('.cnt');if(!b||RM)return;const to=+b.dataset.to;const t0=performance.now();const dur=1600;
 const f=t=>{const k=Math.min(1,(t-t0)/dur);b.textContent=Math.round(to*(1-Math.pow(1-k,4)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
$$('.stats>div').forEach(x=>{x.classList.add('cntw');if(!shot&&!RM){x.querySelector('.cnt').textContent='0';}});
/* sectors stagger */
const sl=$('#sl');if(!RM&&!shot){sl.classList.add('pre');const io2=new IntersectionObserver(e=>{if(e[0].isIntersecting){sl.querySelectorAll('li').forEach((li,i)=>li.style.transitionDelay=(i*35)+'ms');requestAnimationFrame(()=>sl.classList.remove('pre'));io2.disconnect();setTimeout(()=>sl.querySelectorAll('li').forEach(li=>li.style.transitionDelay=''),2000)}},{threshold:.1});io2.observe(sl)}
/* mobile menu */
const mb=$('#mb'),mn=$('#mnav');function menu(o){d.body.classList.toggle('menu-open',o);mb.setAttribute('aria-expanded',o);mn.setAttribute('aria-hidden',!o);hd.classList.remove('hide')}
mb.addEventListener('click',()=>menu(!d.body.classList.contains('menu-open')));mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
/* form -> WhatsApp */
const WA='525591850449';const g=id=>d.getElementById(id).value.trim();
$('#qf').addEventListener('submit',ev=>{ev.preventDefault();const err=$('#qfErr');const n=g('n'),e=g('e');
 if(!n||!e||!/^\S+@\S+\.\S+$/.test(e)){err.textContent=es?'Escribe tu nombre y un correo válido.':'Please enter your name and a valid email.';return}err.textContent='';
 const sv=$('#sv');const svt=sv.options[sv.selectedIndex].textContent;
 const L=es?[['Nombre',n],['Correo',e],['Teléfono',g('t')],['Servicio',svt],['Idiomas',[g('de'),g('a')].filter(Boolean).join(' → ')],['Comentarios',g('c')]]:[['Name',n],['Email',e],['Phone',g('t')],['Service',svt],['Languages',[g('de'),g('a')].filter(Boolean).join(' → ')],['Notes',g('c')]];
 const msg=(es?'Hola, DL Servicios Lingüísticos. Quisiera una cotización:':'Hello, DL Servicios Lingüísticos. I would like a quote:')+'\n\n'+L.filter(r=>r[1]).map(r=>'• '+r[0]+': '+r[1]).join('\n');
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');});
$('#qfMail').addEventListener('click',ev=>{const sv=$('#sv');
 const body=[(es?'Nombre: ':'Name: ')+g('n'),(es?'Teléfono: ':'Phone: ')+g('t'),(es?'Servicio: ':'Service: ')+sv.options[sv.selectedIndex].textContent,(es?'Idiomas: ':'Languages: ')+[g('de'),g('a')].filter(Boolean).join(' → '),(es?'Comentarios: ':'Notes: ')+g('c')].join('\n');
 ev.currentTarget.href='mailto:lorena@dlsl.com.mx?subject='+encodeURIComponent(es?'Solicitud de cotización':'Quote request')+'&body='+encodeURIComponent(body);});
})();

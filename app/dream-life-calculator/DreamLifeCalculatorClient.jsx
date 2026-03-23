"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, X, DollarSign, Home, Car, Utensils, Heart, Smartphone, ShoppingBag, GraduationCap, PartyPopper, Gem, HandHeart, PiggyBank, Zap, PawPrint, Lightbulb, TrendingUp, HelpCircle, Calculator, RotateCcw, Sparkles } from "lucide-react";
import { select, pie, arc as d3Arc, interpolate, easeCubicOut } from "d3";

// ═══════════════════════════════════════════════════════════════
// BRAND THEME
// ═══════════════════════════════════════════════════════════════
const T={primaryBlue:'#0081CB',coachViolet:'#6A3CFF',mintAccent:'#62FFDA',darkBase:'#0D0D0D',softSilver:'#CFCFCF',negativeRed:'#FF3366',offWhite:'#FAFAFA',accentBlue:'#00A3FF',amber:'#FFB347'};
const F={h:"var(--font-montserrat),'Montserrat',sans-serif",b:"var(--font-lato),'Lato',sans-serif",m:"ui-monospace,SFMono-Regular,'SF Mono',monospace"};
const NOISE_BG=`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ═══════════════════════════════════════════════════════════════
// TAX CONSTANTS 2025-26
// ═══════════════════════════════════════════════════════════════
const TAX_YEAR='2025-26',SUPER_RATE=0.115,MEDICARE_RATE=0.02;
const TAX_BRACKETS=[{min:0,max:18200,rate:0,base:0},{min:18201,max:45000,rate:0.16,base:0},{min:45001,max:135000,rate:0.30,base:4288},{min:135001,max:190000,rate:0.37,base:31288},{min:190001,max:Infinity,rate:0.45,base:51638}];

const calcTax=g=>{for(let i=TAX_BRACKETS.length-1;i>=0;i--){const b=TAX_BRACKETS[i];if(g>=b.min)return b.base+(g-(b.min-1))*b.rate}return 0};
const calcMed=g=>g*MEDICARE_RATE;
const calcHECS=g=>{if(g<=67000)return 0;if(g>=179286)return g*0.10;if(g<=125000)return(g-67000)*0.15;return(125000-67000)*0.15+(g-125000)*0.17};
const grossFromNet=(n,h)=>{let lo=n,hi=n*2.5;for(let i=0;i<80;i++){const m=(lo+hi)/2;let d=calcTax(m)+calcMed(m);if(h)d+=calcHECS(m);if(m-d<n)lo=m;else hi=m}return Math.round((lo+hi)/2)};
const grossSimple=(n,r)=>Math.round(n/(1-r/100));

// ═══════════════════════════════════════════════════════════════
// FORMATTING & FREQUENCY
// ═══════════════════════════════════════════════════════════════
const fmtC=v=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(v);
const fmtN=v=>{const n=parseFloat(v);if(isNaN(n)||v===''||v===0)return'';return new Intl.NumberFormat('en-AU',{maximumFractionDigits:2}).format(n)};
const FREQ=[{v:'weekly',l:'Weekly',m:52},{v:'fortnightly',l:'Fortnightly',m:26},{v:'monthly',l:'Monthly',m:12},{v:'quarterly',l:'Quarterly',m:4},{v:'yearly',l:'Yearly',m:1}];
const DISP=[{v:'weekly',l:'Weekly',d:52},{v:'monthly',l:'Monthly',d:12},{v:'yearly',l:'Yearly',d:1}];
const f2y=(a,f)=>(parseFloat(a)||0)*(FREQ.find(o=>o.v===f)?.m||1);
const y2d=(y,df)=>y/(DISP.find(o=>o.v===df)?.d||1);
const fl=f=>f==='weekly'?'wk':f==='monthly'?'mo':'yr';

// ═══════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════
let _id=0;const nid=()=>++_id;
const CATS=[
  {id:'housing',icon:'Home',label:'Housing',color:T.primaryBlue,prompts:["Will you rent or buy? What suburb?","Don't forget renters/contents insurance.","Budget for maintenance, repairs, body corporate.","Utilities: water, council rates?"],defaults:[{name:'Rent / Mortgage',amount:500,freq:'weekly'},{name:'Contents Insurance',amount:30,freq:'monthly'}]},
  {id:'transport',icon:'Car',label:'Transport',color:T.coachViolet,prompts:["Car repayments, rego, insurance, servicing, tyres.","Fuel — $60-100/week is common.","Public transport, cycling, rideshare?","Tolls, parking, roadside assist."],defaults:[{name:'Car Repayment',amount:400,freq:'monthly'},{name:'Fuel',amount:60,freq:'weekly'},{name:'Rego & Insurance',amount:1800,freq:'yearly'}]},
  {id:'food',icon:'Utensils',label:'Food & Drink',color:T.mintAccent,prompts:["Groceries: $80-150/week.","Eating out: $30-80+ per dinner.","Daily barista coffee = ~$1,300/year.","UberEats, alcohol, snacks, meal kits."],defaults:[{name:'Groceries',amount:120,freq:'weekly'},{name:'Eating Out',amount:60,freq:'weekly'},{name:'Coffee',amount:25,freq:'weekly'}]},
  {id:'health',icon:'Heart',label:'Health & Fitness',color:'#FF4D6A',prompts:["Health insurance ~$100-200/month.","Gym: $15/wk basic to $60+/wk premium.","Dental ($200-400/yr), optometrist.","Physio, supplements, mental health."],defaults:[{name:'Health Insurance',amount:120,freq:'monthly'},{name:'Gym Membership',amount:30,freq:'weekly'}]},
  {id:'tech',icon:'Smartphone',label:'Tech & Subscriptions',color:T.accentBlue,prompts:["Phone plan: $30-80/month.","Internet/NBN: $60-100/month.","Netflix, Spotify, YouTube, gaming subs.","Latest phone yearly? $50-80/month on plan."],defaults:[{name:'Phone Plan',amount:50,freq:'monthly'},{name:'Internet',amount:80,freq:'monthly'},{name:'Streaming',amount:40,freq:'monthly'}]},
  {id:'personal',icon:'ShoppingBag',label:'Personal & Appearance',color:'#8B5CF6',prompts:["Haircuts: $30-80 every 4-8 weeks.","Clothing budget — quality vs quantity.","Skincare, grooming, fragrance.","Dry cleaning, laundry costs."],defaults:[{name:'Clothing',amount:150,freq:'monthly'},{name:'Haircuts',amount:50,freq:'monthly'}]},
  {id:'education',icon:'GraduationCap',label:'Education & Growth',color:T.amber,prompts:["Courses, certifications, workshops.","Books, audiobooks, subscriptions.","Coaching: $100-500/month.","Professional memberships."],defaults:[{name:'Books & Courses',amount:50,freq:'monthly'}]},
  {id:'social',icon:'PartyPopper',label:'Social & Fun',color:T.coachViolet,prompts:["Drinks, events, festivals, concerts.","Hobbies — gear, equipment, supplies.","Date nights, activities.","Holidays — even a weekend is $300-500+."],defaults:[{name:'Going Out / Social',amount:80,freq:'weekly'},{name:'Holidays & Travel',amount:5000,freq:'yearly'}]},
  {id:'toys',icon:'Gem',label:'Toys & Big Wants',color:T.mintAccent,prompts:["Motorbike, jetski, boat, drone, gaming rig?","Enter total price + years to pay off.","Don't forget ongoing costs — fuel, insurance, storage.","Or add as a flat recurring cost."],defaults:[]},
  {id:'pets',icon:'PawPrint',label:'Pets',color:T.amber,prompts:["A dog costs $1,500-3,000/year.","Pet insurance: $30-80/month.","Grooming, boarding, training.","Cats: ~$800-1,500/year."],defaults:[]},
  {id:'giving',icon:'HandHeart',label:'Giving & Gifts',color:T.primaryBlue,prompts:["Birthday & Christmas presents.","Charity & causes you care about.","Wedding gifts, baby showers.","Shouting mates, helping family."],defaults:[{name:'Gifts',amount:1200,freq:'yearly'}]},
  {id:'savings',icon:'PiggyBank',label:'Savings & Investing',color:T.mintAccent,prompts:["Emergency fund: 3-6 months of expenses.","Investing — ETFs, shares, super top-ups.","House deposit? $500/month is a start.","Pay yourself first, not last."],defaults:[{name:'Savings',amount:200,freq:'monthly'},{name:'Investing',amount:100,freq:'monthly'}]},
  {id:'bills',icon:'Zap',label:'Bills & Admin',color:T.negativeRed,prompts:["Electricity: $200-500/quarter.","Gas: $100-300/quarter.","Tax return: $150-400/year.","Council rates, strata fees."],defaults:[{name:'Electricity',amount:350,freq:'quarterly'},{name:'Gas',amount:200,freq:'quarterly'}]},
];
const ICONS={Home,Car,Utensils,Heart,Smartphone,ShoppingBag,GraduationCap,PartyPopper,Gem,HandHeart,PiggyBank,Zap,PawPrint};

// ═══════════════════════════════════════════════════════════════
// STORAGE — SSR-safe: never call localStorage at module/render level
// ═══════════════════════════════════════════════════════════════
const SK='dreamlife_v2';
const save=d=>{try{localStorage.setItem(SK,JSON.stringify(d))}catch{}};
const load=()=>{try{const r=localStorage.getItem(SK);return r?JSON.parse(r):null}catch{return null}};
const buildDef=()=>CATS.map(c=>({...c,expanded:['housing','transport','food'].includes(c.id),items:c.defaults.map(it=>({...it,id:nid(),isBigTicket:false,totalPrice:0,years:5}))}));

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════
const useAnimatedNumber=(target,duration=500)=>{
  const[display,setDisplay]=useState(target);
  const prev=useRef(target);
  const raf=useRef(null);
  useEffect(()=>{
    const from=prev.current,to=target;
    if(from===to)return;
    const start=performance.now();
    const step=now=>{
      const t=Math.min((now-start)/duration,1);
      const ease=1-Math.pow(1-t,3);
      setDisplay(from+(to-from)*ease);
      if(t<1)raf.current=requestAnimationFrame(step);
    };
    raf.current=requestAnimationFrame(step);
    prev.current=to;
    return()=>{if(raf.current)cancelAnimationFrame(raf.current)};
  },[target,duration]);
  return display;
};

const useScrollReveal=(threshold=0.15)=>{
  const ref=useRef(null);
  const[visible,setVisible]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold});
    obs.observe(el);
    return()=>obs.disconnect();
  },[threshold]);
  return[ref,visible];
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS — hybrid Tailwind + inline, matching prototype exactly
// ═══════════════════════════════════════════════════════════════

const Card=({children,className=""})=>(
  <div className={`rounded-3xl relative ${className}`} style={{background:'linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))',border:'1px solid rgba(255,255,255,0.14)',boxShadow:'0 18px 45px rgba(0,0,0,0.85),0 0 0 1px rgba(0,0,0,0.5) inset',backdropFilter:'blur(22px)',overflow:'visible'}}>
    <div className="absolute top-0 left-10 right-10 h-px pointer-events-none" style={{background:'linear-gradient(to right,transparent,rgba(255,255,255,0.2),transparent)',opacity:0.7}}/>
    <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{border:'1px solid rgba(255,255,255,0.05)'}}/>
    <div className="relative z-10 w-full">{children}</div>
  </div>
);

const AnimatedCurrency=({value,color='white',size=48,suffix=''})=>{
  const animated=useAnimatedNumber(value);
  return(
    <span style={{fontFamily:F.m,fontWeight:700,fontSize:size,color,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums'}}>
      {fmtC(Math.round(animated))}{suffix&&<span style={{fontSize:size*0.42,fontWeight:700,opacity:0.7,marginLeft:4}}>{suffix}</span>}
    </span>
  );
};

const Reveal=({children,delay=0,className=""})=>{
  const[ref,visible]=useScrollReveal(0.1);
  return(
    <div ref={ref} className={className} style={{opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(20px)',transition:`opacity 600ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, transform 600ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`}}>
      {children}
    </div>
  );
};

const Tip=({prompts,color})=>{
  const[open,setOpen]=useState(false);
  const[pos,setPos]=useState({top:0,left:0});
  const btn=useRef(null),tip=useRef(null);
  const up=useCallback(()=>{if(btn.current){const r=btn.current.getBoundingClientRect();setPos({top:r.top-8,left:Math.max(148,Math.min(r.left+r.width/2,window.innerWidth-148))})}},[]);
  useEffect(()=>{
    if(!open)return;up();
    window.addEventListener('scroll',up,true);window.addEventListener('resize',up);
    const cl=e=>{if(!btn.current?.contains(e.target)&&!tip.current?.contains(e.target))setOpen(false)};
    const t=setTimeout(()=>{document.addEventListener('mousedown',cl);document.addEventListener('touchstart',cl)},0);
    return()=>{clearTimeout(t);window.removeEventListener('scroll',up,true);window.removeEventListener('resize',up);document.removeEventListener('mousedown',cl);document.removeEventListener('touchstart',cl)};
  },[open,up]);
  return(<>
    <button ref={btn} onClick={e=>{e.stopPropagation();up();setOpen(!open)}} aria-label="Tips" className="inline-flex items-center justify-center w-5 h-5 rounded-full transition-all" style={{border:`1px solid ${color}`,color,background:open?`${color}22`:'transparent',position:'relative',zIndex:open?9998:'auto'}}><Lightbulb size={12}/></button>
    {open&&<div ref={tip} style={{position:'fixed',top:pos.top,left:pos.left,transform:'translate(-50%,-100%)',zIndex:9999,width:288,padding:16,borderRadius:12,background:'rgba(13,13,13,0.97)',border:`1px solid ${color}44`,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',boxShadow:'0 20px 40px rgba(0,0,0,0.6)'}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}><Lightbulb size={14} style={{color,flexShrink:0}}/><span style={{fontFamily:F.h,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color}}>Things to think about</span></div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>{prompts.map((p,i)=><p key={i} style={{fontFamily:F.b,fontSize:12,color:T.softSilver,lineHeight:1.5,paddingLeft:8,borderLeft:`2px solid ${color}33`,margin:0}}>{p}</p>)}</div>
      <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'6px solid transparent',borderRight:'6px solid transparent',borderTop:`6px solid ${color}44`}}/>
    </div>}
  </>);
};

const CurrencyInput=({value,onChange,placeholder="0",className="",style:s={}})=>{
  const[focused,setFocused]=useState(false);
  return<input type="text" inputMode="decimal" placeholder={placeholder}
    value={focused?(value===''||value===0?'':value):fmtN(value)}
    onChange={e=>{const r=e.target.value.replace(/[^0-9.]/g,'');onChange(r===''?'':parseFloat(r))}}
    onFocus={e=>{setFocused(true);e.target.style.borderColor='rgba(98,255,218,0.9)';e.target.style.boxShadow='0 0 0 1px rgba(98,255,218,0.7),0 0 20px rgba(98,255,218,0.25)'}}
    onBlur={e=>{setFocused(false);e.target.style.borderColor='rgba(148,163,184,0.3)';e.target.style.boxShadow='none'}}
    className={`rounded-xl text-sm outline-none transition-all ${className}`}
    style={{fontFamily:F.m,background:'rgba(15,23,42,0.75)',border:'1px solid rgba(148,163,184,0.3)',color:'#E5E7EB',...s}}/>;
};

const TextInput=({value,onChange,placeholder,className=""})=><input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
  className={`rounded-xl text-sm outline-none transition-all ${className}`} style={{fontFamily:F.b,background:'rgba(15,23,42,0.75)',border:'1px solid rgba(148,163,184,0.3)',color:'#E5E7EB'}}
  onFocus={e=>{e.target.style.borderColor='rgba(98,255,218,0.9)';e.target.style.boxShadow='0 0 0 1px rgba(98,255,218,0.7),0 0 20px rgba(98,255,218,0.25)'}}
  onBlur={e=>{e.target.style.borderColor='rgba(148,163,184,0.3)';e.target.style.boxShadow='none'}}/>;

const Pill=({options,value,onChange})=><div className="flex rounded-full overflow-hidden" style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(15,23,42,0.5)'}}>
  {options.map(o=><button key={o.v} onClick={()=>onChange(o.v)} className="px-4 py-1.5 text-xs font-bold transition-all" style={{fontFamily:F.h,background:value===o.v?T.primaryBlue:'transparent',color:value===o.v?'white':T.softSilver,letterSpacing:'0.04em'}}>{o.l}</button>)}</div>;

const StatBox=({label,value,sub,color=T.mintAccent})=><div className="p-4 rounded-xl" style={{background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.05)'}}>
  <div style={{fontFamily:F.h,fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(241,245,249,0.35)',marginBottom:4}}>{label}</div>
  <div style={{fontFamily:F.m,fontSize:22,fontWeight:700,color}}>{value}</div>
  {sub&&<div style={{fontFamily:F.b,fontSize:10,color:'rgba(241,245,249,0.45)',marginTop:4}}>{sub}</div>}</div>;

const DonutChart=({data,size=200})=>{
  const ref=useRef(null);
  const[scrollRef,visible]=useScrollReveal(0.3);
  const[hovered,setHovered]=useState(null);
  useEffect(()=>{
    if(!ref.current||!visible||data.length===0)return;
    const svg=select(ref.current);
    svg.selectAll('*').remove();
    const w=size,h=size,radius=Math.min(w,h)/2;
    const g=svg.attr('width',w).attr('height',h).append('g').attr('transform',`translate(${w/2},${h/2})`);
    const pieGen=pie().value(d=>d.value).sort(null).padAngle(0.03);
    const arc=d3Arc().innerRadius(radius*0.62).outerRadius(radius*0.88).cornerRadius(4);
    const arcHover=d3Arc().innerRadius(radius*0.60).outerRadius(radius*0.92).cornerRadius(4);
    const paths=g.selectAll('path').data(pieGen(data)).enter().append('path')
      .attr('d',arc).attr('fill',d=>d.data.color).attr('opacity',0).attr('stroke','none')
      .style('cursor','pointer').style('filter','drop-shadow(0 2px 8px rgba(0,0,0,0.3))');
    paths.transition().duration(800).delay((d,i)=>i*80).ease(easeCubicOut)
      .attrTween('d',function(d){const i=interpolate({startAngle:d.startAngle,endAngle:d.startAngle},d);return t=>arc(i(t));}).attr('opacity',0.9);
    paths.on('mouseenter',function(event,d){select(this).transition().duration(200).attr('d',arcHover).attr('opacity',1);setHovered(d.data);})
         .on('mouseleave',function(){select(this).transition().duration(200).attr('d',arc).attr('opacity',0.9);setHovered(null);});
  },[data,visible,size]);
  return(
    <div ref={scrollRef} style={{position:'relative',width:size,height:size,margin:'0 auto'}}>
      <svg ref={ref}/>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',pointerEvents:'none'}}>
        {hovered?(<>
          <div style={{fontFamily:F.h,fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:hovered.color,marginBottom:2}}>{hovered.label}</div>
          <div style={{fontFamily:F.m,fontSize:18,fontWeight:700,color:'white'}}>{hovered.pct}%</div>
        </>):(<>
          <div style={{fontFamily:F.h,fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'rgba(241,245,249,0.35)',marginBottom:2}}>Total</div>
          <div style={{fontFamily:F.m,fontSize:16,fontWeight:700,color:T.mintAccent}}>{data.length} categories</div>
        </>)}
      </div>
    </div>
  );
};

const EmptyState=({color,onAdd,onAddBig})=>(
  <div className="py-8 flex flex-col items-center gap-3" style={{opacity:0.6}}>
    <div style={{width:48,height:48,borderRadius:16,background:`${color}0A`,border:`1px dashed ${color}33`,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Sparkles size={20} style={{color}}/>
    </div>
    <p style={{fontFamily:F.b,fontSize:13,color:T.softSilver,textAlign:'center'}}>Nothing here yet. What does your<br/>dream life include?</p>
    <div className="flex gap-2">
      <button onClick={onAdd} className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{fontFamily:F.h,fontSize:10,letterSpacing:'0.05em',color,background:`${color}0A`,border:`1px dashed ${color}33`}}
        onMouseEnter={e=>{e.currentTarget.style.background=`${color}15`}} onMouseLeave={e=>{e.currentTarget.style.background=`${color}0A`}}><Plus size={12} style={{display:'inline',verticalAlign:'-2px',marginRight:4}}/>Add Item</button>
      <button onClick={onAddBig} className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{fontFamily:F.h,fontSize:10,letterSpacing:'0.05em',color:T.coachViolet,background:`${T.coachViolet}0A`,border:`1px dashed ${T.coachViolet}33`}}
        onMouseEnter={e=>{e.currentTarget.style.background=`${T.coachViolet}15`}} onMouseLeave={e=>{e.currentTarget.style.background=`${T.coachViolet}0A`}}>💰 Big Purchase</button>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function DreamLifeCalculatorClient(){
  // SSR-safe: initialise with defaults, load from localStorage after mount
  const[categories,setCategories]=useState(buildDef);
  const[displayFreq,setDisplayFreq]=useState('weekly');
  const[taxMode,setTaxMode]=useState('ato');
  const[simpleRate,setSimpleRate]=useState(30);
  const[includeHECS,setIncludeHECS]=useState(false);
  const[includeSuper,setIncludeSuper]=useState(false);
  const[showShare,setShowShare]=useState(false);
  const[showHelp,setShowHelp]=useState(false);
  const[removingItems,setRemovingItems]=useState(new Set());
  const[newItems,setNewItems]=useState(new Set());
  const[mounted,setMounted]=useState(false);

  useEffect(()=>{
    setMounted(true);
    const saved=load();
    if(saved){
      if(saved.categories)setCategories(saved.categories);
      if(saved.displayFreq)setDisplayFreq(saved.displayFreq);
      if(saved.taxMode)setTaxMode(saved.taxMode);
      if(saved.simpleRate!=null)setSimpleRate(saved.simpleRate);
      if(saved.includeHECS!=null)setIncludeHECS(saved.includeHECS);
      if(saved.includeSuper!=null)setIncludeSuper(saved.includeSuper);
    }
  },[]);

  useEffect(()=>{
    if(mounted)save({categories,displayFreq,taxMode,simpleRate,includeHECS,includeSuper});
  },[mounted,categories,displayFreq,taxMode,simpleRate,includeHECS,includeSuper]);

  const totals=useMemo(()=>{const byCat={};let gy=0;categories.forEach(c=>{let cy=0;c.items.forEach(it=>{if(it.isBigTicket&&it.totalPrice>0&&it.years>0)cy+=it.totalPrice/it.years;else cy+=f2y(it.amount,it.freq)});byCat[c.id]=cy;gy+=cy});return{byCat,grandYearly:gy}},[categories]);
  const income=useMemo(()=>{const n=totals.grandYearly;if(taxMode==='ato'){const g=grossFromNet(n,includeHECS),tx=calcTax(g),mc=calcMed(g),hc=includeHECS?calcHECS(g):0,pk=includeSuper?Math.round(g*(1+SUPER_RATE)):g;return{gross:g,tax:tx,medicare:mc,hecs:hc,pkg:pk}}const g=grossSimple(n,simpleRate),pk=includeSuper?Math.round(g*(1+SUPER_RATE)):g;return{gross:g,tax:g-n,medicare:0,hecs:0,pkg:pk}},[totals.grandYearly,taxMode,simpleRate,includeHECS,includeSuper]);
  const displayTotal=y2d(totals.grandYearly,displayFreq);

  const toggle=id=>setCategories(p=>p.map(c=>c.id===id?{...c,expanded:!c.expanded}:c));
  const addItem=(id,big=false)=>{const iid=nid();setNewItems(p=>new Set(p).add(iid));setCategories(p=>p.map(c=>c.id===id?{...c,items:[...c.items,{id:iid,name:'',amount:0,freq:'weekly',isBigTicket:big,totalPrice:0,years:5}]}:c));setTimeout(()=>setNewItems(p=>{const n=new Set(p);n.delete(iid);return n}),500)};
  const rmItem=(cid,iid)=>{setRemovingItems(p=>new Set(p).add(iid));setTimeout(()=>{setCategories(p=>p.map(c=>c.id===cid?{...c,items:c.items.filter(it=>it.id!==iid)}:c));setRemovingItems(p=>{const n=new Set(p);n.delete(iid);return n})},350)};
  const upItem=(cid,iid,f,v)=>setCategories(p=>p.map(c=>c.id===cid?{...c,items:c.items.map(it=>it.id===iid?{...it,[f]:v}:it)}:c));
  const addCat=()=>setCategories(p=>[...p,{id:'custom-'+Date.now(),icon:'Gem',label:'Custom Category',color:T.accentBlue,prompts:["What else does your dream life include?"],expanded:true,items:[{id:nid(),name:'',amount:0,freq:'weekly',isBigTicket:false,totalPrice:0,years:5}]}]);
  const rmCat=id=>setCategories(p=>p.filter(c=>c.id!==id));
  const renameCat=(id,l)=>setCategories(p=>p.map(c=>c.id===id?{...c,label:l}:c));
  const resetAll=()=>{if(window.confirm('Reset everything to defaults?')){setCategories(buildDef());setDisplayFreq('weekly');setTaxMode('ato');setSimpleRate(30);setIncludeHECS(false);setIncludeSuper(false)}};

  const sorted=useMemo(()=>categories.filter(c=>(totals.byCat[c.id]||0)>0).sort((a,b)=>(totals.byCat[b.id]||0)-(totals.byCat[a.id]||0)),[categories,totals]);
  const donutData=useMemo(()=>sorted.slice(0,8).map(c=>({label:c.label,value:totals.byCat[c.id]||0,color:c.color,pct:totals.grandYearly>0?((totals.byCat[c.id]||0)/totals.grandYearly*100).toFixed(1):'0'})),[sorted,totals]);

  return(
    <div className="min-h-screen text-white pb-20 relative overflow-x-hidden" style={{background:T.darkBase,fontFamily:F.b}}>
      {/* BG ORBS */}
      <div className="fixed inset-0 pointer-events-none" style={{zIndex:0}}>
        <div className="absolute rounded-full" style={{top:0,left:'10%',width:500,height:500,background:T.coachViolet,mixBlendMode:'screen',filter:'blur(120px)',opacity:0.2,animation:'dlcPulse 10s ease-in-out infinite'}}/>
        <div className="absolute rounded-full" style={{bottom:0,right:'10%',width:600,height:600,background:T.primaryBlue,mixBlendMode:'screen',filter:'blur(130px)',opacity:0.2}}/>
        <div className="absolute rounded-full" style={{top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:800,height:800,background:T.mintAccent,mixBlendMode:'overlay',filter:'blur(150px)',opacity:0.05}}/>
        <div className="absolute inset-0" style={{opacity:0.1,mixBlendMode:'soft-light',backgroundImage:NOISE_BG}}/>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(13,13,13,0.7)'}}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 no-underline" style={{color:'inherit',textDecoration:'none'}}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:`linear-gradient(135deg,${T.primaryBlue},${T.coachViolet})`,boxShadow:`0 4px 12px ${T.primaryBlue}44`}}><Calculator size={18} color="white"/></div>
            <div><div style={{fontFamily:F.h,fontWeight:700,fontSize:14}}>Dream Life Calculator</div><div style={{fontFamily:F.b,fontSize:10,color:T.softSilver,opacity:0.6}}>by Mitch Bryant</div></div>
          </a>
          <div className="flex items-center gap-2">
            <button onClick={resetAll} aria-label="Reset" className="p-2 rounded-lg transition-colors" style={{color:T.softSilver,background:'transparent',border:'none',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><RotateCcw size={16}/></button>
            <button onClick={()=>setShowHelp(true)} aria-label="Help" className="p-2 rounded-lg transition-colors" style={{color:T.softSilver,background:'transparent',border:'none',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><HelpCircle size={18}/></button>
            <button onClick={()=>setShowShare(true)} className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all" style={{fontFamily:F.h,background:`linear-gradient(135deg,${T.primaryBlue},${T.coachViolet})`,letterSpacing:'0.04em',border:'none',cursor:'pointer',color:'white'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=`0 8px 20px ${T.primaryBlue}55`}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>SHARE</button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-4 py-8 relative" style={{zIndex:10,opacity:0,transform:'translateY(8px)',animation:'dlcFadeIn 600ms cubic-bezier(0.34,1.56,0.64,1) 100ms forwards'}}>

        {/* HERO COPY */}
        <div className="mb-8">
          <p style={{fontFamily:F.h,fontWeight:700,fontSize:15,color:T.accentBlue,marginBottom:6}}>Design your dream life. Then figure out what it costs.</p>
          <p style={{fontFamily:F.b,fontSize:13,color:T.softSilver,lineHeight:1.6}}>Most people pick a career first and hope the lifestyle follows. <strong style={{color:'rgba(241,245,249,0.7)'}}>Life-first thinking flips that.</strong> Fill in what your ideal life actually looks like, and this tool will tell you exactly what you need to earn.</p>
        </div>

        {/* FREQUENCY TOGGLE */}
        <div className="flex items-center gap-2 mb-6">
          <span style={{fontFamily:F.h,fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(241,245,249,0.4)'}}>Show costs as:</span>
          <Pill options={DISP.map(o=>({v:o.v,l:o.l}))} value={displayFreq} onChange={setDisplayFreq}/>
        </div>

        {/* HERO SUMMARY CARD */}
        <div className="mb-8 rounded-3xl overflow-hidden relative" style={{minHeight:140}}>
          <div className="absolute inset-0" style={{background:'linear-gradient(110deg,#0081CB 0%,#6A3CFF 100%)'}}/>
          <div className="absolute inset-0" style={{opacity:0.2,mixBlendMode:'soft-light',backgroundImage:NOISE_BG}}/>
          <div className="relative p-6 sm:p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div style={{fontFamily:F.h,fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.2em',opacity:0.8,marginBottom:8}}>Your Dream Life Costs</div>
                <div style={{fontFamily:F.h,fontWeight:900,lineHeight:1}}>
                  <AnimatedCurrency value={displayTotal} size={48} suffix={`/${fl(displayFreq)}`}/>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{fontFamily:F.b,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)'}}>{fmtC(totals.grandYearly)}/year</span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{fontFamily:F.b,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)'}}>{categories.reduce((s,c)=>s+c.items.length,0)} line items</span>
                </div>
              </div>
              <div className="rounded-2xl p-5 w-full md:w-auto md:min-w-[240px]" style={{background:'rgba(0,0,0,0.2)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontFamily:F.h,fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',opacity:0.7,marginBottom:4}}>{includeSuper?'Total Package (inc. Super)':'Pre-Tax Income Needed'}</div>
                <AnimatedCurrency value={includeSuper?income.pkg:income.gross} color={T.mintAccent} size={24}/>
                <div className="w-full my-3" style={{height:1,background:'rgba(255,255,255,0.1)'}}/>
                <div style={{fontFamily:F.h,fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',opacity:0.7,marginBottom:4}}>{"That's"}</div>
                <AnimatedCurrency value={y2d(includeSuper?income.pkg:income.gross,displayFreq)} size={20} suffix={`/${fl(displayFreq)}`}/>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-4">
          {categories.map(cat=>{
            const IC=ICONS[cat.icon]||Gem;const ct=totals.byCat[cat.id]||0;
            return(
              <Card key={cat.id}>
                <div role="button" tabIndex={0} onClick={()=>toggle(cat.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(cat.id)}}} aria-label={`Toggle ${cat.label}`} className="w-full flex items-center justify-between p-5 cursor-pointer" style={{background:'transparent',border:'none',color:'white'}}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:`${cat.color}1A`}}><IC size={18} style={{color:cat.color}}/></div>
                    <div className="flex items-center gap-2 min-w-0">
                      {cat.id.startsWith('custom-')?<input value={cat.label} onClick={e=>e.stopPropagation()} onChange={e=>renameCat(cat.id,e.target.value)} className="bg-transparent border-none outline-none text-white font-bold text-sm" style={{fontFamily:F.h,textTransform:'uppercase',letterSpacing:'0.05em',width:'100%'}}/>
                        :<span style={{fontFamily:F.h,fontWeight:700,fontSize:13,textTransform:'uppercase',letterSpacing:'0.05em'}}>{cat.label}</span>}
                      <Tip prompts={cat.prompts} color={cat.color}/>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{fontFamily:F.m,fontWeight:700,fontSize:15,color:ct>0?T.mintAccent:'rgba(241,245,249,0.25)'}}>{ct>0?`${fmtC(y2d(ct,displayFreq))}/${fl(displayFreq)}`:'$0'}</span>
                    {cat.expanded?<ChevronUp size={16} style={{color:T.softSilver,opacity:0.5}}/>:<ChevronDown size={16} style={{color:T.softSilver,opacity:0.5}}/>}
                  </div>
                </div>
                {cat.expanded&&(
                  <div className="px-5 pb-5" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
                    {cat.items.length===0?(
                      <EmptyState color={cat.color} onAdd={()=>addItem(cat.id)} onAddBig={()=>addItem(cat.id,true)}/>
                    ):(<>
                      {cat.items.map((item)=>{
                        const isRemoving=removingItems.has(item.id);
                        const isNew=newItems.has(item.id);
                        return(
                          <div key={item.id} className="pt-3" style={{
                            opacity:isRemoving?0:1,
                            transform:isRemoving?'scale(0.92) translateX(-30px)':'scale(1) translateX(0)',
                            maxHeight:isRemoving?0:300,
                            paddingTop:isRemoving?0:12,
                            marginBottom:isRemoving?-8:0,
                            overflow:'hidden',
                            transition:'opacity 300ms ease, transform 300ms ease, max-height 350ms ease, padding-top 300ms ease, margin-bottom 300ms ease',
                            ...(isNew?{animation:'dlcSlideIn 400ms cubic-bezier(0.34,1.56,0.64,1) forwards'}:{}),
                          }}>
                            <div className="flex flex-wrap items-start gap-2">
                              <TextInput value={item.name} onChange={v=>upItem(cat.id,item.id,'name',v)} placeholder={item.isBigTicket?"Big purchase name":"Item name"} className="flex-1 min-w-[140px] px-3 py-2.5"/>
                              {item.isBigTicket?(<>
                                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none" style={{color:T.softSilver,opacity:0.5}}>$</span>
                                  <CurrencyInput value={item.totalPrice} onChange={v=>upItem(cat.id,item.id,'totalPrice',v||0)} placeholder="Total $" className="w-32 pl-7 pr-3 py-2.5"/></div>
                                <div className="relative"><CurrencyInput value={item.years} onChange={v=>upItem(cat.id,item.id,'years',v||0)} placeholder="Yrs" className="w-20 px-3 py-2.5"/>
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none" style={{color:T.softSilver,opacity:0.5}}>yrs</span></div>
                              </>):(<>
                                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none" style={{color:T.softSilver,opacity:0.5}}>$</span>
                                  <CurrencyInput value={item.amount} onChange={v=>upItem(cat.id,item.id,'amount',v)} className="w-32 pl-7 pr-3 py-2.5"/></div>
                                <select value={item.freq} onChange={e=>upItem(cat.id,item.id,'freq',e.target.value)} className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer" style={{fontFamily:F.b,background:'rgba(15,23,42,0.75)',border:'1px solid rgba(148,163,184,0.3)',color:'#E5E7EB',minWidth:110}}>
                                  {FREQ.map(f=><option key={f.v} value={f.v}>{f.l}</option>)}</select>
                              </>)}
                              <button onClick={()=>rmItem(cat.id,item.id)} aria-label="Delete" className="p-2.5 rounded-xl transition-all shrink-0" style={{color:'#64748b',background:'transparent',border:'none',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.color=T.negativeRed;e.currentTarget.style.background='rgba(255,51,102,0.1)'}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.background='transparent'}}><Trash2 size={15}/></button>
                            </div>
                            {item.isBigTicket&&item.totalPrice>0&&item.years>0&&<div className="mt-2 ml-1 text-xs" style={{fontFamily:F.b,color:T.coachViolet}}>= {fmtC(y2d(item.totalPrice/item.years,displayFreq))}/{fl(displayFreq)} over {item.years} year{item.years!==1?'s':''}</div>}
                          </div>
                        );
                      })}
                      <div className="flex gap-2 mt-3">
                        <button onClick={()=>addItem(cat.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all" style={{fontFamily:F.h,fontSize:11,fontWeight:700,letterSpacing:'0.05em',color:cat.color,background:`${cat.color}0A`,border:`1px dashed ${cat.color}33`,cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.background=`${cat.color}15`;e.currentTarget.style.borderColor=`${cat.color}55`}} onMouseLeave={e=>{e.currentTarget.style.background=`${cat.color}0A`;e.currentTarget.style.borderColor=`${cat.color}33`}}><Plus size={14}/> ADD ITEM</button>
                        <button onClick={()=>addItem(cat.id,true)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all" style={{fontFamily:F.h,fontSize:11,fontWeight:700,letterSpacing:'0.05em',color:T.coachViolet,background:`${T.coachViolet}0A`,border:`1px dashed ${T.coachViolet}33`,cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.background=`${T.coachViolet}15`;e.currentTarget.style.borderColor=`${T.coachViolet}55`}} onMouseLeave={e=>{e.currentTarget.style.background=`${T.coachViolet}0A`;e.currentTarget.style.borderColor=`${T.coachViolet}33`}}><span style={{fontSize:13}}>💰</span> ADD BIG PURCHASE</button>
                      </div>
                    </>)}
                    {cat.id.startsWith('custom-')&&<button onClick={()=>rmCat(cat.id)} className="text-xs mt-2 transition-colors" style={{fontFamily:F.b,color:'#64748b',background:'transparent',border:'none',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.color=T.negativeRed} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>Remove this category</button>}
                  </div>
                )}
              </Card>
            );
          })}
          <button onClick={addCat} className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all" style={{fontFamily:F.h,fontSize:12,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:T.accentBlue,background:'rgba(0,163,255,0.04)',border:'1px dashed rgba(0,163,255,0.2)',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,163,255,0.08)';e.currentTarget.style.borderColor='rgba(0,163,255,0.4)'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(0,163,255,0.04)';e.currentTarget.style.borderColor='rgba(0,163,255,0.2)'}}><Plus size={16}/> ADD CUSTOM CATEGORY</button>
        </div>

        {/* INCOME SECTION */}
        <Reveal delay={0} className="mt-8"><Card><div className="p-6">
          <div className="flex items-center gap-3 mb-6"><TrendingUp size={20} style={{color:T.primaryBlue}}/><span style={{fontFamily:F.h,fontWeight:700,fontSize:13,textTransform:'uppercase',letterSpacing:'0.08em'}}>How Much Do I Need To Earn?</span></div>
          <p className="mb-6" style={{fontFamily:F.b,fontSize:13,color:T.softSilver,lineHeight:1.6}}>Your dream life costs <strong style={{color:T.mintAccent}}>{fmtC(totals.grandYearly)}/year</strong> after tax. {"Here's what you'd actually need to earn."}</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Pill options={[{v:'ato',l:'ATO Brackets'},{v:'simple',l:'Simple %'}]} value={taxMode} onChange={setTaxMode}/>
            <button onClick={()=>setIncludeHECS(!includeHECS)} className="px-3 py-1.5 rounded-full text-xs font-bold transition-all" style={{fontFamily:F.h,letterSpacing:'0.04em',background:includeHECS?`${T.coachViolet}22`:'rgba(15,23,42,0.5)',border:`1px solid ${includeHECS?T.coachViolet+'55':'rgba(255,255,255,0.1)'}`,color:includeHECS?T.coachViolet:T.softSilver,cursor:'pointer'}}>🎓 HECS {includeHECS?'ON':'OFF'}</button>
            <button onClick={()=>setIncludeSuper(!includeSuper)} className="px-3 py-1.5 rounded-full text-xs font-bold transition-all" style={{fontFamily:F.h,letterSpacing:'0.04em',background:includeSuper?`${T.amber}22`:'rgba(15,23,42,0.5)',border:`1px solid ${includeSuper?T.amber+'55':'rgba(255,255,255,0.1)'}`,color:includeSuper?T.amber:T.softSilver,cursor:'pointer'}}>🏦 Super {includeSuper?'ON':'OFF'}</button>
          </div>
          {taxMode==='ato'?(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <StatBox label={includeSuper?'Total Package':'Gross Salary'} value={fmtC(includeSuper?income.pkg:income.gross)} sub={includeSuper?`Base: ${fmtC(income.gross)}`:'before tax'} color={T.mintAccent}/>
              <StatBox label="Income Tax" value={fmtC(income.tax)} sub={`${TAX_YEAR} rates`} color={T.negativeRed}/>
              <StatBox label="Medicare" value={fmtC(income.medicare)} sub="2% of gross" color={T.amber}/>
              {includeHECS?<StatBox label="HECS Repayment" value={fmtC(income.hecs)} sub="Marginal system" color={T.coachViolet}/>:<StatBox label="Take Home" value={fmtC(totals.grandYearly)} sub="Your dream life" color={T.accentBlue}/>}
            </div>
          ):(
            <div>
              <div className="flex items-center gap-4 mb-4"><span style={{fontFamily:F.h,fontSize:11,fontWeight:700,color:T.softSilver}}>Tax Rate:</span>
                <input type="range" min={10} max={50} step={1} value={simpleRate} onChange={e=>setSimpleRate(parseInt(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{background:`linear-gradient(to right,${T.primaryBlue} ${(simpleRate-10)/40*100}%,rgba(55,65,81,1) ${(simpleRate-10)/40*100}%)`}}/>
                <span style={{fontFamily:F.m,fontWeight:700,fontSize:18,color:'white',minWidth:45,textAlign:'right'}}>{simpleRate}%</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><StatBox label={includeSuper?'Total Package':'Gross Salary'} value={fmtC(includeSuper?income.pkg:income.gross)} color={T.mintAccent}/><StatBox label="Tax Paid" value={fmtC(income.tax)} color={T.negativeRed}/></div>
            </div>
          )}
          <div className="mt-4 space-y-2">
            <div className="p-3 rounded-xl flex items-start gap-2" style={{background:`${T.primaryBlue}15`,border:`1px solid ${T.primaryBlue}30`}}><Lightbulb size={14} className="shrink-0 mt-0.5" style={{color:T.primaryBlue}}/><span style={{fontFamily:F.b,fontSize:12,color:T.primaryBlue,fontWeight:500}}>{taxMode==='ato'?`${TAX_YEAR} brackets + Medicare.${includeHECS?' HECS marginal system.':''} No offsets/deductions.`:'Simplified. Use ATO mode for accuracy.'}</span></div>
            {includeSuper&&<div className="p-3 rounded-xl flex items-start gap-2" style={{background:`${T.amber}15`,border:`1px solid ${T.amber}30`}}><Lightbulb size={14} className="shrink-0 mt-0.5" style={{color:T.amber}}/><span style={{fontFamily:F.b,fontSize:12,color:T.amber,fontWeight:500}}>Super adds {(SUPER_RATE*100).toFixed(1)}% on top. Most AU job ads show &quot;base + super&quot; or &quot;total package&quot; — now you know both.</span></div>}
          </div>
        </div></Card></Reveal>

        {/* SPENDING BREAKDOWN */}
        {sorted.length>0&&<Reveal delay={100} className="mt-8"><Card><div className="p-6">
          <div className="flex items-center gap-3 mb-5"><DollarSign size={20} style={{color:T.primaryBlue}}/><span style={{fontFamily:F.h,fontWeight:700,fontSize:13,textTransform:'uppercase',letterSpacing:'0.08em'}}>Where Your Money Goes</span></div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <DonutChart data={donutData} size={200}/>
            <div className="flex-1 space-y-2 w-full">
              {sorted.slice(0,8).map(cat=>{
                const cy=totals.byCat[cat.id]||0;const pct=totals.grandYearly>0?cy/totals.grandYearly*100:0;const IC=ICONS[cat.icon]||Gem;
                return(<div key={cat.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{background:`${cat.color}1A`}}><IC size={12} style={{color:cat.color}}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline"><span style={{fontFamily:F.b,fontSize:12,fontWeight:700}}>{cat.label}</span><span style={{fontFamily:F.m,fontSize:12,fontWeight:700,color:T.mintAccent}}>{fmtC(y2d(cy,displayFreq))}/{fl(displayFreq)}</span></div>
                    <div className="w-full h-1 rounded-full overflow-hidden mt-1" style={{background:'rgba(255,255,255,0.06)'}}><div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`,background:cat.color,boxShadow:`0 0 6px ${cat.color}55`}}/></div>
                  </div>
                  <span style={{fontFamily:F.m,fontSize:10,color:'rgba(241,245,249,0.35)',minWidth:36,textAlign:'right'}}>{pct.toFixed(1)}%</span>
                </div>);
              })}
            </div>
          </div>
        </div></Card></Reveal>}
      </main>

      {/* SHARE MODAL */}
      {showShare&&<div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(8px)'}} onClick={()=>setShowShare(false)}>
        <div className="w-full max-w-md rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))',border:'1px solid rgba(255,255,255,0.14)',boxShadow:'0 18px 45px rgba(0,0,0,0.85)',backdropFilter:'blur(22px)'}}>
          <button onClick={()=>setShowShare(false)} className="absolute top-4 right-4 p-2" style={{color:'#64748b',background:'transparent',border:'none',cursor:'pointer'}}><X size={18}/></button>
          <div className="rounded-2xl p-6 mb-6" style={{background:'linear-gradient(135deg,#111827,#0f172a)',border:'1px solid rgba(255,255,255,0.08)'}}>
            <div className="flex items-center gap-2 mb-4"><div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:`linear-gradient(135deg,${T.primaryBlue},${T.coachViolet})`}}><Calculator size={14} color="white"/></div>
              <span style={{fontFamily:F.h,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(241,245,249,0.5)'}}>My Dream Life</span></div>
            <div style={{fontFamily:F.h,fontWeight:900,fontSize:32,letterSpacing:'-0.02em',marginBottom:4,background:`linear-gradient(135deg,${T.mintAccent},${T.primaryBlue})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{fmtC(displayTotal)}/{fl(displayFreq)}</div>
            <div style={{fontFamily:F.b,fontSize:12,color:'rgba(241,245,249,0.45)',marginBottom:16}}>Pre-tax: {fmtC(income.gross)}/yr{includeSuper?` · Pkg: ${fmtC(income.pkg)}`:''}</div>
            <div className="space-y-2 mb-4">{sorted.slice(0,4).map(c=>{const cy=totals.byCat[c.id]||0;const pct=totals.grandYearly>0?cy/totals.grandYearly*100:0;return(
              <div key={c.id}><div className="flex justify-between items-center mb-1"><span style={{fontFamily:F.b,fontSize:11,fontWeight:600,color:T.softSilver}}>{c.label}</span><span style={{fontFamily:F.m,fontSize:11,fontWeight:700,color:c.color}}>{fmtC(y2d(cy,displayFreq))}/{fl(displayFreq)}</span></div>
                <div className="w-full h-1 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}><div className="h-full rounded-full" style={{width:`${pct}%`,background:c.color}}/></div></div>
            )})}</div>
            <div className="flex justify-between items-center pt-3" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
              <span style={{fontFamily:F.b,fontSize:11,fontWeight:600,color:'rgba(241,245,249,0.35)'}}>Dream Life Calculator</span>
              <span style={{fontFamily:F.h,fontSize:11,fontWeight:700,color:'rgba(241,245,249,0.5)'}}>@itsmitchbryant</span></div>
          </div>
          <p className="text-center mb-4" style={{fontFamily:F.b,fontSize:12,color:T.softSilver}}>Screenshot this card and share it with your mates!</p>
          <button onClick={()=>setShowShare(false)} className="w-full py-3.5 rounded-full font-bold text-sm" style={{fontFamily:F.h,background:`linear-gradient(145deg,${T.mintAccent},${T.primaryBlue})`,color:'#020617',fontWeight:800,letterSpacing:'0.04em',textTransform:'uppercase',border:'none',cursor:'pointer'}}>GOT IT</button>
        </div>
      </div>}

      {/* HELP MODAL */}
      {showHelp&&<div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(8px)'}} onClick={()=>setShowHelp(false)}>
        <div className="w-full max-w-lg rounded-3xl p-8 relative max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))',border:'1px solid rgba(255,255,255,0.14)',boxShadow:'0 18px 45px rgba(0,0,0,0.85)',backdropFilter:'blur(22px)'}}>
          <button onClick={()=>setShowHelp(false)} className="absolute top-4 right-4 p-2" style={{color:'#64748b',background:'transparent',border:'none',cursor:'pointer'}}><X size={18}/></button>
          <div className="flex items-center gap-2 mb-6"><HelpCircle size={22} style={{color:T.primaryBlue}}/><span style={{fontFamily:F.h,fontWeight:700,fontSize:18}}>How This Works</span></div>
          <div className="space-y-5" style={{fontFamily:F.b,fontSize:13,color:T.softSilver}}>
            <div><div style={{fontFamily:F.h,fontWeight:700,color:T.primaryBlue,marginBottom:4,fontSize:13}}>Step 1: Fill In Your Dream Life</div><p>Go through each category. Hit 💡 for prompts. Use &quot;Add Big Purchase&quot; for items paid over time.</p></div>
            <div><div style={{fontFamily:F.h,fontWeight:700,color:T.coachViolet,marginBottom:4,fontSize:13}}>Step 2: Choose Your View</div><p>Toggle weekly, monthly, or yearly. Watch the numbers animate in real-time.</p></div>
            <div><div style={{fontFamily:F.h,fontWeight:700,color:T.mintAccent,marginBottom:4,fontSize:13}}>Step 3: See What You Need To Earn</div><p>Real ATO tax brackets. Toggle HECS and Super for the full picture.</p></div>
            <div><div style={{fontFamily:F.h,fontWeight:700,color:T.accentBlue,marginBottom:4,fontSize:13}}>Step 4: Share It</div><p>Screenshot the share card. Compare dream lives with your mates!</p></div>
            <div className="p-3 rounded-xl" style={{background:`${T.mintAccent}10`,border:`1px solid ${T.mintAccent}20`}}><p style={{color:T.mintAccent,fontWeight:600,fontSize:12}}>Your data saves automatically.</p></div>
          </div>
          <button onClick={()=>setShowHelp(false)} className="w-full mt-8 py-3.5 rounded-full font-bold text-sm" style={{fontFamily:F.h,background:`linear-gradient(145deg,${T.mintAccent},${T.primaryBlue})`,color:'#020617',fontWeight:800,letterSpacing:'0.04em',textTransform:'uppercase',border:'none',cursor:'pointer'}}>GOT IT!</button>
        </div>
      </div>}

      <style>{`
        @keyframes dlcFadeIn{to{opacity:1;transform:translateY(0)}}
        @keyframes dlcPulse{0%,100%{opacity:.2}50%{opacity:.3}}
        @keyframes dlcSlideIn{from{opacity:0;transform:translateY(8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield;appearance:textfield}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${T.primaryBlue};border:2px solid white;cursor:pointer;margin-top:-5px}
        input[type=range]::-webkit-slider-runnable-track{height:6px;border-radius:3px}
        input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:${T.primaryBlue};border:2px solid white;cursor:pointer}
        select{-webkit-appearance:none}
        ::selection{background:${T.primaryBlue};color:white}
      `}</style>
    </div>
  );
}

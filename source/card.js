function dayGroup(t){
  const d=new Date(t),n=new Date(),s0=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate()).getTime();
  const diff=Math.round((s0(n)-s0(d))/864e5);
  return diff<=0?"امروز":diff===1?"دیروز":diff<7?"این هفته":"قدیمی‌تر";
}
renderHistory=function(){
  const el=$("#hlist");
  if(!hist.length){
    el.innerHTML='<div class="empty"><b>هنوز فالی نگرفته‌ای</b><span>به صفحهٔ فال برگرد، نیت کن و کتاب را لمس کن. فال‌هایت اینجا می‌ماند.</span></div>';
    return;
  }
  let out="",cur="";
  hist.forEach(e=>{
    const g=dayGroup(e.t);
    if(g!==cur){if(cur) out+="</div>";out+='<div class="hgroup"><h4>'+g+"</h4>";cur=g}
    out+='<div class="hwrap"><button class="hitem" data-id="'+e.id+'"><div class="hi-top"><span>'+FALS[e.f].title+"</span>"+(e.fav?heart(true):"")+'</div><p class="hi-m">'+FALS[e.f].beyts[0][0]+"</p><time>"+dateFa(e.t)+"</time></button></div>";
  });
  el.innerHTML=out+"</div>";
};
(function swipeDel(){
  const el=document.getElementById("hlist");let it=null,sx=0,dx=0,moved=false,w=null;
  el.addEventListener("pointerdown",ev=>{const b=ev.target.closest(".hitem");if(!b) return;it=b;w=b.parentNode;sx=ev.clientX;dx=0;moved=false});
  el.addEventListener("pointermove",ev=>{
    if(!it) return;dx=ev.clientX-sx;
    if(!moved&&Math.abs(dx)>10){moved=true;try{it.setPointerCapture(ev.pointerId)}catch(e){}w.classList.add("drag");it.style.transition="none"}
    if(moved) it.style.transform="translateX("+dx+"px)";
  });
  function end(){
    if(!it) return;const b=it,wr=w;it=null;
    if(!moved) return;
    b.style.transition="transform .22s ease,opacity .22s";
    if(Math.abs(dx)>110){
      b.style.transform="translateX("+(dx>0?"110%":"-110%")+")";b.style.opacity="0";
      const id=b.dataset.id;
      setTimeout(()=>{hist=hist.filter(x=>String(x.id)!==id);save();renderHistory();toast("فال حذف شد")},210);
    }else{b.style.transform="";wr.classList.remove("drag")}
    setTimeout(()=>{moved=false},60);
  }
  el.addEventListener("pointerup",end);el.addEventListener("pointercancel",end);
  el.addEventListener("click",ev=>{if(moved){ev.stopImmediatePropagation();ev.preventDefault()}},true);
})();
const EMB='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" stroke="#f0cf7a" stroke-width="3.1" stroke-linejoin="round"><path d="M40 4H43Q43.5 4 44 4.5L48.5 9H53Q54 9 54.5 10L57.25 15.5Q57.75 16.5 58.75 16.5H64A.5.5 0 0 1 64.5 17V25A1.5 1.5 0 0 0 66 26.5H67A1.5 1.5 0 0 1 68.5 28V33A1.5 1.5 0 0 0 70 34.5H71Q71.5 34.5 72 35L74 37L76 40L74 43L72 45Q71.5 45.5 71 45.5H70A1.5 1.5 0 0 0 68.5 47V52A1.5 1.5 0 0 1 67 53.5H66A1.5 1.5 0 0 0 64.5 55V63A.5.5 0 0 1 64 63.5H58.75Q57.75 63.5 57.25 64.5L54.5 70Q54 71 53 71H48.5L44 75.5Q43.5 76 43 76H37Q36.5 76 36 75.5L31.5 71H27Q26 71 25.5 70L22.75 64.5Q22.25 63.5 21.25 63.5H16A.5.5 0 0 1 15.5 63V55A1.5 1.5 0 0 0 14 53.5H13A1.5 1.5 0 0 1 11.5 52V47A1.5 1.5 0 0 0 10 45.5H9Q8.5 45.5 8 45L6 43L4 40L6 37L8 35Q8.5 34.5 9 34.5H10A1.5 1.5 0 0 0 11.5 33V28A1.5 1.5 0 0 1 13 26.5H14A1.5 1.5 0 0 0 15.5 25V17A.5.5 0 0 1 16 16.5H21.25Q22.25 16.5 22.75 15.5L25.5 10Q26 9 27 9H31.5L36 4.5Q36.5 4 37 4Z"/><path d="M35.75 35H44.25A3.25 3.25 0 0 1 47.5 38.25V41.75A3.25 3.25 0 0 1 44.25 45H35.75A3.25 3.25 0 0 1 32.5 41.75V38.25A3.25 3.25 0 0 1 35.75 35Z"/><path d="M24.5 37.75H27.75V42.25H24.5M18 40C18.75 38.75 20.5 36 22 36 23.1 36 24 36.9 24.5 37.75V42.25C24 43.1 23.1 44 22 44 20.5 44 18.75 41.25 18 40ZM55.5 37.75H52.25V42.25H55.5M62 40C61.25 38.75 59.5 36 58 36 56.9 36 56 36.9 55.5 37.75V42.25C56 43.1 56.9 44 58 44 59.5 44 61.25 41.25 62 40ZM37.75 24.5V29.25H42.25V24.5M40 18C41.25 18.75 44 20.5 44 22 44 23.1 43.1 24 42.25 24.5H37.75C36.9 24 36 23.1 36 22 36 20.5 38.75 18.75 40 18ZM37.75 55.5V50.75H42.25V55.5M40 62C41.25 61.25 44 59.5 44 58 44 56.9 43.1 56 42.25 55.5H37.75C36.9 56 36 56.9 36 58 36 59.5 38.75 61.25 40 62Z"/></svg>';
async function buildCard(e){
  const f=FALS[e.f];
  try{await Promise.all([document.fonts.load('40px "Noto Nastaliq Urdu"'),document.fonts.load('100px Lalezar'),document.fonts.load('600 40px Vazirmatn')])}catch(_){}
  const W=1080,H=1560,cv=document.createElement("canvas");cv.width=W;cv.height=H;const x=cv.getContext("2d");
  x.fillStyle="#ebd9b8";x.fillRect(0,0,W,H);
  x.strokeStyle="rgba(185,138,85,.16)";x.lineWidth=2;
  for(let i=0;i<8;i++){for(let j=0;j<10;j++){const cx=i*150+40,cy=j*170+40;x.strokeRect(cx-30,cy-30,60,60);x.save();x.translate(cx,cy);x.rotate(Math.PI/4);x.strokeRect(-30,-30,60,60);x.restore()}}
  const perf=(y)=>{x.fillStyle="#c8ae82";for(let px=300;px<780;px+=22) x.fillRect(px,y,14,12)};
  x.textAlign="center";x.direction="rtl";x.textBaseline="alphabetic";
  perf(50);perf(276);
  x.font="150px Lalezar, Vazirmatn, sans-serif";
  const a="فال",b=" حافظ",wa=x.measureText(a).width,wb=x.measureText(b).width,sx=540+(wa+wb)/2;
  x.textAlign="right";x.fillStyle="rgba(217,83,74,.2)";x.fillText(a,sx+4,214);x.fillStyle="#d9534a";x.fillText(a,sx,210);
  x.fillStyle="#2b2420";x.fillText(b,sx-wa,210);
  x.fillStyle="rgba(60,35,25,.13)";x.beginPath();x.arc(526,540,226,0,7);x.fill();
  x.fillStyle="#d9534a";x.beginPath();x.arc(540,528,226,0,7);x.fill();
  await new Promise(r=>{const im=new Image();im.onload=()=>{x.drawImage(im,540-130,528-130,260,260);r()};im.onerror=r;im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(EMB)});
  x.textAlign="center";x.fillStyle="#5e4230";x.font="600 46px Vazirmatn, sans-serif";x.fillText(f.title,540,810);
  const cx0=90,cx1=990,cy0=850,cy1=1470;
  x.save();x.shadowColor="rgba(110,60,35,.3)";x.shadowBlur=40;x.shadowOffsetY=16;x.fillStyle="#f7ebd0";
  x.beginPath();x.roundRect(cx0,cy0,cx1-cx0,cy1-cy0,34);x.fill();x.restore();
  x.strokeStyle="rgba(140,109,82,.5)";x.setLineDash([10,8]);x.lineWidth=2;x.beginPath();x.roundRect(cx0+18,cy0+18,cx1-cx0-36,cy1-cy0-36,24);x.stroke();x.setLineDash([]);
  x.fillStyle="#33241a";
  const bs=f.beyts.slice(0,4),step=132;
  bs.forEach((bt,i)=>{
    const y=cy0+108+i*step;
    [[bt[0],"right",cx1-64,y],[bt[1],"left",cx0+64,y+58]].forEach(([t,al,px,py])=>{
      let fs=40;x.font=fs+"px 'Noto Nastaliq Urdu', 'Aref Ruqaa', Vazirmatn, serif";
      while(x.measureText(t).width>700&&fs>22){fs-=2;x.font=fs+"px 'Noto Nastaliq Urdu', 'Aref Ruqaa', Vazirmatn, serif"}
      x.textAlign=al;x.fillText(t,px,py);
    });
  });
  x.textAlign="center";x.fillStyle="#b23d33";x.font="54px Lalezar, Vazirmatn, sans-serif";x.fillText("حافظ شیرازی",540,1530);
  return cv;
}
window.__buildCard=buildCard;
async function shareCard(){
  if(!current) return;
  toast("در حال ساخت کارت…");
  try{
    const cv=await buildCard(current);
    const blob=await new Promise(r=>cv.toBlob(r,"image/png"));
    const file=new File([blob],"fal-hafez-"+FALS[current.f].n+".png",{type:"image/png"});
    try{const dl=window.claude&&await window.claude.use("downloads");
      if(dl){try{await dl.save({filename:file.name,data:blob});toast("کارت ذخیره شد")}catch(err){if(!err||err.code!=="declined")toast("ذخیره ممکن نشد")}return}}catch(e){}
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:"فال حافظ"});return}catch(err){if(err&&err.name==="AbortError") return}
    }
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast("کارت ذخیره شد");
  }catch(err){toast("ساخت کارت ممکن نشد")}
}
try{document.getElementById("sharefab").addEventListener("click",shareCard)}catch(e){}

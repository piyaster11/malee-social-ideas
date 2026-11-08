(function(){
"use strict";
var $=function(s){return document.querySelector(s)}, esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var DTH=["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."], DEN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], MTH=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."], MEN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function D(s){var p=s.split("-");return new Date(Date.UTC(+p[0],p[1]-1,+p[2]))}
function iso(d){return d.toISOString().slice(0,10)}
function fd(s){var d=D(s);return DEN[d.getUTCDay()]+" "+d.getUTCDate()+" "+MEN[d.getUTCMonth()]+" · "+DTH[d.getUTCDay()]+" "+d.getUTCDate()+" "+MTH[d.getUTCMonth()]}
function toast(m,ms){var t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on")},ms||2500)}
function nf(n){return n==null||isNaN(n)?"–":Math.round(n).toLocaleString("en-US")}
function platPills(p){return p.map(function(k){return '<span class="pl '+SI.PLAT[k].cls+'">'+SI.PLAT[k].en+'</span>'}).join("")}
function pillTag(k){var p=SI.PILLAR[k];return '<span class="pil" style="color:'+p.c+'">'+p.en+' · '+p.th+'</span>'}
function flagTag(f){if(f==="legal")return '<span class="flag">⚠ Check with Legal (อย.)</span>';if(f==="jay")return '<span class="flag jay">เจ Check Jay label · เช็กฉลากเจ</span>';if(f==="respect")return '<span class="flag resp">🙏 Calm tone · โทนสงบ</span>';return ""}
function flagsOf(i){return i.flags||(i.flag?[i.flag]:[])}
function flagsHTML(i){return flagsOf(i).map(flagTag).join(" ")}
function timeLabel(i){
  if(i.slot)return i.slot;
  var T=SI.TIME[i.t]||{en:"unspecified",th:"ไม่ระบุ"};
  return "Suggested ICT window, not a measured best time · ช่วงที่แนะนำ ไม่ใช่เวลาที่วัดว่าดีที่สุด: "+T.en+" · "+T.th;
}
function evidenceLabel(k){
  if(k==="verified")return "Verified date or campaign · วันหรือแคมเปญที่ยืนยันแล้ว. The creative is still an editorial suggestion · รูปแบบยังเป็นข้อเสนอกองบรรณาธิการ";
  if(k==="observed")return "Observed public snapshot · ภาพสาธารณะตอนที่สำรวจ. Not a popularity score · ไม่ใช่คะแนนความนิยม";
  if(k==="editorial")return "Editorial suggestion · ข้อเสนอกองบรรณาธิการ. Not a verified social trend · ไม่ใช่เทรนด์โซเชียลที่ยืนยัน";
  return "";
}
function evFor(s){return SI.EVENTS.filter(function(e){return e.to? (s>=e.d&&s<=e.to) : e.d===s})}

/* ---------- 3 easy posts ---------- */
function renderEasy(){
  var note=$("#easyNote");
  if(note&&SI.THEMES)note.innerHTML="Week of "+esc(SI.THEMES.week)+" ("+esc(SI.THEMES.weekTH)+"). One phone, approved packs, no studio. Minutes are filming and caption only. Brand, Sales and Legal review is extra. · สัปดาห์ "+esc(SI.THEMES.weekTH)+" ใช้มือถือเครื่องเดียวและแพ็กที่อนุมัติแล้ว นาทีนับเฉพาะถ่ายกับแคปชัน เวลาอนุมัติอยู่นอกนั้น";
  var h="";SI.IDEAS.filter(function(i){return i.easy}).forEach(function(i,n){
    h+='<div class="ecard '+SI.PLAT[i.p[0]].cls+'" data-id="'+i.id+'"><div class="num">'+(n+1)+'</div><div class="day">'+(i.code?esc(i.code)+" · ":"")+fd(i.d)+'</div>'+
      '<div class="row" style="margin-top:6px">'+platPills(i.p)+' <span class="pil" style="color:#374151">'+esc(i.f)+'</span></div>'+
      '<div class="hook">'+esc(i.hTH)+'</div><div class="hook-en">'+esc(i.hEN)+'</div>'+
      '<div class="kv"><b>Product · สินค้า:</b> '+esc(i.pr)+'</div>'+
      (i.mins?'<div class="kv"><b>Time to make · เวลาทำ:</b> '+esc(i.mins)+' min · '+esc(i.mins)+' นาที</div>':'')+
      '<ol>'+(i.steps||[]).map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+'</ol>'+
      '<div class="row"><span class="tm">🕒 '+esc(timeLabel(i))+'</span> '+flagsHTML(i)+'</div>'+
      (i.caution?'<div class="kv"><b>Caution · ข้อควรระวัง:</b> '+esc(i.caution)+'</div>':'')+
      '<div style="margin-top:8px"><a href="#idea-'+i.id+'" class="jump" data-id="'+i.id+'" style="font-size:12.5px;color:#0f766e">Full caption & shot idea → · ดูแคปชันเต็ม</a></div></div>';
  });
  $("#easyCards").innerHTML=h;
}

/* ---------- calendar ---------- */
function renderCal(){
  $("#season").innerHTML="🌧️→🍂 <b>"+esc(SI.SEASON.en)+"</b><br><span class='th'>"+esc(SI.SEASON.th)+"</span>";
  var plan=SI.PLAN||{start:"2026-11-09",weeks:3,en:"",th:""};
  if($("#calSpan"))$("#calSpan").textContent=plan.weeks+" weeks · "+plan.weeks+" สัปดาห์ · "+plan.en+" · "+plan.th;
  var h='<div></div>';for(var k=1;k<=7;k++){var x=k%7;h+='<div class="hd">'+DEN[x]+' · '+DTH[x]+'</div>'}
  /* ICT calendar date for the "today" outline: shift the UTC instant by +7h, then read the UTC Y-M-D. Do not also apply the viewer's zone. */
  var start=D(plan.start), today=iso(new Date(Date.now()+7*3600e3));
  for(var w=0;w<plan.weeks;w++){
    h+='<div class="wk">Week '+(w+1)+'<br><span class="th">สัปดาห์ '+(w+1)+'</span></div>';
    for(var d=0;d<7;d++){
      var dt=new Date(start.getTime()+(w*7+d)*864e5), s=iso(dt), evs=evFor(s);
      var cls=evs.some(function(e){return e.k==="respect"})?"respect":(evs.some(function(e){return e.k==="jay"&&e.to})?"jay":"");
      h+='<div class="cell '+cls+(s===today?' today':'')+'"><div class="dn">'+dt.getUTCDate()+' <small>'+MEN[dt.getUTCMonth()]+'</small></div>';
      evs.forEach(function(e){h+='<span class="ev '+e.k+'" title="'+esc(e.note||"")+'">'+esc(e.th)+'<br><span style="font-weight:500">'+esc(e.en)+'</span></span>'});
      var ps=SI.IDEAS.filter(function(i){return i.d===s});
      ps.forEach(function(i){h+='<a class="post '+SI.PLAT[i.p[0]].cls+' jump" data-id="'+i.id+'" href="#idea-'+i.id+'">'+(i.easy?"⭐ ":"")+esc(i.hTH.length>34?i.hTH.slice(0,33)+"…":i.hTH)+'<br><span class="pd">'+i.p.map(function(k){return SI.PLAT[k].en}).join(" + ")+' · '+esc(i.f.split("·")[0])+'</span></a>'});
      if(!ps.length&&evs.some(function(e){return e.k==="respect"}))h+='<span class="nopost">No promo today · งดโพสต์ขายของ</span>';
      h+='</div>';
    }
  }
  $("#calendar").innerHTML=h;
  $("#outside").innerHTML=SI.OUTSIDE.map(function(o){return '<div>📌 <b>'+esc(o.d)+'</b> · '+esc(o.en)+'<br><span class="th">'+esc(o.th)+'</span></div>'}).join("");
}

/* ---------- idea board ---------- */
var fP="all", fL="all";
function renderFilters(){
  var a='<button type="button" class="fb-btn'+(fP==="all"?" on":"")+'" data-p="all">All platforms · ทั้งหมด</button>';
  Object.keys(SI.PLAT).forEach(function(k){a+='<button type="button" class="fb-btn'+(fP===k?" on":"")+'" data-p="'+k+'">'+SI.PLAT[k].en+'</button>'});
  $("#fPlat").innerHTML=a;
  var b='<button type="button" class="fb-btn'+(fL==="all"?" on":"")+'" data-l="all">All pillars · ทุกหมวด</button>';
  Object.keys(SI.PILLAR).forEach(function(k){b+='<button type="button" class="fb-btn'+(fL===k?" on":"")+'" data-l="'+k+'" style="'+(fL===k?"background:"+SI.PILLAR[k].c+";border-color:"+SI.PILLAR[k].c:"")+'">'+SI.PILLAR[k].en+' · '+SI.PILLAR[k].th+'</button>'});
  $("#fPill").innerHTML=b;
}
function refPill(i){var L=i.tr&&latestOf(i.tr);if(!L)return "";
  var lab=L.kind==="editorial"?"Editorial":(L.kind==="observed"?"Snapshot":"Calendar");
  return ' <span class="pil trend">'+lab+': '+esc(L.en.split(/[:(]/)[0].trim())+'</span>';
}
function cardHTML(i,o){o=o||{};var hl=o.gen?esc:hlq;
  var dt=(i.code?esc(i.code)+" · ":"")+(i.d?("#"+esc(i.id)+" · "+fd(i.d)):(o.saved?"Saved · บันทึกแล้ว":"No date yet · ยังไม่ลงวัน")), act="";
  if(o.gen) act=SAVED.some(function(x){return x.from===i.id})?'<button type="button" class="copy saved" data-unsave="'+i.id+'">✓ Saved · บันทึกแล้ว</button>':'<button type="button" class="copy save" data-save="'+i.id+'">💾 Save to board · บันทึก</button>';
  if(o.saved) act='<button type="button" class="copy del" data-del="'+i.id+'">🗑 Delete · ลบ</button>';
  return '<div class="card'+(o.gen||o.saved?' new':'')+'" id="'+(o.gen?'gen-':'idea-')+i.id+'" style="border-left-color:'+SI.PILLAR[i.pl].c+'">'+
    (o.gen||o.saved?'<div class="newtag">'+(o.saved?'💾 SAVED, from your idea · จากไอเดียของคุณ':'✨ NEW, from your idea · ใหม่ จากไอเดียของคุณ')+(i.q?' <span>“'+esc(i.q)+'”</span>':'')+'</div>':'')+
    (i.archive?'<div class="newtag">Archive · คลังเก่า · original date kept · วันที่เดิม</div>':'')+
    '<div class="row">'+platPills(i.p)+'<span class="dt">'+dt+'</span></div>'+
    '<div class="row">'+pillTag(i.pl)+' <span class="pil" style="color:#374151">'+esc(i.f)+'</span>'+(i.easy?' <span class="pil" style="color:#ca8a04">⭐ easy</span>':'')+refPill(i)+'</div>'+
    (i.evidence?'<div class="kv"><b>What kind · ประเภท:</b> '+esc(evidenceLabel(i.evidence))+'</div>':'')+
    '<div class="h">'+hl(i.hTH)+'</div><div class="he">'+hl(i.hEN)+'</div>'+
    '<div class="cap"><div>'+hl(i.cTH)+'</div><div class="en">'+hl(i.cEN)+'</div></div>'+
    '<div class="kv"><b>Product · สินค้า:</b> '+hl(i.pr)+'</div>'+
    '<div class="kv"><b>Shot idea · วิธีถ่าย:</b> '+hl(i.shot)+'</div>'+
    (i.tags?'<div class="tags">'+hl(i.tags)+'</div>':'')+
    (i.prepNote?'<div class="kv"><b>Prep vs publish · เตรียมกับการโพสต์:</b> '+hl(i.prepNote)+'</div>':'')+
    (i.srcNote?'<div class="kv"><b>Source note · หมายเหตุแหล่ง:</b> '+hl(i.srcNote)+'</div>':'')+
    (i.confirm?'<div class="kv"><b>Confirm before filming · ยืนยันก่อนถ่าย:</b> '+hl(i.confirm)+'</div>':'')+
    (i.caution?'<div class="kv"><b>Caution · ข้อควรระวัง:</b> '+hl(i.caution)+'</div>':'')+
    '<div class="kv"><b>Suggested ICT slot · เวลาที่แนะนำ:</b> '+esc(timeLabel(i))+'</div>'+
    (flagsOf(i).length?'<div>'+flagsHTML(i)+'</div>':'')+
    '<div class="row"><button type="button" class="copy" data-copy="'+i.id+'">📋 Copy caption · คัดลอกแคปชัน</button>'+act+'</div></div>';
}
function renderIdeas(){
  var base=SAVED.slice().reverse().map(function(x){return {i:x,saved:1}}).concat(SI.IDEAS.map(function(x){return {i:x}}));
  var list=base.filter(function(o){var i=o.i;return (fP==="all"||i.p.indexOf(fP)>=0)&&(fL==="all"||i.pl===fL)});
  if(Q.active){list.forEach(function(o){o.sc=score(o.i)});list=list.filter(function(o){return o.sc>0});list.sort(function(a,b){return b.sc-a.sc})}
  var tot=base.length; Q.nIdeas=list.length;
  $("#ideaCount").textContent="("+list.length+" of "+tot+" · "+list.length+"/"+tot+" ไอเดีย"+(Q.active?" · matching “"+Q.raw+"”":"")+")";
  $("#ideaGrid").innerHTML=list.length?list.map(function(o){return cardHTML(o.i,{saved:o.saved})}).join(""):'<p class="note">No ideas match. Try ✨ Give me ideas at the top, or clear the search. · ไม่พบไอเดีย ลองกด ✨ ขอไอเดีย ด้านบน หรือกดล้าง</p>';
  renderArchive();
}
function renderArchive(){var el=$("#archiveGrid");if(!el||!SI.ARCHIVE)return;
  var list=SI.ARCHIVE.filter(function(i){return (fP==="all"||i.p.indexOf(fP)>=0)&&(fL==="all"||i.pl===fL)&&( !Q.active || score(i)>0)});
  if($("#archiveCount"))$("#archiveCount").textContent="("+list.length+" of "+SI.ARCHIVE.length+" · "+list.length+"/"+SI.ARCHIVE.length+")";
  el.innerHTML=list.length?list.map(function(i){return cardHTML(i)}).join(""):'<p class="note">No archived ideas match. · ไม่พบไอเดียเก่าที่ตรง</p>';
}

/* ---------- SVG charts ---------- */
function donut(el,items){
  var tot=items.reduce(function(a,b){return a+b.v},0),R=70,r=44,cx=90,cy=90,a0=-Math.PI/2,s='<svg viewBox="0 0 180 180" style="max-width:220px;margin:auto">';
  items.forEach(function(it){if(!it.v)return;var a1=a0+it.v/tot*2*Math.PI,lg=(a1-a0)>Math.PI?1:0;
    var p=function(rr,a){return (cx+rr*Math.cos(a)).toFixed(2)+" "+(cy+rr*Math.sin(a)).toFixed(2)};
    s+='<path d="M'+p(R,a0)+' A'+R+' '+R+' 0 '+lg+' 1 '+p(R,a1)+' L'+p(r,a1)+' A'+r+' '+r+' 0 '+lg+' 0 '+p(r,a0)+'Z" fill="'+it.c+'"><title>'+esc(it.l)+': '+it.v+'</title></path>';a0=a1});
  s+='<text x="90" y="88" text-anchor="middle" font-size="22" font-weight="800">'+tot+'</text><text x="90" y="106" text-anchor="middle" font-size="10" fill="#6b7280">ideas · ไอเดีย</text></svg>';
  s+='<div class="dleg">'+items.map(function(it){return '<span><i style="background:'+it.c+'"></i>'+esc(it.l)+' <b>'+it.v+'</b> ('+Math.round(it.v/tot*100)+'%)</span>'}).join("")+'</div>';
  el.innerHTML=s;
}
function hbars(el,items,unit){
  var mx=Math.max.apply(null,items.map(function(i){return i.v||0}))||1,rh=34,W=520,lw=150,h=items.length*rh+6,s='<svg viewBox="0 0 '+W+' '+h+'">';
  s+='<defs><linearGradient id="igG" x1="0" x2="1"><stop offset="0" stop-color="#F58529"/><stop offset=".5" stop-color="#DD2A7B"/><stop offset="1" stop-color="#8134AF"/></linearGradient></defs>';
  items.forEach(function(it,n){var y=n*rh+4,w=Math.max(2,(W-lw-70)*(it.v||0)/mx);
    s+='<text x="'+(lw-8)+'" y="'+(y+19)+'" text-anchor="end" font-size="12.5">'+esc(it.l)+'</text>';
    s+='<rect x="'+lw+'" y="'+(y+4)+'" width="'+w.toFixed(1)+'" height="22" rx="5" fill="'+it.c+'"'+(it.stroke?' stroke="'+it.stroke+'" stroke-width="2"':'')+'/>';
    s+='<text x="'+(lw+w+6)+'" y="'+(y+20)+'" font-size="12.5" font-weight="700">'+(it.txt!=null?it.txt:nf(it.v))+(unit||"")+'</text>'});
  el.innerHTML=s+'</svg>';
}
function lineChart(el,pts){
  if(!pts.length){el.innerHTML='<p class="note">No dates · ไม่มีข้อมูลวันที่</p>';return}
  var W=520,H=200,L=44,B=26,T=10,mx=Math.max.apply(null,pts.map(function(p){return p.y}))||1,n=pts.length;
  var X=function(i){return L+(W-L-12)*(n<2?.5:i/(n-1))},Y=function(v){return T+(H-T-B)*(1-v/mx)};
  var s='<svg viewBox="0 0 '+W+' '+H+'">';
  for(var g=0;g<=4;g++){var v=mx*g/4,y=Y(v);s+='<line x1="'+L+'" x2="'+(W-8)+'" y1="'+y+'" y2="'+y+'" stroke="#eef0f2"/><text x="'+(L-6)+'" y="'+(y+4)+'" font-size="10" text-anchor="end" fill="#6b7280">'+nf(v)+'</text>'}
  var d=pts.map(function(p,i){return (i?"L":"M")+X(i).toFixed(1)+" "+Y(p.y).toFixed(1)}).join(" ");
  s+='<path d="'+d+' L'+X(n-1).toFixed(1)+' '+Y(0)+' L'+X(0).toFixed(1)+' '+Y(0)+'Z" fill="#0f766e22"/><path d="'+d+'" fill="none" stroke="#0f766e" stroke-width="2.5"/>';
  pts.forEach(function(p,i){s+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(p.y).toFixed(1)+'" r="3" fill="'+(p.c||"#0f766e")+'"><title>'+p.x+': '+nf(p.y)+'</title></circle>'});
  var lab=[0,Math.floor((n-1)/2),n-1];lab.forEach(function(i,q){s+='<text x="'+X(i)+'" y="'+(H-8)+'" font-size="10" text-anchor="'+["start","middle","end"][q]+'" fill="#6b7280">'+pts[i].x+'</text>'});
  el.innerHTML=s+'</svg>';
}
function renderMix(){
  var c={};SI.IDEAS.forEach(function(i){c[i.pl]=(c[i.pl]||0)+1});
  donut($("#donut"),Object.keys(SI.PILLAR).map(function(k){return {l:SI.PILLAR[k].en+" · "+SI.PILLAR[k].th,v:c[k]||0,c:SI.PILLAR[k].c}}));
  var p={};SI.IDEAS.forEach(function(i){i.p.forEach(function(k){p[k]=(p[k]||0)+1})});
  hbars($("#platBars"),[{l:"Facebook",v:p.FB||0,c:"#1877F2"},{l:"Instagram",v:p.IG||0,c:"url(#igG)"},{l:"TikTok",v:p.TT||0,c:"#000",stroke:"#25F4EE"}]," posts");
}

/* ---------- latest trends ---------- */
function latestOf(k){var L=SI.LATEST&&SI.LATEST.items||[];for(var n=0;n<L.length;n++)if(L[n].k===k)return L[n];return null}
function trendText(k){var t=k&&latestOf(k);return t?(t.en+" "+t.th):""}
function srcLinks(list){return (list||[]).map(function(s){return s.u?'<a href="'+esc(s.u)+'" target="_blank" rel="noopener">'+esc(s.t)+'</a>':'<span>'+esc(s.t)+'</span>'}).join("<br>")}
function renderLatest(){if(!SI.LATEST||!$("#latestGrid"))return;
  $("#latestDate").textContent="Checked · เช็กเมื่อ "+SI.LATEST.checked;
  if($("#latestIntro"))$("#latestIntro").textContent=SI.LATEST.intro||"";
  $("#latestGrid").innerHTML=SI.LATEST.items.map(function(t,n){var ids=SI.IDEAS.filter(function(i){return i.tr===t.k}).map(function(i){return '<a href="#idea-'+i.id+'">#'+i.id+'</a>'}).join(" ");
    var kind=t.kind||"editorial";
    var kindTH=kind==="verified"?"ยืนยันแล้ว":(kind==="observed"?"เห็นในภาพตอนนั้น":"ข้อเสนอ");
    return '<div class="lcard" data-i="'+n+'"><span class="evtag '+esc(kind)+'">'+esc(kind)+' · '+kindTH+'</span><b>'+esc(t.en)+'</b><span class="th">'+esc(t.th)+'</span><p><b>What we saw · ที่เห็น:</b> '+esc(t.what)+'</p><p><b>How a draft could use it · ฉบับร่างใช้ยังไง:</b> '+esc(t.use)+'</p>'+
    (t.limit?'<p class="note"><b>Limit · ข้อจำกัด:</b> '+esc(t.limit)+'</p>':'')+
    (t.risk?'<span class="flag">⚠ '+esc(t.risk)+'</span>':'')+(ids?'<div class="lideas">Ideas · ไอเดีย: '+ids+'</div>':'')+
    '<div class="lsrc">'+srcLinks(t.src)+'</div></div>'}).join("");
  var box=$("#notChasing"), nc=SI.LATEST.notChasing;
  if(box){if(!nc)box.innerHTML="";else if(typeof nc==="string")box.textContent=nc;else{
    box.innerHTML='<div class="notchase"><b>'+esc(nc.en)+'</b><span class="th" style="display:block;margin:4px 0 8px">'+esc(nc.th)+'</span>'+
      (nc.items||[]).map(function(it){return '<div style="margin:4px 0"><a href="'+esc(it.u)+'" target="_blank" rel="noopener">'+esc(it.t)+'</a> — '+esc(it.why)+'</div>'}).join("")+
      (nc.foot?'<p class="note">'+esc(nc.foot)+'</p>':'')+'</div>';
  }}
}
/* ---------- trends ---------- */
function themeText(t){return (t.th+" "+t.en+" "+t.why+" "+t.pr+" "+t.note+" "+trendText(t.k)).toLowerCase()}
function renderThemes(){if(!SI.THEMES||!$("#themeGrid"))return;var T=SI.THEMES;
  $("#themeWeek").textContent="Week · สัปดาห์ "+T.weekTH+" · "+T.week;$("#themeFrom").textContent="From · ที่มา: "+T.from+" (see Latest trends · ดูเทรนด์ล่าสุด ↓)";
  $("#themeGrid").innerHTML=T.items.map(function(t,n){return '<div class="thcard'+(t.lead?' lead':'')+'" data-i="'+n+'">'+(t.lead?'<span class="leadtag">★ Lead · ธีมหลัก</span>':'')+
    '<b>'+esc(t.th)+'</b><span class="en">'+esc(t.en)+'</span><p><b>Why now · ทำไมตอนนี้:</b> '+esc(t.why)+'</p><p><b>Lead products · สินค้า:</b> '+esc(t.pr)+'</p>'+
    '<p><b>Ideas · ไอเดีย:</b> '+t.ids.map(function(i){return '<a href="#idea-'+i+'">#'+i+'</a>'}).join(" ")+'</p><p class="risk">⚠ '+esc(t.note)+'</p></div>'}).join("");
}
function renderTrends(){renderLatest();renderThemes();
  $("#trendGrid").innerHTML=SI.TRENDS.map(function(t,n){return '<div class="tcard" data-i="'+n+'"><b>'+esc(t.en)+'</b><span class="th">'+esc(t.th)+'</span><p>'+esc(t.how)+'</p><span class="eff">'+(t.e===1?"Effort: low · ทำง่าย":"Effort: medium · ใช้เวลาปานกลาง")+'</span></div>'}).join("");
}

/* ---------- competitors ---------- */
var CK="malee-social-comp-v1";
function compData(){try{return JSON.parse(localStorage.getItem(CK)||"{}")}catch(e){return {}}}
function renderComp(){
  var d=compData(),h='<tr><th>Brand<small>แบรนด์</small></th>'+SI.COMP_COLS.map(function(c){return '<th>'+esc(c[1])+'<small>'+esc(c[2])+'</small></th>'}).join("")+'</tr>';
  SI.COMPETITORS.forEach(function(b,r){h+='<tr><td class="brand">'+esc(b.b)+'<small>'+esc(b.cat)+'</small></td>'+SI.COMP_COLS.map(function(c){return '<td contenteditable="true" data-k="'+r+'|'+c[0]+'">'+esc((d[r+"|"+c[0]])||"")+'</td>'}).join("")+'</tr>'});
  $("#compTbl").innerHTML=h;
}
function csvCell(v){v=String(v==null?"":v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function dl(name,data,type){var b=data instanceof Blob?data:new Blob([data],{type:type});var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
function b64ToBlob(b64,type){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Blob([u],{type:type})}

/* ---------- results tracker ---------- */
function parseCSV(t){var rows=[],row=[],f="",q=false;t=t.replace(/^\uFEFF/,"");
  for(var i=0;i<t.length;i++){var c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
    else if(c==='"')q=true;else if(c===","){row.push(f);f=""}else if(c==="\n"||c==="\r"){if(c==="\r"&&t[i+1]==="\n")i++;row.push(f);rows.push(row);row=[];f=""}else f+=c}
  if(f!==""||row.length){row.push(f);rows.push(row)}return rows.filter(function(r){return r.some(function(x){return String(x).trim()!==""})})}
var ALIAS={date:/^(date|post.?date|วันที่)/i,platform:/^(platform|แพลตฟอร์ม|channel)/i,format:/^(format|รูปแบบ|type)/i,pillar:/^(pillar|หมวด|content)/i,product:/^(product|สินค้า)/i,
  reach:/^(reach|คนเห็น|การเข้าถึง)/i,views:/^(views?|plays?|ยอดวิว|วิว)/i,likes:/^(likes?|reactions?|ไลก์)/i,comments:/^(comments?|คอมเมนต์)/i,shares:/^(shares?|แชร์)/i,saves:/^(saves?|เซฟ|บันทึก)/i,followers_gained:/^(followers?.?gain|new.?followers?|ผู้ติดตามใหม่)/i,post_link:/^(post.?link|link|url|ลิงก์)/i,notes:/^(notes?|หมายเหตุ)/i};
function decodeText(buf){var t=new TextDecoder("utf-8").decode(buf);if((t.match(/\uFFFD/g)||[]).length>3){try{t=new TextDecoder("windows-874").decode(buf)}catch(e){}}return t}
function num(v){if(v===""||v==null)return null;var n=+String(v).replace(/[, ]/g,"");return isNaN(n)?null:n}
function normDate(v){if(v==null||v==="")return "";if(typeof v==="number"&&v>20000&&v<80000){return iso(new Date(Date.UTC(1899,11,30)+v*864e5))}
  var s=String(v).trim(),m;if(m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))return m[1]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[3]).slice(-2);
  if(m=s.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})/)){var y=+m[3];if(y<100)y+=2000;if(y>2400)y-=543;return y+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2)}return s}
function normPlat(v){v=String(v||"");if(/tik|^tt$/i.test(v))return "TT";if(/insta|^ig$/i.test(v))return "IG";if(/face|^fb$/i.test(v))return "FB";return v||"?"}
function normPill(v){v=String(v||"");if(/recipe|เมนู/i.test(v))return "rec";if(/fun|trend|สนุก/i.test(v))return "fun";if(/fest|moment|เทศกาล/i.test(v))return "fest";if(/commun|talk|fan|ลูกค้า/i.test(v))return "com";if(/behind|เบื้องหลัง/i.test(v))return "bts";if(/product|promo|deal|สินค้า|โปร/i.test(v))return "promo";return "other"}
function gridToRows(g){
  var hi=0,best=-1;for(var i=0;i<Math.min(g.length,10);i++){var sc=0;g[i].forEach(function(c){for(var k in ALIAS)if(ALIAS[k].test(String(c).trim()))sc++});if(sc>best){best=sc;hi=i}}
  if(best<2)return null;var map={};g[hi].forEach(function(c,j){c=String(c).trim();for(var k in ALIAS)if(map[k]==null&&ALIAS[k].test(c)){map[k]=j;break}});
  if(map.reach==null)return null;
  return g.slice(hi+1).map(function(r){var o={};for(var k in map)o[k]=r[map[k]];return {date:normDate(o.date),plat:normPlat(o.platform),fmt:o.format||"",pl:normPill(o.pillar),prod:o.product||"",link:o.post_link||"",
    notes:String(o.notes||""),reach:num(o.reach),views:num(o.views),likes:num(o.likes),comments:num(o.comments),shares:num(o.shares),saves:num(o.saves),fol:num(o.followers_gained)}}).filter(function(r){return r.reach!=null||r.date})
}
var isExample=true;
function renderPerf(rows,label){
  $("#dataBadge").className="bdg "+(isExample?"ex":"real");$("#dataBadge").textContent=isExample?"EXAMPLE data · ข้อมูลตัวอย่าง (not real)":"Your data · ข้อมูลของคุณ: "+label;
  document.querySelectorAll("#perf .panel").forEach(function(p){p.classList.toggle("exm",isExample)});
  var S=function(k){return rows.reduce(function(a,r){return a+(r[k]||0)},0)};
  var k=[["Posts","จำนวนโพสต์",rows.length],["Reach","คนเห็น",S("reach")],["Saves","เซฟ",S("saves")],["Shares","แชร์",S("shares")],["New followers","ผู้ติดตามใหม่",S("fol")]];
  $("#kpis").innerHTML=k.map(function(x){return '<div class="kpi">'+(isExample?'<span class="x">EXAMPLE</span>':'')+'<div class="v">'+nf(x[2])+'</div><div class="l">'+x[0]+' · '+x[1]+'</div></div>'}).join("");
  var pr={};rows.forEach(function(r){pr[r.plat]=(pr[r.plat]||0)+(r.reach||0)});
  hbars($("#pReach"),[{l:"Facebook",v:pr.FB||0,c:"#1877F2"},{l:"Instagram",v:pr.IG||0,c:"url(#igG)"},{l:"TikTok",v:pr.TT||0,c:"#000",stroke:"#25F4EE"}]);
  var byD={};rows.forEach(function(r){if(r.date)byD[r.date]=(byD[r.date]||0)+(r.fol||0)});var cum=0;
  lineChart($("#pFol"),Object.keys(byD).sort().map(function(d){cum+=byD[d];var x=D(d);return {x:x.getUTCDate()+" "+MEN[x.getUTCMonth()],y:cum}}));
  var pa={};rows.forEach(function(r){var o=pa[r.pl]=pa[r.pl]||{e:0,r:0};o.e+=(r.saves||0)+(r.shares||0);o.r+=(r.reach||0)});
  var pi=Object.keys(pa).filter(function(k){return pa[k].r>0}).map(function(k){var P=SI.PILLAR[k]||{en:"Other",th:"อื่นๆ",c:"#9ca3af"},v=pa[k].e/pa[k].r*1000;return {l:P.en,v:v,c:P.c,txt:v.toFixed(1)}}).sort(function(a,b){return b.v-a.v});
  hbars($("#pPill"),pi);
  var top=rows.slice().sort(function(a,b){return ((b.saves||0)+(b.shares||0))-((a.saves||0)+(a.shares||0))}).slice(0,5);
  $("#pTop").innerHTML='<table class="top5"><tr><th>Date</th><th>Platform</th><th>Format</th><th>Pillar</th><th class="n">Reach</th><th class="n">Saves+Shares</th></tr>'+top.map(function(r){var P=SI.PILLAR[r.pl];
    return '<tr><td>'+esc(r.date)+'</td><td>'+(SI.PLAT[r.plat]?'<span class="pl '+SI.PLAT[r.plat].cls+'">'+SI.PLAT[r.plat].en+'</span>':esc(r.plat))+'</td><td>'+esc(r.fmt)+'</td><td>'+(P?esc(P.en):"Other")+'</td><td class="n">'+nf(r.reach)+'</td><td class="n">'+nf((r.saves||0)+(r.shares||0))+'</td></tr>'}).join("")+'</table>'+
    (isExample?'<p class="note">EXAMPLE rows, made up for the demo. · แถวตัวอย่าง สร้างขึ้นเพื่อสาธิต</p>':'');
}
function loadExample(){isExample=true;renderPerf(gridToRows(parseCSV(window.SI_EXAMPLE_CSV)),"")}
function loadGrid(g,name){var rows=gridToRows(g);if(!rows||!rows.length){toast("Couldn't find the columns (need at least date + reach). Use the template. · หาคอลัมน์ไม่เจอ ใช้ไฟล์แม่แบบ",7000);return}
  isExample=rows.every(function(r){return /EXAMPLE/i.test(r.notes)});renderPerf(rows,name);toast("Loaded "+rows.length+" posts · โหลดแล้ว "+rows.length+" โพสต์",3000);$("#perf").scrollIntoView({behavior:"smooth"})}
function loadSheetJS(cb){if(window.XLSX)return cb(null);
  var s=document.createElement("script");s.src="vendor/xlsx.full.min.js";s.onload=function(){cb(window.XLSX?null:"Excel reader not loaded")};s.onerror=function(){cb("Excel reader could not load")};document.head.appendChild(s)}
function onFile(file){if(!file)return;var ext=(file.name.split(".").pop()||"").toLowerCase(),rd=new FileReader();
  rd.onload=function(){var buf=rd.result;if(ext==="csv"||ext==="txt"){loadGrid(parseCSV(decodeText(buf)),file.name);return}
    loadSheetJS(function(err){if(err){toast(err+". Save as CSV and upload that. · บันทึกเป็น CSV แล้วอัปโหลดใหม่",8000);return}
      try{var wb=XLSX.read(buf,{type:"array"}),sn=wb.SheetNames.filter(function(n){return !/how ?to|วิธี/i.test(n)})[0]||wb.SheetNames[0];
        loadGrid(XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,raw:true,defval:""}),file.name+" › "+sn)}catch(e){toast("Could not read file · อ่านไฟล์ไม่ได้: "+(e.message||e),8000)}})};
  rd.readAsArrayBuffer(file)}

/* ---------- viz sketches ---------- */
function sketch(k){var s='<svg viewBox="0 0 260 90" preserveAspectRatio="none">',i,j,c=["#0f766e","#16a34a","#f59e0b","#dc2626","#7c3aed","#0891b2","#db2777"];
  if(k==="heat"){for(i=0;i<7;i++)for(j=0;j<12;j++){var o=.12+.8*Math.abs(Math.sin(i*1.7+j*.9)*Math.cos(j*.4));s+='<rect x="'+(20+j*19)+'" y="'+(6+i*11.5)+'" width="17" height="10" rx="2" fill="#0f766e" opacity="'+o.toFixed(2)+'"/>'}}
  else if(k==="bars"){for(i=0;i<6;i++)s+='<rect x="'+(20+i*38)+'" y="'+(80-(20+((i*37)%55)))+'" width="26" height="'+(20+((i*37)%55))+'" rx="3" fill="'+c[i]+'"/>'}
  else if(k==="cal"){for(i=0;i<4;i++)for(j=0;j<7;j++){s+='<rect x="'+(14+j*34)+'" y="'+(6+i*20)+'" width="30" height="17" rx="3" fill="'+((i*7+j)%5===0?"#fde047":"#e5e7eb")+'"/>';if((i*7+j)%3===0)s+='<circle cx="'+(29+j*34)+'" cy="'+(14+i*20)+'" r="4" fill="'+["#1877F2","#DD2A7B","#000"][(i+j)%3]+'"/>'}}
  else if(k==="cloud"){var w=["#มาลี","#1111","#พักสักนิด","#เช็กก่อนช้อป","#ลอยกระทง2569","#มุมแสงไฟ","#ไอเดียของว่าง","#FamilyStories"];w.forEach(function(t,n){s+='<text x="'+(8+(n%4)*64)+'" y="'+(28+Math.floor(n/4)*36)+'" font-size="'+[14,13,12,11,12,11,12,11][n]+'" fill="'+c[n%7]+'" font-weight="700">'+t+'</text>'})}
  else if(k==="sov"){var x=10,ws=[70,50,40,35,30,20];ws.forEach(function(v,n){s+='<rect x="'+x+'" y="30" width="'+v*.97+'" height="30" fill="'+c[n]+'"/>';x+=v*.97});s+='<text x="10" y="22" font-size="10" fill="#6b7280">Malee vs competitors</text>'}
  else if(k==="gal"){for(i=0;i<6;i++){s+='<rect x="'+(10+i*41)+'" y="14" width="36" height="58" rx="5" fill="'+c[i]+'" opacity=".75"/><text x="'+(28+i*41)+'" y="84" font-size="9" text-anchor="middle" fill="#6b7280">#'+(i+1)+'</text>'}}
  else if(k==="line"){var p="";for(i=0;i<12;i++)p+=(i?"L":"M")+(14+i*21)+" "+(78-i*5-(i%3)*4);s+='<path d="'+p+'" fill="none" stroke="#0f766e" stroke-width="2.5"/>';[2,5,8,10].forEach(function(n){s+='<circle cx="'+(14+n*21)+'" cy="'+(78-n*5-(n%3)*4)+'" r="4" fill="#DD2A7B"/>'})}
  else if(k==="ab"){["A","B","C","D"].forEach(function(t,n){var w=[180,120,150,80][n];s+='<text x="10" y="'+(20+n*19)+'" font-size="11" font-weight="700">'+t+'</text><rect x="26" y="'+(10+n*19)+'" width="'+w+'" height="13" rx="3" fill="'+(n===0?"#16a34a":"#cbd5e1")+'"/>'})}
  return s+'</svg>'}
function renderViz(){$("#vizGrid").innerHTML=SI.VIZ.map(function(v){return '<div class="vcard">'+sketch(v.k)+'<b>'+esc(v.en)+'</b><span class="th">'+esc(v.th)+'</span></div>'}).join("")}
function renderSrc(){$("#srcList").innerHTML=SI.SOURCES.map(function(s){return '<li>'+esc(s.t)+' — <a href="'+esc(s.u)+'" target="_blank" rel="noopener">'+esc(s.u)+'</a></li>'}).join("");$("#build").textContent=window.SI_BUILD||""}

/* ---------- events ---------- */
document.addEventListener("click",function(e){var t=e.target.closest("button,a.jump");if(!t)return;
  if(t.dataset.p){fP=t.dataset.p;renderFilters();renderIdeas();renderStatus();return}
  if(t.dataset.l){fL=t.dataset.l;renderFilters();renderIdeas();renderStatus();return}
  if(t.classList.contains("jump")){e.preventDefault();var id=t.dataset.id;if(!document.getElementById("idea-"+id)){fP="all";fL="all";renderFilters();renderIdeas()}
    if(!document.getElementById("idea-"+id)){clearQuery()}
    var c=document.getElementById("idea-"+id);if(!c)return;var det=c.closest("details");if(det)det.open=true;
    c.scrollIntoView({behavior:"smooth",block:"center"});c.classList.remove("hl");void c.offsetWidth;c.classList.add("hl");return}
  if(t.dataset.save){saveIdea(t.dataset.save);return}
  if(t.dataset.unsave){unsaveFrom(t.dataset.unsave);return}
  if(t.dataset.del){delSaved(t.dataset.del);return}
  if(t.dataset.ex){$("#q").value=t.dataset.ex;applyQuery();generate(newSeed());return}
  if(t.id==="qGen"){generate(GEN.cards.length&&GEN.q===$("#q").value.trim()?GEN.seed:newSeed());return}
  if(t.id==="qShuffle"){generate(newSeed());return}
  if(t.id==="qClear"){clearQuery();$("#q").focus();return}
  if(t.id==="savedCsv"){exportSaved();return}
  if(t.dataset.copy){var i=findIdea(t.dataset.copy),txt=i.cTH+"\n\n"+i.cEN+(i.tags?"\n\n"+i.tags:"");
    (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(function(){toast("Copied · คัดลอกแล้ว")},function(){prompt("Copy:",txt)});return}
  if(t.id==="compCsv"){var d=compData(),out=[["Brand","Category"].concat(SI.COMP_COLS.map(function(c){return c[1]}))];SI.COMPETITORS.forEach(function(b,r){out.push([b.b,b.cat].concat(SI.COMP_COLS.map(function(c){return d[r+"|"+c[0]]||""})))});
    dl("competitor_social_watch.csv","\uFEFF"+out.map(function(r){return r.map(csvCell).join(",")}).join("\n"),"text/csv");return}
  if(t.id==="compClear"){if(confirm("Clear all typed cells? · ล้างข้อมูลที่พิมพ์ทั้งหมด?")){localStorage.removeItem(CK);renderComp()}return}
  if(t.id==="dlTplX"){dl("social_posts_template.xlsx",b64ToBlob(window.SI_TPL_XLSX_B64,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));return}
  if(t.id==="dlTplC"){dl("social_posts_template.csv","\uFEFF"+window.SI_TPL_CSV.replace(/^\uFEFF/,""),"text/csv");return}
  if(t.id==="resetEx"){loadExample();toast("Showing EXAMPLE data · แสดงข้อมูลตัวอย่าง");return}
});
document.addEventListener("input",function(e){var k=e.target.dataset&&e.target.dataset.k;if(!k)return;var d=compData();d[k]=e.target.textContent.trim();try{localStorage.setItem(CK,JSON.stringify(d))}catch(x){}});
$("#file").addEventListener("change",function(e){onFile(e.target.files[0]);e.target.value=""});
var dr=$("#drop");["dragover","dragenter"].forEach(function(n){dr.addEventListener(n,function(e){e.preventDefault();dr.classList.add("over")})});
["dragleave","drop"].forEach(function(n){dr.addEventListener(n,function(e){e.preventDefault();dr.classList.remove("over")})});
dr.addEventListener("drop",function(e){onFile(e.dataTransfer.files[0])});

/* ---------- idea box: offline search + idea generator (no external AI) ---------- */
var G=SI.GEN, GBY={}, QK="malee-social-q-v1", SK="malee-social-saved-v1";
G.groups.forEach(function(g){GBY[g.k]=g});
var Q={raw:"",active:false,concepts:[],P:null,nIdeas:0}, GEN={seed:0,cards:[],q:""}, SAVED=loadSaved();
function loadSaved(){try{var a=JSON.parse(localStorage.getItem(SK)||"[]");return Array.isArray(a)?a:[]}catch(e){return []}}
function storeSaved(){try{localStorage.setItem(SK,JSON.stringify(SAVED))}catch(e){toast("Could not save (browser storage blocked) · บันทึกไม่ได้",5000)}}
function storeQ(){try{localStorage.setItem(QK,JSON.stringify({q:$("#q").value,gq:GEN.cards.length?GEN.q:"",seed:GEN.seed}))}catch(e){}}
function rxEsc(x){return x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function isLatin(x){return /^[a-z0-9 .%\-]+$/i.test(x)}
var TERMS=[];G.groups.forEach(function(g){g.terms.forEach(function(t){TERMS.push({t:t.toLowerCase(),g:g})})});TERMS.sort(function(a,b){return b.t.length-a.t.length});
var HEALTH=G.health.map(function(h){return h.toLowerCase()}).sort(function(a,b){return b.length-a.length});
var STOP=/^(the|and|for|to|of|a|an|with|in|on|at|my|our|idea|ideas|post|posts|content|malee|ของ|และ|กับ|ที่|ใน|ไอเดีย|โพสต์|มาลี|ช่วง)$/i;
/* Latin terms: whole word, plural -s/-es allowed ("snacks" ok, "mom" does not match "moment"). raw=1: prefix match for unknown typed words. Thai: substring minus excl words. */
function latinRx(t,raw,gl){return new RegExp("(^|[^a-z0-9])("+rxEsc(t)+")"+(raw?"":"(?=(?:e?s)?(?:$|[^a-z0-9]))"),gl?"gi":"i")}
function found(s,t){return isLatin(t)?latinRx(t).test(s):s.indexOf(t)>=0}
function consume(s,t){return isLatin(t)?s.replace(latinRx(t,0,1),"$1 "):s.split(t).join(" ")}
function parseQuery(q){
  var s=" "+q.toLowerCase().replace(/[,;\/+|"“”]+/g," ")+" ",groups=[],health=[];
  HEALTH.forEach(function(h){if(found(s,h)){health.push(h);s=consume(s,h)}});
  TERMS.forEach(function(x){if(found(s,x.t)){if(groups.indexOf(x.g)<0)groups.push(x.g);s=consume(s,x.t)}});
  var raws=s.split(/\s+/).filter(function(w){return w.length>=2&&!STOP.test(w)});
  return {raw:q.trim(),groups:groups,raws:raws,health:health};
}
function conceptsOf(P){
  var cs=P.groups.map(function(g){var t=g.terms.slice();(g.also||[]).forEach(function(k){if(GBY[k])t=t.concat(GBY[k].terms)});
    var ex=g.excl||[];(g.also||[]).forEach(function(k){if(GBY[k]&&GBY[k].excl)ex=ex.concat(GBY[k].excl)});
    return {label:g.en+" · "+g.th,terms:t.map(function(x){return x.toLowerCase()}),excl:ex}});
  P.raws.forEach(function(r){cs.push({label:r,terms:[r],excl:[],raw:1})});
  P.health.forEach(function(h){cs.push({label:h,terms:[h],excl:[],health:1})});
  cs.forEach(function(c){c.rx=c.terms.map(function(t){return isLatin(t)?latinRx(t,c.raw):null})});
  return cs;
}
function hay(i){var P=SI.PILLAR[i.pl]||{};return [i.hTH,i.hEN,i.cTH,i.cEN,i.pr,i.f,i.tags,i.shot,i.slot,i.srcNote,i.caution,i.prepNote,i.confirm,P.en,P.th,trendText(i.tr),(i.p||[]).map(function(k){return SI.PLAT[k].en}).join(" ")].join(" ").toLowerCase()}
function hitC(h,c){var x=h;c.excl.forEach(function(e){x=x.split(e).join(" ")});return c.terms.some(function(t,j){return c.rx[j]?c.rx[j].test(x):x.indexOf(t)>=0})}
function scoreText(h){return Q.concepts.reduce(function(a,c){return a+(hitC(h,c)?1:0)},0)}
function score(i){return scoreText(hay(i))}
function hlq(text){text=String(text==null?"":text);if(!Q.active)return esc(text);
  var low=text.toLowerCase(),L=text.length,on=[],k,i,out="",m;if(low.length!==L)return esc(text);
  Q.concepts.forEach(function(c){var bl=[];
    c.excl.forEach(function(e){k=low.indexOf(e);while(k>=0){for(i=k;i<k+e.length;i++)bl[i]=1;k=low.indexOf(e,k+1)}});
    c.terms.forEach(function(t,j){if(t.length<2)return;
      if(c.rx[j]){var re=new RegExp(c.rx[j].source,"gi");while((m=re.exec(low))){var s=m.index+m[1].length;if(!bl[s])for(i=s;i<s+t.length;i++)on[i]=1;re.lastIndex=s+1}}
      else{k=low.indexOf(t);while(k>=0){if(!bl[k])for(i=k;i<k+t.length;i++)on[i]=1;k=low.indexOf(t,k+1)}}})});
  for(i=0;i<L;){var st=on[i];for(k=i;k<L&&!!on[k]===!!st;k++);out+=st?'<mark>'+esc(text.slice(i,k))+'</mark>':esc(text.slice(i,k));i=k}
  return out}
function applyQuery(){
  var q=$("#q").value; Q.raw=q.trim(); Q.P=parseQuery(q); Q.concepts=conceptsOf(Q.P); Q.active=Q.raw.length>0&&Q.concepts.length>0;
  renderIdeas(); renderGen(); markOthers(); renderStatus(); storeQ();
}
function markOthers(){
  var nc=0,nt=0;
  document.querySelectorAll(".calendar .post, .ecard").forEach(function(el){var i=findIdea(el.dataset.id);if(!i)return;var m=Q.active&&score(i)>0;
    el.classList.toggle("match",m);el.classList.toggle("dim",Q.active&&!m);if(m&&el.classList.contains("post"))nc++});
  document.querySelectorAll("#trendGrid .tcard").forEach(function(el){var t=SI.TRENDS[+el.dataset.i],m=Q.active&&scoreText((t.en+" "+t.th+" "+t.how).toLowerCase())>0;
    el.classList.toggle("match",m);el.classList.toggle("dim",Q.active&&!m);if(m)nt++});
  var nl=0;document.querySelectorAll("#latestGrid .lcard").forEach(function(el){var t=SI.LATEST.items[+el.dataset.i],m=Q.active&&scoreText((t.en+" "+t.th+" "+t.what+" "+t.use+" "+(t.limit||"")+" "+(t.kind||"")).toLowerCase())>0;
    el.classList.toggle("match",m);el.classList.toggle("dim",Q.active&&!m);if(m)nl++});
  if($("#latestCount"))$("#latestCount").textContent=Q.active?"("+nl+" match · ตรง "+nl+")":"";
  var nth=0;document.querySelectorAll("#themeGrid .thcard").forEach(function(el){var t=SI.THEMES.items[+el.dataset.i],m=Q.active&&scoreText(themeText(t))>0;
    el.classList.toggle("match",m);el.classList.toggle("dim",Q.active&&!m);if(m)nth++});
  if($("#themeCount"))$("#themeCount").textContent=Q.active?"("+nth+" match · ตรง "+nth+")":"";
  Q.nCal=nc;Q.nTr=nt;Q.nLat=nl;Q.nTh=nth;
  $("#trendCount").textContent=Q.active?"("+nt+" match · ตรง "+nt+")":"";
}
function renderStatus(){
  var st=$("#qStatus"),no=$("#qNotice");
  if(!Q.raw){st.innerHTML='<span class="note">Type a theme to filter the ideas below, or press ✨ to get new ones. · พิมพ์ธีมเพื่อกรองไอเดีย หรือกด ✨ เพื่อขอไอเดียใหม่</span>';no.innerHTML="";return}
  var filt=(fP!=="all"||fL!=="all")?' <span class="note">(with your platform/pillar filter · รวมตัวกรองที่เลือก)</span>':'';
  st.innerHTML='🔎 <b>'+Q.nIdeas+' ideas match</b> · ตรงกับ '+Q.nIdeas+' ไอเดีย · '+Q.nCal+' calendar posts · ปฏิทิน '+Q.nCal+' · '+Q.nTr+' TikTok formats · รูปแบบ '+Q.nTr+filt+
    ' <a href="#ideas" class="seem">See matches ↓ · ดูผล</a><div class="und">Understood · เข้าใจว่า: '+(Q.concepts.length?Q.concepts.map(function(c){return '<span class="chip'+(c.raw?' raw':'')+(c.health?' hw':'')+'">'+esc(c.label)+'</span>'}).join(""):'<span class="note">nothing yet · ยังไม่เข้าใจ</span>')+'</div>';
  var n=[];
  if(Q.P.health.length)n.push('<div class="warnbox">⚠ Health words found: <b>'+esc(Q.P.health.join(", "))+'</b>. New ideas leave these words out of captions. Check with Legal (อย.) before posting any health message.<br><span class="th">พบคำเกี่ยวกับสุขภาพ: '+esc(Q.P.health.join(", "))+' ไอเดียใหม่จะไม่ใส่คำเหล่านี้ในแคปชัน ต้องให้ฝ่ายกฎหมาย (อย.) ตรวจก่อนโพสต์</span></div>');
  if(Q.P.groups.some(function(g){return g.k==="jay"})&&Q.P.groups.some(function(g){return g.k==="milk"}))n.push('<div class="warnbox jay">เจ No milk during Jay, so new ideas use the plant-based drink instead. · ช่วงกินเจงดนม ไอเดียใหม่จึงใช้เครื่องดื่มจากพืชแทน</div>');
  no.innerHTML=n.join("");
}
function clearQuery(){$("#q").value="";GEN.cards=[];GEN.q="";applyQuery()}
/* ---- generator ---- */
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function pick(r,a){return a[Math.floor(r()*a.length)]}
function shuf(r,a){for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function newSeed(){return (Math.random()*1e9|0)+1}
function fill(str,p,c){return str.replace(/\{(pf|PF|pe|p|P|c|C|e|s|S)\}/g,function(_,k){return ({pf:p.pf,PF:p.PF,pe:p.pe,p:p.p,P:p.P,c:c.th,C:c.en,e:c.e,s:c.s,S:c.S})[k]})}
function makeIdeas(P,seed){
  var r=rng(seed),prods=P.groups.filter(function(g){return g.type==="prod"}),ctxs=P.groups.filter(function(g){return g.type==="ctx"});
  var legal=P.health.length>0||P.groups.some(function(g){return g.legal}),jay=P.groups.some(function(g){return g.flag==="jay"}),respect=P.groups.some(function(g){return g.respect});
  if(!ctxs.length){
    if(P.raws.length){var w=P.raws.join(" ");ctxs=[{k:"raw",th:w,en:w,e:"✨",s:"มุมที่เข้ากับธีม",S:"a spot that fits the theme",tags:"#"+P.raws.join("").replace(/[^\p{L}\p{N}]/gu,"")}]}
    else if(prods.length)ctxs=prods.map(function(p){return p.def});
    else if(P.health.length)ctxs=[GBY.healthy];
    else return [];
  }
  if(!prods.length)prods=ctxs.map(function(c){return GBY[c.prod]}).filter(Boolean);
  if(!prods.length)prods=[pick(r,G.groups.filter(function(g){return g.type==="prod"}))];
  if(jay)prods=prods.map(function(p){return p.k==="milk"?GBY.plant:p});
  prods=prods.filter(function(p,n){return prods.indexOf(p)===n});
  var event=ctxs.some(function(c){return c.event}),T=G.tmpl,chosen=[];
  ["TT","IG","FB","ST"].forEach(function(k){var pool=T[k].filter(function(t){return (!t.need||event)&&(!respect||t.calm)});if(!pool.length)pool=T[k].filter(function(t){return !t.need});chosen.push(pick(r,pool))});
  var ex=shuf(r,T.EX.filter(function(t){return !respect||t.calm})).slice(0,Math.floor(r()*3));chosen=chosen.concat(ex);
  var off=Math.floor(r()*prods.length),offc=Math.floor(r()*ctxs.length);
  return chosen.map(function(t,n){var p=prods[(n+off)%prods.length],c=ctxs[(n+offc)%ctxs.length];
    var tags=["#มาลี"].concat(p.tags.split(" "),(c.tags||"").split(" ")).filter(function(x,j,a){return x&&a.indexOf(x)===j}).slice(0,6).join(" ");
    var fl=[];if(legal)fl.push("legal");if(jay||c.flag==="jay")fl.push("jay");if(respect)fl.push("respect");
    return {id:"g"+seed+"-"+n,p:t.plat.slice(),f:t.f,pl:t.pl,pr:p.PF+" · "+p.pf,t:t.t||c.t||(r()<.5?"L":"E"),
      hTH:fill(t.hTH,p,c),hEN:fill(t.hEN,p,c),cTH:fill(t.cTH,p,c),cEN:fill(t.cEN,p,c),
      shot:fill(t.shot,p,c)+(respect?" · Calm tone: no jokes, no sales words. · โทนสงบ ไม่เล่นมุก ไม่ขายของ":""),tags:tags,flags:fl,isNew:1,q:P.raw}});
}
function generate(seed){
  if(!$("#q").value.trim()){toast("Type a theme first · พิมพ์ธีมก่อน");$("#q").focus();return}
  applyQuery(); GEN.seed=seed; GEN.q=$("#q").value.trim(); GEN.cards=makeIdeas(Q.P,seed);
  if(!GEN.cards.length)toast("Try other words, e.g. มะพร้าว, 11.11, ลอยกระทง · ลองคำอื่น",4000);
  renderGen(); storeQ();
}
function renderGen(){
  var g=$("#genGrid");
  if(!GEN.cards.length){g.innerHTML="";$("#genHead").style.display="none";$("#qShuffle").disabled=true;return}
  $("#genHead").style.display="";$("#qShuffle").disabled=false;$("#genHead").dataset.seed=String(GEN.seed);
  $("#genHead").innerHTML='✨ <b>'+GEN.cards.length+' new ideas for “'+esc(GEN.q)+'”</b> · ไอเดียใหม่ '+GEN.cards.length+' ข้อ <span class="note">Made from built-in templates on this device (no AI service). A person still has to review them. This page does not post. · สร้างจากแม่แบบในเครื่อง ยังต้องมีคนตรวจ หน้านี้ไม่ได้โพสต์</span>';
  g.innerHTML=GEN.cards.map(function(i){return cardHTML(i,{gen:1})}).join("");
}
function findIdea(id){var a=SI.IDEAS.concat(SI.ARCHIVE||[],SAVED,GEN.cards);for(var k=0;k<a.length;k++)if(String(a[k].id)===String(id))return a[k];return null}
function saveIdea(gid){var c=GEN.cards.filter(function(x){return x.id===gid})[0];if(!c)return;
  if(SAVED.some(function(x){return x.from===gid}))return;
  var s=JSON.parse(JSON.stringify(c));s.from=gid;s.id="s"+Date.now().toString(36)+Math.floor(Math.random()*1e4);s.savedAt=new Date().toISOString();delete s.isNew;
  SAVED.push(s);storeSaved();renderGen();renderIdeas();markOthers();renderStatus();renderSavedBar();toast("Saved to the idea board · บันทึกลงคลังไอเดียแล้ว")}
function unsaveFrom(gid){SAVED=SAVED.filter(function(x){return x.from!==gid});storeSaved();renderGen();renderIdeas();renderStatus();renderSavedBar();toast("Removed · เอาออกแล้ว")}
function delSaved(id){if(!confirm("Delete this saved idea? · ลบไอเดียนี้?"))return;SAVED=SAVED.filter(function(x){return x.id!==id});storeSaved();renderGen();renderIdeas();renderStatus();renderSavedBar();toast("Deleted · ลบแล้ว")}
function renderSavedBar(){var n=SAVED.length;
  $("#savedBar").innerHTML=n?'💾 <b>'+n+' saved</b> · บันทึกแล้ว '+n+' ไอเดีย (in this browser · ในเบราว์เซอร์นี้) <button id="savedCsv" class="ghost">⬇ Export saved CSV</button> <a href="#ideas">See on board ↓ · ดูในคลัง</a>':'<span class="note">Saved ideas appear at the top of the idea board. · ไอเดียที่บันทึกจะอยู่บนสุดของคลังไอเดีย</span>'}
function exportSaved(){if(!SAVED.length){toast("Nothing saved yet · ยังไม่มีไอเดียที่บันทึก");return}
  var cols=["saved_at","from_query","platforms","format","pillar","product","hook_th","hook_en","caption_th","caption_en","shot_idea","hashtags","suggested_ict_slot","flags"];
  var rows=[cols].concat(SAVED.map(function(i){return [i.savedAt,i.q,i.p.map(function(k){return SI.PLAT[k].en}).join(" + "),i.f,SI.PILLAR[i.pl].en,i.pr,i.hTH,i.hEN,i.cTH,i.cEN,i.shot,i.tags,timeLabel(i),
    flagsOf(i).map(function(f){return {legal:"Check with Legal (อย.)",jay:"Check Jay label",respect:"Calm tone"}[f]}).join("; ")]}));
  dl("malee_saved_social_ideas.csv","\uFEFF"+rows.map(function(r){return r.map(csvCell).join(",")}).join("\n"),"text/csv")}
function initAsk(){
  $("#qChips").innerHTML='<span class="note">Try · ลอง:</span> '+G.examples.map(function(x){return '<button type="button" class="exchip" data-ex="'+esc(x)+'">'+esc(x)+'</button>'}).join("");
  var tmr;$("#q").addEventListener("input",function(){clearTimeout(tmr);tmr=setTimeout(applyQuery,200)});
  $("#q").addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.isComposing){e.preventDefault();generate(GEN.cards.length&&GEN.q===$("#q").value.trim()?GEN.seed:newSeed())}});
  var st={};try{st=JSON.parse(localStorage.getItem(QK)||"{}")}catch(e){}
  if(st.gq&&st.seed){GEN.seed=st.seed;GEN.q=st.gq;GEN.cards=makeIdeas(parseQuery(st.gq),st.seed)}
  if(st.q)$("#q").value=st.q;
  applyQuery();
  renderSavedBar();
}

renderEasy();renderCal();renderFilters();renderIdeas();renderMix();renderTrends();renderComp();loadExample();renderViz();renderSrc();initAsk();
})();

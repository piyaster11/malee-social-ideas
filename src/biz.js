/* Malee business radar. Qualitative sources only. No scores, no search series. */
(function(){
"use strict";
var RAW = window.BIZ_RAW, META = window.BIZ_META;
var LANG_KEY = "malee-biz-lang-v1";
var GROUPS = [
  ["มะพร้าวน้ำหอม","น้ำมะพร้าว","มะพร้าว","aromatic coconut","coconut water","coconut","coco"],
  ["นมยูเอชที","นมผง","นมจากพืช","นมโอ๊ต","dairy","milk","uht","นม"],
  ["รับจ้างผลิต","contract manufacturing","private label","cmg","oem","รับจ้าง"],
  ["labelling","labeling","label","ฉลาก","อย.","fda"]
];
var state = {q:"", cat:"all", geo:"all", ev:"all", fresh:"all", lang:"th"};
var picked = [];
var basketId = "coconut";
var openId = "";

function $(s){return document.querySelector(s);}
function el(tag, cls){var n=document.createElement(tag); if(cls) n.className=cls; return n;}
function tx(s){return document.createTextNode(s==null?"":String(s));}
function add(parent){for(var i=1;i<arguments.length;i++){var c=arguments[i]; if(c==null||c===false) continue; parent.appendChild(typeof c==="string"?tx(c):c);} return parent;}
function btn(cls, label){var b=el("button", cls); b.type="button"; b.appendChild(tx(label)); return b;}
function isoParts(iso){var p=String(iso).split("-"); return {y:+p[0], m:+p[1], d:+p[2]};}
var MTH=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
var MEN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmt(iso){
  if(!iso) return null;
  var p=isoParts(iso);
  return p.d+" "+MEN[p.m-1]+" "+p.y+" · "+p.d+" "+MTH[p.m-1]+" "+(p.y+543);
}
function latin(term){return /^[a-z0-9 .+-]+$/i.test(term);}
function escRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
function hasTerm(text, term){
  var h=String(text).toLowerCase(), t=term.toLowerCase();
  if(latin(t)) return new RegExp("(^|[^a-z0-9])"+escRe(t)+"(?=$|[^a-z0-9])","i").test(h);
  return h.indexOf(t)>=0;
}
function hay(sig){
  var m=META.signals[sig.id], bits=[sig.title_th,sig.title_en,sig.summary_th,sig.summary_en,sig.freshness,sig.scope,sig.relevance_th,sig.action_th,sig.uncertainties_flags,sig.evidence_confidence,m.relevanceEn,m.actionEn,m.uncertaintyEn,m.observed,m.observedTh];
  var cat=META.categories[m.cat]; bits.push(cat.th, cat.en);
  (m.also||[]).forEach(function(id){var c=META.categories[id]; if(c) bits.push(c.th,c.en);});
  sig.source_ids.forEach(function(id){var s=RAW.sources[id]; if(s) bits.push(s.title, s.type, s.period||"", s.date_note||"");});
  return bits.join(" \n ").toLowerCase();
}
function matchesQuery(text, q){
  q=(q||"").trim().toLowerCase();
  if(!q) return true;
  var hit=GROUPS.filter(function(g){return g.some(function(t){return hasTerm(q,t);});});
  if(hit.length){
    var terms=[]; hit.forEach(function(g){terms=terms.concat(g);});
    return terms.some(function(t){return hasTerm(text,t);});
  }
  return hasTerm(text, q);
}
function signals(){
  return RAW.signals.map(function(s){return s;}).sort(function(a,b){return META.signals[a.id].sort - META.signals[b.id].sort;});
}
function visible(){
  return signals().filter(function(sig){
    var m=META.signals[sig.id];
    if(state.cat!=="all" && m.cat!==state.cat) return false;
    if(state.geo!=="all" && m.geo!==state.geo) return false;
    if(state.ev!=="all" && m.evidence!==state.ev) return false;
    if(state.fresh!=="all" && m.fresh!==state.fresh) return false;
    return matchesQuery(hay(sig), state.q);
  });
}
function sourceUses(id){return RAW.signals.filter(function(s){return s.source_ids.indexOf(id)>=0;}).length;}
function cautionText(sig){
  var m=META.signals[sig.id];
  var blob=[sig.summary_en,sig.summary_th,sig.uncertainties_flags,m.uncertaintyEn,sig.action_th,m.actionEn].join(" ");
  return /ลดน้ำหนัก|ดีท็อกซ์|detox|boost immunity|\bcure\b|functional|high protein|zero sugar|no-added-sugar|no added sugar|plant-based|plant based|sustainability|zero waste|FDA-approved|ผลรักษา/i.test(blob);
}
function badge(cls, text){var s=el("span","bb "+cls); s.appendChild(tx(text)); return s;}
function dateRow(labelTh, labelEn, value){
  var p=el("p","drow");
  var b=el("b"); b.appendChild(tx(labelTh+" · "+labelEn+": "));
  p.appendChild(b); p.appendChild(tx(value));
  return p;
}
function linkOut(href, label){
  if(!/^https:\/\//i.test(href)){var s=el("span"); s.appendChild(tx(label)); return s;}
  var a=el("a"); a.href=href; a.target="_blank"; a.rel="noopener noreferrer"; a.appendChild(tx(label));
  return a;
}
function setOpen(id, on, fromHash){
  var card=document.getElementById(id);
  if(!card) return;
  var panel=card.querySelector(".panel");
  var toggle=card.querySelector(".toggle");
  panel.hidden=!on;
  toggle.setAttribute("aria-expanded", on?"true":"false");
  card.classList.toggle("open", on);
  if(on){
    openId=id;
    if(!fromHash && location.hash!=="#"+id) history.replaceState(null,"","#"+id);
  } else if(openId===id){
    openId="";
    if(location.hash==="#"+id) history.replaceState(null,"", location.pathname+location.search);
  }
}
function renderCard(sig){
  var m=META.signals[sig.id];
  var cat=META.categories[m.cat];
  var art=el("article","bcard");
  art.id=sig.id;
  art.style.borderTopColor=cat.c;
  art.dataset.cat=m.cat;
  art.dataset.fresh=m.fresh;
  art.dataset.geo=m.geo;
  art.dataset.ev=m.evidence;
  var head=el("div","bhead");
  var chips=el("div","chips");
  chips.appendChild(badge("cat", cat.th+" · "+cat.en));
  (m.also||[]).forEach(function(id){var c=META.categories[id]; if(c) chips.appendChild(badge("also", c.th));});
  chips.appendChild(badge("fr-"+m.fresh, META.fresh[m.fresh].th+" · "+META.fresh[m.fresh].en));
  chips.appendChild(badge("geo", META.geo[m.geo].th+" · "+META.geo[m.geo].en));
  chips.appendChild(badge("ev-"+m.evidence, META.evidence[m.evidence].th+" · "+META.evidence[m.evidence].en));
  head.appendChild(chips);
  var h=el("h3"); h.id="h-"+sig.id;
  var toggle=btn("toggle", "");
  toggle.setAttribute("aria-controls","p-"+sig.id);
  toggle.setAttribute("aria-expanded","false");
  toggle.dataset.toggle=sig.id;
  var titles=el("span","titles");
  var th=el("span","thline"); th.appendChild(tx(sig.title_th));
  var en=el("span","enline"); en.appendChild(tx(sig.title_en));
  titles.appendChild(th); titles.appendChild(en);
  toggle.appendChild(titles);
  h.appendChild(toggle);
  head.appendChild(h);
  var teaser=el("p","teaser"); teaser.appendChild(tx(sig.summary_th));
  head.appendChild(teaser);
  art.appendChild(head);
  var panel=el("div","panel"); panel.id="p-"+sig.id; panel.hidden=true;
  panel.setAttribute("role","region"); panel.setAttribute("aria-labelledby","h-"+sig.id);
  var fact=el("div","fact");
  fact.appendChild(el("p","kicker")).appendChild(tx("ข้อเท็จจริงจากแหล่ง · Sourced fact"));
  var sth=el("p"); sth.appendChild(tx(sig.summary_th)); fact.appendChild(sth);
  var sen=el("p","enline"); sen.appendChild(tx(sig.summary_en)); fact.appendChild(sen);
  fact.appendChild(dateRow("วันเผยแพร่","Published", m.published?fmt(m.published):"ไม่ทราบ · not established"));
  if(m.effective) fact.appendChild(dateRow("วันมีผล","Effective date", fmt(m.effective)+" — ใช้เป็นวันมีผล ไม่ใช่วันประกาศ"));
  (m.extraDates||[]).forEach(function(d){fact.appendChild(dateRow("วันมีผลอีกฉบับ","Other effective date", fmt(d.iso)+" — "+d.note));});
  fact.appendChild(dateRow("ช่วงที่แหล่งพูดถึง","Observation or period", m.observed));
  var oth=el("p","enline"); oth.appendChild(tx(m.observedTh)); fact.appendChild(oth);
  fact.appendChild(dateRow("วันที่ทีมวิจัยเปิดแหล่ง","Checked", META.checkedLabel+" · "+META.checkedLabelTh+" — ไม่ใช่วันเผยแพร่"));
  var srcP=el("p"); srcP.appendChild(tx("แหล่ง · Sources: "));
  sig.source_ids.forEach(function(id, i){
    var s=RAW.sources[id];
    if(i) srcP.appendChild(tx(" · "));
    srcP.appendChild(linkOut(s.url, s.title));
    var n=sourceUses(id);
    if(n>1) srcP.appendChild(tx(" (ใช้ร่วม "+n+" การ์ด · shared by "+n+" cards, not "+n+" separate confirmations)"));
  });
  fact.appendChild(srcP);
  var conf=el("p","note"); conf.appendChild(tx(sig.evidence_confidence)); fact.appendChild(conf);
  panel.appendChild(fact);
  var op=el("div","opinion");
  op.appendChild(el("p","kicker")).appendChild(tx("มุมมองผู้วิเคราะห์ · Analyst opinion, not a sourced fact"));
  var why=el("p"); var wb=el("b"); wb.appendChild(tx("ทำไมเกี่ยวกับมาลี · Why Malee: ")); why.appendChild(wb); why.appendChild(tx(sig.relevance_th)); op.appendChild(why);
  var whyEn=el("p","enline"); whyEn.appendChild(tx(m.relevanceEn)); op.appendChild(whyEn);
  var act=el("p"); var ab=el("b"); ab.appendChild(tx("ข้อเสนอ ไม่ใช่คำสั่งจากแหล่ง · Suggested action: ")); act.appendChild(ab); act.appendChild(tx(sig.action_th)); op.appendChild(act);
  var actEn=el("p","enline"); actEn.appendChild(tx(m.actionEn)); op.appendChild(actEn);
  panel.appendChild(op);
  var un=el("div","uncert");
  un.appendChild(el("p","kicker")).appendChild(tx("สิ่งที่ยังไม่รู้ · Limits"));
  un.appendChild(el("p")).appendChild(tx(sig.uncertainties_flags));
  un.appendChild(el("p","enline")).appendChild(tx(m.uncertaintyEn));
  if(m.evidence==="official" && m.cat==="regulation"){
    var leg=el("p","legal");
    leg.appendChild(tx("ตรวจจากทะเบียนเท่านั้น ยังไม่อ่านตัวบทเต็ม และหน้านี้ไม่ได้บอกว่าต้องปฏิบัติอย่างไร · Index only. The full legal text was not reviewed, and this page does not prescribe compliance."));
    un.appendChild(leg);
  }
  if(cautionText(sig)){
    var c=el("p","legal");
    c.appendChild(tx("คำเรื่องสุขภาพ ฟังก์ชัน น้ำตาล จากพืช ความยั่งยืน หรือ FDA ในบัตรนี้ไม่ใช่โฆษณาที่พร้อมเผยแพร่ · Health, function, sugar, plant-based, sustainability or FDA wording here is not ready-to-publish advertising."));
    un.appendChild(c);
  }
  panel.appendChild(un);
  var jump=el("p","jump");
  jump.appendChild(linkOut("index.html#ask", "ไปกล่องไอเดียโซเชียล · Open the social idea box"));
  jump.appendChild(tx(" — เปิดหน้าเดิมเท่านั้น ไม่ได้บันทึกไอเดียให้"));
  panel.appendChild(jump);
  art.appendChild(panel);
  toggle.addEventListener("click", function(){setOpen(sig.id, panel.hidden, false);});
  toggle.addEventListener("keydown", function(e){
    if(e.key!=="Enter" && e.key!==" ") return;
    if(e.isTrusted) return;
    e.preventDefault();
    setOpen(sig.id, panel.hidden, false);
  });
  return art;
}
function fillSelect(sel, pairs){
  sel.innerHTML="";
  pairs.forEach(function(p){
    var o=el("option"); o.value=p[0]; o.appendChild(tx(p[1])); sel.appendChild(o);
  });
}
function renderFilters(){
  fillSelect($("#bizCat"), [["all","ทุกหมวด · All categories"]].concat(Object.keys(META.categories).map(function(k){var c=META.categories[k]; return [k, c.th+" · "+c.en];})));
  fillSelect($("#bizGeo"), [["all","ทุกพื้นที่ · All geographies"],["th","ไทย · Thailand"],["mix","ไทยและต่างประเทศ · Thailand and international"],["global","โลก · Global"]]);
  fillSelect($("#bizEv"), [["all","ทุกประเภทหลักฐาน · All evidence"],["official","หน่วยงานทางการ · Official"],["company","คำกล่าวบริษัท · Company statement"],["trade","รายงานการค้า · Trade or independent"]]);
  fillSelect($("#bizFresh"), [["all","ทุกช่วงเวลา · All dates"],["recent","ช่วงนี้ · Current window"],["trailing","บริบทปี 2569 · Trailing 2026"],["older","บริบทเก่ากว่า · Older context"]]);
}
function renderList(){
  var box=$("#bizList"); box.innerHTML="";
  var list=visible();
  var total=RAW.signals.length;
  $("#bizCount").textContent=list.length+" of "+total+" · แสดง "+list.length+" จาก "+total+" สัญญาณ";
  if(!list.length){
    var empty=el("p","empty"); empty.appendChild(tx("ไม่พบสัญญาณที่ตรงตัวกรอง · No watchpoints match. Reset to see all 15."));
    box.appendChild(empty); return;
  }
  list.forEach(function(sig){box.appendChild(renderCard(sig));});
  if(openId && list.some(function(s){return s.id===openId;})) setOpen(openId, true, true);
}
function renderThemes(){
  var box=$("#bizThemes"); box.innerHTML="";
  META.themes.forEach(function(t){
    var card=el("a","theme"); card.href="#"+t.ids[0];
    var k=el("b"); k.appendChild(tx(t.th)); card.appendChild(k);
    var en=el("span","enline"); en.appendChild(tx(t.en)); card.appendChild(en);
    var p=el("p"); p.appendChild(tx(t.whyTh)); card.appendChild(p);
    var pe=el("p","enline"); pe.appendChild(tx(t.why)); card.appendChild(pe);
    var links=el("span","ids");
    t.ids.forEach(function(id,i){if(i) links.appendChild(tx(" ")); var s=el("span"); s.appendChild(tx("#"+id)); links.appendChild(s);});
    card.appendChild(links);
    card.addEventListener("click", function(e){
      e.preventDefault();
      state.q=""; state.cat="all"; state.geo="all"; state.ev="all"; state.fresh="all";
      $("#bizQ").value="";
      $("#bizCat").value="all"; $("#bizGeo").value="all"; $("#bizEv").value="all"; $("#bizFresh").value="all";
      renderList();
      setOpen(t.ids[0], true, false);
      var node=document.getElementById(t.ids[0]);
      if(node) node.scrollIntoView({behavior:"smooth", block:"start"});
    });
    box.appendChild(card);
  });
}
function renderTimeline(){
  var rows=[];
  signals().forEach(function(sig){
    var m=META.signals[sig.id];
    if(m.published) rows.push({iso:m.published, kind:"Published · วันเผยแพร่", id:sig.id, th:sig.title_th});
    if(m.effective) rows.push({iso:m.effective, kind:"Effective · วันมีผล", id:sig.id, th:sig.title_th});
    (m.extraDates||[]).forEach(function(d){rows.push({iso:d.iso, kind:"Effective · วันมีผล", id:sig.id, th:d.note});});
  });
  rows.push({iso:"2026-11-07", kind:"Campaign window starts · เริ่มช่วงแคมเปญ", id:"1111-channel", th:"KTC Double Day window, publication date unknown"});
  rows.sort(function(a,b){return a.iso<b.iso?-1:a.iso>b.iso?1:0;});
  var ol=$("#bizTime"); ol.innerHTML="";
  rows.forEach(function(r){
    var li=el("li");
    li.appendChild(tx(fmt(r.iso)+" — "+r.kind+" — "));
    var a=el("a"); a.href="#"+r.id; a.appendChild(tx(r.th));
    a.addEventListener("click", function(e){e.preventDefault(); reveal(r.id);});
    li.appendChild(a);
    ol.appendChild(li);
  });
}
function reveal(id){
  if(!visible().some(function(s){return s.id===id;})){
    state.q=""; state.cat="all"; state.geo="all"; state.ev="all"; state.fresh="all";
    $("#bizQ").value="";
    ["bizCat","bizGeo","bizEv","bizFresh"].forEach(function(n){$("#"+n).value="all";});
    renderList();
  }
  setOpen(id, true, false);
  var node=document.getElementById(id);
  if(node) node.scrollIntoView({behavior:"smooth", block:"start"});
}
function renderSources(){
  var tb=$("#bizSources"); tb.innerHTML="";
  Object.keys(RAW.sources).forEach(function(id){
    var s=RAW.sources[id];
    var tr=el("tr");
    [id, s.title, s.type].forEach(function(val){var td=el("td"); td.appendChild(tx(val)); tr.appendChild(td);});
    var pub=el("td"); pub.appendChild(tx(s.published?fmt(s.published):"ไม่ทราบ · not established")); tr.appendChild(pub);
    var per=el("td"); per.appendChild(tx(s.period||s.date_note||"—")); tr.appendChild(per);
    var chk=el("td"); chk.appendChild(tx(META.checkedLabel)); tr.appendChild(chk);
    var url=el("td"); url.appendChild(linkOut(s.url, "เปิดแหล่ง · Open")); tr.appendChild(url);
    var n=el("td"); n.appendChild(tx(String(sourceUses(id)))); tr.appendChild(n);
    tb.appendChild(tr);
  });
}
function basketBy(id){for(var i=0;i<RAW.keyword_baskets.length;i++) if(RAW.keyword_baskets[i].id===id) return RAW.keyword_baskets[i]; return null;}
function trendsHref(range){
  var terms=picked.map(function(t){return t.trim();}).filter(Boolean).slice(0,5);
  if(!terms.length) return "";
  var params=new URLSearchParams();
  params.set("date", range==="5y"?"today 5-y":"today 12-m");
  var geo=$("#bizLinkGeo").value;
  if(geo) params.set("geo", geo);
  params.set("hl","th");
  params.set("q", terms.join(","));
  return "https://trends.google.com/trends/explore?"+params.toString();
}
function renderBaskets(){
  var box=$("#bizBaskets"); box.innerHTML="";
  RAW.keyword_baskets.forEach(function(b){
    var button=btn("basket"+(b.id===basketId?" on":""), b.id+" · "+b.terms.length);
    button.dataset.basket=b.id;
    button.addEventListener("click", function(){
      basketId=b.id; picked=b.terms.slice();
      $("#bizTermMsg").textContent="";
      renderBaskets(); renderPicked();
    });
    box.appendChild(button);
  });
  var note=basketBy(basketId);
  $("#bizBasketNote").textContent=note?note.note:"";
}
function renderPicked(){
  var box=$("#bizPicked"); box.innerHTML="";
  picked.forEach(function(term){
    var chip=btn("term", term+" ×");
    chip.addEventListener("click", function(){picked=picked.filter(function(t){return t!==term;}); renderPicked();});
    box.appendChild(chip);
  });
  var href=trendsHref("12m"), href5=trendsHref("5y");
  var a=$("#bizTrends"), a5=$("#bizTrends5");
  a.href=href||"#"; a5.href=href5||"#";
  a.setAttribute("aria-disabled", href?"false":"true");
  a5.setAttribute("aria-disabled", href5?"false":"true");
  $("#bizTermCount").textContent=picked.length+" / 5";
  if(basketId==="brands") $("#bizBrandWarn").hidden=false; else $("#bizBrandWarn").hidden=true;
}
function apply(){
  state.q=$("#bizQ").value;
  state.cat=$("#bizCat").value;
  state.geo=$("#bizGeo").value;
  state.ev=$("#bizEv").value;
  state.fresh=$("#bizFresh").value;
  renderList();
}
function reset(){
  state.q=""; state.cat="all"; state.geo="all"; state.ev="all"; state.fresh="all";
  $("#bizQ").value="";
  $("#bizCat").value="all"; $("#bizGeo").value="all"; $("#bizEv").value="all"; $("#bizFresh").value="all";
  renderList();
}
function setLang(lang){
  state.lang=lang==="en"?"en":"th";
  document.body.classList.toggle("lang-en", state.lang==="en");
  document.body.classList.toggle("lang-th", state.lang!=="en");
  $("#bizLangTh").setAttribute("aria-pressed", state.lang==="th"?"true":"false");
  $("#bizLangEn").setAttribute("aria-pressed", state.lang==="en"?"true":"false");
  try{localStorage.setItem(LANG_KEY, state.lang);}catch(e){}
}
function openHash(){
  var id=(location.hash||"").replace(/^#/,"");
  if(!id || !META.signals[id]) return;
  if(!document.getElementById(id)) { reset(); }
  setOpen(id, true, true);
  var node=document.getElementById(id);
  if(node) node.scrollIntoView({block:"start"});
}
function init(){
  renderFilters();
  renderThemes();
  renderSources();
  basketId="coconut";
  picked=(basketBy("coconut").terms||[]).slice();
  renderBaskets();
  renderPicked();
  var saved="th";
  try{saved=localStorage.getItem(LANG_KEY)||"th";}catch(e){}
  setLang(saved);
  $("#bizQ").addEventListener("input", apply);
  $("#bizQ").addEventListener("keydown", function(e){if(e.key==="Enter"){e.preventDefault(); apply();}});
  ["bizCat","bizGeo","bizEv","bizFresh"].forEach(function(id){$("#"+id).addEventListener("change", apply);});
  $("#bizReset").addEventListener("click", reset);
  $("#bizLangTh").addEventListener("click", function(){setLang("th");});
  $("#bizLangEn").addEventListener("click", function(){setLang("en");});
  $("#bizLinkGeo").addEventListener("change", renderPicked);
  $("#bizAdd").addEventListener("click", function(){
    var v=$("#bizTerm").value.trim();
    if(!v) return;
    if(picked.indexOf(v)>=0){$("#bizTermMsg").textContent="คำนี้ถูกเลือกแล้ว · Already selected."; return;}
    if(picked.length>=5){$("#bizTermMsg").textContent="Google Trends เปรียบเทียบได้ไม่เกิน 5 คำ · At most 5 terms."; return;}
    picked.push(v); $("#bizTerm").value=""; $("#bizTermMsg").textContent=""; renderPicked();
  });
  $("#bizTerm").addEventListener("keydown", function(e){if(e.key==="Enter"){e.preventDefault(); $("#bizAdd").click();}});
  apply();
  openHash();
  window.addEventListener("hashchange", openHash);
  var gaps=$("#gaps");
  var nulls=RAW.signals.every(function(s){return s.numeric_series==null;}) && RAW.keyword_baskets.every(function(b){return b.series==null;});
  gaps.appendChild(tx(nulls
    ? "ไม่มีชุดตัวเลขที่ดึงมาได้ในรอบ 8 พ.ย. 2569 ไม่ใช่ค่าศูนย์ และไม่มีกราฟความนิยมค้นหา ราคาหน้าฟาร์ม ยอดขายหมวด หรือ GMV · No numerical series was retrieved on 8 Nov 2026. That is not a value of zero. There is no search-popularity chart, farm-gate price, category sales series, or GMV."
    : "ข้อมูลตัวเลขไม่พร้อมตามที่ตั้งใจ · Numeric fields were not all empty."));
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
else init();
})();

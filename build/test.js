#!/usr/bin/env node
/* Rebuild, then check the static tree and (unless --static) the page in headless Chrome.
   Usage: node build/test.js [--static] */
"use strict";
const {spawn, execFileSync} = require("child_process");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const STATIC = process.argv.includes("--static");
const ART = process.env.MALEE_ARTIFACTS || "/opt/cursor/artifacts";
let failed = 0;
function check(cond, msg){
  if(!cond){console.error("FAIL " + msg); failed++;}
  else console.log("ok   " + msg);
}
function sleep(ms){return new Promise(r=>setTimeout(r, ms));}
function get(url){
  return new Promise((resolve, reject)=>{
    http.get(url, res=>{
      const chunks=[];
      res.on("data", c=>chunks.push(c));
      res.on("end", ()=>resolve({status:res.statusCode, headers:res.headers, body:Buffer.concat(chunks)}));
    }).on("error", reject);
  });
}

function staticChecks(){
  for(const f of ["src/data.js","src/gen.js","src/archive.js","src/app.js","src/biz.js","src/biz-meta.js","src/biz-data.js","build/test.js"]){
    execFileSync("node", ["--check", f], {cwd:ROOT, stdio:"inherit"});
  }
  check(true, "node --check on source");
  const data = fs.readFileSync(path.join(ROOT,"src/data.js"), "utf8");
  const index = fs.readFileSync(path.join(ROOT,"index.html"), "utf8");
  const offline = fs.readFileSync(path.join(ROOT,"dashboard-offline.html"), "utf8");
  const archive = fs.readFileSync(path.join(ROOT,"src/archive.js"), "utf8");
  for(const s of ["9–15 Nov 2026","9–15 พ.ย. 2569","2026-11-09","2026-11-24","2026-11-25","checked:\"8 Nov 2026 ICT\"","code:\"N1\"","code:\"N7\""]){
    check(data.includes(s), "data.js contains "+s);
  }
  for(const s of ["37,000","~37k","Weeknd","ฮาโลวีน","Halloween","กินเจ","เงินเดือนออก","ngrok","localhost","flask"]){
    check(!data.includes(s), "current data.js omits "+s);
  }
  check(!archive.includes("Weeknd") && !archive.includes("37,000"), "archive drops retired popularity and artist lines");
  check(archive.includes("archive:1") && archive.includes("2026-10-12"), "archive keeps original October dates");
  check(index.includes('href="src/style.css"'), "index links relative css");
  check(index.includes('src="src/data.js"') && index.includes('src="src/app.js"') && index.includes('src="vendor/xlsx.full.min.js"')===false, "index loads relative scripts and does not preload SheetJS");
  check(!/<script\s+src="\//.test(index) && !/<link[^>]+href="\//.test(index), "index has no root-absolute assets");
  check(!/https?:\/\/[^"']+\.(css|js)/.test(index), "index has no remote css or js");
  check(offline.includes("/*! xlsx.js (C) 2013-present SheetJS"), "offline embeds SheetJS");
  check(!/<script\s+src=/.test(offline) && !/<link\s+rel="stylesheet"\s+href=/.test(offline), "offline has no external stylesheet or script");
  check(offline.includes("9–15 Nov 2026") && offline.includes("EXAMPLE"), "offline carries the refreshed copy and EXAMPLE label");
  const tree = ["index.html","dashboard-offline.html","src/data.js","src/app.js","src/page.html","README.md"];
  const bad = /ngrok|localhost|127\.0\.0\.1|flask|x-access-token|BEGIN (RSA |OPENSSH )?PRIVATE|api[_-]?key\s*[:=]/i;
  for(const f of tree){
    const text = fs.readFileSync(path.join(ROOT,f), "utf8");
    check(!bad.test(text), "no private or old-host marker in "+f);
  }
  const example = fs.readFileSync(path.join(ROOT,"data/social_posts_EXAMPLE.csv"), "utf8").split(/\r?\n/).filter(Boolean);
  check(example.slice(1).every(r=>/EXAMPLE/.test(r)), "every EXAMPLE csv row says EXAMPLE");
  const xlsx = fs.readFileSync(path.join(ROOT,"templates/social_posts_template.xlsx"));
  check(xlsx.slice(0,2).toString()==="PK", "xlsx template is a zip");
  check(fs.existsSync(path.join(ROOT,".nojekyll")), ".nojekyll is present");
  check(fs.existsSync(path.join(ROOT,".github/workflows/pages.yml")), "Pages workflow is present");
  const page = fs.readFileSync(path.join(ROOT,"src/page.html"), "utf8");
  const themesAt = page.indexOf('id="themes"');
  const easyAt = page.indexOf('id="easy"');
  check(themesAt>0 && easyAt>themesAt && page.slice(themesAt, easyAt).indexOf("<section")===page.slice(themesAt, easyAt).lastIndexOf("<section"), "themes section sits directly above easy posts");
  const trends = fs.readFileSync(path.join(ROOT,"business-trends.html"), "utf8");
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT,"business/trends.json"), "utf8"));
  check(raw.signals.length===15 && Object.keys(raw.sources).length===10 && raw.keyword_baskets.length===8, "15 watchpoints, 10 sources, 8 baskets");
  check(raw.signals.every(s=>s.numeric_series==null) && raw.keyword_baskets.every(b=>b.series==null), "no numeric series in the snapshot");
  check(index.includes('href="business-trends.html"') && offline.includes('href="business-trends-offline.html"'), "social pages link to the radar");
  check(trends.includes('href="src/biz.css"') && trends.includes('src="src/biz.js"') && trends.includes("เปิดใน Google Trends / Open in Google Trends"), "trends page is relative and names the external link");
  check(!/sparkline|heatmap|gauge|\/100/.test(trends) && !trends.includes("numeric_series\":"), "trends page does not ship a score chart");
  const dated = ["business-trends.html","src/biz-meta.js","src/biz-data.js"].map(f=>fs.readFileSync(path.join(ROOT,f),"utf8")).join("\n");
  const future = (dated.match(/20\d\d-\d\d-\d\d/g)||[]).filter(d=>d>"2026-11-08");
  check(future.length===0, "no ISO date after the 8 Nov check: "+[...new Set(future)].join(","));
}

function mime(p){
  if(p.endsWith(".html"))return "text/html; charset=utf-8";
  if(p.endsWith(".js"))return "text/javascript; charset=utf-8";
  if(p.endsWith(".css"))return "text/css; charset=utf-8";
  if(p.endsWith(".csv"))return "text/csv; charset=utf-8";
  if(p.endsWith(".xlsx"))return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if(p.endsWith(".txt"))return "text/plain; charset=utf-8";
  return "application/octet-stream";
}
function startServer(dir){
  const srv = http.createServer((req, res)=>{
    const url = decodeURIComponent(req.url.split("?")[0]);
    let rel = path.normalize(url).replace(/^(\.\.[/\\])+/, "");
    let file = path.join(dir, rel);
    if(!file.startsWith(dir)){res.writeHead(403); res.end("no"); return;}
    if(fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (err, buf)=>{
      if(err){res.writeHead(404); res.end("missing"); return;}
      res.writeHead(200, {"Content-Type":mime(file), "Cache-Control":"no-store"});
      res.end(buf);
    });
  });
  return new Promise(resolve=>{
    srv.listen(0, "127.0.0.1", ()=>resolve(srv));
  });
}

class CDP {
  constructor(wsUrl){
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Set();
    this.ready = new Promise((res, rej)=>{
      this.ws.addEventListener("open", ()=>res());
      this.ws.addEventListener("error", rej);
    });
    this.ws.addEventListener("message", ev=>{
      const msg = JSON.parse(ev.data);
      if(msg.id && this.pending.has(msg.id)){
        const p = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        clearTimeout(p.timer);
        if(msg.error) p.reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else p.resolve(msg.result || {});
      } else if(msg.method){
        for(const fn of this.listeners) fn(msg);
      }
    });
  }
  on(fn){this.listeners.add(fn); return fn;}
  off(fn){this.listeners.delete(fn);}
  send(method, params, sessionId){
    return this.ready.then(()=>new Promise((resolve, reject)=>{
      const id = ++this.id;
      const timer = setTimeout(()=>{this.pending.delete(id); reject(new Error("timeout "+method));}, 20000);
      this.pending.set(id, {resolve, reject, timer});
      const payload = {id, method, params: params||{}};
      if(sessionId) payload.sessionId = sessionId;
      this.ws.send(JSON.stringify(payload));
    }));
  }
  close(){try{this.ws.close();}catch(e){}}
}

async function launchChrome(){
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "malee-chrome-"));
  const chrome = process.env.CHROME_PATH || ["/usr/local/bin/google-chrome","/usr/bin/google-chrome","/usr/bin/chromium"].find(p=>fs.existsSync(p));
  if(!chrome) throw new Error("chrome not found");
  const proc = spawn(chrome, [
    "--headless=new","--disable-gpu","--no-sandbox","--disable-dev-shm-usage",
    "--remote-debugging-port=0","--user-data-dir="+dir,"--no-first-run","--disable-extensions","about:blank"
  ], {stdio:["ignore","pipe","pipe"]});
  let log = "";
  const port = await new Promise((resolve, reject)=>{
    const timer = setTimeout(()=>reject(new Error("chrome did not announce a port\n"+log)), 15000);
    const take = d=>{
      log += d.toString();
      const m = log.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
      if(m){clearTimeout(timer); resolve(m[1]);}
    };
    proc.stderr.on("data", take);
    proc.stdout.on("data", take);
    proc.on("exit", code=>{if(!log.includes("DevTools")) reject(new Error("chrome exited "+code+"\n"+log));});
  });
  const version = JSON.parse((await get("http://127.0.0.1:"+port+"/json/version")).body.toString());
  const cdp = new CDP(version.webSocketDebuggerUrl);
  await cdp.ready;
  return {proc, dir, cdp, port};
}

async function newPage(cdp, url){
  const created = await cdp.send("Target.createTarget", {url:"about:blank"});
  const attached = await cdp.send("Target.attachToTarget", {targetId:created.targetId, flatten:true});
  const sessionId = attached.sessionId;
  const reqs = [];
  cdp.on(msg=>{
    if(msg.sessionId!==sessionId) return;
    if(msg.method==="Network.requestWillBeSent") reqs.push(msg.params.request.url);
    if(msg.method==="Page.javascriptDialogOpening"){
      cdp.send("Page.handleJavaScriptDialog", {accept:true}, sessionId).catch(()=>{});
    }
  });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Network.enable", {}, sessionId);
  async function ev(expression){
    const r = await cdp.send("Runtime.evaluate", {expression, returnByValue:true, awaitPromise:true}, sessionId);
    if(r.exceptionDetails){
      const d = r.exceptionDetails;
      throw new Error((d.exception && d.exception.description) || d.text || "evaluate failed");
    }
    return r.result ? r.result.value : undefined;
  }
  async function open(next){
    const loaded = new Promise((resolve, reject)=>{
      const timer = setTimeout(()=>reject(new Error("load timeout "+next)), 20000);
      const fn = cdp.on(msg=>{
        if(msg.sessionId===sessionId && msg.method==="Page.loadEventFired"){
          clearTimeout(timer); cdp.off(fn); resolve();
        }
      });
    });
    await cdp.send("Page.navigate", {url:next}, sessionId);
    await loaded;
    await ev("document.fonts ? document.fonts.ready : true");
  }
  async function shot(file){
    const r = await cdp.send("Page.captureScreenshot", {format:"png"}, sessionId);
    fs.mkdirSync(path.dirname(file), {recursive:true});
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
    console.log("shot "+file);
  }
  async function shotClip(file, width, height){
    const r = await cdp.send("Page.captureScreenshot", {format:"png", captureBeyondViewport:true, clip:{x:0,y:0,width:width,height:height,scale:1}}, sessionId);
    fs.mkdirSync(path.dirname(file), {recursive:true});
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
    console.log("shot "+file);
  }
  return {sessionId, reqs, ev, open, shot, shotClip, cdp};
}

async function browserChecks(){
  execFileSync("python3", [path.join(ROOT,"build/gen_template.py")], {stdio:"inherit"});
  execFileSync("python3", [path.join(ROOT,"build/build.py")], {stdio:"inherit"});
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), "malee-http-"));
  fs.symlinkSync(ROOT, path.join(parent, "malee-social-ideas"));
  const srv = await startServer(parent);
  const port = srv.address().port;
  const base = "http://127.0.0.1:"+port+"/malee-social-ideas/";
  const xlsx = await get(base+"templates/social_posts_template.xlsx");
  const csv = await get(base+"templates/social_posts_template.csv");
  check(xlsx.status===200 && xlsx.body.slice(0,2).toString()==="PK", "project path serves the xlsx template");
  check(csv.status===200 && csv.body.toString("utf8").includes("date,platform,format"), "project path serves the csv template");
  const css = await get(base+"src/style.css");
  check(css.status===200 && css.body.toString("utf8").includes("--brand"), "project path serves css");

  const chrome = await launchChrome();
  try {
    const page = await newPage(chrome.cdp, base);
    await page.cdp.send("Emulation.setDeviceMetricsOverride", {width:1280, height:900, deviceScaleFactor:1, mobile:false}, page.sessionId);
    await page.open(base);
    await page.ev("localStorage.clear()");
    await page.open(base);
    const assets = await page.ev(`[...document.querySelectorAll('link[rel=stylesheet],script[src]')].map(el=>el.getAttribute('href')||el.getAttribute('src'))`);
    check(assets.length>=4 && assets.every(u=>u && !/^(\/|https?:)/.test(u)), "dom asset paths are project-relative: "+assets.join(", "));
    const reqs = page.reqs.filter(u=>!u.startsWith("data:") && !u.includes("favicon") && !u.startsWith("chrome"));
    check(reqs.every(u=>u.startsWith(base) || u===base.replace(/\/$/,"")), "page requests stay on the project path\n  "+reqs.join("\n  "));
    check(await page.ev(`document.querySelector("#themes").nextElementSibling.id==="easy"`), "themes element is directly above easy");
    check((await page.ev(`document.querySelector("#themeWeek").textContent`)).includes("9–15 พ.ย. 2569"), "theme week is 9–15 Nov");
    check((await page.ev(`document.querySelector("#latestDate").textContent`)).includes("8 Nov 2026"), "latest stamp is 8 Nov 2026");
    check((await page.ev(`document.querySelector("#notChasing").innerText`)).includes("NESCAFERUNKHONKAEN2026"), "not-chasing note names the X snapshot");
    check(/nothing here is a popularity|not a popularity score/i.test(await page.ev(`document.querySelector("#latest").innerText`)), "latest intro refuses a popularity score");
    const banned = await page.ev(`["#themes","#easy","#calendar","#ideas","#latest"].map(s=>document.querySelector(s).innerText).join("\\n")`);
    for(const word of ["กินเจ","37,000","ฮาโลวีน","Halloween","Weeknd","เงินเดือนออก","Veterans Day","Thanksgiving"]){
      check(!banned.includes(word), "current sections omit "+word);
    }
    check(await page.ev(`document.querySelectorAll("#calendar .cell").length===21`), "calendar has 3 weeks of cells");
    check((await page.ev(`document.querySelector("#calendar .cell .dn").innerText`)).trim().startsWith("9"), "calendar opens on 9 Nov");
    check((await page.ev(`[...document.querySelectorAll("#calendar .cell")].at(-1).innerText`)).includes("29"), "calendar ends on 29 Nov");
    check((await page.ev(`document.querySelector("#calendar").innerText`)).includes("ลอยกระทง"), "calendar names Loy Krathong");
    const easyIds = await page.ev(`[...document.querySelectorAll("#easyCards .ecard")].map(el=>el.dataset.id)`);
    check(JSON.stringify(easyIds)===JSON.stringify(["1","2","3"]), "easy posts are N1 N2 N3, got "+easyIds);
    const hrefs = await page.ev(`[...document.querySelectorAll("#themeGrid a")].map(a=>a.getAttribute("href"))`);
    check(hrefs.length>=4, "themes link at least four idea cards ("+hrefs+")");
    for(const h of hrefs) check(await page.ev(`!!document.getElementById(${JSON.stringify(h.slice(1))})`), "theme link exists "+h);
    check((await page.ev(`document.querySelector("#dataBadge").textContent`)).includes("EXAMPLE"), "results badge says EXAMPLE");
    check(await page.ev(`!!document.querySelector("#perf .panel.exm")`), "result panels carry the EXAMPLE mark");
    check(await page.ev(`document.fonts.check('16px "Noto Sans Thai"')`), "Noto Sans Thai can draw the page");
    check((await page.ev(`document.body.innerText`)).includes("น้ำมะพร้าว"), "Thai product copy is on the page");

    async function setQuery(q){
      await page.ev(`(()=>{const el=document.querySelector("#q"); el.value=${JSON.stringify(q)}; el.dispatchEvent(new Event("input",{bubbles:true})); return true})()`);
      await page.ev("new Promise(r=>setTimeout(r,350))");
    }
    async function matchCount(){
      const t = await page.ev(`document.querySelector("#qStatus").innerText`);
      const m = t.match(/(\d+) ideas match/);
      return m?+m[1]:-1;
    }
    await setQuery("มะพร้าว");
    const thCount = await matchCount();
    await setQuery("coconut");
    const enCount = await matchCount();
    check(thCount>0 && thCount===enCount, "มะพร้าว and coconut match the same count ("+thCount+" / "+enCount+")");
    await page.ev(`document.querySelector('[data-p="TT"]').click()`);
    await page.ev("new Promise(r=>setTimeout(r,50))");
    const ttCount = await matchCount();
    check(ttCount>0 && ttCount<thCount, "TikTok filter narrows the coconut matches ("+ttCount+" < "+thCount+")");
    check((await page.ev(`document.querySelector("#qStatus").innerText`)).includes("platform/pillar filter"), "status says the filter is included");
    const cardsOk = await page.ev(`[...document.querySelectorAll("#ideaGrid .card")].every(card=>card.innerText.includes("TikTok"))`);
    check(cardsOk, "filtered board cards are TikTok cards");
    await page.ev(`document.querySelector('[data-p="all"]').click(); document.querySelector('[data-l="all"]').click();`);

    await setQuery("มะพร้าว");
    await page.ev(`document.querySelector("#q").dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}))`);
    const genN = await page.ev(`document.querySelectorAll("#genGrid .card").length`);
    check(genN>=3 && genN<=6, "Enter generates 3–6 cards ("+genN+")");
    const seed1 = await page.ev(`document.querySelector("#genHead").dataset.seed`);
    await page.ev(`document.querySelector("#qShuffle").click()`);
    const seed2 = await page.ev(`document.querySelector("#genHead").dataset.seed`);
    check(seed1 && seed1!==seed2, "shuffle changes the template seed");
    check((await page.ev(`document.querySelector("#genHead").innerText`)).includes("no AI service"), "generator says it is templates, not an API");

    const overflow = async ()=>page.ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
    let box = await overflow();
    check(box.sw<=box.cw+1, "desktop has no page overflow "+box.sw+"/"+box.cw);
    if(failed===0){
      await page.shot(path.join(ART, "malee_desktop_idea_box_nov8.png"));
      await page.ev(`document.querySelector("#themes").scrollIntoView({block:"start"})`);
      await page.ev("new Promise(r=>setTimeout(r,200))");
      await page.shot(path.join(ART, "malee_desktop_themes_easy_nov8.png"));
    }
    await page.cdp.send("Emulation.setDeviceMetricsOverride", {width:375, height:812, deviceScaleFactor:2, mobile:true}, page.sessionId);
    await page.ev("new Promise(r=>setTimeout(r,200))");
    await page.ev(`window.scrollTo(0,0)`);
    box = await overflow();
    check(box.sw<=box.cw+1, "375px has no page overflow "+box.sw+"/"+box.cw);
    if(failed===0){
      await page.shot(path.join(ART, "malee_mobile_375_nov8.png"));
      await page.ev(`document.querySelector("#themes").scrollIntoView({block:"start"})`);
      await page.ev("new Promise(r=>setTimeout(r,200))");
      await page.shot(path.join(ART, "malee_mobile_themes_375_nov8.png"));
      await page.ev(`window.scrollTo(0,0)`);
    }
    await page.cdp.send("Emulation.setDeviceMetricsOverride", {width:1280, height:900, deviceScaleFactor:1, mobile:false}, page.sessionId);

    await page.ev(`document.querySelector("#qClear").click()`);
    check(await page.ev(`document.querySelector("#q").value==="" && document.querySelectorAll("#genGrid .card").length===0`), "clear empties the query and the generated cards");
    await setQuery("zzzzqqqq");
    check((await page.ev(`document.querySelector("#ideaGrid").innerText`)).includes("No ideas match"), "unknown query shows the empty state");

    await page.ev(`document.querySelector("#qClear").click()`);
    await setQuery("coconut");
    await page.ev(`document.querySelector("#qGen").click()`);
    await page.ev(`document.querySelector("#genGrid [data-save]").click()`);
    check(await page.ev(`JSON.parse(localStorage.getItem("malee-social-saved-v1")||"[]").length===1`), "save writes localStorage");
    await page.open(base);
    check(await page.ev(`document.querySelector("#q").value==="coconut"`), "the query is remembered after reload");
    check(await page.ev(`JSON.parse(localStorage.getItem("malee-social-saved-v1")||"[]").length===1`), "the saved card survives reload");
    await page.ev(`(()=>{const orig=URL.createObjectURL; URL.createObjectURL=function(b){window.__blob=b; return orig.call(URL,b)}; return true})()`);
    await page.ev(`document.querySelector("#savedCsv").click()`);
    const csvText = await page.ev(`window.__blob ? window.__blob.text() : ""`);
    const csvBom = await page.ev(`window.__blob ? new Promise(res=>{const r=new FileReader(); r.onload=()=>{const u=new Uint8Array(r.result); res(u[0]+","+u[1]+","+u[2])}; r.readAsArrayBuffer(window.__blob)}) : ""`);
    check(csvBom==="239,187,191" && csvText.includes("suggested_ict_slot") && csvText.includes("coconut"), "saved CSV has a UTF-8 BOM, the slot column, and the query");
    await page.ev(`document.querySelector("[data-del]").click()`);
    await page.ev("new Promise(r=>setTimeout(r,100))");
    check(await page.ev(`JSON.parse(localStorage.getItem("malee-social-saved-v1")||"[]").length===0`), "delete removes the saved card");

    await page.ev(`document.querySelector("#qClear").click()`);
    await setQuery("detox");
    await page.ev(`document.querySelector("#qGen").click()`);
    const detox = await page.ev(`(()=>{const note=document.querySelector("#qNotice").innerText; const caps=[...document.querySelectorAll("#genGrid .cap, #genGrid .h, #genGrid .he")].map(n=>n.innerText).join("\\n"); const flags=[...document.querySelectorAll("#genGrid .card")].every(c=>c.innerText.includes("Legal")); return {note, caps, flags, n:document.querySelectorAll("#genGrid .card").length}})()`);
    check(detox.n>=3 && detox.flags && /Legal/.test(detox.note) && /อย/.test(detox.note) && !/detox/i.test(detox.caps), "detox raises the Legal (อย.) flag and stays out of the new captions");
    await page.ev(`document.querySelector("#qClear").click()`);
    await setQuery("รักษา");
    await page.ev(`document.querySelector("#qGen").click()`);
    const cure = await page.ev(`(()=>{const note=document.querySelector("#qNotice").innerText; const caps=[...document.querySelectorAll("#genGrid .cap, #genGrid .h, #genGrid .he")].map(n=>n.innerText).join("\\n"); return /Legal/.test(note) && !caps.includes("รักษา")})()`);
    check(cure, "รักษา raises Legal and stays out of the new captions");

    await page.ev(`(()=>{const orig=URL.createObjectURL; URL.createObjectURL=function(b){window.__tpl=b; return orig.call(URL,b)}; return true})()`);
    await page.ev(`document.querySelector("#dlTplC").click()`);
    const tpl = await page.ev(`window.__tpl.text()`);
    check(tpl.includes("date,platform,format,pillar"), "template csv download has the header");
    await page.ev(`document.querySelector("#dlTplX").click()`);
    const xHead = await page.ev(`new Promise(res=>{const r=new FileReader(); r.onload=()=>res(new Uint8Array(r.result).slice(0,2).join(",")); r.readAsArrayBuffer(window.__tpl)})`);
    check(xHead==="80,75", "template xlsx download starts with PK");

    const off = await newPage(chrome.cdp, "about:blank");
    await off.cdp.send("Network.emulateNetworkConditions", {offline:true, latency:0, downloadThroughput:0, uploadThroughput:0}, off.sessionId);
    const fileUrl = "file://"+path.join(ROOT, "dashboard-offline.html");
    await off.open(fileUrl);
    check(await off.ev(`!!window.XLSX && document.body.innerText.includes("9–15 พ.ย. 2569") && document.querySelector("#dataBadge").textContent.includes("EXAMPLE")`), "offline file works with the network disabled");
    const offReqs = off.reqs.filter(u=>/^https?:/.test(u));
    check(offReqs.length===0, "offline file made no http requests, saw "+offReqs.length);
    check(await page.ev(`!!document.querySelector('a[href="business-trends.html"]')`), "social page links to the radar");
    const socialKeys = await page.ev(`JSON.stringify(Object.keys(localStorage).filter(k=>k.indexOf("malee-social-")===0).sort())`);
    await trendsChecks(chrome, base);
    const socialKeysAfter = await page.ev(`JSON.stringify(Object.keys(localStorage).filter(k=>k.indexOf("malee-social-")===0).sort())`);
    check(socialKeys===socialKeysAfter, "opening the radar does not change social localStorage keys");
  } finally {
    chrome.cdp.close();
    chrome.proc.kill("SIGKILL");
    srv.close();
    fs.rmSync(parent, {recursive:true, force:true});
    fs.rmSync(chrome.dir, {recursive:true, force:true});
  }
}

async function trendsChecks(chrome, base){
  const page = await newPage(chrome.cdp, "about:blank");
  await page.cdp.send("Emulation.setDeviceMetricsOverride", {width:1280, height:900, deviceScaleFactor:1, mobile:false}, page.sessionId);
  await page.open(base+"business-trends.html");
  const reqs = page.reqs.filter(u=>/^https?:/.test(u) && !u.includes("favicon"));
  check(reqs.every(u=>u.startsWith(base)), "radar requests stay on the project path");
  check(!reqs.some(u=>/google|gstatic/.test(u)), "radar does not call Google while loading");
  const assets = await page.ev(`[...document.querySelectorAll('link[rel=stylesheet],script[src]')].map(el=>el.getAttribute('href')||el.getAttribute('src'))`);
  check(assets.length>=4 && assets.every(u=>u && !u.startsWith("/") && !/^https?:/.test(u)), "radar assets are project-relative: "+assets.join(", "));
  check(await page.ev(`document.querySelectorAll("#bizList article").length===15`), "15 cards render");
  check(await page.ev(`document.querySelector("#homeLink").getAttribute("href")==="index.html"`), "radar links back to Social Ideas");
  check(await page.ev(`document.body.innerText.includes("not a value of zero")`), "missing series is not called zero");
  check(await page.ev(`document.querySelectorAll("svg").length===0`), "radar has no svg chart");
  check(await page.ev(`!/\\b\\d{1,3}\\/100\\b/.test(document.body.innerText)`), "radar has no n/100 score");
  async function count(){
    const t = await page.ev(`document.querySelector("#bizCount").textContent`);
    const m = String(t).match(/^(\d+) of/);
    return m?+m[1]:-1;
  }
  check(await count()===15, "default count is 15");
  async function search(q){
    await page.ev(`(()=>{const el=document.querySelector("#bizQ"); el.value=${JSON.stringify(q)}; el.dispatchEvent(new Event("input",{bubbles:true})); return true})()`);
  }
  await search("มะพร้าว");
  const th = await count();
  await search("coconut");
  const enC = await count();
  check(th>0 && th===enC && await page.ev(`!!document.getElementById("coconut-harvest")`), "มะพร้าว and coconut match the same cards ("+th+")");
  await page.ev(`document.querySelector("#bizReset").click()`);
  await search("นม");
  const milk = await count();
  await search("dairy");
  check(milk>0 && milk===await count(), "นม and dairy match the same cards ("+milk+")");
  await page.ev(`document.querySelector("#bizReset").click()`);
  await search("CMG");
  check(await count()>0 && await page.ev(`!!document.getElementById("cmg-dairy-coffee")`), "CMG search finds the CMG card");
  await page.ev(`document.querySelector("#bizReset").click()`);
  await search("ฉลาก");
  check(await count()>0 && await page.ev(`!!document.getElementById("label-update")`), "ฉลาก search finds the label card");
  await page.ev(`document.querySelector("#bizReset").click()`);
  await page.ev(`document.querySelector("#bizCat").value="regulation"; document.querySelector("#bizCat").dispatchEvent(new Event("change",{bubbles:true}))`);
  await page.ev(`document.querySelector("#bizFresh").value="recent"; document.querySelector("#bizFresh").dispatchEvent(new Event("change",{bubbles:true}))`);
  check(await count()===1 && await page.ev(`!!document.getElementById("label-update") && !document.getElementById("sealed-beverage")`), "regulation plus current window keeps only the label rule");
  const held = await count();
  await page.ev(`document.querySelector("#bizLangEn").click()`);
  check(await page.ev(`document.body.classList.contains("lang-en") && document.querySelector("#bizCat").value==="regulation" && document.querySelector("#bizFresh").value==="recent"`), "English toggle keeps the filters");
  check(await count()===held, "English toggle keeps the count");
  await page.ev(`document.querySelector("#bizLangTh").click()`);
  await page.ev(`document.querySelector("#bizQ").dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true,cancelable:true}))`);
  await page.ev(`(()=>{const el=document.querySelector("#bizQ"); el.value="zzzz-no-match"; el.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true})); return true})()`);
  check(await count()===0, "Enter applies a query that matches nothing");
  await page.ev(`document.querySelector("#bizReset").click()`);
  check(await count()===15 && await page.ev(`document.querySelector("#bizQ").value===""`), "reset restores all 15");
  await page.ev(`(()=>{const b=document.querySelector('[data-toggle="sugar-input"]'); b.focus(); b.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true,cancelable:true})); return b.getAttribute("aria-expanded");})()`);
  check(await page.ev(`document.querySelector('[data-toggle="sugar-input"]').getAttribute("aria-expanded")==="true"`), "Enter on the card button expands it");
  await page.ev(`document.querySelector('[data-toggle="sugar-input"]').dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true,cancelable:true}))`);
  check(await page.ev(`document.querySelector("#p-sugar-input").hidden===true`), "Enter closes the card again");
  await page.ev(`location.hash="#label-update"`);
  await page.ev("new Promise(r=>setTimeout(r,50))");
  check(await page.ev(`document.querySelector("#p-label-update").hidden===false`), "hash opens the label card");
  await page.ev(`document.querySelector('[data-basket="coconut"]').click()`);
  const href = await page.ev(`document.querySelector("#bizTrends").getAttribute("href")`);
  const parsed = new URL(href, base);
  const terms = parsed.searchParams.get("q").split(",");
  check(parsed.hostname==="trends.google.com" && parsed.searchParams.get("geo")==="TH" && parsed.searchParams.get("date")==="today 12-m", "12-month Thailand trends link");
  check(terms.length===4 && terms[0]==="น้ำมะพร้าว" && terms.includes("coconut water"), "trends terms stay distinct ("+terms.join(" | ")+")");
  check(href.includes(encodeURIComponent("น้ำมะพร้าว")), "Thai term is percent-encoded");
  const href5 = await page.ev(`document.querySelector("#bizTrends5").getAttribute("href")`);
  check(new URL(href5, base).searchParams.get("date")==="today 5-y", "five-year link uses a different date");
  await page.ev(`document.querySelector('[data-basket="brands"]').click()`);
  check(await page.ev(`new URL(document.querySelector("#bizTrends").href).searchParams.get("q").split(",").length===5`), "brands basket stops at 5 terms");
  await page.ev(`document.querySelector("#bizTerm").value="extra term"; document.querySelector("#bizAdd").click()`);
  check(await page.ev(`new URL(document.querySelector("#bizTrends").href).searchParams.get("q").split(",").length===5 && /5/.test(document.querySelector("#bizTermMsg").textContent)`), "a sixth term is refused");
  const badHosts = await page.ev(`(()=>{const allow=["www.dit.go.th","www.nationthailand.com","www.maleegroup.com","food.fda.moph.go.th","www.fao.org","www.sappe.com","www.petnology.com","www.fruitnet.com","www.krungsri.com","www.ktc.co.th","trends.google.com"]; const bad=[]; document.querySelectorAll("a[href]").forEach(a=>{let u; try{u=new URL(a.href);}catch(e){bad.push(a.getAttribute("href")); return;} if(u.host===location.host) return; if(allow.indexOf(u.host)<0) bad.push(u.host);}); return bad;})()`);
  check(!badHosts.length, "links stay on the source allowlist or this site: "+badHosts.join(", "));
  check(await page.ev(`document.querySelectorAll("#bizSources tr").length===10`), "source register has 10 rows");
  check(await page.ev(`[...document.querySelectorAll("#bizSources td")].some(td=>td.textContent.includes("not established"))`), "unknown publication dates stay unknown");
  check(await page.ev(`document.body.innerText.includes("shared by")`), "shared sources are labelled on the cards");
  check(await page.ev(`[...document.querySelectorAll("article.bcard")].every(card=>card.querySelector(".fact")&&card.querySelector(".opinion")&&card.textContent.includes("Checked"))`), "every card separates fact, opinion and the check date");
  check(await page.ev(`(()=>{const h=document.querySelector("#h-label-update"); return h.textContent.includes("ฉลากอาหาร") && h.innerHTML.indexOf("<script")<0;})()`), "titles render as text");
  let box = await page.ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
  check(box.sw<=box.cw+1, "radar desktop has no page overflow "+box.sw+"/"+box.cw);
  if(failed===0){
    await page.ev(`document.querySelector('[data-toggle="1111-channel"]').click()`);
    await page.ev(`window.scrollTo(0,0)`);
    await page.shotClip(path.join(ART,"malee_biz_desktop_nov8.png"), 1280, 2100);
  }
  await page.cdp.send("Emulation.setDeviceMetricsOverride", {width:375, height:812, deviceScaleFactor:2, mobile:true}, page.sessionId);
  await page.ev("new Promise(r=>setTimeout(r,250))");
  box = await page.ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
  check(box.sw<=box.cw+1, "radar 375px has no page overflow "+box.sw+"/"+box.cw);
  if(failed===0){
    await page.ev(`window.scrollTo(0,0)`);
    await page.shotClip(path.join(ART,"malee_biz_mobile_375_nov8.png"), 375, 2400);
  }
  const off = await newPage(chrome.cdp, "about:blank");
  await off.cdp.send("Network.emulateNetworkConditions", {offline:true, latency:0, downloadThroughput:0, uploadThroughput:0}, off.sessionId);
  await off.open("file://"+path.join(ROOT,"business-trends-offline.html"));
  check(await off.ev(`document.querySelectorAll("#bizList article").length===15 && document.querySelector("#homeLink").getAttribute("href")==="dashboard-offline.html"`), "offline radar renders with the network disabled");
  check(off.reqs.filter(u=>/^https?:/.test(u)).length===0, "offline radar made no http requests");
}

(async function main(){
  execFileSync("python3", [path.join(ROOT,"build/build.py")], {stdio:"inherit"});
  staticChecks();
  if(!STATIC){
    try { await browserChecks(); }
    catch(err){ console.error("FAIL browser runner"); console.error(err); failed++; }
  }
  if(failed){ console.error(failed+" check(s) failed"); process.exit(1); }
  console.log("all checks passed");
})();

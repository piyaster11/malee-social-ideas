/* Offline idea engine data: synonym groups (search + generation) and caption templates. No external AI. */
SI.GEN = {};
/* type: prod (a Malee product) | ctx (a moment/theme). also = merge another group's words when searching. excl = strings to ignore when matching (e.g. ขนม contains นม). */
SI.GEN.groups = [
 {k:"coco",type:"prod",terms:["มาลีโคโค่","น้ำมะพร้าว","มะพร้าว","โคโค่","malee coco","coconut water","coconut","coco"],
  pf:"มาลีโคโค่ น้ำมะพร้าว",PF:"Malee Coco coconut water",p:"น้ำมะพร้าว",P:"coconut water",pe:"🥥",tags:"#มาลีโคโค่ #MaleeCoco #น้ำมะพร้าว",th:"น้ำมะพร้าว",en:"coconut water",
  def:{k:"def",th:"บ่ายร้อนๆ",en:"a hot afternoon",e:"☀️",s:"โต๊ะทำงานริมหน้าต่าง",S:"a desk by the window",tags:"#บ่ายร้อนๆ",t:"L"}},
 {k:"juice",type:"prod",terms:["น้ำผลไม้","น้ำส้ม","น้ำองุ่น","น้ำแอปเปิ้ล","juice","orange","grape","apple","100%"],
  pf:"มาลี น้ำผลไม้ 100%",PF:"Malee 100% juice",p:"น้ำผลไม้ 100%",P:"100% juice",pe:"🧃",tags:"#น้ำผลไม้ #มาลีน้ำผลไม้",th:"น้ำผลไม้",en:"juice",
  def:{k:"def",th:"มื้อเช้า",en:"breakfast",e:"🌅",s:"โต๊ะอาหารเช้า",S:"a breakfast table",tags:"#มื้อเช้า",t:"L"}},
 {k:"milk",type:"prod",terms:["นมยูเอชที","นมจืด","นม","milk","dairy","uht","latte","ลาเต้"],excl:["ขนม","นมพืช","นมจากพืช"],
  pf:"มาลี นม UHT",PF:"Malee UHT milk",p:"นม UHT",P:"UHT milk",pe:"🥛",tags:"#นม #มาลี",th:"นม",en:"milk",
  def:{k:"def",th:"ก่อนนอน",en:"bedtime",e:"🌙",s:"มุมห้องนั่งเล่นแสงอุ่น",S:"a warm-lit living room corner",tags:"#ก่อนนอน",t:"E"}},
 {k:"plant",type:"prod",also:["jay"],terms:["เครื่องดื่มจากพืช","นมจากพืช","นมพืช","แพลนต์เบส","จากพืช","วีแกน","โอ๊ต","อัลมอนด์","ถั่วเหลือง","plant-based","plant based","plant","vegan","oat","almond","soy"],
  pf:"มาลี เครื่องดื่มจากพืช",PF:"Malee plant-based drink",p:"เครื่องดื่มจากพืช",P:"plant-based drink",pe:"🌱",tags:"#แพลนต์เบส #PlantBased",th:"จากพืช",en:"plant-based",
  def:{k:"def",th:"มื้อเช้าสายพืช",en:"a plant-based breakfast",e:"🌿",s:"โต๊ะไม้ข้างหน้าต่าง",S:"a wooden table by a window",tags:"#มื้อเช้า",t:"L"}},
 {k:"canned",type:"prod",terms:["ผลไม้กระป๋อง","ผลไม้รวม","ลิ้นจี่","สับปะรด","ลำไย","เงาะ","พีช","กระป๋อง","ผลไม้","canned fruit","fruit cocktail","canned","lychee","pineapple","longan","rambutan","peach","fruit"],excl:["น้ำผลไม้","fruit juice"],
  pf:"มาลี ผลไม้กระป๋อง",PF:"Malee canned fruit",p:"ผลไม้กระป๋อง",P:"canned fruit",pe:"🍑",tags:"#ผลไม้กระป๋อง #มาลี",th:"ผลไม้กระป๋อง",en:"canned fruit",
  def:{k:"def",th:"ของหวานหลังมื้อ",en:"after-meal dessert",e:"🍧",s:"โต๊ะกินข้าวที่บ้าน",S:"the dining table at home",tags:"#ของหวาน",t:"E"}},
 {k:"jay",type:"ctx",also:["plant"],terms:["เทศกาลกินเจ","กินเจ","มังสวิรัติ","เจ","jay","vegetarian"],excl:["เจ้","เจอ","เจ๋ง","เจล","เจาะ","เจริญ","เจ็ด","เจ็บ","เจน","เจี๊ยบ","โปรเจ"],
  th:"เทศกาลกินเจ",en:"the Jay festival",e:"💛",s:"พื้นหลังสีเหลือง (สีธงเจ)",S:"a yellow background (Jay flag colour)",tags:"#กินเจ #เมนูเจ",t:"E",prod:"plant",event:1,flag:"jay"},
 {k:"halloween",type:"ctx",terms:["ฮาโลวีน","หลอน","ผี","halloween","spooky","ghost"],excl:["ผีเสื้อ"],
  th:"ฮาโลวีน",en:"Halloween",e:"👻",s:"บ้านตอนปิดไฟ ใช้ไฟฉายดวงเดียว",S:"home with the lights off and one torch",tags:"#ฮาโลวีน #Halloween",t:"E",prod:"canned",event:1},
 {k:"loy",type:"ctx",terms:["ลอยกระทง","มุมแสงไฟ","แสงไฟ","กระทง","ยี่เป็ง","loy krathong","loykrathong","krathong","yi peng"],
  th:"ลอยกระทง",en:"Loy Krathong",e:"🪷",s:"ริมน้ำตอนค่ำ",S:"the waterside at dusk",tags:"#ลอยกระทง #LoyKrathong",t:"E",prod:"canned",event:1},
 {k:"school",type:"ctx",terms:["back to school","เปิดเทอม","โรงเรียน","นักเรียน","มหาลัย","อ่านหนังสือ","สอบ","school","student","exam","university"],excl:["ตรวจสอบ","สอบถาม"],
  th:"เปิดเทอม",en:"back to school",e:"🎒",s:"โต๊ะอ่านหนังสือ",S:"a study desk",tags:"#เปิดเทอม #BackToSchool",t:"L",prod:"milk"},
 {k:"office",type:"ctx",terms:["desk break","screen break","พักสั้น","พักหน้าจอ","มนุษย์เงินเดือน","ออฟฟิศ","ทำงาน","พนักงาน","บ่ายสาม","ประชุม","office","coworker","meeting","wfh"],
  th:"ชีวิตออฟฟิศ",en:"office life",e:"💼",s:"แพนทรีออฟฟิศ",S:"the office pantry",tags:"#มนุษย์เงินเดือน #ออฟฟิศ",t:"L",prod:"coco"},
 {k:"gym",type:"ctx",legal:1,terms:["ออกกำลังกาย","ฟิตเนส","ยิม","วิ่ง","โยคะ","กีฬา","สายฟิต","gym","fitness","workout","exercise","running","run","yoga","sport"],
  th:"หลังออกกำลังกาย",en:"after the gym",e:"🏃",s:"ยิมหรือสวนสาธารณะ",S:"a gym or park",tags:"#ออกกำลังกาย #สายฟิต",t:"E",prod:"coco"},
 {k:"snack",type:"ctx",terms:["ของว่าง","ของหวาน","ขนม","snack","dessert","sweet"],
  th:"ของว่าง",en:"snack time",e:"🍡",s:"โต๊ะกาแฟ",S:"a coffee table",tags:"#ของว่าง #ของหวาน",t:"L",prod:"canned"},
 {k:"healthy",type:"ctx",legal:1,terms:["สุขภาพดี","สุขภาพ","คลีน","healthy","health","wellness","clean eating"],
  th:"สายสุขภาพ",en:"wellness lifestyle",e:"🌿",s:"โต๊ะที่มีผักผลไม้สด",S:"a table with fresh fruit and veg",tags:"#ไลฟ์สไตล์",t:"L",prod:"juice"},
 {k:"recipe",type:"ctx",terms:["เมนูง่ายๆ","ทำอาหาร","สมูทตี้","เมนู","สูตร","recipe","menu","smoothie","cook"],
  th:"เมนูง่ายๆ",en:"easy recipes",e:"🍳",s:"ครัวที่บ้าน",S:"a home kitchen",tags:"#เมนูง่ายๆ #สูตรง่ายๆ",t:"E",prod:"canned"},
 {k:"rain",type:"ctx",terms:["ฝนตก","รถติด","ฝน","rainy","rain","traffic"],
  th:"ฝนตกรถติด",en:"rainy-day traffic",e:"🌧️",s:"เบาะรถตอนรถติด",S:"a car stuck in traffic",tags:"#ฝนตกรถติด",t:"E",prod:"milk"},
 {k:"cold",type:"ctx",terms:["หน้าหนาว","ลมหนาว","หนาว","cool season","winter","cold"],
  th:"หน้าหนาว",en:"cool season",e:"🍂",s:"ระเบียงตอนเช้า",S:"a balcony in the morning",tags:"#หน้าหนาว #ลมหนาว",t:"E",prod:"milk"},
 {k:"hot",type:"ctx",terms:["หน้าร้อน","อากาศร้อน","ร้อน","แดด","summer","hot"],
  th:"อากาศร้อน",en:"hot weather",e:"☀️",s:"ลานกลางแจ้งตอนแดดจัด",S:"an outdoor spot in full sun",tags:"#ร้อนมาก",t:"L",prod:"coco"},
 {k:"payday",type:"ctx",terms:["เงินเดือนออก","เงินเดือน","สิ้นเดือน","payday","salary"],
  th:"เงินเดือนออก",en:"payday",e:"💸",s:"หน้าตู้เย็น",S:"the fridge door",tags:"#เงินเดือนออก",t:"E",prod:"juice",event:1},
 {k:"sale",type:"ctx",terms:["ลดราคา","โปรโมชั่น","โปร","11.11","1111","10.10","12.12","shopee","lazada","sale","promo","deal"],excl:["โปรตีน","โปรไฟล์","โปรเจ"],
  th:"วันช้อปโปรดี",en:"sale day",e:"🛒",s:"หน้าจอมือถือข้างสินค้า",S:"a phone screen next to the products",tags:"#โปรดี #1111",t:"E",prod:"juice",event:1},
 {k:"street",type:"ctx",terms:["สตรีทฟู้ด","ส้มตำ","หมูกระทะ","ไก่ทอด","ก๋วยเตี๋ยว","ข้าวมันไก่","street food","som tam","mookata","fried chicken","noodle"],
  th:"สตรีทฟู้ด",en:"street food",e:"🌶️",s:"ร้านข้างทาง",S:"a street stall",tags:"#สตรีทฟู้ด #ของอร่อยบอกต่อ",t:"L",prod:"coco"},
 {k:"family",type:"ctx",terms:["วันพ่อ","father's day","fathers day","ครอบครัว","ลูก","แม่","พ่อ","เด็ก","family","kids","mom","dad"],excl:["แม่น้ำ","แม่ค้า","ลูกค้า","ลูกสด","ลูกตา","ลูกเล่น","ลูกชิ้น","พ่อค้า"],
  th:"เวลาครอบครัว",en:"family time",e:"👨‍👩‍👧",s:"โต๊ะกินข้าวที่บ้าน",S:"the family dinner table",tags:"#ครอบครัว",t:"E",prod:"juice"},
 {k:"travel",type:"ctx",terms:["เที่ยว","ทะเล","ภูเขา","แคมป์","travel","road trip","trip","beach","camping"],excl:["ทะเลาะ"],
  th:"ทริปเที่ยว",en:"a trip",e:"🏖️",s:"จุดแวะพักระหว่างทาง",S:"a roadside rest stop",tags:"#เที่ยวไทย",t:"L",prod:"coco"},
 {k:"merit",type:"ctx",respect:1,terms:["ออกพรรษา","ตักบาตร","ทำบุญ","วัด","merit","temple"],excl:["วัดผล","ตรวจวัด","วัดค่า"],
  th:"ทำบุญ",en:"merit-making",e:"🙏",s:"บ้านหรือวัด (บรรยากาศสงบ)",S:"home or a temple (calm setting)",tags:"#ทำบุญ",t:"L",prod:"juice"},
 {k:"party",type:"ctx",terms:["ปาร์ตี้","วันเกิด","คริสต์มาส","ปีใหม่","party","birthday","christmas","new year","countdown"],
  th:"ปาร์ตี้",en:"party time",e:"🎉",s:"โต๊ะปาร์ตี้",S:"a party table",tags:"#ปาร์ตี้",t:"E",prod:"juice",event:1}
];
/* words that could be health claims: removed from captions + flagged for Legal (อย.) */
SI.GEN.health = ["ลดน้ำหนัก","ลดความอ้วน","ลดไขมัน","ป้องกันโรค","ภูมิคุ้มกัน","ดีท็อกซ์","ดีท๊อกซ์","ล้างพิษ","เผาผลาญ","ชะลอวัย","หายป่วย","รักษา","เบาหวาน","ความดัน","คอเลสเตอรอล","บำรุง","อิเล็กโทรไลต์","เกลือแร่","วิตามิน","แคลเซียม","โปรตีน","ผอม",
  "boost immunity","weight loss","lose weight","prevent disease","burn fat","fat burn","anti-aging","immunity","immune","detox","cure","cures","slimming","slim","cholesterol","diabetes","heal","electrolytes","electrolyte","vitamin","vitamins","calcium","protein"];
/* {c}/{C} theme TH/EN · {p}/{P} product short TH/EN · {pe} product emoji · {e} theme emoji · {s}/{S} place TH/EN */
SI.GEN.tmpl = {
 TT:[
  {plat:["TT"],f:"TikTok · POV",pl:"fun",hTH:"POV: {c} แล้วมี{p}อยู่ในมือ {pe}",hEN:"POV: {C}, and you've got {P} in hand {pe}",cTH:"{c}แบบนี้ ต้องมีตัวช่วย {e}{pe} แท็กเพื่อนที่เป็นแบบนี้!",cEN:"{C} calls for a sidekick {e}{pe} Tag a friend who gets it!",shot:"Act it out at {S}: problem → grab {P} → relief. 8–12 s. Use original sound or audio you have a licence for. · แสดงที่{s}: ปัญหา → หยิบ{p} → โล่ง 8–12 วิ ใช้เสียงที่เราสร้างเองหรือที่มีสิทธิ์"},
  {plat:["TT"],f:"TikTok · ASMR",pl:"fun",hTH:"ASMR {p} ฉบับ{c} {e}",hEN:"{C} ASMR: {P} {e}",cTH:"ไม่ต้องพูด ฟังอย่างเดียว 🎧 {p} + บรรยากาศ{c} {pe}",cEN:"No talking, just listen 🎧 {P} + {C} vibes {pe}",shot:"Close-up, real sound: open, pour, ice, plus one {C} prop. 10–15 s. · ถ่ายใกล้ๆ เสียงจริง เปิด เท น้ำแข็ง + พร็อพ{c} 1 ชิ้น 10–15 วิ"},
  {plat:["TT"],f:"TikTok · recipe 30 s",pl:"rec",calm:1,hTH:"เมนู{c} 30 วิ จาก{p} {pe}",hEN:"30-second {C} recipe with {P} {pe}",cTH:"3 ขั้นตอนจบ {e}{pe} ทำตามแล้วแท็กเรานะ! สูตรอยู่ในคลิป",cEN:"3 steps, done {e}{pe} Try it and tag us! Recipe in the clip.",shot:"Top-down at {S}, 3 fast cuts, recipe text on screen, end on the finished glass. · มุมบนที่{s} ตัด 3 ช็อต ตัวหนังสือบอกสูตร จบที่แก้วสวยๆ"},
  {plat:["TT"],f:"TikTok · before/after",pl:"fun",hTH:"ก่อน/หลัง: {c}แบบธรรมดา → แบบมี{p} {e}",hEN:"Before/after: plain {C} → {C} with {P} {e}",cTH:"แค่เพิ่ม{p} ทุกอย่างก็ดูดีขึ้น {pe}✨ ชอบแบบไหน ก่อน หรือ หลัง?",cEN:"Just add {P} and it all looks better {pe}✨ Before or after?",shot:"Hand-swipe transition at {S}. Same camera angle for both shots. · ทรานซิชันปัดมือที่{s} ใช้มุมกล้องเดียวกันทั้ง 2 ช็อต"},
  {plat:["TT"],f:"TikTok · rate it 1–10",pl:"com",hTH:"ให้คะแนน 1–10: {p} สำหรับ{c} {e}",hEN:"Rate it 1–10: {P} for {C} {e}",cTH:"ทีมงานลองแล้ว {pe} คุณให้กี่คะแนน? คอมเมนต์ตัวเลขมาเลย",cEN:"Our team tried it {pe} What's your score? Drop a number below.",shot:"Staff tries it at {S}, then holds up a score card. 10 s. · พนักงานลองที่{s} แล้วชูป้ายคะแนน 10 วิ"},
  {plat:["TT"],f:"TikTok · day in the life",pl:"bts",calm:1,hTH:"1 วันของทีมมาลี ช่วง{c} {e}",hEN:"A day with the Malee team: {C} edition {e}",cTH:"ตามทีมเราไป 1 วัน ช่วง{c} {pe} มี{p}ติดมือตลอด",cEN:"Follow our team for a day, {C} edition {pe} with {P} along the way.",shot:"6–8 clips of 2 s through the day, ending at {S}. Ask staff before filming. · คลิปละ 2 วิ 6–8 คลิป จบที่{s} ขออนุญาตพนักงานก่อน"}
 ],
 IG:[
  {plat:["IG"],f:"IG carousel · save this",pl:"rec",calm:1,hTH:"5 ไอเดีย{c} กับ{p} เซฟไว้เลย! {e}",hEN:"5 {C} ideas with {P}. Save this! {e}",cTH:"ไอเดียเพียบ {e}{pe} เลื่อนดูให้ครบ 5 รูป แล้วกดเซฟไว้ใช้วันหลัง",cEN:"Lots of ideas {e}{pe} Swipe all 5, then save for later.",shot:"Cover + 5 slides on one background colour, one short line each. Shoot at {S}. · ปก + 5 สไลด์ พื้นสีเดียวกัน ข้อความสไลด์ละบรรทัด ถ่ายที่{s}"},
  {plat:["IG"],f:"IG Reel · mood",pl:"fun",calm:1,hTH:"{c} mood {e}{pe}",hEN:"{C} mood {e}{pe}",cTH:"บรรยากาศ{c}แบบนี้ ขอ{p}สักแก้ว {pe} ใครเห็นด้วยกดหัวใจ",cEN:"This {C} feeling needs a glass of {P} {pe} Double-tap if you agree.",shot:"Slow-motion pour, warm light, at {S}. 7–10 s. Original or licensed audio only. · เทแบบสโลว์ แสงอุ่น ที่{s} 7–10 วิ ใช้เสียงที่มีสิทธิ์เท่านั้น"},
  {plat:["IG"],f:"IG carousel · checklist",pl:"promo",hTH:"เช็กลิสต์{c} ✅ ขาด{p}ไม่ได้",hEN:"{C} checklist ✅ don't forget {P}",cTH:"เช็กลิสต์{c} {e} 1) … 2) … 3) {p} {pe} ขาดอะไรไป บอกหน่อย",cEN:"{C} checklist {e} 1) … 2) … 3) {P} {pe} What did we miss?",shot:"Flat-lay of 5–6 items at {S}, then one slide per item. · วางของ 5–6 ชิ้นถ่ายมุมบนที่{s} แล้วสไลด์ละชิ้น"},
  {plat:["IG"],f:"IG Reel · 3 moods",pl:"fun",hTH:"{c} 3 แบบ: เช้า กลางวัน เย็น {e}",hEN:"{C} in 3 moods: morning, noon, night {e}",cTH:"เช้า กลางวัน เย็น {p}เข้าได้ทุกช่วง {pe} คุณเป็นแบบไหน?",cEN:"Morning, noon or night, {P} fits {pe} Which one are you?",shot:"3 shots of 3 s at {S}, same framing, different light. · 3 ช็อต ช็อตละ 3 วิ ที่{s} มุมเดิม แสงต่างกัน"},
  {plat:["IG"],f:"IG carousel · memes",pl:"fun",hTH:"มีม{c} 4 แบบ ที่คนไทยเข้าใจ {e}",hEN:"4 {C} memes every Thai gets {e}",cTH:"อันไหนคือคุณ? 😂 {e} แท็กเพื่อนที่เป็นแบบรูป 3 {pe}",cEN:"Which one is you? 😂 {e} Tag the friend who's slide 3 {pe}",shot:"4 simple text-on-photo memes; product small in one corner. No real people's faces without consent. · มีม 4 รูป สินค้าเล็กๆ มุมภาพ ห้ามใช้หน้าคนจริงโดยไม่ขออนุญาต"}
 ],
 FB:[
  {plat:["FB"],f:"FB poll",pl:"com",hTH:"{c}นี้ ทีมไหน? 🅰️ อยู่บ้านชิลๆ 🅱️ ออกไปข้างนอก",hEN:"{C}: which team? A) chill at home B) head out",cTH:"โหวตในคอมเมนต์ A หรือ B {e} ทีมไหนก็มี{p}ติดตัวได้ {pe}",cEN:"Vote A or B in the comments {e} Either way, bring {P} {pe}",shot:"One photo split in two halves (home vs outside). · รูปเดียวแบ่งครึ่ง บ้าน vs ข้างนอก"},
  {plat:["FB"],f:"FB photo + question",pl:"com",hTH:"รูปนี้ขาดอะไรไป? (ใบ้: {pe})",hEN:"What's missing from this {C} photo? (hint: {pe})",cTH:"{c}ที่สมบูรณ์แบบ ยังขาดอีก 1 อย่าง {e} ทายในคอมเมนต์!",cEN:"The perfect {C} is missing one thing {e} Guess in the comments!",shot:"Photo at {S} with an empty spot where {P} should be. Reveal it in the comments later. · ถ่ายที่{s} เว้นที่ว่างไว้ แล้วเฉลยในคอมเมนต์"},
  {plat:["FB"],f:"FB post · show us yours",pl:"com",calm:1,hTH:"อวดรูป{c}ของคุณหน่อย {e}",hEN:"Show us your {C} moment {e}",cTH:"ส่งรูป{c}ของคุณในคอมเมนต์ {pe} แอดมินจะเลือกไปรีโพสต์ (ขออนุญาตก่อนนะ)",cEN:"Post your {C} photo in the comments {pe} We'll repost a few favourites (with your OK).",shot:"One example photo from our team at {S}. Reply to every comment. · รูปตัวอย่างจากทีมเราที่{s} ตอบทุกคอมเมนต์"},
  {plat:["FB"],f:"FB post · 3 tips",pl:"promo",calm:1,hTH:"3 เคล็ดลับ{c} ฉบับมาลี {e}",hEN:"3 {C} tips from Malee {e}",cTH:"เคล็ดลับง่ายๆ {e} 1) … 2) … 3) มี{p}ติดตู้เย็นไว้ {pe} คุณมีทริกอะไรอีก?",cEN:"Easy tips {e} 1) … 2) … 3) keep {P} in the fridge {pe} Any other tricks?",shot:"Simple graphic with 3 numbered lines + product photo. 10 min in Canva. · กราฟิก 3 ข้อ + รูปสินค้า ทำใน Canva 10 นาที"},
  {plat:["FB"],f:"FB album · behind the scenes",pl:"bts",calm:1,hTH:"เบื้องหลัง: ทีมมาลีเตรียม{c}ยังไง {e}",hEN:"Behind the scenes: how team Malee gets ready for {C} {e}",cTH:"เบื้องหลังที่ไม่ค่อยมีใครเห็น 👀 {pe} ชอบรูปไหน บอกหน่อย",cEN:"The side people rarely see 👀 {pe} Which photo do you like?",shot:"4–6 approved team photos at {S}; nothing confidential on screen. · รูปที่อนุมัติแล้ว 4–6 รูปที่{s} ไม่โชว์ข้อมูลลับ"}
 ],
 ST:[
  {plat:["IG","FB"],f:"Story · poll",pl:"com",hTH:"{c}: ทีม{p} เย็นจัด 🧊 vs ทีมเย็นนิดๆ",hEN:"{C}: team ice-cold {P} 🧊 vs team just-cool",cTH:"Story 1: โพล 2 ตัวเลือก → Story 2: เฉลยผลโหวต + รูป{p} {pe}",cEN:"Story 1: 2-option poll → Story 2: share the result + a {P} photo {pe}",shot:"One photo of {P} at {S}; add the poll sticker in the app. · รูป{p} 1 รูปที่{s} ใส่สติกเกอร์โพลในแอป"},
  {plat:["IG","FB"],f:"Story · quiz",pl:"com",hTH:"ควิซ{c}: {p} 1 กล่อง มีกี่ มล.? {pe}",hEN:"{C} quiz: how many ml in one {P} pack? {pe}",cTH:"ใช้สติกเกอร์ควิซ 3 ตัวเลือก เฉลยจากฉลากสินค้า {e}",cEN:"Use a 3-choice quiz sticker; the answer comes from the pack label {e}",shot:"Close-up of the pack with the label visible. Answer = what's printed on the pack. · ถ่ายกล่องใกล้ๆ เห็นฉลาก คำตอบตามที่พิมพ์บนฉลาก"},
  {plat:["IG","FB"],f:"Story · emoji slider",pl:"fun",hTH:"{c} อยากได้{p}แค่ไหน? {pe}😍",hEN:"How much do you want {P} for {C}? {pe}😍",cTH:"เลื่อนสไลเดอร์ให้สุด! {e} แล้วแชร์ Story นี้ให้เพื่อน",cEN:"Slide it all the way! {e} Then share this Story with a friend.",shot:"Product photo at {S} + emoji slider sticker. · รูปสินค้าที่{s} + สติกเกอร์สไลเดอร์"},
  {plat:["IG","FB"],f:"Story · question box",pl:"com",calm:1,hTH:"ถามมา! เมนู{c}ที่อยากให้เราทำ {e}",hEN:"Ask us! Which {C} recipe should we make? {e}",cTH:"พิมพ์ไอเดียในกล่องคำถาม {pe} คำตอบที่ชอบที่สุด เราจะทำเป็นคลิปให้",cEN:"Type your idea in the question box {pe} We'll turn the best one into a video.",shot:"Plain colour background + question sticker + small {P} photo. · พื้นสีเรียบ + สติกเกอร์คำถาม + รูป{p}เล็กๆ"},
  {plat:["IG","FB"],f:"Story · countdown",pl:"promo",need:"event",hTH:"นับถอยหลัง{c} ⏰ {e}",hEN:"{C} countdown ⏰ {e}",cTH:"กดเตือนไว้เลย 🔔 {pe} (ใส่โปรเฉพาะที่ทีมขายยืนยันแล้ว)",cEN:"Tap the reminder 🔔 {pe} (Only show deals Sales confirmed.)",shot:"Countdown sticker + one product photo. · สติกเกอร์นับถอยหลัง + รูปสินค้า 1 รูป"}
 ],
 EX:[
  {plat:["FB","IG"],f:"Live · 15 min",pl:"rec",calm:1,t:"E",hTH:"ไลฟ์ 15 นาที: ทำเมนู{c}กับ{p} {pe}",hEN:"15-min Live: a {C} recipe with {P} {pe}",cTH:"คืนนี้ 2 ทุ่ม ไลฟ์สดทำเมนู{c} {e} ถามได้ตลอดไลฟ์",cEN:"Tonight 8 pm: live {C} recipe {e} Ask questions anytime.",shot:"Phone on a tripod at {S}, 1 host + 1 helper reading comments. Announce in Story the day before. · ขาตั้งมือถือที่{s} พิธีกร 1 + ผู้ช่วยอ่านคอมเมนต์ 1 แจ้งใน Story ล่วงหน้า"},
  {plat:["TT"],f:"TikTok · reply to comment (Stitch)",pl:"com",hTH:"ตอบคอมเมนต์: เรื่อง{c}กับ{p} {e}",hEN:"Answering a comment: {C} and {P} {e}",cTH:"มีคนถามมา เลยมาตอบ {pe} (ข้อมูลจากฉลากเท่านั้น) ถามต่อได้เลย",cEN:"You asked, we answer {pe} (label facts only). Keep the questions coming.",shot:"Reply to a real comment; staff answers on camera at {S}. · ตอบคอมเมนต์จริง พนักงานตอบหน้ากล้องที่{s}"},
  {plat:["TT"],f:"TikTok · food pairing",pl:"fun",hTH:"{c} ต้องคู่กับ{p} {pe}",hEN:"{C} needs {P} on the side {pe}",cTH:"จับคู่แบบนี้ ใครว่าไม่เข้า? {e}{pe} ร้านเจ้าประจำของคุณอยู่ไหน",cEN:"Who says this pairing doesn't work? {e}{pe} Where's your go-to spot?",shot:"Food close-up, first bite, then a sip. Ask the shop first. · ถ่ายอาหารใกล้ๆ คำแรก แล้วจิบ ขออนุญาตร้านก่อน"},
  {plat:["IG"],f:"IG Reel · mini vlog",pl:"fun",calm:1,hTH:"Vlog สั้น: {c} กับ{p} {e}",hEN:"Mini vlog: {C} with {P} {e}",cTH:"เก็บโมเมนต์{c} {e}{pe} คุณจะไปไหนต่อ?",cEN:"Saving the {C} moments {e}{pe} Where are you heading next?",shot:"5 clips × 2 s at {S}, natural sound + one text line. · 5 คลิป คลิปละ 2 วิ ที่{s} เสียงจริง + ข้อความ 1 บรรทัด"},
  {plat:["FB"],f:"FB photo contest (needs approval)",pl:"com",hTH:"ประกวดรูป{c} 📸 {e}",hEN:"{C} photo contest 📸 {e}",cTH:"โพสต์รูป{c}ใต้โพสต์นี้ {pe} (กติกาและของรางวัลต้องให้ฝ่ายกฎหมายตรวจก่อน)",cEN:"Post your {C} photo below {pe} (Rules and prizes need Legal review first.)",shot:"One sample photo + a clear rules graphic. · รูปตัวอย่าง + กราฟิกกติกา"}
 ]
};
SI.GEN.examples = ["มะพร้าว","coconut","11.11","ลอยกระทง","วันพ่อ","desk break"];

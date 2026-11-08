/* Malee Social Ideas — content data for the 9–29 Nov 2026 plan.
   Ideas are drafts. Product SKUs, packs, ingredients and serving instructions must be confirmed by the brand team.
   Checked 8 Nov 2026 ICT. "Verified" means a public page or snapshot was opened, not that something is popular. */
window.SI = {};
SI.PLAT = {
  FB:{en:"Facebook",th:"เฟซบุ๊ก",cls:"fb"},
  IG:{en:"Instagram",th:"อินสตาแกรม",cls:"ig"},
  TT:{en:"TikTok",th:"ติ๊กต็อก",cls:"tt"}
};
SI.PILLAR = {
  rec:{en:"Easy recipes",th:"เมนูง่ายๆ",c:"#16a34a"},
  fun:{en:"Fun & trends",th:"สนุก/เทรนด์",c:"#f59e0b"},
  fest:{en:"Festivals & moments",th:"เทศกาล/ช่วงเวลา",c:"#dc2626"},
  com:{en:"Talk with fans",th:"คุยกับลูกค้า",c:"#7c3aed"},
  bts:{en:"Behind the scenes",th:"เบื้องหลัง",c:"#0891b2"},
  promo:{en:"Product & deals",th:"สินค้า/โปรฯ",c:"#db2777"}
};
/* Buckets only. Cards with `slot` show that suggested ICT time instead. These are not measured best times. */
SI.TIME = {L:{en:"Late morning to afternoon",th:"สายถึงบ่าย"}, E:{en:"Evening",th:"ช่วงค่ำ"}};
/* start must be a Monday. Three weeks: 9–15, 16–22, 23–29 Nov 2026. Dates are calendar dates, not viewer-local. */
SI.PLAN = {start:"2026-11-09", weeks:3, en:"9–29 Nov 2026", th:"9–29 พ.ย. 2569", weekEn:"9–15 Nov 2026", weekTh:"9–15 พ.ย. 2569"};
SI.EVENTS = [
  {d:"2026-11-09",en:"Father's Day asset prep starts. Do not publish yet.",th:"เริ่มเตรียมคอนเทนต์วันพ่อ ยังไม่โพสต์",k:"prep",note:"Main asset is held for 5 Dec approval."},
  {d:"2026-11-10",en:"Sales-approval checkpoint (internal). No automatic post.",th:"จุดเช็กฝ่ายขาย (ภายใน) ยังไม่โพสต์อัตโนมัติ",k:"note",note:"Confirm any store link, SKU and terms before N2."},
  {d:"2026-11-11",en:"11.11 commerce day. Card and retailer campaigns are in market this week. Not a Malee price or voucher.",th:"วัน 11.11 มีแคมเปญร้านค้า/บัตรในสัปดาห์นี้ ไม่ใช่ราคาหรือคูปองของมาลี",k:"sale",note:"See KTC Double Day page. Do not copy their offers onto Malee."},
  {d:"2026-11-13",en:"Optional home lights or coffee-table prep. No confirmed Malee event tie-in.",th:"ทางเลือก: ซ้อมมุมแสงไฟหรือมุมกาแฟที่บ้าน ยังไม่ผูกกับงานจริง",k:"note",note:"Public event lists for 13–15 Nov were not fully page-verified. Prefer home footage."},
  {d:"2026-11-15",en:"Sukhothai Loi Krathong programme begins (15–24 Nov). Nationwide festival night is 24 Nov, not today.",th:"โปรแกรมสุโขทัยเริ่ม 15–24 พ.ย. คืนลอยกระทงหลักคือ 24 พ.ย. ไม่ใช่วันนี้",k:"fest"},
  {d:"2026-11-16",en:"Prep week: Loy Krathong date card, venue guidance, final asset check. No automatic posting.",th:"สัปดาห์เตรียมการ์ดวันที่ลอยกระทง ตรวจคำแนะนำสถานที่และไฟล์สุดท้าย",k:"note"},
  {d:"2026-11-24",en:"Loy Krathong (full moon, Tuesday). Follow venue rules. Do not place packs, food or cups in the water.",th:"ลอยกระทง (วันเพ็ญ วันอังคาร) ทำตามกติกาพื้นที่ อย่าวางแพ็ก อาหาร หรือแก้วลงน้ำ",k:"fest"},
  {d:"2026-11-25",en:"Optional Father's Day teaser only if approved. Main asset waits for 5 Dec.",th:"ทีเซอร์วันพ่อได้เฉพาะเมื่ออนุมัติ ไฟล์หลักรอ 5 ธ.ค.",k:"prep"}
];
SI.OUTSIDE = [
  {d:"Sat 5 Dec 2026",en:"Father's Day, National Day, and the birthday anniversary of H.M. King Bhumibol Adulyadej the Great. Hold the main family asset for approval. No royal portrait, emblem, implied endorsement, or discount tied to the day. This row is not an office-closure notice.",th:"วันพ่อ วันชาติ และวันคล้ายวันพระบรมราชสมภพ ไฟล์ครอบครัวหลักรออนุมัติ ห้ามใช้พระบรมฉายาลักษณ์ ตรา นัยว่ารับรอง หรือส่วนลดที่อิงวันนี้ แถวนี้ไม่ใช่ประกาศวันปิดทำการ"},
  {d:"Mon 7 Dec 2026",en:"Bank of Thailand lists this Monday as the substitute holiday because 5 Dec falls on Saturday. Do not turn that into a Malee store-closure or sale post.",th:"ธปท. ระบุวันจันทร์นี้เป็นวันหยุดชดเชย เพราะ 5 ธ.ค. ตรงกับเสาร์ อย่าแต่งเป็นโพสต์ปิดร้านหรือเซลของมาลี"}
];
SI.SEASON = {en:"Editorial season note only: shoot at home or on a table. This is not a weather forecast and not a verified social trend.",
  th:"หมายเหตุกองบรรณาธิการ: ถ่ายที่บ้านหรือบนโต๊ะ ไม่ใช่พยากรณ์อากาศ และไม่ใช่เทรนด์โซเชียลที่ยืนยัน"};
SI.SOURCES = [
  {t:"TAT Newsroom, published 5 Nov 2026, full article opened 8 Nov 2026. Loy Krathong full moon is Tuesday 24 November 2026. Sukhothai 15–24 Nov; Bangkok main programme 17–29 Nov, with some venues 16–25 Nov; Tak 21–24 Nov. Regional dates are not the nationwide festival night.",u:"https://www.tatnews.org/2026/11/loi-krathong-2026-lights-up-thailands-rivers-and-historic-cities/"},
  {t:"KTC Double Day page, opened 8 Nov 2026. Promotion period on the page: 7–13 Nov 2026. Participating-card windows shown there include Shopee 8–11 Nov, Lazada 10 Nov 20:00–13 Nov, and TikTok Shop 7–12 Nov. This shows 11.11 commerce is active. It is not a Malee discount, stock, voucher, or Live slot. Do not copy that page's prices or codes onto Malee.",u:"https://www.ktc.co.th/en/promotion/online-shopping-services/online-shopping/double-day"},
  {t:"Bank of Thailand notification PDF, text checked 8 Nov 2026. Monday 7 December 2026 is the substitute holiday for H.M. King Bhumibol Adulyadej the Great’s Birthday, National Day and Father’s Day, because the date itself is Saturday 5 December 2026. Used only to time Father's Day preparation.",u:"https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2568/EngPDF/25680162.pdf"},
  {t:"U.S. Embassy Bangkok holiday page was requested on 8 Nov 2026 and returned HTTP 500, so it is not the date source. Do not import that page's U.S. observances (including Veterans Day or Thanksgiving) as Thai public holidays.",u:"https://th.usembassy.gov/embassy-official-holidays/"},
  {t:"thailand.go.th events index. On 8 Nov 2026 a public search snippet listed dated rows, including coffee and riverside programmes around 13–15 Nov and Sukhothai 15–24 Nov. Direct fetch returned empty text, so this is not full-page verification. No Malee tie-in.",u:"https://www.thailand.go.th/public/index.php/events"},
  {t:"Thai Rath English travel URL, cited only as a search-result corroboration. The full article was not opened on 8 Nov 2026.",u:"https://en.thairath.co.th/lifestyle/travel/2969329"},
  {t:"Public X Thailand trends snapshot, WOEID 23424960, top 20, retrieved 8 Nov 2026 about 09:47 ICT. No volumes were returned. Not re-counted for this page. Presence on that list is not a popularity score, and it did not show 11.11 or Loy Krathong as the reason for this week's plan.",u:"https://x.com/search?q=%23NESCAFERUNKHONKAEN2026"}
];
SI.IDEAS = [
 {id:1,code:"N1",d:"2026-11-09",p:["IG","FB"],f:"Story · poll",pl:"com",easy:1,mins:15,t:"L",evidence:"verified",tr:"sale1111",
  pr:"Approved coconut-water pack and approved fruit-juice pack · แพ็กน้ำมะพร้าวและน้ำผลไม้ที่อนุมัติแล้ว",
  slot:"Suggested 12:00 ICT, Mon 9 Nov · เวลาที่แนะนำ 12:00 น. จันทร์ 9 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"ถ้าเลือกได้หนึ่งแพ็ก คุณเลือกอะไร?",hEN:"One pack to pick—which is yours?",
  cTH:"น้ำมะพร้าวหรือน้ำผลไม้—วันนี้คุณเลือกแบบไหน? โหวตแล้วบอกมื้อที่อยากจับคู่กัน",cEN:"Coconut water or fruit juice—which would you choose today? Vote and tell us your pairing.",
  shot:"Phone overhead. Two labelled approved packs on a clean table, about three seconds pushing in on each. Add a Story poll. No purchase needed to join. · มือถือมุมบน แพ็กที่อนุมัติสองชิ้นบนโต๊ะสะอาด ดันเข้าหากล่องละประมาณ 3 วินาที ใส่โพลใน Story ไม่ต้องซื้อก็ร่วมได้",
  steps:["Set the two approved packs on a clean table (5 min) · วางแพ็กที่อนุมัติสองชิ้นบนโต๊ะสะอาด (5 นาที)","Film a short overhead push-in on each pack (7 min) · ถ่ายมุมบนดันเข้าหากล่องละชิ้น (7 นาที)","Add the Thai poll and caption (3 min) · ใส่โพลและแคปชันภาษาไทย (3 นาที)"],
  tags:"#มาลี #เลือกแบบที่ชอบ #DrinkIdeas",
  srcNote:"Date hook: KTC Double Day page shows 11.11 commerce is active this week (checked 8 Nov 2026). The poll itself is an editorial suggestion, not a measured trend.",
  confirm:"Poll options and flavour names must match packs the brand team has approved.",
  caution:"Do not imply either pack is healthier. No price unless Sales has approved it."},
 {id:2,code:"N2",d:"2026-11-11",p:["FB","IG"],f:"Carousel · 3 slides",pl:"promo",easy:1,mins:25,t:"L",evidence:"verified",tr:"sale1111",
  pr:"Approved fruit-juice multipack · แพ็กน้ำผลไม้ที่อนุมัติแล้ว",
  slot:"Suggested 12:00 ICT, Wed 11 Nov · เวลาที่แนะนำ 12:00 น. พุธ 11 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"ก่อนกดตะกร้า เช็ก 3 อย่างนี้",hEN:"Before checkout: three things to check.",
  cTH:"เช็กขนาดแพ็ก จำนวนที่ต้องการ และเงื่อนไขร้านก่อนสั่ง เลือกให้เหมาะกับมื้อของคุณ ดูราคาและรายละเอียดล่าสุดที่หน้าร้านทางการ",cEN:"Check pack size, quantity and store terms before ordering. Choose what fits your meals; see the official store for current details.",
  shot:"Pack hero, fingers counting three, then text cards. Add an official-store URL only after it is verified. No checkout screenshot and no personal data. · ภาพพระเอกของแพ็ก นิ้วชี้สามข้อ แล้วเป็นการ์ดข้อความ ใส่ลิงก์ร้านทางการเมื่อตรวจแล้วเท่านั้น ห้ามภาพหน้าชำระเงินหรือข้อมูลส่วนตัว",
  steps:["Hero photo of the approved pack (8 min) · ถ่ายภาพหลักของแพ็กที่อนุมัติ (8 นาที)","Three text cards: pack size, quantity, store terms (12 min) · การ์ด 3 ใบ: ขนาดแพ็ก จำนวน เงื่อนไขร้าน (12 นาที)","Write the caption with no price (5 min) · เขียนแคปชันโดยไม่ใส่ราคา (5 นาที)"],
  tags:"#มาลี #เช็กก่อนช้อป #1111",
  srcNote:"11 Nov sits inside the KTC 7–13 Nov 2026 campaign window (page opened 8 Nov 2026). That verifies the commerce moment only.",
  confirm:"Sales must confirm the official store, SKU availability and terms before any link or offer is added.",
  caution:"No invented discount, free shipping, or lowest-price claim. Without an approved store link, publish the checklist only."},
 {id:3,code:"N3",d:"2026-11-12",p:["TT","IG"],f:"Reel · 8–12 s",pl:"fun",easy:1,mins:20,t:"L",evidence:"editorial",tr:"breaks",
  pr:"Approved coconut-water pack · แพ็กน้ำมะพร้าวที่อนุมัติแล้ว",
  slot:"Suggested 15:00 ICT, Thu 12 Nov · เวลาที่แนะนำ 15:00 น. พฤหัส 12 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"พักหน้าจอหนึ่งเพลง แต่ใช้เสียงของเราเอง",hEN:"A tiny screen break, with our own soundtrack.",
  cTH:"พักจากหน้าจอสักครู่ เทใส่แก้ว แล้วกลับไปต่อในจังหวะของคุณ วันนี้คุณพักมุมไหน?",cEN:"Take a short screen break, pour a glass, then return at your own pace. Where's your break spot?",
  shot:"Close the laptop, open the pack, pour over ice into a clean glass, hold on window light. Keep the real pour and ice sounds. No commercial song. Blank the screen so work stays private. · ปิดแล็ปท็อป เปิดแพ็ก เทบนน้ำแข็งในแก้วสะอาด ค้างที่แสงหน้าต่าง ใช้เสียงเทและน้ำแข็งจริง ไม่ใช้เพลงเชิงพาณิชย์ ทำให้หน้าจอว่างเพื่อไม่ให้เห็นงาน",
  steps:["Blank the screen and set the glass (5 min) · ทำให้หน้าจอว่างและจัดแก้ว (5 นาที)","Pour on camera by the window with the mic open (10 min) · เทให้เห็นในเฟรมข้างหน้าต่าง เปิดไมค์ (10 นาที)","Cut to 8–12 seconds and write the caption (5 min) · ตัดเหลือ 8–12 วินาทีแล้วเขียนแคปชัน (5 นาที)"],
  tags:"#มาลี #พักสักนิด #DeskBreak",
  srcNote:"Editorial weekday break. Not a verified TikTok format and not an X trend.",
  confirm:"Use an approved pack and a location Malee can show.",
  caution:"No stress, focus, detox, or productivity claim. No unlicensed music."},
 {id:4,code:"N4",d:"2026-11-14",p:["TT","IG"],f:"Reel · 12–15 s",pl:"fun",t:"L",evidence:"editorial",tr:"breaks",
  pr:"Approved small fruit-juice pack · แพ็กน้ำผลไม้ขนาดเล็กที่อนุมัติแล้ว",
  slot:"Suggested 09:00 ICT, Sat 14 Nov · เวลาที่แนะนำ 09:00 น. เสาร์ 14 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"ออกไปเดินเล่น เอาอะไรติดกระเป๋า?",hEN:"A little walk—what's in your bag?",
  cTH:"วันว่างของเรา: หมวก ผ้าเช็ดหน้า และเครื่องดื่มที่ชอบ เดินเล่นเสร็จเก็บของกลับให้ครบด้วยนะ",cEN:"Our day-off kit: a hat, a handkerchief and a favourite drink. Bring everything back with you.",
  shot:"Flat-lay of the bag, the pack goes in, shoes at the doorway, then the drink at a permitted table. No race footage and no event logos. · วางของในกระเป๋ามุมบน ใส่แพ็ก รองเท้าที่ประตู แล้วเครื่องดื่มบนโต๊ะที่ได้รับอนุญาต ห้ามภาพงานวิ่งหรือโลโก้งาน",
  tags:"#มาลี #วันว่างของเรา #WeekendBag",
  srcNote:"Editorial outing. An X snapshot that morning included running-event chatter; that is not a product benefit and not a reason to join those tags.",
  confirm:"Follow the pack's storage directions. Film only where you are allowed.",
  caution:"No race hashtags, implied sponsorship, or endurance and recovery claims."},
 {id:5,code:"N5",d:"2026-11-15",p:["IG","FB"],f:"Short video",pl:"fest",t:"E",evidence:"verified",tr:"loy",
  pr:"Approved fruit-juice pack · แพ็กน้ำผลไม้ที่อนุมัติแล้ว",
  slot:"Suggested 19:00 ICT, Sun 15 Nov · เวลาที่แนะนำ 19:00 น. อาทิตย์ 15 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"ซ้อมมุมแสงไฟ ก่อนคืนลอยกระทง",hEN:"Try a little glow before Loy Krathong.",
  cTH:"ลอยกระทงปีนี้ 24 พฤศจิกายน ลองจัดมุมแสงไฟเล็ก ๆ ที่บ้านไว้ก่อน คืนจริงอย่าลืมดูข้อแนะนำของพื้นที่ และเก็บบรรจุภัณฑ์กลับด้วยนะ",cEN:"Loy Krathong is 24 November. Try a small light setup at home first; follow venue guidance and take your packaging home on the night.",
  shot:"Warm LED string lights behind the pack, rack focus to the glass, end on a 24 Nov date card. No floating object, no firework, no flame. · ไฟเส้น LED อุ่นหลังแพ็ก เลื่อนโฟกัสไปที่แก้ว จบด้วยการ์ดวันที่ 24 พ.ย. ไม่ลอยของ ไม่จุดพลุ ไม่ใช้เปลวไฟ",
  tags:"#มาลี #ลอยกระทง2569 #มุมแสงไฟ",
  srcNote:"TAT Newsroom, 5 Nov 2026: full moon and Loy Krathong are Tuesday 24 Nov 2026. Sukhothai's programme starts 15 Nov. The at-home setup is an editorial suggestion.",
  confirm:"Brand-owned footage only. Do not imply Malee sponsors a festival.",
  caution:"Do not float packaging, food, or cups. No zero-waste or biodegradability claim."},
 {id:6,code:"N6",d:"2026-11-19",p:["TT","IG"],f:"Reel · 15 s",pl:"rec",t:"L",evidence:"editorial",
  pr:"Approved canned fruit, plus juice only if the brand team confirms they go together · ผลไม้กระป๋องที่อนุมัติ และน้ำผลไม้เมื่อทีมยืนยันว่าเข้ากัน",
  slot:"Suggested 15:00 ICT, Thu 19 Nov · เวลาที่แนะนำ 15:00 น. พฤหัส 19 พ.ย. (ไม่ใช่เวลาที่วัดว่าดีที่สุด)",
  hTH:"ผลไม้หนึ่งถ้วย ทำตามได้สามช็อต",hEN:"One fruit cup, three simple shots.",
  cTH:"เตรียมผลไม้ ใส่ถ้วย เติมเครื่องดื่มรสที่ชอบตามใจ แค่นี้ก็ได้ไอเดียของว่างอีกหนึ่งแบบ—คุณจะจับคู่รสไหน?",cEN:"Prepare fruit, spoon it into a cup and add your chosen drink. One more snack idea—which flavours would you pair?",
  shot:"Clean utensils, drained ready-to-eat fruit, a small measured pour, then a spoon lift. Follow the label. No nutrition numbers on screen. · อุปกรณ์สะอาด ผลไม้พร้อมทานที่สะเด็ดน้ำ เททีละน้อย ยกช้อน ทำตามฉลาก ไม่ใส่ตัวเลขโภชนาการ",
  tags:"#มาลี #ไอเดียของว่าง #FruitCup",
  srcNote:"Editorial snack for the week of 16–22 Nov. Not an asserted platform trend.",
  confirm:"Approve ingredients, allergens, food handling, and whether the juice SKU belongs with the fruit.",
  caution:"No weight, sugar, or vitamin claim unless it is substantiated and Legal (อย.) has reviewed it."},
 {id:7,code:"N7",d:"2026-11-25",p:["FB","IG"],f:"Reel · optional teaser",pl:"com",t:"E",evidence:"verified",tr:"father",
  pr:"Approved juice at a family table · น้ำผลไม้ที่อนุมัติบนโต๊ะครอบครัว",
  slot:"Prep during 9–15 Nov, do not publish then. Optional teaser suggested 19:00 ICT, Wed 25 Nov, only if approved. Main asset held for 5 Dec. · เตรียม 9–15 พ.ย. ยังไม่โพสต์ ทีเซอร์ทางเลือก 19:00 น. 25 พ.ย. เมื่ออนุมัติเท่านั้น ไฟล์หลักรอ 5 ธ.ค.",
  prepNote:"Production prep is 9–15 Nov. The calendar date on this card is an optional teaser, not the Father's Day post. The main asset stays unpublished until 5 Dec approval.",
  hTH:"มีเรื่องไหนที่ยังไม่เคยถามพ่อ?",hEN:"What have you never asked Dad?",
  cTH:"ก่อนถึงวันพ่อ ลองเก็บคำตอบเล็ก ๆ จากคนในครอบครัว: ตอนเด็ก ๆ ชอบมื้อไหนที่สุด? ถ่ายเก็บไว้ด้วยกัน หรือคุยกันโดยไม่ต้องเปิดกล้องก็ได้",cEN:"Before Father's Day, save a small family story: what was your favourite meal growing up? Film it together—or simply have the conversation off camera.",
  shot:"Consenting adult hands set glasses, a handwritten question, one short answer. An adult may speak off camera. No child is required. · มือของผู้ใหญ่ที่ยินยอมจัดแก้ว คำถามลายมือ คำตอบสั้น ๆ เสียงผู้ใหญ่นอกกล้องได้ ไม่จำเป็นต้องมีเด็ก",
  tags:"#มาลี #เรื่องเล่าที่โต๊ะกินข้าว #FamilyStories",
  srcNote:"Date: Bank of Thailand notification, Saturday 5 Dec 2026, with Monday 7 Dec as the substitute holiday. The teaser is optional and still needs approval.",
  confirm:"Written consent for every person and voice. Cultural and brand review before anything about 5 Dec is published.",
  caution:"Warm, inclusive wording. No pressure around grief. No royal portrait, emblem, or implied endorsement. No discount built on the commemorative day."}
];
SI.THEMES = {week:"9–15 Nov 2026", weekTH:"9–15 พ.ย. 2569",
  from:"Sources checked 8 Nov 2026 ICT. A verified line is a campaign or a calendar fact. An editorial line is a suggestion, not a measured trend.",
  items:[
 {k:"sale1111",lead:1,th:"11.11 เลือกของที่ใช้จริง",en:"11.11, clear choices",
  why:"KTC's Double Day page, opened 8 Nov 2026, shows a promotion period of 7–13 Nov 2026. 11.11 commerce is active this week. That is a campaign calendar fact, not an X trend, and not a Malee offer.",
  pr:"Generic fruit juice and coconut water. Confirm the real SKU before filming.",ids:[1,2],
  note:"Shoot a pack-choice poll and a buying checklist. Add a commercial line only after Sales signs off. No invented deal or scarcity."},
 {k:"breaks",th:"พักสั้น ๆ ในวันธรรมดา",en:"Small breaks, real moments",
  why:"Editorial evergreen for a weekday, from the desk toward the weekend. Not a verified viral format, and not a hydration or exercise claim.",
  pr:"Generic coconut water and fruit juice.",ids:[3,4],
  note:"Original point of view and original sound. No recovery, superiority, or health promise."},
 {k:"loy",th:"เตรียมคอนเทนต์คืนแสงไฟ",en:"Prepare for riverside lights",
  why:"TAT Newsroom, 5 Nov 2026: Loy Krathong is Tuesday 24 Nov 2026. Sukhothai runs 15–24 Nov. Bangkok's main programme is 17–29 Nov. This week is for practice, not the festival night. A government events snippet mentioning 13–15 Nov programmes was not fully page-verified.",
  pr:"Approved fruit juice, at home.",ids:[5],
  note:"Film tabletop bokeh now. Respect waterways: no packs, food, or cups in the water, and no eco claim you cannot substantiate."},
 {k:"father",th:"เริ่มเตรียมวันพ่อ",en:"Start Father's Day assets",
  why:"Bank of Thailand notification: Saturday 5 Dec 2026 is the birthday anniversary, National Day and Father's Day. Monday 7 Dec is the substitute holiday. This lane sits outside the three-week calendar.",
  pr:"Generic juice at a family table.",ids:[7],
  note:"Consenting adults, inclusive tone. No royal image or emblem, no implied endorsement, no opportunistic discount. Prep now; do not publish the main asset yet."}
]};
SI.LATEST = {checked:"8 Nov 2026 ICT",
  intro:"Checked 8 Nov 2026 ICT. Each card is labelled verified campaign/calendar, observed public snapshot, or editorial suggestion. Nothing here is a popularity, engagement, or virality score. 11.11 and Loy Krathong are not described as current X trends.",
  items:[
 {k:"sale1111",kind:"verified",en:"11.11 commerce is on the calendar this week",th:"11.11 อยู่ในปฏิทินการค้าสัปดาห์นี้",
  what:"The KTC Double Day page, opened 8 Nov 2026, heads its promotion period as 7–13 Nov 2026. Platform windows on that page differ (Shopee, Lazada, TikTok Shop). No post volume was counted.",
  use:"A pack-choice poll (N1, Mon 9 Nov) and a three-point checklist (N2, Wed 11 Nov). Talk about choosing a real pack. Do not attach KTC, Shopee, Lazada, or TikTok Shop offers to Malee.",
  limit:"Not proof of a Malee discount, stock level, voucher, or Live slot. Sales must approve any store link and any price.",
  src:[{t:"KTC Double Day, opened 8 Nov 2026",u:"https://www.ktc.co.th/en/promotion/online-shopping-services/online-shopping/double-day"}],risk:"Do not copy another company's offer"},
 {k:"loy",kind:"verified",en:"Loy Krathong night is Tuesday 24 Nov 2026, not this week",th:"คืนลอยกระทงคืออังคาร 24 พ.ย. 2569 ไม่ใช่สัปดาห์นี้",
  what:"TAT Newsroom, 5 Nov 2026, states the full moon and Loy Krathong fall on 24 November 2026. Sukhothai is listed 15–24 Nov; Bangkok's main programme 17–29 Nov; some Bangkok venues 16–25 Nov; Tak 21–24 Nov.",
  use:"This week, film a small light setup at home (N5, Sun 15 Nov) and a date card. The night itself is 24 Nov.",
  limit:"Regional programmes are not the nationwide night. A thailand.go.th events snippet was not fully fetched. Do not claim Malee is part of an organiser's programme.",
  src:[{t:"TAT Newsroom, 5 Nov 2026",u:"https://www.tatnews.org/2026/11/loi-krathong-2026-lights-up-thailands-rivers-and-historic-cities/"}],risk:"Venue rules and no litter in water"},
 {k:"father",kind:"verified",en:"Father's Day preparation for Saturday 5 Dec 2026",th:"เริ่มเตรียมวันพ่อ เสาร์ 5 ธ.ค. 2569",
  what:"The Bank of Thailand holiday notification lists Monday 7 December 2026 as the substitute for H.M. King Bhumibol Adulyadej the Great’s Birthday, National Day and Father’s Day, noting Saturday 5 December 2026.",
  use:"Collect a family-table story during 9–15 Nov (N7). Optional teaser 25 Nov only with approval. Main film waits for 5 Dec approval.",
  limit:"This dashboard does not announce closures. The U.S. Embassy holiday page returned HTTP 500 on 8 Nov 2026 and is not the source. No U.S. holiday is shown as a Thai holiday.",
  src:[{t:"Bank of Thailand notification PDF, checked 8 Nov 2026",u:"https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2568/EngPDF/25680162.pdf"}],risk:"No royal portrait, emblem, or implied endorsement"},
 {k:"breaks",kind:"editorial",en:"Small breaks are a suggestion, not a trend we measured",th:"พักสั้น ๆ เป็นข้อเสนอ ไม่ใช่เทรนด์ที่เราวัดได้",
  what:"No source in this check showed a verified 'desk break' or 'pour' trend. The X snapshot is filed under what we are not chasing.",
  use:"N3 (Thu 12 Nov) is an original-sound pour. N4 (Sat 14 Nov) is a walk-bag flat lay. Both are editorial.",
  limit:"Do not label these formats as viral, trending, or better for health.",
  src:[{t:"No external trend source. Editorial suggestion written 8 Nov 2026.",u:""}],risk:"No health or productivity claim"}
 ],
 notChasing:{
  en:"What we are not chasing. Public X Thailand trends, top 20, about 09:47 ICT on 8 Nov 2026 (WOEID 23424960). No volumes came back. Most other entries were entertainment, fan, or celebrity tags. This list is not a reason to post.",
  th:"สิ่งที่เราไม่ไปร่วม ท็อป 20 เทรนด์ X ประเทศไทย ประมาณ 09:47 น. 8 พ.ย. 2569 ไม่มีตัวเลขปริมาณ ส่วนใหญ่เป็นแท็กบันเทิง แฟนด้อม หรือคนดัง รายการนี้ไม่ใช่เหตุผลให้โพสต์",
  items:[
    {t:"#NESCAFERUNKHONKAEN2026",u:"https://x.com/search?q=%23NESCAFERUNKHONKAEN2026",why:"Competitor-branded event tag. Do not use it."},
    {t:"MAY RUN & SMILE 2026",u:"https://x.com/search?q=MAY%20RUN%20%26%20SMILE%202026",why:"Branded run. Do not imply sponsorship or a recovery benefit."},
    {t:"KHEMJIRA FOREVER EP2",u:"https://x.com/search?q=KHEMJIRA%20FOREVER%20EP2",why:"Series and fandom. Do not use the title, stills, or cast."},
    {t:"#ไอจีล่ม",u:"https://x.com/search?q=%23%E0%B9%84%E0%B8%AD%E0%B8%88%E0%B8%B5%E0%B8%A5%E0%B9%88%E0%B8%A1",why:"Seen on the snapshot. Not confirmation that a service was down, and not a joke to join."}
  ],
  foot:"11.11 and Loy Krathong were not treated as X trends from this snapshot. A generic walk or a film night, if you make one, is an editorial adaptation with Malee's own footage and audio."
 }
};
SI.TRENDS = [
 {en:"Pack choice poll",th:"โพลเลือกแพ็ก",how:"Two approved packs, one question, no purchase required. · สองแพ็กที่อนุมัติ คำถามเดียว ไม่ต้องซื้อ",e:1},
 {en:"Checklist carousel",th:"คารูเซลเช็กก่อนสั่ง",how:"Pack size, quantity, store terms. No price unless Sales approved it. · ขนาดแพ็ก จำนวน เงื่อนไขร้าน ไม่ใส่ราคาถ้าฝ่ายขายยังไม่อนุมัติ",e:1},
 {en:"Original-sound pour",th:"เสียงเทของเราเอง",how:"Real pour and ice. No unlicensed song. · เสียงเทและน้ำแข็งจริง ไม่ใช้เพลงที่ไม่มีสิทธิ์",e:1},
 {en:"Three-step recipe",th:"เมนูสามช็อต",how:"Follow the label. No nutrition overlay. · ทำตามฉลาก ไม่ใส่ตัวเลขโภชนาการ",e:1},
 {en:"Tabletop light practice",th:"ซ้อมแสงบนโต๊ะ",how:"LED lights at home. Nothing goes in the water. · ไฟ LED ที่บ้าน ไม่เอาของลงน้ำ",e:1},
 {en:"Bag flat-lay",th:"ของในกระเป๋ามุมบน",how:"Your own walk kit. No race logos. · ชุดเดินของเราเอง ไม่ใช้โลโก้งานวิ่ง",e:1},
 {en:"Family question",th:"คำถามในครอบครัว",how:"Consenting adults. Off-camera is fine. · ผู้ใหญ่ที่ยินยอม ไม่เปิดกล้องก็ได้",e:2},
 {en:"Reply to a real question",th:"ตอบคำถามจริง",how:"Say only what the label says. · พูดเท่าที่อยู่บนฉลาก",e:1}
];
SI.COMPETITORS = [
 {b:"Tipco",cat:"Juice · น้ำผลไม้"},{b:"Doi Kham",cat:"Juice · น้ำผลไม้"},{b:"UFC Refresh",cat:"Coconut water · น้ำมะพร้าว"},
 {b:"Chabaa",cat:"Juice · น้ำผลไม้"},{b:"if (if-coconut)",cat:"Coconut water · น้ำมะพร้าว"},{b:"Foremost",cat:"Dairy · นม"},{b:"Dutch Mill",cat:"Dairy / yogurt drink · นม/นมเปรี้ยว"}
];
SI.COMP_COLS = [
 ["fb","FB page link","ลิงก์เพจ FB"],["ig","IG handle","ชื่อ IG"],["tt","TikTok handle","ชื่อ TikTok"],
 ["fol","Followers FB/IG/TT","ผู้ติดตาม FB/IG/TT"],["ppw","Posts per week","โพสต์/สัปดาห์"],["fmt","Most used format","รูปแบบที่ใช้บ่อย"],
 ["best","Best post this month (link)","โพสต์เด่นเดือนนี้ (ลิงก์)"],["note","What we can learn","เราเรียนรู้อะไรได้"],["chk","Date checked","วันที่เช็ก"]
];
SI.VIZ = [
 {k:"heat",en:"When people respond: a day × hour heatmap, after you upload real rows",th:"คนตอบช่วงไหน: ตารางสีวัน × ชั่วโมง หลังอัปโหลดแถวจริง"},
 {k:"bars",en:"Content pillar vs saves + shares per 1,000 reach, from your file",th:"หมวดเนื้อหา เทียบเซฟ+แชร์ต่อคนเห็น 1,000 คน จากไฟล์ของคุณ"},
 {k:"cal",en:"This calendar with each post's result on the date, once results exist",th:"ปฏิทินนี้พร้อมผลของแต่ละโพสต์ เมื่อมีผลแล้ว"},
 {k:"cloud",en:"Hashtag cloud from your own posts, not from a trend chart",th:"เมฆแฮชแท็กจากโพสต์ของเราเอง ไม่ใช่จากชาร์ตเทรนด์"},
 {k:"sov",en:"Competitor share of voice, only after the team fills the watch table",th:"สัดส่วนเสียงคู่แข่ง หลังทีมกรอกตารางติดตามแล้ว"},
 {k:"gal",en:"Top posts gallery ranked by saves, from your upload",th:"แกลเลอรีโพสต์เด่นเรียงตามเซฟ จากไฟล์ที่อัปโหลด"},
 {k:"line",en:"Follower line with post markers, from your upload",th:"เส้นผู้ติดตามพร้อมจุดวันที่โพสต์ จากไฟล์ที่อัปโหลด"},
 {k:"ab",en:"Hook scoreboard: which first line keeps people watching, from your tests",th:"ตารางฮุก: ประโยคแรกแบบไหนคนดูต่อ จากการทดสอบของคุณ"}
];

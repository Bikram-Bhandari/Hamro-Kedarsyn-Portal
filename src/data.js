/* हाम्रो केदारस्यूँ — site content data (Nepali)
   Centralised so the public site renders from one source. */

export const site = {
  name: 'हाम्रो केदारस्यूँ',
  tagline: 'प्राकृतिक सौन्दर्य, संस्कृति, सम्पदा र पर्यटनको डिजिटल परिचय',
  phone: '०९४-५४००१२',
  phoneRaw: '+97794540012',
  email: 'info@kedarsyun.gov.np',
  address: 'केदारस्यूँ गाउँपालिका, बझाङ, सुदूरपश्चिम प्रदेश, नेपाल',
  mapQuery: 'Kedarsyun Rural Municipality, Bajhang, Nepal',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
  },
};

export const nav = [
  { label: 'गृहपृष्ठ', href: '/' },
  { label: 'हाम्रो केदारस्यूँ', href: '/about',
    children: [
      { label: 'गाउँपालिकाको परिचय', href: '/about' },
      { label: 'इतिहास', href: '/about#itihas' },
      { label: 'भूगोल', href: '/about#bhugol' },
      { label: 'जनसंख्या', href: '/about#janjana' },
      { label: 'वडा विवरण', href: '/about#wada' },
    ],
  },
  { label: 'पर्यटन', href: '/tourist',
    children: [
      { label: 'पर्यटकीय स्थल', href: '/tourist' },
      { label: 'धार्मिक स्थल', href: '/religious' },
      { label: 'प्राकृतिक सम्पदा', href: '/nature' },
      { label: 'होमस्टे', href: '/homestay' },
    ],
  },
  { label: 'संस्कृति', href: '/culture',
    children: [
      { label: 'संस्कृति र देउडा', href: '/culture' },
      { label: 'स्थानीय परिकार', href: '/food' },
      { label: 'स्थानीय उत्पादन', href: '/products' },
    ],
  },
  { label: 'ग्यालरी', href: '/gallery',
    children: [
      { label: 'फोटो ग्यालरी', href: '/gallery' },
      { label: 'भिडियो ग्यालरी', href: '/videos' },
    ],
  },
  { label: 'समाचार', href: '/news' },
  { label: 'कार्यक्रम', href: '/events' },
  { label: 'सम्पर्क', href: '/contact' },
];

/* ---------- Hero slides ---------- */
export const heroes = [
  {
    img: 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'सुदूरपश्चिम प्रदेश · बझाङ',
    title: 'हिमाल, पहाड र संस्कृतिको अविस्मरणीय यात्रा',
    desc: 'केदारस्यूँ गाउँपालिका — प्राकृतिक सौन्दर्य, धार्मिक सम्पदा र परम्परागत गाउँले जीवनशैलीको डिजिटल परिचय।',
  },
  {
    img: 'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'पर्यटकीय गन्तव्य',
    title: 'अविस्मरणीय पदयात्रा र दृश्यावलोकन',
    desc: 'हिमशृंगखली, घना जंगल र शुद्ध नदीको किनार — केदारस्यूँ प्रकृतिप्रेमीका लागि स्वर्ग।',
  },
  {
    img: 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'संस्कृति र देउडा',
    title: 'देउडा, नृत्य र चाडपर्वको रौनक',
    desc: 'पुस्तौंदेखि चलिआएको देउडा संस्कृति, लोक नृत्य र उत्सवमय चाडपर्वको जीवन्त अनुभव।',
  },
  {
    img: 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'प्राकृतिक सम्पदा',
    title: 'झरना, नदी र घना जंगल',
    desc: 'सुरिलो झरना, माझी नदी र जैविक विविधताले भरिपूर्ण केदारस्यूँको प्राकृतिक सम्पदा।',
  },
];

/* ---------- Tourist places ---------- */
export const touristPlaces = [
  {
    id: 'kedardanda',
    title: 'केदारडाँडा',
    badge: 'प्रमुख आकर्षण',
    img: 'https://images.pexels.com/photos/38805765/pexels-photo-38805765.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/38805765/pexels-photo-38805765.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/28749430/pexels-photo-28749430.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    short: 'सुदूरपश्चिमको एक उत्कृष्ट दृश्यावलोकन स्थल, जहाँबाट हिमशृंगखलीको मनमोहक दृश्य देखिन्छ।',
    desc: 'केदारडाँडा केदारस्यूँ गाउँपालिकाको सर्वोच्च दृश्यावलोकन स्थल हो। यहाँबाट बिहानीको सूर्योदय र हिमालय शृंगखलीको दृश्यले मन जित्छ। चाडपर्वको अवसरमा यहाँ ठूलो मेला लाग्छ।',
    howToReach: 'सुर्खेत वा धनगढीबाट बझाङ जोड्ने सडक हुँदा चैते–केदारस्यूँ बाटोसम्म बस तथा जिप उपलब्ध। त्यसपछि लगभग ३ घण्टाको पदयात्रा।',
    bestTime: 'असोजदेखि चैतसम्म (आकाश खुला हुने समय)।',
    tips: ['न्यानो लुगा अनिवार्य', 'प्रशस्त पानी बोक्नुहोस्', 'स्थानीय गाइड लिनुहोस्', 'फोटो क्यामेरा नबिर्सनुहोस्'],
    mapQuery: 'Kedardanda, Bajhang, Nepal',
  },
  {
    id: 'surilo-jharana',
    title: 'सुरिलो झरना',
    badge: 'प्राकृतिक',
    img: 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/12964294/pexels-photo-12964294.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/28293730/pexels-photo-28293730.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    short: 'घना जंगलको बीचमा अवस्थित रमणीय झरना, गर्मीमा शीतल विश्राम स्थल।',
    desc: 'सुरिलो झरना केदारस्यूँको प्राकृतिक सम्पदामध्ये एक हो। चट्टानबाट खस्ने पानीको गुर्लुङ्गो र वरपरको घना जंगलले पर्यटकलाई आकर्षित गर्दछ। वर्षा ऋतुमा यसको सौन्दर्य झन् बढी हुन्छ।',
    howToReach: 'गाउँपालिका केन्द्रबाट करिब ८ किलोमिटर टाढा, जिप र अलिकति पदयात्रा।',
    bestTime: 'साउनदेखि कार्तिकसम्म।',
    tips: ['भिज्ने लुगा बोक्नुहोस्', 'चट्टानमा बस्दा सावधान', 'प्लास्टिक नफाल्नुहोस्'],
    mapQuery: 'Surilo Waterfall, Bajhang, Nepal',
  },
  {
    id: 'maji-nadi',
    title: 'माझी नदी किनार',
    badge: 'प्राकृतिक',
    img: 'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/25490306/pexels-photo-25490306.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/11067500/pexels-photo-11067500.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    short: 'शुद्ध पानीको माझी नदी, माछा मार्ने र फिरिङ्गे बाँध निर्माणको उत्तम स्थान।',
    desc: 'माझी नदी केदारस्यूँको जीवनरेखा हो। यसको सफा पानी र किनारको बालुवा देखि सुन्तला रोप्ने क्रमिस खेत यहाँको विशेषता हो। गर्मीमा पिकनिक र नुहाउने उत्तम स्थान।',
    howToReach: 'गाउँपालिका केन्द्रबाट सजिलै पुग्न सकिन्छ, करिब २ घण्टा।',
    bestTime: 'फागुनदेखि जेठसम्म।',
    tips: ['जलचर संरक्षणमा सहयोग गर्नुहोस्', 'नदी किनार सफा राख्नुहोस्'],
    mapQuery: 'Maji River, Bajhang, Nepal',
  },
  {
    id: 'ghodaghodi-tal',
    title: 'घोडाघोडी ताल',
    badge: 'प्राकृतिक',
    img: 'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/25490306/pexels-photo-25490306.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    short: 'शान्त र स्वच्छ पानीको प्राकृतिक ताल, चराचुरुंगीको बासस्थान।',
    desc: 'घोडाघोडी ताल वरपरको जंगलसँग मिलेर एउटा सुन्दर पारिस्थितिकीय प्रणाली बनाउँछ। यहाँ प्रवासी चराहरू आउँछन् र बोटिङ गर्न सकिन्छ।',
    howToReach: 'जिल्ला सदरमुकाम चैनपुरबाट सडक मार्ग।',
    bestTime: 'असोजदेखि माघसम्म।',
    tips: ['बोटिङ सामग्री स्थानीयबाट लिनुहोस्', 'चरा नडराउनुहोस्'],
    mapQuery: 'Ghodaghodi Lake, Bajhang, Nepal',
  },
];

/* ---------- Religious sites ---------- */
export const religiousSites = [
  {
    id: 'kedarnath-mandir',
    title: 'केदारनाथ मन्दिर',
    img: 'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=1200',
    short: 'भगवान शिवको प्राचीन मन्दिर, केदारस्यूँको नामको उत्पत्ति स्थल।',
    desc: 'केदारनाथ मन्दिर केदारस्यूँ गाउँपालिकाको सबैभन्दा पवित्र धार्मिक स्थल मानिन्छ। शिरास्त्री ऋषिले यहाँ तपस्या गरेको विश्वास छ। शिरवाहिनी पूजा र बडा दशैं अवसरमा विशेष पूजा हुन्छ।',
    history: 'यो मन्दिर शताब्दीऔन पुरानो मानिन्छ। पौराणिक कथाअनुसार भगवान शिवले यहाँ ध्यान गरेको विश्वास छ।',
    mapQuery: 'Kedarnath Temple, Bajhang, Nepal',
  },
  {
    id: 'kalika-mandir',
    title: 'कालिका मन्दिर',
    img: 'https://images.pexels.com/photos/29301658/pexels-photo-29301658.jpeg?auto=compress&cs=tinysrgb&w=1200',
    short: 'देवी कालिकाको मन्दिर, नवरात्रमा विशेष पूजा आजा।',
    desc: 'कालिका मन्दिरमा नवरात्रको अवसरमा ठूलो मेला लाग्छ। भक्तजनहरू मन्त्र गर्दै माना र बली चढाउँछन्।',
    history: 'स्थानीय विश्वासअनुसार यो मन्दिरमा पुग्नाले कुलदेवीको आशिर्वाद मिल्छ।',
    mapQuery: 'Kalika Temple, Bajhang, Nepal',
  },
  {
    id: 'deurali-than',
    title: 'देउराली थान',
    img: 'https://images.pexels.com/photos/38353001/pexels-photo-38353001.jpeg?auto=compress&cs=tinysrgb&w=1200',
    short: 'गाउँको रक्षक देवताको थान, पुर्खाको पूजास्थल।',
    desc: 'देउराली थान गाउँको संरक्षक देवताको पूजास्थल हो। विवाह, ब्रतबन्ध र अन्य शुभ कार्यमा यहाँ पूजा गरिन्छ।',
    history: 'पुर्खादेखि चलिआएको परम्परा, देउराली पूजा वर्षमा दुई पटक हुन्छ।',
    mapQuery: 'Deurali Than, Bajhang, Nepal',
  },
];

/* ---------- Nature ---------- */
export const natureItems = [
  {
    id: 'surilo-jharana',
    title: 'सुरिलो झरना',
    cat: 'झरना',
    img: 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'घना जंगलको बीचमा अवस्थित रमणीय झरना।',
  },
  {
    id: 'maji-nadi',
    title: 'माझी नदी',
    cat: 'नदी',
    img: 'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'शुद्ध पानीको नदी, जीवनरेखा।',
  },
  {
    id: 'ghodaghodi-tal',
    title: 'घोडाघोडी ताल',
    cat: 'ताल',
    img: 'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'शान्त पानीको प्राकृतिक ताल।',
  },
  {
    id: 'kedarsyun-jungle',
    title: 'केदारस्यूँ जंगल',
    cat: 'जंगल',
    img: 'https://images.pexels.com/photos/28293784/pexels-photo-28293784.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'जैविक विविधताले भरिपूर्ण घना जंगल।',
  },
  {
    id: 'kedar-danda',
    title: 'केदारडाँडा',
    cat: 'पहाड',
    img: 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'हिमाल दृश्यको उत्कृष्ट दृश्यावलोकन स्थल।',
  },
  {
    id: 'suryodaya-view',
    title: 'सूर्योदय दृश्यावलोकन',
    cat: 'दृश्यावलोकन',
    img: 'https://images.pexels.com/photos/24781735/pexels-photo-24781735.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'बिहानीको सूर्योदय र हिमशृंगखलीको मनमोहक दृश्य।',
  },
];

/* ---------- Culture ---------- */
export const cultureItems = [
  {
    id: 'deuda',
    title: 'देउडा',
    cat: 'लोक नृत्य',
    img: 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'देउडा सुदूरपश्चिमको पहिचान हो। गोलो घेरा बनाएर गाइने र नाच्ने यो नृत्य विवाह, चाडपर्व र मेलामा नभए नहुने हुन्छ। देउडाका धेरै प्रकार छन् — भद्रे, झ्याउरे, राई देउडा आदि।',
  },
  {
    id: 'bhes-bhusa',
    title: 'भेषभूषा',
    cat: 'परम्परा',
    img: 'https://images.pexels.com/photos/9206614/pexels-photo-9206614.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'स्थानीय महिला देशी गहना, गलबन्दी र चोलो लगाउँछन् भने पुरुष दौरा–सुरूवाल र टोपी। परम्परागत भेषभूषाले केदारस्यूँको पहिचान झल्काउँछ।',
  },
  {
    id: 'chadparva',
    title: 'चाडपर्व',
    cat: 'उत्सव',
    img: 'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'दशैं, तिहार, छठ, माघे संक्रान्ति, गौरा पर्व र स्थानीय जात्रा मेला केदारस्यूँका प्रमुख चाडपर्व हुन्। यी अवसरमा देउडा, भोज र नाचगान हुन्छ।',
  },
  {
    id: 'sanskar',
    title: 'संस्कार',
    cat: 'रीतिथिति',
    img: 'https://images.pexels.com/photos/26873185/pexels-photo-26873185.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'विवाह, ब्रतबन्ध, पास्नी, घरपुजन जस्ता संस्कार पुर्खादेखि चलिआएको परम्पराअनुसार मनाइन्छ। गाउँभरि एकआपसमा सहयोग गर्ने चलन छ।',
  },
];

/* ---------- Food ---------- */
export const foodItems = [
  {
    id: 'dal-bhat',
    title: 'डालभात तरकारी',
    img: 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'स्थानीय अर्वा चामल, मासको डाल र गोलभेंडाको अचारसहित गरिएको परम्परागत भोज।',
    items: 'अर्वा चामल, मासको डाल, साग, अचार, घ्यू',
  },
  {
    id: 'dhindo',
    title: 'ढिँडो',
    img: 'https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'कोदो वा फापरको पिठोले बनाइने ढिँडो, लेटो तरकारी र गुन्द्रुकसँग खाइन्छ।',
    items: 'कोदो/फापर पिठो, लेटो, गुन्द्रुक, अचार',
  },
  {
    id: 'chhurpi',
    title: 'छुर्पी र नुन–चामल',
    img: 'https://images.pexels.com/photos/33430562/pexels-photo-33430562.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'स्थानीय छुर्पी (दुग्धजन्य) र नुन–चामल केदारस्यूँको विशेष परिकार हो।',
    items: 'छुर्पी, नुन, चामल, घ्यू',
  },
  {
    id: 'sel-roti',
    title: 'सेलरोटी',
    img: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'चाडबाडको अवसरमा बनाइने गोलो रोटी, चामलको पिठोले बनेको मीठो परिकार।',
    items: 'चामल पिठो, चिनी, घ्यू, दूध',
  },
];

/* ---------- Products ---------- */
export const productItems = [
  {
    id: 'madh',
    title: 'मह (स्थानीय मह)',
    cat: 'कृषि उत्पादन',
    img: 'https://images.pexels.com/photos/30666799/pexels-photo-30666799.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'केदारस्यूँको जंगली फूलबाट मौरीले बनाएको शुद्ध मह, औषधीय गुणले भरिपूर्ण।',
  },
  {
    id: 'jadi-buti',
    title: 'जडीबुटी',
    cat: 'जडीबुटी',
    img: 'https://images.pexels.com/photos/8329328/pexels-photo-8329328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'चिराइतो, कुरिलो, पाँचऔले, भ्याकुर लगायत बहुमूल्य जडीबुटी यहाँको जंगलमा पाइन्छ।',
  },
  {
    id: 'daliya',
    title: 'डालिया र भकारी',
    cat: 'हस्तकला',
    img: 'https://images.pexels.com/photos/6208146/pexels-photo-6208146.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'बाँसको बोकाले बुनिएका डालिया, भकारी र डोको स्थानीय हस्तकला हुन्।',
  },
  {
    id: 'dugdha',
    title: 'दुग्ध उत्पादन',
    cat: 'कृषि उत्पादन',
    img: 'https://images.pexels.com/photos/4247118/pexels-photo-4247118.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'गाईभेसी पालनबाट उत्पादन हुने दूध, घ्यू र छुर्पी स्थानीय अर्थतन्त्रको मेरुदण्ड।',
  },
];

/* ---------- Homestay ---------- */
export const homestays = [
  {
    id: 'kedar-homestay',
    title: 'केदार होमस्टे',
    img: 'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'गाउँले घरमा आतिथ्य, स्थानीय परिकार र संस्कृतिको अनुभव।',
    facilities: ['स-साना कोठा', 'स्थानीय परिकार', 'गरम पानी', 'वाइफाइ'],
    contact: '९८००००००१२',
    mapQuery: 'Kedar Homestay, Bajhang, Nepal',
  },
  {
    id: 'surilo-homestay',
    title: 'सुरिलो होमस्टे',
    img: 'https://images.pexels.com/photos/14136902/pexels-photo-14136902.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'झरनाको नजिक, प्रकृतिको काखमा शान्त बस्ने व्यवस्था।',
    facilities: ['परिवारजन कोठा', 'गाइड', 'स्थानीय परिकार', 'धुवा रहित'],
    contact: '९८००००००३४',
    mapQuery: 'Surilo Homestay, Bajhang, Nepal',
  },
  {
    id: 'maji-homestay',
    title: 'माझी नदी होमस्टे',
    img: 'https://images.pexels.com/photos/27582015/pexels-photo-27582015.jpeg?auto=compress&cs=tinysrgb&w=1200',
    desc: 'नदी किनारमा रहेको आरामदायी होमस्टे, नुहाउने र फिरिङ्गे उपयुक्त।',
    facilities: ['नदी दृश्य', 'स्थानीय परिकार', 'गरम पानी', 'बार्बेक्यु'],
    contact: '९८००००००५६',
    mapQuery: 'Maji River Homestay, Bajhang, Nepal',
  },
];

/* ---------- Gallery ---------- */
export const galleryCategories = ['सबै', 'प्रकृति', 'संस्कृति', 'धार्मिक', 'गाउँ जीवन', 'चाडपर्व'];
export const galleryItems = [
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'हिमाल दृश्य' },
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'सुरिलो झरना' },
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'माझी नदी' },
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/28293784/pexels-photo-28293784.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'घना जंगल' },
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'पदयात्रा मार्ग' },
  { cat:'प्रकृति', img:'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'घोडाघोडी ताल' },
  { cat:'संस्कृति', img:'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'देउडा नृत्य' },
  { cat:'संस्कृति', img:'https://images.pexels.com/photos/9206614/pexels-photo-9206614.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'परम्परागत भेष' },
  { cat:'संस्कृति', img:'https://images.pexels.com/photos/36751338/pexels-photo-36751338.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'लोक बाजा' },
  { cat:'धार्मिक', img:'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'केदारनाथ मन्दिर' },
  { cat:'धार्मिक', img:'https://images.pexels.com/photos/29301658/pexels-photo-29301658.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'कालिका मन्दिर' },
  { cat:'धार्मिक', img:'https://images.pexels.com/photos/38353001/pexels-photo-38353001.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'देउराली थान' },
  { cat:'गाउँ जीवन', img:'https://images.pexels.com/photos/10151879/pexels-photo-10151879.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'खेतबारी' },
  { cat:'गाउँ जीवन', img:'https://images.pexels.com/photos/18647876/pexels-photo-18647876.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'गाउँ दृश्य' },
  { cat:'गाउँ जीवन', img:'https://images.pexels.com/photos/20434921/pexels-photo-20434921.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'गाउँले घर' },
  { cat:'चाडपर्व', img:'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'उत्सव' },
  { cat:'चाडपर्व', img:'https://images.pexels.com/photos/26873185/pexels-photo-26873185.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'चाड मनाउँदै' },
  { cat:'चाडपर्व', img:'https://images.pexels.com/photos/37234410/pexels-photo-37234410.jpeg?auto=compress&cs=tinysrgb&w=900', cap:'नयाँ वर्ष' },
];

/* ---------- Videos ---------- */
export const videos = [
  { id:'LxZ5sP6W2qQ', title:'केदारस्यूँ परिचय', cat:'परिचय',
    thumb:'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { id:'dQw4w9WgXcQ', title:'देउडा संस्कृति', cat:'संस्कृति',
    thumb:'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { id:'LxZ5sP6W2qQ', title:'सुरिलो झरना भ्रमण', cat:'प्रकृति',
    thumb:'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { id:'dQw4w9WgXcQ', title:'स्थानीय परिकार', cat:'परिकार',
    thumb:'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { id:'LxZ5sP6W2qQ', title:'केदारनाथ मन्दिर पूजा', cat:'धार्मिक',
    thumb:'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  { id:'dQw4w9WgXcQ', title:'होमस्टे अनुभव', cat:'होमस्टे',
    thumb:'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=1200' },
];

/* ---------- News ---------- */
export const newsItems = [
  { id:'n1', date:'२०८२ साउन १५', cat:'घोषणा', title:'केदारस्यूँ गाउँपालिकामा नयाँ पर्यटकीय मार्ग निर्माण',
    img:'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'गाउँपालिकाले पर्यटन प्रवर्द्धनका लागि केदारडाँडासम्म नयाँ पदयात्रा मार्ग निर्माण गर्ने योजना सार्वजनिक गरेको छ।' },
  { id:'n2', date:'२०८२ साउन १०', cat:'संस्कृति', title:'गौरा पर्व मनाउन तयारी शुरू',
    img:'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'आगामी महिना मनाइने गौरा पर्वका लागि स्थानीयले देउडा अभ्यास र भजन मण्डली तयारी गर्दैछन्।' },
  { id:'n3', date:'२०८२ साउन ५', cat:'कृषि', title:'स्थानीय मह उत्पादनमा वृद्धि',
    img:'https://images.pexels.com/photos/30666799/pexels-photo-30666799.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'यस वर्ष मौरी पालनबाट उत्पादन भएको महको मात्रा वृद्धि भएको किसानले जनाएका छन्।' },
  { id:'n4', date:'२०८२ असार २८', cat:'पूर्वाधार', title:'गाउँपालिका कार्यालय भवनको नयाँ तला थपियो',
    img:'https://images.pexels.com/photos/20434921/pexels-photo-20434921.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'जनसेवा सहज बनाउन गाउँपालिका कार्यालयमा थप तला निर्माण कार्य सम्पन्न भएको छ।' },
  { id:'n5', date:'२०८२ असार २०', cat:'पर्यटन', title:'होमस्टे सञ्चालनमा नयाँ अनुमति',
    img:'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'तीन नयाँ होमस्टे सञ्चालनका लागि गाउँपालिकाले अनुमति प्रदान गरेको छ।' },
  { id:'n6', date:'२०८२ असार १२', cat:'शिक्षा', title:'स्थानीय विद्यालयमा डिजिटल कक्षा सञ्चालन',
    img:'https://images.pexels.com/photos/8220089/pexels-photo-8220089.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt:'तीन वटा विद्यालयमा डिजिटल सामग्रीसहित कक्षा सञ्चालन थालिएको छ।' },
];

/* ---------- Events ---------- */
export const events = [
  { id:'e1', day:'१५', month:'साउन', year:'२०८२', title:'केदारडाँडा पदयात्रा कार्यक्रम',
    loc:'केदारडाँडा', time:'बिहान ६ बजे', desc:'पर्यटन प्रवर्द्धनका लागि आयोजित सामूहिक पदयात्रा। सहभागी दर्ता खुल्ला।' },
  { id:'e2', day:'२२', month:'साउन', year:'२०८२', title:'गौरा पर्व र देउडा प्रतियोगिता',
    loc:'गाउँपालिका चोक', time:'दिउँसो १ बजे', desc:'गौरा पर्व अवसरमा देउडा प्रतियोगिता र सांस्कृतिक कार्यक्रम।' },
  { id:'e3', day:'०५', month:'भाद्र', year:'२०८२', title:'स्थानीय उत्पादन प्रदर्शनी',
    loc:'गाउँपालिका परिसर', time:'बिहान १० बजे', desc:'मह, जडीबुटी, हस्तकला र कृषि उत्पादनको प्रदर्शनी तथा बिक्री।' },
  { id:'e4', day:'१२', month:'भाद्र', year:'२०८२', title:'केदारनाथ मन्दिर वार्षिक पूजा',
    loc:'केदारनाथ मन्दिर', time:'बिहान ७ बजे', desc:'वार्षिक शिव पूजा र भण्डारा। भक्तजनका लागि निःशुल्क भोज।' },
  { id:'p1', day:'२९', month:'असार', year:'२०८२', title:'रोपाइँ महोत्सव',
    loc:'माझी नदी किनार', time:'बिहान ८ बजे', desc:'असारे पर्वका अवसरमा रोपाइँ, दहीचिउरा र देउडा कार्यक्रम सम्पन्न भयो।', past:true },
  { id:'p2', day:'१४', month:'असार', year:'२०८२', title:'स्थानीय विद्यालय वार्षिकोत्सव',
    loc:'जनता मावि', time:'दिउँसो ११ बजे', desc:'विद्यार्थीहरूको सांस्कृतिक प्रस्तुति र पुरस्कार वितरण सम्पन्न।', past:true },
];

/* ---------- About ---------- */
export const about = {
  intro: 'केदारस्यूँ गाउँपालिका सुदूरपश्चिम प्रदेश, बझाङ जिल्लामा अवस्थित एक रमणीय र सांस्कृतिक रूपमा धनी गाउँपालिका हो। यो गाउँपालिका प्राकृतिक सौन्दर्य, धार्मिक सम्पदा र परम्परागत गाउँले जीवनशैलीका लागि प्रसिद्ध छ।',
  history: 'केदारस्यूँ नाम भगवान शिवको केदारस्थानसँग जोडिएको विश्वास छ। पौराणिक कालदेखि यो क्षेत्र तपस्या र धार्मिक गतिविधिको केन्द्र रहिआएको छ। ऐतिहासिक रूपमा यो क्षेत्र सुदूरपश्चिमको खस परम्परासँग जोडिएको छ।',
  geography: 'केदारस्यूँ गाउँपालिका पहाडी भू-धरातलमा अवस्थित छ। उत्तरमा हिमालय शृंगखली, दक्षिणमा घना जंगल र नदी उपत्यका छन्। समुद्र सतहबाट करिब १२०० देखि ३००० मिटरसम्म उचाइमा फैलिएको यो गाउँपालिकामा विविध हावापानी र जैविक विविधता पाइन्छ।',
  population: 'केदारस्यूँ गाउँपालिकाको कुल जनसंख्या करिब २०,००० छ। यहाँ विभिन्न जातजातिको बसोबास छ — छत्री, ब्राह्मण, ठकुरी, दलित तथा आदिवासी समुदाय मिलेर बस्छन्। कृषि प्रमुख पेसा हो।',
  area: 'करिब १८५ वर्ग कि.मि.',
  wards: 9,
  established: 'वि.सं. २०७३',
  office: 'केदारस्यूँ गाउँपालिका कार्यालय, चैनपुर',
  chair: 'वडा अध्यक्ष ज्यू',
  wardData: [
    { ward: 1, name: 'वडा नं. १', desc: 'गाउँपालिका सदरमुकाम नजिक, प्रशासनिक केन्द्र।' },
    { ward: 2, name: 'वडा नं. २', desc: 'कृषिप्रधान क्षेत्र, खेतीयोग्य जमिन।' },
    { ward: 3, name: 'वडा नं. ३', desc: 'घना जंगल र जडीबुटीको भण्डार।' },
    { ward: 4, name: 'वडा नं. ४', desc: 'सुरिलो झरना नजिक, पर्यटकीय।' },
    { ward: 5, name: 'वडा नं. ५', desc: 'परम्परागत गाउँ जीवन, होमस्टे।' },
    { ward: 6, name: 'वडा नं. ६', desc: 'माझी नदी किनार, कृषि।' },
    { ward: 7, name: 'वडा नं. ७', desc: 'धार्मिक स्थल, केदारनाथ मन्दिर।' },
    { ward: 8, name: 'वडा नं. ८', desc: 'पहाडी दृश्यावलोकन।' },
    { ward: 9, name: 'वडा नं. ९', desc: 'सीमावर्ती वडा, जंगल।' },
  ],
};

export const stats = [
  { num: '९', label: 'वटा वडा' },
  { num: '२०K+', label: 'जनसंख्या' },
  { num: '१२+', label: 'पर्यटकीय स्थल' },
  { num: '१८५', label: 'वर्ग कि.मि. क्षेत्रफल' },
];

export const faqs = [
  { q: 'केदारस्यूँ कसरी पुग्ने?', a: 'काठमाडौंबाट बझाङ (चैनपुर) उडेर वा सडक मार्गबाट सुर्खेत–बझाङ हुँदा पुग्न सकिन्छ। त्यसपछि स्थानीय बस वा जिप उपलब्ध।' },
  { q: 'भ्रमणका लागि उपयुक्त समय कुन हो?', a: 'असोजदेखि चैतसम्म आकाश खुला हुने भएकाले यो समय उत्तम मानिन्छ।' },
  { q: 'होमस्टे बुकिङ कसरी गर्ने?', a: 'सम्पर्क पृष्ठमा दिइएका फोन नम्बर मार्फत सीधै सञ्चालकसँग बुकिङ गर्न सकिन्छ।' },
  { q: 'गाउँपालिकाको कार्यालय कहाँ छ?', a: 'केदारस्यूँ गाउँपालिका कार्यालय चैनपुरमा अवस्थित छ।' },
];

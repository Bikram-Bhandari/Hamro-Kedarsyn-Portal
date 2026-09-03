-- Seed all content tables with the static data from data.js
-- so the admin dashboard shows real data and the frontend reads from Supabase.

-- 1. Hero slides
INSERT INTO hero_slides (title, subtitle, description, image_url, sort_order, is_active) VALUES
('हिमाल, पहाड र संस्कृतिको अविस्मरणीय यात्रा', 'सुदूरपश्चिम प्रदेश · बझाङ', 'केदारस्यूँ गाउँपालिका — प्राकृतिक सौन्दर्य, धार्मिक सम्पदा र परम्परागत गाउँले जीवनशैलीको डिजिटल परिचय।', 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1920', 0, true),
('अविस्मरणीय पदयात्रा र दृश्यावलोकन', 'पर्यटकीय गन्तव्य', 'हिमशृंगखली, घना जंगल र शुद्ध नदीको किनार — केदारस्यूँ प्रकृतिप्रेमीका लागि स्वर्ग।', 'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=1920', 1, true),
('देउडा, नृत्य र चाडपर्वको रौनक', 'संस्कृति र देउडा', 'पुस्तौंदेखि चलिआएको देउडा संस्कृति, लोक नृत्य र उत्सवमय चाडपर्वको जीवन्त अनुभव।', 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1920', 2, true),
('झरना, नदी र घना जंगल', 'प्राकृतिक सम्पदा', 'सुरिलो झरना, माझी नदी र जैविक विविधताले भरिपूर्ण केदारस्यूँको प्राकृतिक सम्पदा।', 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1920', 3, true);

-- 2. Tourist places
INSERT INTO tourist_places (title, badge, short_desc, description, image_url, gallery, how_to_reach, best_time, tips, map_query, is_featured) VALUES
('केदारडाँडा', 'प्रमुख आकर्षण', 'सुदूरपश्चिमको एक उत्कृष्ट दृश्यावलोकन स्थल, जहाँबाट हिमशृंगखलीको मनमोहक दृश्य देखिन्छ।', 'केदारडाँडा केदारस्यूँ गाउँपालिकाको सर्वोच्च दृश्यावलोकन स्थल हो। यहाँबाट बिहानीको सूर्योदय र हिमालय शृंगखलीको दृश्यले मन जित्छ। चाडपर्वको अवसरमा यहाँ ठूलो मेला लाग्छ।', 'https://images.pexels.com/photos/38805765/pexels-photo-38805765.jpeg?auto=compress&cs=tinysrgb&w=1200', '["https://images.pexels.com/photos/38805765/pexels-photo-38805765.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/28749430/pexels-photo-28749430.jpeg?auto=compress&cs=tinysrgb&w=1200"]'::jsonb, 'सुर्खेत वा धनगढीबाट बझाङ जोड्ने सडक हुँदा चैते–केदारस्यूँ बाटोसम्म बस तथा जिप उपलब्ध। त्यसपछि लगभग ३ घण्टाको पदयात्रा।', 'असोजदेखि चैतसम्म (आकाश खुला हुने समय)।', '["न्यानो लुगा अनिवार्य","प्रशस्त पानी बोक्नुहोस्","स्थानीय गाइड लिनुहोस्","फोटो क्यामेरा नबिर्सनुहोस्"]'::jsonb, 'Kedardanda, Bajhang, Nepal', true),
('सुरिलो झरना', 'प्राकृतिक', 'घना जंगलको बीचमा अवस्थित रमणीय झरना, गर्मीमा शीतल विश्राम स्थल।', 'सुरिलो झरना केदारस्यूँको प्राकृतिक सम्पदामध्ये एक हो। चट्टानबाट खस्ने पानीको गुर्लुङ्गो र वरपरको घना जंगलले पर्यटकलाई आकर्षित गर्दछ। वर्षा ऋतुमा यसको सौन्दर्य झन् बढी हुन्छ।', 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200', '["https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/12964294/pexels-photo-12964294.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/28293730/pexels-photo-28293730.jpeg?auto=compress&cs=tinysrgb&w=1200"]'::jsonb, 'गाउँपालिका केन्द्रबाट करिब ८ किलोमिटर टाढा, जिप र अलिकति पदयात्रा।', 'साउनदेखि कार्तिकसम्म।', '["भिज्ने लुगा बोक्नुहोस्","चट्टानमा बस्दा सावधान","प्लास्टिक नफाल्नुहोस्"]'::jsonb, 'Surilo Waterfall, Bajhang, Nepal', false),
('माझी नदी किनार', 'प्राकृतिक', 'शुद्ध पानीको माझी नदी, माछा मार्ने र फिरिङ्गे बाँध निर्माणको उत्तम स्थान।', 'माझी नदी केदारस्यूँको जीवनरेखा हो। यसको सफा पानी र किनारको बालुवा देखि सुन्तला रोप्ने क्रमिस खेत यहाँको विशेषता हो। गर्मीमा पिकनिक र नुहाउने उत्तम स्थान।', 'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200', '["https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/25490306/pexels-photo-25490306.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/11067500/pexels-photo-11067500.jpeg?auto=compress&cs=tinysrgb&w=1200"]'::jsonb, 'गाउँपालिका केन्द्रबाट सजिलै पुग्न सकिन्छ, करिब २ घण्टा।', 'फागुनदेखि जेठसम्म।', '["जलचर संरक्षणमा सहयोग गर्नुहोस्","नदी किनार सफा राख्नुहोस्"]'::jsonb, 'Maji River, Bajhang, Nepal', false),
('घोडाघोडी ताल', 'प्राकृतिक', 'शान्त र स्वच्छ पानीको प्राकृतिक ताल, चराचुरुंगीको बासस्थान।', 'घोडाघोडी ताल वरपरको जंगलसँग मिलेर एउटा सुन्दर पारिस्थितिकीय प्रणाली बनाउँछ। यहाँ प्रवासी चराहरू आउँछन् र बोटिङ गर्न सकिन्छ।', 'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200', '["https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/25490306/pexels-photo-25490306.jpeg?auto=compress&cs=tinysrgb&w=1200"]'::jsonb, 'जिल्ला सदरमुकाम चैनपुरबाट सडक मार्ग।', 'असोजदेखि माघसम्म।', '["बोटिङ सामग्री स्थानीयबाट लिनुहोस्","चरा नडराउनुहोस्"]'::jsonb, 'Ghodaghodi Lake, Bajhang, Nepal', false);

-- 3. Religious sites
INSERT INTO religious_sites (title, short_desc, description, image_url, history, map_query) VALUES
('केदारनाथ मन्दिर', 'भगवान शिवको प्राचीन मन्दिर, केदारस्यूँको नामको उत्पत्ति स्थल।', 'केदारनाथ मन्दिर केदारस्यूँ गाउँपालिकाको सबैभन्दा पवित्र धार्मिक स्थल मानिन्छ। शिरास्त्री ऋषिले यहाँ तपस्या गरेको विश्वास छ। शिरवाहिनी पूजा र बडा दशैं अवसरमा विशेष पूजा हुन्छ।', 'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=1200', 'यो मन्दिर शताब्दीऔन पुरानो मानिन्छ। पौराणिक कथाअनुसार भगवान शिवले यहाँ ध्यान गरेको विश्वास छ।', 'Kedarnath Temple, Bajhang, Nepal'),
('कालिका मन्दिर', 'देवी कालिकाको मन्दिर, नवरात्रमा विशेष पूजा आजा।', 'कालिका मन्दिरमा नवरात्रको अवसरमा ठूलो मेला लाग्छ। भक्तजनहरू मन्त्र गर्दै माना र बली चढाउँछन्।', 'https://images.pexels.com/photos/29301658/pexels-photo-29301658.jpeg?auto=compress&cs=tinysrgb&w=1200', 'स्थानीय विश्वासअनुसार यो मन्दिरमा पुग्नाले कुलदेवीको आशिर्वाद मिल्छ।', 'Kalika Temple, Bajhang, Nepal'),
('देउराली थान', 'गाउँको रक्षक देवताको थान, पुर्खाको पूजास्थल।', 'देउराली थान गाउँको संरक्षक देवताको पूजास्थल हो। विवाह, ब्रतबन्ध र अन्य शुभ कार्यमा यहाँ पूजा गरिन्छ।', 'https://images.pexels.com/photos/38353001/pexels-photo-38353001.jpeg?auto=compress&cs=tinysrgb&w=1200', 'पुर्खादेखि चलिआएको परम्परा, देउराली पूजा वर्षमा दुई पटक हुन्छ।', 'Deurali Than, Bajhang, Nepal');

-- 4. Nature items
INSERT INTO nature_items (title, category, description, image_url) VALUES
('सुरिलो झरना', 'झरना', 'घना जंगलको बीचमा अवस्थित रमणीय झरना।', 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('माझी नदी', 'नदी', 'शुद्ध पानीको नदी, जीवनरेखा।', 'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('घोडाघोडी ताल', 'ताल', 'शान्त पानीको प्राकृतिक ताल।', 'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('केदारस्यूँ जंगल', 'जंगल', 'जैविक विविधताले भरिपूर्ण घना जंगल।', 'https://images.pexels.com/photos/28293784/pexels-photo-28293784.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('केदारडाँडा', 'पहाड', 'हिमाल दृश्यको उत्कृष्ट दृश्यावलोकन स्थल।', 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('सूर्योदय दृश्यावलोकन', 'दृश्यावलोकन', 'बिहानीको सूर्योदय र हिमशृंगखलीको मनमोहक दृश्य।', 'https://images.pexels.com/photos/24781735/pexels-photo-24781735.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- 5. Culture items
INSERT INTO culture_items (title, category, description, image_url) VALUES
('देउडा', 'लोक नृत्य', 'देउडा सुदूरपश्चिमको पहिचान हो। गोलो घेरा बनाएर गाइने र नाच्ने यो नृत्य विवाह, चाडपर्व र मेलामा नभए नहुने हुन्छ। देउडाका धेरै प्रकार छन् — भद्रे, झ्याउरे, राई देउडा आदि।', 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('भेषभूषा', 'परम्परा', 'स्थानीय महिला देशी गहना, गलबन्दी र चोलो लगाउँछन् भने पुरुष दौरा–सुरूवाल र टोपी। परम्परागत भेषभूषाले केदारस्यूँको पहिचान झल्काउँछ।', 'https://images.pexels.com/photos/9206614/pexels-photo-9206614.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('चाडपर्व', 'उत्सव', 'दशैं, तिहार, छठ, माघे संक्रान्ति, गौरा पर्व र स्थानीय जात्रा मेला केदारस्यूँका प्रमुख चाडपर्व हुन्। यी अवसरमा देउडा, भोज र नाचगान हुन्छ।', 'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('संस्कार', 'रीतिथिति', 'विवाह, ब्रतबन्ध, पास्नी, घरपुजन जस्ता संस्कार पुर्खादेखि चलिआएको परम्पराअनुसार मनाइन्छ। गाउँभरि एकआपसमा सहयोग गर्ने चलन छ।', 'https://images.pexels.com/photos/26873185/pexels-photo-26873185.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- 6. Food items
INSERT INTO food_items (title, description, image_url, ingredients) VALUES
('डालभात तरकारी', 'स्थानीय अर्वा चामल, मासको डाल र गोलभेंडाको अचारसहित गरिएको परम्परागत भोज।', 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=1200', 'अर्वा चामल, मासको डाल, साग, अचार, घ्यू'),
('ढिँडो', 'कोदो वा फापरको पिठोले बनाइने ढिँडो, लेटो तरकारी र गुन्द्रुकसँग खाइन्छ।', 'https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=1200', 'कोदो/फापर पिठो, लेटो, गुन्द्रुक, अचार'),
('छुर्पी र नुन–चामल', 'स्थानीय छुर्पी (दुग्धजन्य) र नुन–चामल केदारस्यूँको विशेष परिकार हो।', 'https://images.pexels.com/photos/33430562/pexels-photo-33430562.jpeg?auto=compress&cs=tinysrgb&w=1200', 'छुर्पी, नुन, चामल, घ्यू'),
('सेलरोटी', 'चाडबाडको अवसरमा बनाइने गोलो रोटी, चामलको पिठोले बनेको मीठो परिकार।', 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&w=1200', 'चामल पिठो, चिनी, घ्यू, दूध');

-- 7. Product items
INSERT INTO product_items (title, category, description, image_url) VALUES
('मह (स्थानीय मह)', 'कृषि उत्पादन', 'केदारस्यूँको जंगली फूलबाट मौरीले बनाएको शुद्ध मह, औषधीय गुणले भरिपूर्ण।', 'https://images.pexels.com/photos/30666799/pexels-photo-30666799.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('जडीबुटी', 'जडीबुटी', 'चिराइतो, कुरिलो, पाँचऔले, भ्याकुर लगायत बहुमूल्य जडीबुटी यहाँको जंगलमा पाइन्छ।', 'https://images.pexels.com/photos/8329328/pexels-photo-8329328.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('डालिया र भकारी', 'हस्तकला', 'बाँसको बोकाले बुनिएका डालिया, भकारी र डोको स्थानीय हस्तकला हुन्।', 'https://images.pexels.com/photos/6208146/pexels-photo-6208146.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('दुग्ध उत्पादन', 'कृषि उत्पादन', 'गाईभेसी पालनबाट उत्पादन हुने दूध, घ्यू र छुर्पी स्थानीय अर्थतन्त्रको मेरुदण्ड।', 'https://images.pexels.com/photos/4247118/pexels-photo-4247118.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- 8. Homestays
INSERT INTO homestays (title, description, image_url, facilities, contact, map_query) VALUES
('केदार होमस्टे', 'गाउँले घरमा आतिथ्य, स्थानीय परिकार र संस्कृतिको अनुभव।', 'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=1200', '["स-साना कोठा","स्थानीय परिकार","गरम पानी","वाइफाइ"]'::jsonb, '९८००००००१२', 'Kedar Homestay, Bajhang, Nepal'),
('सुरिलो होमस्टे', 'झरनाको नजिक, प्रकृतिको काखमा शान्त बस्ने व्यवस्था।', 'https://images.pexels.com/photos/14136902/pexels-photo-14136902.jpeg?auto=compress&cs=tinysrgb&w=1200', '["परिवारजन कोठा","गाइड","स्थानीय परिकार","धुवा रहित"]'::jsonb, '९८००००००३४', 'Surilo Homestay, Bajhang, Nepal'),
('माझी नदी होमस्टे', 'नदी किनारमा रहेको आरामदायी होमस्टे, नुहाउने र फिरिङ्गे उपयुक्त।', 'https://images.pexels.com/photos/27582015/pexels-photo-27582015.jpeg?auto=compress&cs=tinysrgb&w=1200', '["नदी दृश्य","स्थानीय परिकार","गरम पानी","बार्बेक्यु"]'::jsonb, '९८००००००५६', 'Maji River Homestay, Bajhang, Nepal');

-- 9. Gallery items
INSERT INTO gallery_items (category, image_url, caption) VALUES
('प्रकृति', 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=900', 'हिमाल दृश्य'),
('प्रकृति', 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=900', 'सुरिलो झरना'),
('प्रकृति', 'https://images.pexels.com/photos/29228188/pexels-photo-29228188.jpeg?auto=compress&cs=tinysrgb&w=900', 'माझी नदी'),
('प्रकृति', 'https://images.pexels.com/photos/28293784/pexels-photo-28293784.jpeg?auto=compress&cs=tinysrgb&w=900', 'घना जंगल'),
('प्रकृति', 'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=900', 'पदयात्रा मार्ग'),
('प्रकृति', 'https://images.pexels.com/photos/34164713/pexels-photo-34164713.jpeg?auto=compress&cs=tinysrgb&w=900', 'घोडाघोडी ताल'),
('संस्कृति', 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=900', 'देउडा नृत्य'),
('संस्कृति', 'https://images.pexels.com/photos/9206614/pexels-photo-9206614.jpeg?auto=compress&cs=tinysrgb&w=900', 'परम्परागत भेष'),
('संस्कृति', 'https://images.pexels.com/photos/36751338/pexels-photo-36751338.jpeg?auto=compress&cs=tinysrgb&w=900', 'लोक बाजा'),
('धार्मिक', 'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=900', 'केदारनाथ मन्दिर'),
('धार्मिक', 'https://images.pexels.com/photos/29301658/pexels-photo-29301658.jpeg?auto=compress&cs=tinysrgb&w=900', 'कालिका मन्दिर'),
('धार्मिक', 'https://images.pexels.com/photos/38353001/pexels-photo-38353001.jpeg?auto=compress&cs=tinysrgb&w=900', 'देउराली थान'),
('गाउँ जीवन', 'https://images.pexels.com/photos/10151879/pexels-photo-10151879.jpeg?auto=compress&cs=tinysrgb&w=900', 'खेतबारी'),
('गाउँ जीवन', 'https://images.pexels.com/photos/18647876/pexels-photo-18647876.jpeg?auto=compress&cs=tinysrgb&w=900', 'गाउँ दृश्य'),
('गाउँ जीवन', 'https://images.pexels.com/photos/20434921/pexels-photo-20434921.jpeg?auto=compress&cs=tinysrgb&w=900', 'गाउँले घर'),
('चाडपर्व', 'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=900', 'उत्सव'),
('चाडपर्व', 'https://images.pexels.com/photos/26873185/pexels-photo-26873185.jpeg?auto=compress&cs=tinysrgb&w=900', 'चाड मनाउँदै'),
('चाडपर्व', 'https://images.pexels.com/photos/37234410/pexels-photo-37234410.jpeg?auto=compress&cs=tinysrgb&w=900', 'नयाँ वर्ष');

-- 10. Videos
INSERT INTO videos (title, category, youtube_id, thumbnail_url) VALUES
('केदारस्यूँ परिचय', 'परिचय', 'LxZ5sP6W2qQ', 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('देउडा संस्कृति', 'संस्कृति', 'dQw4w9WgXcQ', 'https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('सुरिलो झरना भ्रमण', 'प्रकृति', 'LxZ5sP6W2qQ', 'https://images.pexels.com/photos/16691216/pexels-photo-16691216.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('स्थानीय परिकार', 'परिकार', 'dQw4w9WgXcQ', 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('केदारनाथ मन्दिर पूजा', 'धार्मिक', 'LxZ5sP6W2qQ', 'https://images.pexels.com/photos/29806359/pexels-photo-29806359.jpeg?auto=compress&cs=tinysrgb&w=1200'),
('होमस्टे अनुभव', 'होमस्टे', 'dQw4w9WgXcQ', 'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=1200');

-- 11. News items
INSERT INTO news_items (title, category, published_date, excerpt, content, image_url) VALUES
('केदारस्यूँ गाउँपालिकामा नयाँ पर्यटकीय मार्ग निर्माण', 'घोषणा', '२०८२ साउन १५', 'गाउँपालिकाले पर्यटन प्रवर्द्धनका लागि केदारडाँडासम्म नयाँ पदयात्रा मार्ग निर्माण गर्ने योजना सार्वजनिक गरेको छ।', 'गाउँपालिकाले पर्यटन प्रवर्द्धनका लागि केदारडाँडासम्म नयाँ पदयात्रा मार्ग निर्माण गर्ने योजना सार्वजनिक गरेको छ।', 'https://images.pexels.com/photos/25245176/pexels-photo-25245176.jpeg?auto=compress&cs=tinysrgb&w=800'),
('गौरा पर्व मनाउन तयारी शुरू', 'संस्कृति', '२०८२ साउन १०', 'आगामी महिना मनाइने गौरा पर्वका लागि स्थानीयले देउडा अभ्यास र भजन मण्डली तयारी गर्दैछन्।', 'आगामी महिना मनाइने गौरा पर्वका लागि स्थानीयले देउडा अभ्यास र भजन मण्डली तयारी गर्दैछन्।', 'https://images.pexels.com/photos/15192438/pexels-photo-15192438.jpeg?auto=compress&cs=tinysrgb&w=800'),
('स्थानीय मह उत्पादनमा वृद्धि', 'कृषि', '२०८२ साउन ५', 'यस वर्ष मौरी पालनबाट उत्पादन भएको महको मात्रा वृद्धि भएको किसानले जनाएका छन्।', 'यस वर्ष मौरी पालनबाट उत्पादन भएको महको मात्रा वृद्धि भएको किसानले जनाएका छन्।', 'https://images.pexels.com/photos/30666799/pexels-photo-30666799.jpeg?auto=compress&cs=tinysrgb&w=800'),
('गाउँपालिका कार्यालय भवनको नयाँ तला थपियो', 'पूर्वाधार', '२०८२ असार २८', 'जनसेवा सहज बनाउन गाउँपालिका कार्यालयमा थप तला निर्माण कार्य सम्पन्न भएको छ।', 'जनसेवा सहज बनाउन गाउँपालिका कार्यालयमा थप तला निर्माण कार्य सम्पन्न भएको छ।', 'https://images.pexels.com/photos/20434921/pexels-photo-20434921.jpeg?auto=compress&cs=tinysrgb&w=800'),
('होमस्टे सञ्चालनमा नयाँ अनुमति', 'पर्यटन', '२०८२ असार २०', 'तीन नयाँ होमस्टे सञ्चालनका लागि गाउँपालिकाले अनुमति प्रदान गरेको छ।', 'तीन नयाँ होमस्टे सञ्चालनका लागि गाउँपालिकाले अनुमति प्रदान गरेको छ।', 'https://images.pexels.com/photos/27219984/pexels-photo-27219984.jpeg?auto=compress&cs=tinysrgb&w=800'),
('स्थानीय विद्यालयमा डिजिटल कक्षा सञ्चालन', 'शिक्षा', '२०८२ असार १२', 'तीन वटा विद्यालयमा डिजिटल सामग्रीसहित कक्षा सञ्चालन थालिएको छ।', 'तीन वटा विद्यालयमा डिजिटल सामग्रीसहित कक्षा सञ्चालन थालिएको छ।', 'https://images.pexels.com/photos/8220089/pexels-photo-8220089.jpeg?auto=compress&cs=tinysrgb&w=800');

-- 12. Events
INSERT INTO events (title, description, location, event_time, day, month, year, is_past) VALUES
('केदारडाँडा पदयात्रा कार्यक्रम', 'पर्यटन प्रवर्द्धनका लागि आयोजित सामूहिक पदयात्रा। सहभागी दर्ता खुल्ला।', 'केदारडाँडा', 'बिहान ६ बजे', '१५', 'साउन', '२०८२', false),
('गौरा पर्व र देउडा प्रतियोगिता', 'गौरा पर्व अवसरमा देउडा प्रतियोगिता र सांस्कृतिक कार्यक्रम।', 'गाउँपालिका चोक', 'दिउँसो १ बजे', '२२', 'साउन', '२०८२', false),
('स्थानीय उत्पादन प्रदर्शनी', 'मह, जडीबुटी, हस्तकला र कृषि उत्पादनको प्रदर्शनी तथा बिक्री।', 'गाउँपालिका परिसर', 'बिहान १० बजे', '०५', 'भाद्र', '२०८२', false),
('केदारनाथ मन्दिर वार्षिक पूजा', 'वार्षिक शिव पूजा र भण्डारा। भक्तजनका लागि निःशुल्क भोज।', 'केदारनाथ मन्दिर', 'बिहान ७ बजे', '१२', 'भाद्र', '२०८२', false),
('रोपाइँ महोत्सव', 'असारे पर्वका अवसरमा रोपाइँ, दहीचिउरा र देउडा कार्यक्रम सम्पन्न भयो।', 'माझी नदी किनार', 'बिहान ८ बजे', '२९', 'असार', '२०८२', true),
('स्थानीय विद्यालय वार्षिकोत्सव', 'विद्यार्थीहरूको सांस्कृतिक प्रस्तुति र पुरस्कार वितरण सम्पन्न।', 'जनता मावि', 'दिउँसो ११ बजे', '१४', 'असार', '२०८२', true);

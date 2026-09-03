/* Admin module definitions — one config per content section */
import { icon } from '../icons.js';

export const modules = [
  { id: 'dashboard', label: 'ड्यासबोर्ड', icon: icon.dashboard, group: null },

  { group: 'सामग्री व्यवस्थापन' },
  {
    id: 'hero', label: 'हिरो स्लाइडर', icon: icon.image, table: 'hero_slides',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'sort_order', label: 'क्रम' },
      { key: 'is_active', label: 'सक्रिय', type: 'boolean' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'subtitle', label: 'उपशीर्षक', type: 'text' },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'sort_order', label: 'क्रम (सानो अगाडि)', type: 'number' },
      { key: 'is_active', label: 'सक्रिय राख्ने', type: 'boolean' },
    ],
  },
  {
    id: 'tourist', label: 'पर्यटकीय स्थल', icon: icon.mountain, table: 'tourist_places',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'badge', label: 'ब्याज' },
      { key: 'is_featured', label: 'फिचर्ड', type: 'boolean' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'badge', label: 'ब्याज (जस्तै: प्रमुख आकर्षण)', type: 'text' },
      { key: 'short_desc', label: 'छोटो विवरण', type: 'textarea' },
      { key: 'description', label: 'विस्तृत विवरण', type: 'textarea' },
      { key: 'image_url', label: 'मुख्य तस्वीर', type: 'image' },
      { key: 'gallery', label: 'ग्यालरी तस्वीर URLहरू', type: 'array', placeholder: 'तस्वीर URL थपेर Enter थिच्नुहोस्' },
      { key: 'how_to_reach', label: 'कसरी पुग्ने', type: 'textarea' },
      { key: 'best_time', label: 'उपयुक्त समय', type: 'text' },
      { key: 'tips', label: 'यात्रा सुझाव', type: 'array', placeholder: 'सुझाव थपेर Enter थिच्नुहोस्' },
      { key: 'map_query', label: 'नक्सा स्थान', type: 'text' },
      { key: 'is_featured', label: 'फिचर्ड राख्ने', type: 'boolean' },
    ],
  },
  {
    id: 'religious', label: 'धार्मिक स्थल', icon: icon.temple, table: 'religious_sites',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'short_desc', label: 'विवरण', type: 'truncate' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'short_desc', label: 'छोटो विवरण', type: 'textarea' },
      { key: 'description', label: 'विस्तृत विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'history', label: 'इतिहास', type: 'textarea' },
      { key: 'map_query', label: 'नक्सा स्थान', type: 'text' },
    ],
  },
  {
    id: 'nature', label: 'प्राकृतिक सम्पदा', icon: icon.leaf, table: 'nature_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'category', label: 'वर्ग' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['नदी','झरना','ताल','जंगल','पहाड','दृश्यावलोकन'] },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
    ],
  },
  {
    id: 'culture', label: 'संस्कृति', icon: icon.music, table: 'culture_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'category', label: 'वर्ग' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['लोक नृत्य','परम्परा','उत्सव','रीतिथिति'] },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
    ],
  },
  {
    id: 'food', label: 'स्थानीय परिकार', icon: icon.food, table: 'food_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'ingredients', label: 'सामग्री', type: 'truncate' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'ingredients', label: 'सामग्री', type: 'text' },
    ],
  },
  {
    id: 'products', label: 'स्थानीय उत्पादन', icon: icon.shopping, table: 'product_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'category', label: 'वर्ग' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['कृषि उत्पादन','जडीबुटी','हस्तकला'] },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
    ],
  },
  {
    id: 'homestay', label: 'होमस्टे', icon: icon.bed, table: 'homestays',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'contact', label: 'सम्पर्क' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'facilities', label: 'सुविधाहरू', type: 'array', placeholder: 'सुविधा थपेर Enter थिच्नुहोस्' },
      { key: 'contact', label: 'सम्पर्क नम्बर', type: 'text' },
      { key: 'map_query', label: 'नक्सा स्थान', type: 'text' },
    ],
  },
  {
    id: 'gallery', label: 'फोटो ग्यालरी', icon: icon.camera, table: 'gallery_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'caption', label: 'क्याप्सन' },
      { key: 'category', label: 'वर्ग' },
    ],
    fields: [
      { key: 'image_url', label: 'तस्वीर URL', type: 'image' },
      { key: 'caption', label: 'क्याप्सन', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['प्रकृति','संस्कृति','धार्मिक','गाउँ जीवन','चाडपर्व'] },
    ],
  },
  {
    id: 'videos', label: 'भिडियो ग्यालरी', icon: icon.video, table: 'videos',
    listColumns: [
      { key: 'thumbnail_url', label: 'थम्बनेल', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'category', label: 'वर्ग' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['परिचय','संस्कृति','प्रकृति','परिकार','धार्मिक','होमस्टे'] },
      { key: 'youtube_id', label: 'YouTube भिडियो ID', type: 'text', placeholder: 'जस्तै: dQw4w9WgXcQ' },
      { key: 'thumbnail_url', label: 'थम्बनेल URL', type: 'image' },
    ],
  },
  {
    id: 'news', label: 'समाचार', icon: icon.news, table: 'news_items',
    listColumns: [
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
      { key: 'title', label: 'शीर्षक' },
      { key: 'category', label: 'वर्ग' },
      { key: 'published_date', label: 'मिति' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'category', label: 'वर्ग', type: 'select', options: ['घोषणा','संस्कृति','कृषि','पूर्वाधार','पर्यटन','शिक्षा'] },
      { key: 'published_date', label: 'प्रकाशित मिति (नेपाली)', type: 'text', placeholder: 'जस्तै: २०८२ साउन १५' },
      { key: 'excerpt', label: 'सारांश', type: 'textarea' },
      { key: 'content', label: 'विस्तृत सामग्री', type: 'textarea' },
      { key: 'image_url', label: 'तस्वीर', type: 'image' },
    ],
  },
  {
    id: 'events', label: 'कार्यक्रम', icon: icon.calendar, table: 'events',
    listColumns: [
      { key: 'title', label: 'शीर्षक' },
      { key: 'day', label: 'दिन' },
      { key: 'month', label: 'महिना' },
      { key: 'is_past', label: 'सम्पन्न', type: 'boolean' },
    ],
    fields: [
      { key: 'title', label: 'शीर्षक', type: 'text' },
      { key: 'description', label: 'विवरण', type: 'textarea' },
      { key: 'location', label: 'स्थान', type: 'text' },
      { key: 'event_time', label: 'समय', type: 'text', placeholder: 'जस्तै: बिहान ६ बजे' },
      { type: 'row', fields: [
        { key: 'day', label: 'दिन', type: 'text', placeholder: 'जस्तै: १५' },
        { key: 'month', label: 'महिना', type: 'text', placeholder: 'जस्तै: साउन' },
      ]},
      { key: 'year', label: 'वर्ष', type: 'text', placeholder: 'जस्तै: २०८२' },
      { key: 'is_past', label: 'सम्पन्न कार्यक्रम हो', type: 'boolean' },
    ],
  },

  { group: 'प्रशासन' },
  { id: 'images', label: 'तस्वीर पुस्तकालय', icon: icon.library, group: null },
  { id: 'messages', label: 'सम्पर्क सन्देश', icon: icon.mail, group: null },
  { id: 'settings', label: 'वेबसाइट सेटिङ', icon: icon.settings, group: null },
  { id: 'profile', label: 'प्रोफाइल', icon: icon.user, group: null },
];

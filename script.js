/* =========================================================
   GREEN LOUNGE ROOFTOP RESTAURANT & CONVENTION HALL
   script.js
   ---------------------------------------------------------
    1. Settings        (contact details + photo lists — easy to edit)
    2. Menu data       (every item from the printed menu)
    3. Helpers
    4. Menu highlights (homepage)
    5. Menu page       (search + category filter)
    6. Reservation form
    7. Gallery + lightbox
    8. Header, navigation and page views
    9. Start-up
   ========================================================= */
'use strict';


/* =========================================================
   1. SETTINGS
   ========================================================= */

const SITE = {
  name: 'Green Lounge Rooftop Restaurant & Convention Hall',
  whatsappNumber: '8801919886077',        // +880 1919-886077, digits only (used by wa.me links)
  openTime: '09:00',
  closeTime: '23:00',
};

const CURRENCY = '৳';   // Bangladeshi Taka. The printed menu shows prices like 150/-

/*
  PHOTOS
  ------------------------------------------------------------------
  The restaurant does not have a photo for every dish yet, so the site is
  designed to look complete with text only. A photo appears only where one is
  listed below. Nothing is ever filled in with a look-alike image.

  1) USE_MENU_PHOTOS
     The Dala and Set Menu plates are cropped from the client's printed menu.
     They are low resolution. Set this to false to remove them everywhere
     (homepage cards, menu thumbnails, gallery, About section). The site then
     becomes a clean text-only design.

  2) MY_DISH_PHOTOS   (add real dish photos here)
     - Save the photo in the images/food folder, e.g. images/food/regular-burger.jpg
     - Find the dish id in photo-guide.txt (e.g. 'burger-6' = Regular burger)
     - Add one line:
         'burger-6': { src: 'images/food/regular-burger.jpg', alt: 'Regular burger with lettuce and tomato' },
     Normal rectangular photos are cropped to fill the card automatically.
     Only list files that exist, otherwise the browser shows a broken image.

  3) MY_GALLERY       (rooftop / interior / event / food photos for the gallery)
  4) hero / about / rooftop   (one wide photo each; null keeps the built-in artwork)
*/
const USE_MENU_PHOTOS = true;

const MY_DISH_PHOTOS = {
  // 'burger-6': { src: 'images/food/YOUR-DISH-PHOTO.jpg', alt: 'Describe what the photo shows' },
};

const MY_GALLERY = [
  // { src: 'images/rooftop/YOUR-ROOFTOP-PHOTO.jpg', alt: 'Green Lounge rooftop in the evening', cat: 'Rooftop' },
  // { src: 'images/events/YOUR-EVENT-PHOTO.jpg',    alt: 'Convention hall set up for an event', cat: 'Events', size: 'large' },
];

/* Dishes shown in "Menu highlights" on the homepage. Ids come from the menu data below
   (e.g. 'dala-1' = 1st item in the Dala category). Dishes with no photo get a text card. */
const FEATURED_IDS = ['dala-1', 'dala-2', 'dala-3', 'set-3', 'set-6', 'kabab-6', 'burger-5', 'biryani-2'];

/* Real supplied dish photos, each one matched to the exact dish it shows.
   These are normal rectangular photos and are cropped to fill the card/thumbnail
   automatically (object-fit: cover). "pos" sets object-position so each photo's
   main food subject stays centred in its container (compositions differ per photo). */
const MENU_PHOTOS = {
  'dala-1':   { src: 'images/food/jamai-dala.jpg',               alt: 'Jamai dala platter with basmati rice, chicken and mutton curry, jali kabab, boiled eggs and salad' },
  'dala-2':   { src: 'images/food/couple-dala.jpg',              alt: 'Couple dala platter with basmati rice, roast chicken, boiled eggs and salad garnish' },
  'dala-3':   { src: 'images/food/arabian-khebsa.jpg',           alt: 'Arabian khebsa platter with yellow basmati rice, whole grilled chicken, boiled eggs and salad' },
  'set-1':    { src: 'images/food/set-menu-1.jpg',               pos: 'center 55%', alt: 'Set menu 1: egg vegetable fried rice, crispy fried chicken, vegetables and cucumber salad' },
  'set-2':    { src: 'images/food/set-menu-2.jpg',               pos: 'center 42%', alt: 'Set menu 2: egg vegetable fried rice, Thai fried chicken, chicken chilli and cucumber salad' },
  'set-3':    { src: 'images/food/set-menu-3.jpg',               pos: 'center 45%', alt: 'Set menu 3: tandoori chicken, egg vegetable fried rice, chicken chilli onion and cucumber salad' },
  'set-4':    { src: 'images/food/set-menu-4.jpg',               pos: 'center 48%', alt: 'Set menu 4: egg vegetable fried rice, chicken curry, sauteed vegetables and cucumber salad' },
  'set-5':    { src: 'images/food/set-menu-5.jpg',               pos: 'center 48%', alt: 'Set menu 5: egg vegetable fried rice, BBQ chicken steak, sauteed vegetables and cucumber salad' },
  'set-6':    { src: 'images/food/set-menu-6.jpg',               pos: 'center 50%', alt: 'Set menu 6: egg vegetable fried rice, beef masala, sauteed vegetables and cucumber salad' },
  'set-7':    { src: 'images/food/set-menu-7.jpg',               pos: 'center 44%', alt: 'Set menu 7: egg vegetable fried rice with grilled BBQ chicken' },
  'kabab-6':  { src: 'images/food/tandoori-chicken.jpg',         alt: 'Tandoori chicken on a black plate with green chutney, onion rings, cucumber and lemon' },
  'burger-5': { src: 'images/food/double-decker-burger.jpg',     alt: 'Green Lounge special double decker burger with two beef patties, cheese, lettuce and onion' },
  'biryani-2':{ src: 'images/food/hyderabadi-mutton-biryani.jpg',alt: 'Hyderabadi mutton biryani served in a hammered metal bowl with boiled egg and fresh salad' },
};

const DISH_PHOTOS = { ...(USE_MENU_PHOTOS ? MENU_PHOTOS : {}), ...MY_DISH_PHOTOS };

const PHOTOS = {
  hero:    'images/scene/hero.jpg',
  heroAlt: 'Green Lounge rooftop restaurant in Chhagalnaiya at sunset, with string lights and set tables',
  about:   'images/scene/about.jpg',
  aboutAlt: 'Inside Green Lounge Rooftop Restaurant and Convention Hall in Chhagalnaiya, with the reception desk and dala platters laid out on a table',
  rooftop: 'images/scene/rooftop.jpg',
  rooftopAlt: 'Green Lounge indoor dining area at dusk, long tables set for an evening together by the window',
  gallery: [
    // The three-Dala platters photo is portrait: shown FULL (contain) in a large tile so nothing is cropped away.
    { src: 'images/gallery/gallery-9.jpg',  alt: 'Three dala platters arranged on a wooden table at Green Lounge in warm evening light', size: 'large', fit: 'contain' },
    { src: 'images/gallery/gallery-10.jpg', alt: 'Green Lounge special pizza on a wooden board', pos: 'center 42%' },
    { src: 'images/gallery/gallery-2.jpg',  alt: 'Ring-shaped stuffed-crust pizza on a wooden board at Green Lounge', pos: 'center 60%' },
    { src: 'images/gallery/gallery-3.jpg',  alt: 'Two plates of stir-fried noodles with salad garnish on a marble table', pos: 'center 40%' },
    { src: 'images/gallery/gallery-4.jpg',  alt: 'Tall plate of crispy nachos drizzled with sauce in the Green Lounge dining room', pos: 'center 60%' },
    { src: 'images/gallery/gallery-5.jpg',  alt: 'Plate of French fries with tomato ketchup at Green Lounge', pos: 'center 55%' },
    { src: 'images/gallery/gallery-6.jpg',  alt: 'Sizzling chilli dish served on a hot cast-iron platter at Green Lounge' },
    ...MY_GALLERY,
  ],
};


/* =========================================================
   2. MENU DATA
   Copied from the 14 printed menu pages. Names, spellings,
   portions (1:1, 1:3, 4p, 6p, 8p) and labels are kept as printed.

   dish(name, bn, price, extras)     one fixed price
   sized(name, bn, [[label, price]]) several sizes/portions
   ask(name, bn, text, extras)       no fixed price ("Price on size", "MRP")

   extras: desc (printed description), note (a printed label like winter/seasonal)
   ========================================================= */

const dish  = (name, bn, price, extra = {}) => ({ name, bn, price, ...extra });
const sized = (name, bn, variants, extra = {}) => ({ name, bn, variants: variants.map(([label, price]) => ({ label, price })), ...extra });
const ask   = (name, bn, priceText, extra = {}) => ({ name, bn, priceText, ...extra });

/* The Bangla Food lines are "main dish/vorta/vaji/dal/sada vaat/salad" on the menu.
   The English line starts with the dish's own name and then the sides it is
   served with, so each meal reads as its own plate instead of just a side list. */
const BANGLA_SIDES = 'vorta / vaji / dal / sada vaat / salad';
const banglaMeal = (name, bn, price, extra = {}) => dish(name, bn, price, { desc: `${name} / ${BANGLA_SIDES}`, combo: true, ...extra });

const MENU = [
  { id: 'dala', label: 'Dala', bn: 'ডালা',
    note: {
      bn: 'রেস্টুরেন্টে বসে খেতে হলে ১ ঘন্টা অপেক্ষা করতে হবে।',
      en: 'Note from the Dala page (translated from Bangla): if you dine in at the restaurant, you will need to wait 1 hour.',
    },
    items: [
      dish('Jamai dala [4person]', 'জামাই ডালা (৪ জন)', 2000, { desc: 'Basmati rice 4 person/ whole chicken roast mutton 4p, jali kabab 4p, Egg 4p, & salad' }),
      dish('Couple dala [2person]', 'কাপল ডালা (২ জন)', 1100, { desc: 'Basmati rice 2person/chicken roast 2p , mutton 2p/jali kabab 2p/Egg 2p/salad' }),
      dish('Arabian khebsa [4person]', 'এরাবিয়ান খেপসা (৪ জন)', 1299, { desc: 'Arabian khebsa rice (basmoti) 4person/ whole grill chicken/Egg 4p/salad/ 2 types of khebsa sause.' }),
    ] },

  { id: 'appetizer', label: 'Appetizer', bn: 'এপেটাইজার',
    items: [
      dish('Potato masala wedges', 'পটেটো মাসালা ওয়েজেস', 150),
      dish('French fry', 'ফ্রেঞ্চ ফ্রাই', 150),
      dish('Nachos', 'নাচোস', 180),
      dish('Hill nachos', 'হিল নাচোস', 260),
      dish('Crispy fried chicken 1p', 'ক্রিসপি ফ্রাইড চিকেন', 99),
      dish('BBQ lollipop 6p', 'বি বি কিউ ললিপপ', 220),
      dish('Fry bucket', 'ফ্রাই বাকেট', 420),
      dish('Super hot naga wings 6p', 'সুপার হট নাগা উইংস', 270),
      dish('Fish finger', 'ফিস ফিঙ্গার', 380),
      dish('Garlic chicken mushroom', 'গার্লিক চিকেন মাশরুম', 400),
      dish('Spring roll 6p', 'স্প্রিং রোল', 160),
      dish('Meat box', 'মিট বক্স', 240),
      dish('Naga meat box', 'নাগা মিট বক্স', 260),
    ] },

  { id: 'momo', label: 'Momo', bn: 'মোমো',
    items: [
      dish('Steam momo 8p', 'স্টিম মোমো', 200),
      dish('Cheese momo 8p', 'চিজ মোমো', 260),
    ] },

  { id: 'burger', label: 'Burger', bn: 'বার্গার',
    items: [
      dish('Chicken cheese burger', 'চিকেন চিজ বার্গার', 180),
      dish('Crispy chicken cheese burger', 'ক্রিসপি চিকেন চিজ বার্গার', 200),
      dish('Fat mamba chicken cheese burger', 'ফ্যাট মাম্বা চিকেন চিজ বার্গার', 239),
      dish('Fat mamba beef cheese burger', 'ফ্যাট মাম্বা বিফ চিজ বার্গার', 310),
      dish('G.L special double decker burger', 'গ্রীন লাউঞ্জ স্পেশাল ডাবল ডেকার বার্গার', 319),
      dish('Regular burger', 'রেগুলার বার্গার', 140),
      dish('Student burger', 'স্টুডেন্ট বার্গার', 99, { note: '10am – 4pm' }),
    ] },

  { id: 'sandwich', label: 'Sandwich & Shawarma', bn: 'স্যান্ডউইচ ও শর্মা',
    items: [
      dish('Chicken toast sandwich', 'চিকেন টোস্ট স্যান্ডউইচ', 249),
      dish('Chicken sub sandwich', 'চিকেন সাব স্যান্ডউইচ', 170),
      dish('Arabian chicken cheese shawarma', 'এরাবিয়ান চিকেন চিজ শর্মা', 279),
      dish('Chicken shawarma cheese rap', 'চিকেন শর্মা চিজ র‍্যাপ', 289),
      dish('Chicken cheese club sandwich', 'চিকেন চিজ ক্লাব স্যান্ডউইচ', 279),
      dish('Crispy chicken cheese sub sandwich', 'ক্রিসপি চিকেন চিজ সাব স্যান্ডউইচ', 229),
      dish('Chicken cheese sandwich', 'চিকেন চিজ স্যান্ডউইচ', 199),
    ] },

  { id: 'pizza', label: 'Pizza', bn: 'পিজ্জা',
    items: [
      sized('Mexican hot pizza', 'মেক্সিকান হট পিজ্জা', [['8"', 400], ['10"', 580], ['12"', 740]]),
      sized('4 season pizza', '৪ সিজন পিজ্জা', [['10"', 599], ['12"', 799]]),
      sized('Chicken cheese pizza', 'চিকেন চিজ পিজ্জা', [['10"', 420], ['12"', 550]]),
      sized('BBQ Chicken ring pizza', 'বি বি কিউ চিকেন রিং পিজ্জা', [['10"', 550], ['12"', 700]]),
      sized('Green lounge special pizza', 'গ্রীন লাউঞ্জ স্পেশাল পিজ্জা', [['10"', 799], ['12"', 999]]),
    ] },

  { id: 'pasta', label: 'Pasta', bn: 'পাস্তা',
    items: [
      dish('Chicken cheese pasta', 'চিকেন চিজ পাস্তা', 199),
      dish('Mexican hot pasta', 'মেক্সিকান হট পাস্তা', 215),
      dish('Naga bombastic pasta', 'নাগা বোম্বাস্টিক পাস্তা', 230),
      dish('Alfredo pasta', 'আলফ্রেডো পাস্তা', 250),
      dish('Overloaded chicken cheese pasta', 'ওভারলোডেড চিকেন চিজ পাস্তা', 299),
      dish('Oven bake pasta', 'ওভেন বেক পাস্তা', 220),
    ] },

  { id: 'chowmein', label: 'Chowmein', bn: 'চাউমিন',
    items: [
      sized('Chicken chowmein', 'চিকেন চাউমিন', [['1:1', 160], ['1:3', 400]]),
      dish('Prawn chowmein 1:3', 'প্রন চাউমিন', 500),
      dish('Green lounge special chowmein 1:3', 'গ্রীন লাউঞ্জ স্পেশাল চাউমিন', 650),
      dish('Sizzling chowmein', 'সিজলিং চাউমিন', 400),
      dish('Ramen', 'রামেন', 299),
    ] },

  { id: 'soup', label: 'Soup', bn: 'স্যুপ',
    items: [
      sized('Thai thick soup', 'থাই থিক স্যুপ', [['1:1', 165], ['1:3', 450]]),
      dish('Thai clear soup 1:3', 'থাই ক্লিয়ার স্যুপ', 399),
      sized('Corn soup', 'কর্ন স্যুপ', [['1:1', 150], ['1:3', 350]]),
      dish('Cream of mushroom soup 1:3', 'ক্রীম অফ মাশরুম স্যুপ', 599),
      dish('Seafood soup', 'সি ফুড স্যুপ', 490),
    ] },

  { id: 'salad', label: 'Salad', bn: 'সালাদ',
    items: [
      dish('Chicken cashew nut salad', 'চিকেন ক্যাশোনাট সালাদ', 450),
      dish('Chicken grill cashew nut salad', 'চিকেন গ্রীল ক্যাশোনাট (মাশরুম) সালাদ', 499),
      dish('Green Lounge special salad', 'গ্রীন লাউঞ্জ স্পেশাল সালাদ', 599),
      dish('Tandoori salad', 'তান্দুরী সালাদ', 420),
      dish('Green salad', 'গ্রীন সালাদ', 60),
    ] },

  { id: 'rice', label: 'Rice', heading: 'Rice 1:3', bn: 'রাইস',
    items: [
      dish('Egg vegetable rice 1:3', 'এগ ভেজিটেবল রাইস', 299),
      dish('Mixed fried rice 1:3', 'মিক্সড ফ্রাইড রাইস', 399),
      dish('Masala fried rice 1:3', 'মাসালা ফ্রাইড রাইস', 369),
    ] },

  { id: 'curry', label: 'Curry Item', heading: 'Curry item 1:3', bn: 'কারি আইটেম ১:৩',
    items: [
      dish('Hot masala chicken 1:3', 'হট মাসালা চিকেন', 550),
      dish('Chicken masala [sonali] 1:3', 'চিকেন মাসালা (সোনালী)', 589),
      dish('Beef masala 1:3', 'বিফ মাসালা', 650),
      dish('Chicken chilli onion 1:3', 'চিকেন চিলি অনিয়ন', 340),
      dish('Mixed vegetable 1:3', 'মিক্সড ভেজিটেবল', 290),
      dish('Chinese vegetable 1:3', 'চাইনিজ ভেজিটেবল', 220),
    ] },

  { id: 'fry', label: 'Fry Item', bn: 'ফ্রাই আইটেম',
    items: [
      dish('Crispy fried chicken 6p', 'ক্রিসপি ফ্রাইড চিকেন', 350),
      dish('Thai fried chicken', 'থাই ফ্রাইড চিকেন', 350),
      dish('Sonali fried chicken full 8p', 'সোনালী ফ্রাইড চিকেন ফুল', 550),
      dish('BBQ chicken 6p', 'বি বি কিউ চিকেন', 399),
    ] },

  { id: 'gravy', label: 'Gravy Item', bn: 'গ্রেভি আইটেম',
    items: [
      dish('Chicken korai', 'চিকেন কড়াই', 270),
      dish('Chicken butter makkhan', 'চিকেন বাটার মাক্ষান', 350),
      dish('Beef korai', 'বিফ কড়াই', 320),
      dish('Mutton korai', 'মাটন কড়াই', 350),
      dish('Chicken butter boti masala', 'চিকেন বাটার বটি মাসালা', 320),
      dish('Achari beef', 'আচারি বিফ', 380),
      dish('Chicken hot masala', 'চিকেন হট মাসালা', 200),
      dish('Handi duck 1:2', 'হান্ডি হাঁস', 500, { note: 'winter' }),
    ] },

  { id: 'sizzling', label: 'Sizzling', bn: 'সিজলিং',
    items: [
      dish('Chicken sizzling', 'চিকেন সিজলিং', 450),
      dish('Beef sizzling', 'বিফ সিজলিং', 580),
      dish('Prawn sizzling', 'প্রন সিজলিং', 520),
    ] },

  { id: 'kabab', label: 'Kabab', bn: 'কাবাব',
    items: [
      dish('Chicken tikka 5p', 'চিকেন টিক্কা', 220),
      dish('Beef seekh kabab 5p', 'বিফ শিক কাবাব', 260),
      dish('Reshmi kabab 5p', 'রেশমি কাবাব', 230),
      dish('Hariyali kabab 5p', 'হারিয়ালি কাবাব', 220),
      dish('Fish kabab', 'ফিস কাবাব', 350),
      dish('Tandoori chicken', 'তান্দুরী চিকেন', 180),
      dish('BBQ grill chicken [half]', 'বি বি কিউ গ্রিল চিকেন (হাফ)', 350),
    ] },

  { id: 'naan', label: 'Naan Item', bn: 'নান আইটেম',
    items: [
      dish('Plain naan', 'প্লেইন নান', 50),
      dish('Butter naan', 'বাটার নান', 60),
      dish('Garlic naan', 'গার্লিক নান', 65),
      dish('Laccha paratha', 'লাচ্ছা পরাটা', 30),
    ] },

  { id: 'set', label: 'Set Menu', bn: 'সেট মেনু',
    items: [
      dish('Set menu 1', 'সেট মেনু ১', 229, { desc: 'Egg vegetable fried rice/crispy fried chicken /vegetable/salad' }),
      dish('Set menu 2', 'সেট মেনু ২', 269, { desc: 'Egg vegetable fried rice/thai fried chicken 2p /chicken chilli /salad' }),
      dish('Set menu 3', 'সেট মেনু ৩', 350, { desc: 'Tandoori chicken / Egg vegetable fried rice/chicken chilli onion /salad' }),
      dish('Set menu 4', 'সেট মেনু ৪', 369, { desc: 'Peri peri chicken/ Egg vegetable fried rice/ sauteed vegetable/salad' }),
      dish('Set menu 5', 'সেট মেনু ৫', 320, { desc: 'Thai chicken steak / Egg vegetable fried rice/ sauteed vegetable/salad' }),
      dish('Set menu 6', 'সেট মেনু ৬', 420, { desc: 'Beef masala / Egg vegetable fried rice/ vegetable /spring roll/salad' }),
      dish('Set menu 7', 'সেট মেনু ৭', 170, { desc: 'Egg Vegitable rice/BBQ Chicken' }),
      dish('Add on rice', '', 100, { desc: 'Egg Vegitable rice 1:1' }),
    ] },

  { id: 'seafood', label: 'Sea Food', bn: 'সি-ফুড',
    items: [
      dish('Seafood mixed platter', 'সি-ফুড মিক্সড প্ল্যাটার', 799),
      dish('Crab masala', 'ক্রাব মাসালা', 399),
      dish('Crab grill', 'ক্রাব গ্রিল', 399),
      dish('Squid grill', 'স্কুইড গ্রিল', 399),
      dish('Squid fry', 'স্কুইড ফ্রাই', 379),
      dish('Octopus masala', 'অক্টোপাস মাসালা', 450),
      ask('Salmon fish BBQ / grill', 'স্যালমন ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Shurma fish BBQ / grill', 'সুরমা ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Coral fish BBQ / grill', 'কোরাল ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Rupchanda fish BBQ / grill', 'রুপচাঁদা ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Dori fish BBQ / grill', 'ডরি ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Lobster fish BBQ / grill', 'লবস্টার ফিস বি বি কিউ/গ্রিল', 'Price on size'),
      ask('Octopus fish BBQ / masala', 'অক্টোপাস ফিস বি বি কিউ/মাসালা', 'Price on size'),
      ask('Red Poa fish BBQ / grill', 'রেড পোয়া ফিস বি বি কিউ/গ্রিল', 'Price on size'),
    ] },

  { id: 'biryani', label: 'Biryani', group: 'Indian item', bn: 'বিরিয়ানি',
    items: [
      dish('Hyderabadi chicken biryani {sonali}', 'হায়দ্রাবাদি চিকেন বিরিয়ানি (সোনালী)', 320),
      dish('Hyderabadi mutton biryani', 'হায়দ্রাবাদি মাটন বিরিয়ানি', 390),
      dish('Tikka biryani', 'টিক্কা বিরিয়ানি', 350),
      dish('Beef motka handi biryani', 'বিফ মটকা হান্ডি বিরিয়ানি', 399),
      dish('Biryani rice', 'বিরিয়ানি রাইস', 150),
    ] },

  { id: 'juice', label: 'Juice', bn: 'জুস',
    items: [
      dish('Lacchi', 'লাচ্ছি', 120),
      dish('Malai lacchi', 'মালাই লাচ্ছি', 160),
      dish('Mint lemon', 'মিন্ট লেমন', 130),
      dish('Orange juice', 'অরেঞ্জ জুস', 160),
      dish('Mango juice', 'ম্যাংগো জুস', 160),
      dish('Watermelon juice', 'ওয়াটারমেলন জুস', 150, { note: 'seasonal' }),
      dish('Papaya juice', 'পাপায়া জুস', 130),
      dish('Pineapple juice', 'পাইন আপেল জুস', 150),
      dish('Virgin mojito', 'ভার্জিন মজিতো', 130),
    ] },

  { id: 'shake', label: 'Shake', bn: 'শেক',
    items: [
      dish('Chocolate shake', 'চকলেট শেক', 160),
      dish('Vanilla shake', 'ভ্যানিলা শেক', 160),
      dish('Mango shake', 'ম্যাংগো শেক', 160),
      dish('Strawberry shake', 'স্ট্রবেরী শেক', 160),
      dish('Orio shake', 'ওরিও শেক', 200),
      dish('Kitkat shake', 'কিটকাট শেক', 200),
      dish('Cashew nut shake', 'ক্যাশোনাট শেক', 220),
    ] },

  { id: 'dessert', label: 'Dessert', bn: 'ডেজার্ট',
    items: [
      dish('Faluda', 'ফালুদা', 180),
      dish('Ice Cream (mix)', 'আইসক্রিম মিক্স', 150),
      dish('Fondate pastry', 'ফনডেট পেস্ট্রি', 200),
      dish('Rainbow Ice Cream', 'রেইনবো আইসক্রিম', 250),
    ] },

  { id: 'coffee', label: 'Coffee', bn: 'কফি',
    items: [
      dish('Hot coffee', 'হট কফি', 130),
      dish('Cold coffee', 'কোল্ড কফি', 150),
      dish('Black coffee', 'ব্লাক কফি', 100),
    ] },

  { id: 'bangla', label: 'Bangla Food', bn: 'বাংলা খাবার',
    items: [
      banglaMeal('Beef Masala', 'বিফ মাসালা/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 350),
      banglaMeal('Mutton jhal fry', 'মাটন ঝাল ফ্রাই/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 370),
      banglaMeal('Sonali murgi jhal fry', 'সোনালি মুরগী ঝাল ফ্রাই/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 250),
      banglaMeal('Rupchanda fry', 'রুপচাঁদা ফ্রাই/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ (উইন্টার)', 550, { note: 'winter' }),
      banglaMeal('katol fish', 'কাতল মাছ/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 280),
      banglaMeal('Loitta fry', 'লইট্টা ফ্রাই/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 240),
      banglaMeal('Kobutor', 'কবুতর/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ (উইন্টার)', 400, { note: 'winter' }),
      banglaMeal('Chingri vuna', 'চিংড়ি ভুনা/ভর্তা/ভাজি/ডাল/সাদা ভাত/সালাদ', 320),
    ] },

  { id: 'beverage', label: 'Beverage Item', bn: 'বেভারেজ আইটেম',
    items: [
      ask('Water', 'ওয়াটার', 'MRP'),
      dish('Cold drinks', 'কোল্ড ড্রিংকস', 30),
      ask('Cold drinks can', 'কোল্ড ড্রিংকস ক্যান', 'MRP'),
    ] },
];


/* =========================================================
   3. HELPERS
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (value = '') => String(value).replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

const fmt   = n => Number(n).toLocaleString('en-US');
const money = n => CURRENCY + fmt(n);

const icon = (name, extra = '') =>
  `<svg class="icon${extra ? ' ' + extra : ''}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

const waLink = text => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* Open a link in a new tab from inside a click handler (popup-blocker friendly) */
function openExternal(url) {
  const a = document.createElement('a');
  a.href = url; a.target = '_blank'; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
}

/* Give every item an id like "pizza-3" (category id + its number on the menu),
   and prepare a lowercase text blob for searching. */
const ITEM_BY_ID = new Map();
MENU.forEach(cat => {
  cat.items.forEach((item, index) => {
    item.id = `${cat.id}-${index + 1}`;
    item.catId = cat.id;
    ITEM_BY_ID.set(item.id, item);
    item._hay = [
      item.name, item.bn, item.desc, item.note, cat.label, cat.heading, cat.bn, cat.group,
      ...(item.variants ? item.variants.map(v => v.label) : []),
      item.priceText,
    ].filter(Boolean).join(' ').toLowerCase();
  });
});
/* For display, a printed serving size at the end of a name ("[4person]", "6p", "full 8p", "1:3", "[half]")
   is shown as a small tag next to the name. The full printed name is still used in search and in orders. */
const SERVING_RE = /^(.+?)\s+(\[\d+\s?person\]|\[half\]|full \d+p|\d+p|\d:\d)$/;
ITEM_BY_ID.forEach(item => {
  const m = SERVING_RE.exec(item.name);
  item.title = m ? m[1] : item.name;
  item.serving = m ? m[2].replace(/^\[|\]$/g, '') : '';
});
const servingHTML = item => (item.serving ? `<span class="serving">${esc(item.serving)}</span>` : '');
const tagHTML = item => (item.note ? `<span class="tag">${esc(item.note)}</span>` : '');

const CAT_BY_ID = new Map(MENU.map(c => [c.id, c]));
const TOTAL_ITEMS = ITEM_BY_ID.size;

/* Scroll lock shared by the lightbox and mobile menu */
let scrollLocks = 0;
function lockScroll()   { scrollLocks++; document.body.classList.add('no-scroll'); }
function unlockScroll() { scrollLocks = Math.max(0, scrollLocks - 1); if (!scrollLocks) document.body.classList.remove('no-scroll'); }

/* Keep Tab inside an open dialog */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
function trapTab(event, container) {
  if (event.key !== 'Tab') return;
  const items = $$(FOCUSABLE, container).filter(el => !el.closest('[hidden]') && el.getClientRects().length > 0);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

/* Price markup used on cards and menu rows */
const priceHTML = (price, priceText) => (price != null
  ? `<span class="price"><span class="price__cur">${CURRENCY}</span>${fmt(price)}</span>`
  : `<span class="price price--text">${esc(priceText)}</span>`);


/* =========================================================
   4. MENU HIGHLIGHTS (homepage)
   ========================================================= */

function dishCardHTML(item) {
  const photo = DISH_PHOTOS[item.id];
  const cat = CAT_BY_ID.get(item.catId);
  let media;
  if (!photo) media = `<div class="dish__blank"><span>${esc(cat.label)}</span></div>`;
  else if (photo.plate) media = `<img class="dish__plate" src="${esc(photo.src)}" alt="${esc(photo.alt)}" width="480" height="480" loading="lazy" decoding="async">`;
  else media = `<img class="dish__photo" src="${esc(photo.src)}" alt="${esc(photo.alt)}"${photo.pos ? ` style="object-position:${esc(photo.pos)}"` : ''} loading="lazy" decoding="async">`;
  return `<article class="dish">
    <div class="dish__media${photo && !photo.plate ? ' dish__media--photo' : ''}">${media}</div>
    <div class="dish__body">
      <p class="dish__cat">${esc(cat.label)}</p>
      <h3 class="dish__name">${esc(item.title)}${servingHTML(item)}${tagHTML(item)}</h3>
      ${item.bn ? `<p class="dish__bn" lang="bn">${esc(item.bn)}</p>` : ''}
      ${item.desc ? `<p class="dish__desc">${esc(item.desc)}</p>` : ''}
      <div class="dish__foot">
        ${priceHTML(item.price, item.priceText)}
      </div>
    </div>
  </article>`;
}

function renderHighlights() {
  const grid = $('#highlightGrid');
  grid.innerHTML = FEATURED_IDS.map(id => ITEM_BY_ID.get(id)).filter(Boolean).map(dishCardHTML).join('');
}


/* =========================================================
   5. MENU PAGE
   ========================================================= */

const menuState = { cat: 'all', query: '' };

const menuList   = $('#menuList');
const menuStatus = $('#menuStatus');
const menuEmpty  = $('#menuEmpty');
const menuSearch = $('#menuSearch');
const searchClear = $('#menuSearchClear');
const chipsEl = $('#menuChips');
const sideEl  = $('#menuSide');

function renderCategoryNav() {
  const allChip = `<button class="chip" type="button" data-cat="all">All dishes</button>`;
  chipsEl.innerHTML = allChip + MENU.map(c => `<button class="chip" type="button" data-cat="${c.id}">${esc(c.label)}</button>`).join('');

  const allSide = `<button class="side-btn" type="button" data-cat="all">All dishes<span>${TOTAL_ITEMS}</span></button>`;
  sideEl.innerHTML = `<p class="menu-side__title">Categories</p>` + allSide +
    MENU.map(c => `<button class="side-btn" type="button" data-cat="${c.id}">${esc(c.label)}<span>${c.items.length}</span></button>`).join('');
}

function updateCategoryNav() {
  $$('[data-cat]', chipsEl).concat($$('[data-cat]', sideEl)).forEach(btn => {
    if (btn.dataset.cat === menuState.cat) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });
  const active = $(`[data-cat="${menuState.cat}"]`, chipsEl);
  if (active && chipsEl.scrollWidth > chipsEl.clientWidth) {
    chipsEl.scrollTo({ left: active.offsetLeft - (chipsEl.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
  }
}

function itemHTML(item) {
  const photo = DISH_PHOTOS[item.id];
  const thumb = photo
    ? `<button class="menu-item__thumb" type="button" data-photo="${esc(item.id)}" aria-label="View photo of ${esc(item.name)}"><img src="${esc(photo.src)}" alt=""${photo.pos ? ` style="object-position:${esc(photo.pos)}"` : ''} width="60" height="60" loading="lazy" decoding="async"></button>`
    : '';

  let buy;
  if (item.variants) {
    buy = item.variants.map(v =>
      `<div class="variant"><span class="variant__label">${esc(v.label)}</span>${priceHTML(v.price)}</div>`
    ).join('');
  } else {
    buy = priceHTML(item.price, item.priceText);
  }

  return `<li class="menu-item${item.variants ? ' menu-item--variants' : ''}" data-id="${esc(item.id)}">
    ${thumb}
    <div class="menu-item__main">
      <h3 class="menu-item__name">${esc(item.title)}${servingHTML(item)}${tagHTML(item)}</h3>
      ${item.bn ? `<p class="menu-item__bn" lang="bn">${esc(item.bn)}</p>` : ''}
      ${item.desc ? `<p class="menu-item__desc">${esc(item.desc)}</p>` : ''}
    </div>
    <div class="menu-item__buy">${buy}</div>
  </li>`;
}

function categoryHTML(cat, items) {
  const title = cat.heading || cat.label;
  const note = cat.note
    ? `<div class="menu-note">${icon('info')}<div><p lang="bn">${esc(cat.note.bn)}</p><p>${esc(cat.note.en)}</p></div></div>`
    : '';
  return `<section class="menu-cat" id="cat-${cat.id}" aria-labelledby="cat-${cat.id}-title">
    <header class="menu-cat__head">
      ${cat.group ? `<p class="menu-cat__group">${esc(cat.group)}</p>` : ''}
      <div class="menu-cat__titles">
        <h2 id="cat-${cat.id}-title">${esc(title)}</h2>
        <span class="menu-cat__bn" lang="bn">${esc(cat.bn)}</span>
      </div>
      <span class="menu-cat__count">${items.length} ${items.length === 1 ? 'item' : 'items'}</span>
    </header>
    ${note}
    <ul class="menu-grid">${items.map(itemHTML).join('')}</ul>
  </section>`;
}

function renderMenu() {
  const tokens = menuState.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let html = '', shown = 0, sections = 0;

  MENU.forEach(cat => {
    if (menuState.cat !== 'all' && cat.id !== menuState.cat) return;
    const items = tokens.length ? cat.items.filter(item => tokens.every(t => item._hay.includes(t))) : cat.items;
    if (!items.length) return;
    shown += items.length; sections++;
    html += categoryHTML(cat, items);
  });

  menuList.innerHTML = html;
  menuEmpty.hidden = shown > 0;

  if (tokens.length) {
    menuStatus.textContent = shown
      ? `${shown} ${shown === 1 ? 'dish' : 'dishes'} found for “${menuState.query.trim()}”`
      : '';
  } else if (menuState.cat === 'all') {
    menuStatus.textContent = `${TOTAL_ITEMS} dishes in ${MENU.length} categories`;
  } else {
    menuStatus.textContent = `${shown} ${shown === 1 ? 'dish' : 'dishes'} in ${CAT_BY_ID.get(menuState.cat).label}`;
  }

  searchClear.hidden = !menuSearch.value;
}

function scrollMenuToTop() {
  const layout = $('.menu-layout');
  const toolbar = $('#menuToolbar');
  const stuck = getComputedStyle(toolbar).position === 'sticky';
  const offset = $('#siteHeader').offsetHeight + (stuck ? toolbar.offsetHeight : 0) + 12;
  const top = layout.getBoundingClientRect().top + window.scrollY - offset;
  if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function setCategory(cat) {
  menuState.cat = cat;
  menuState.query = '';
  menuSearch.value = '';
  renderMenu();
  updateCategoryNav();
  scrollMenuToTop();
}

function initMenuControls() {
  renderCategoryNav();

  [chipsEl, sideEl].forEach(el => el.addEventListener('click', event => {
    const btn = event.target.closest('[data-cat]');
    if (btn) setCategory(btn.dataset.cat);
  }));

  menuSearch.addEventListener('input', () => {
    menuState.query = menuSearch.value;
    if (menuState.query.trim()) menuState.cat = 'all';
    renderMenu();
    updateCategoryNav();
  });
  menuSearch.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuSearch.value) { event.stopPropagation(); menuSearch.value = ''; menuSearch.dispatchEvent(new Event('input')); }
  });
  searchClear.addEventListener('click', () => {
    menuSearch.value = '';
    menuSearch.dispatchEvent(new Event('input'));
    menuSearch.focus();
  });
  $('#menuEmptyReset').addEventListener('click', () => { setCategory('all'); });

  /* Tap a small photo in the menu to see it larger */
  menuList.addEventListener('click', event => {
    const thumb = event.target.closest('[data-photo]');
    if (!thumb) return;
    const photo = DISH_PHOTOS[thumb.dataset.photo];
    if (photo) openLightbox([{ src: photo.src, alt: photo.alt }], 0, thumb);
  });

  renderMenu();
  updateCategoryNav();
}


/* =========================================================
   6. RESERVATION FORM
   ========================================================= */

function initReservationForm() {
  const form = $('#reservationForm');
  const dateEl = $('#resDate');
  const now = new Date();
  dateEl.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const to12h = value => {
    const [h, m] = value.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  const prettyDate = value => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    const get = id => $(id).value.trim();
    const errorEl = $('#resError'), statusEl = $('#resStatus');
    const fields = { name: $('#resName'), phone: $('#resPhone'), date: dateEl, time: $('#resTime'), guests: $('#resGuests') };
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    statusEl.hidden = true;

    const problems = [];
    const flag = (el, text) => { problems.push(text); el.setAttribute('aria-invalid', 'true'); };

    if (!fields.name.value.trim()) flag(fields.name, 'Enter your name.');
    if (fields.phone.value.replace(/\D/g, '').length < 7) flag(fields.phone, 'Enter a phone number the restaurant can reach.');
    if (!fields.date.value) flag(fields.date, 'Choose a date.');
    else if (fields.date.value < dateEl.min) flag(fields.date, 'Choose today or a later date.');
    if (!fields.time.value) flag(fields.time, 'Choose a time.');
    else if (fields.time.value < SITE.openTime || fields.time.value > SITE.closeTime) flag(fields.time, 'Choose a time between 9:00 AM and 11:00 PM.');
    if (!(parseInt(fields.guests.value, 10) >= 1)) flag(fields.guests, 'Enter the number of guests.');

    if (problems.length) {
      errorEl.hidden = false;
      errorEl.textContent = problems.join(' ');
      $('[aria-invalid="true"]', form).focus();
      return;
    }
    errorEl.hidden = true;

    const message = [
      `*${SITE.name}*`,
      'Reservation request',
      '',
      `Name: ${get('#resName')}`,
      `Phone: ${get('#resPhone')}`,
      `Date: ${prettyDate(fields.date.value)}`,
      `Time: ${to12h(fields.time.value)}`,
      `Guests: ${parseInt(fields.guests.value, 10)}`,
      ...(get('#resMessage') ? [`Message: ${get('#resMessage')}`] : []),
      '',
      'Please let me know if this is available. Thank you.',
    ].join('\n');

    openExternal(waLink(message));
    statusEl.hidden = false;
    statusEl.textContent = 'Your request is ready in WhatsApp. Press send there. Green Lounge will reply to confirm; it is not a confirmed booking until then.';
  });
}


/* =========================================================
   7. GALLERY + LIGHTBOX
   ========================================================= */

const galleryGrid = $('#galleryGrid');
const galleryFilters = $('#galleryFilters');
let galleryVisible = [];

function renderGalleryGrid(cat) {
  galleryVisible = PHOTOS.gallery.filter(p => cat === 'all' || p.cat === cat);
  galleryGrid.innerHTML = galleryVisible.map((p, i) => `
    <li class="tile${p.size === 'large' ? ' tile--large' : ''}${p.fit === 'plate' ? ' tile--plate' : ''}${p.fit === 'contain' ? ' tile--contain' : ''} reveal" style="--d:${Math.min(i, 8) * 0.05}s">
      <button class="tile__btn" type="button" data-gi="${i}">
        <img src="${esc(p.src)}" alt="${esc(p.alt)}"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ''} loading="lazy" decoding="async">
        <span class="tile__zoom">${icon('expand')}</span>
      </button>
    </li>`).join('');

  /* If a listed photo file is missing, drop its tile instead of showing a broken image */
  $$('.tile img', galleryGrid).forEach(img => img.addEventListener('error', () => {
    const tile = img.closest('.tile');
    if (tile) tile.remove();
  }, { once: true }));

  observeReveals(galleryGrid);
}

function initGallery() {
  if (!PHOTOS.gallery.length) { $('#gallery').hidden = true; $$('[data-nav="gallery"]').forEach(a => a.closest('li').hidden = true); return; }

  const cats = [...new Set(PHOTOS.gallery.map(p => p.cat).filter(Boolean))];
  if (cats.length > 1) {
    galleryFilters.hidden = false;
    galleryFilters.innerHTML = ['All', ...cats].map((c, i) =>
      `<button class="chip" type="button" data-gcat="${i === 0 ? 'all' : esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('');
    galleryFilters.addEventListener('click', event => {
      const btn = event.target.closest('[data-gcat]');
      if (!btn) return;
      $$('[data-gcat]', galleryFilters).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      renderGalleryGrid(btn.dataset.gcat);
    });
  }

  renderGalleryGrid('all');
  galleryGrid.addEventListener('click', event => {
    const btn = event.target.closest('[data-gi]');
    if (btn) openLightbox(galleryVisible, Number(btn.dataset.gi), btn);
  });
}

/* Lightbox */
const lightbox = $('#lightbox');
const lb = { list: [], index: 0, opener: null };

function showLightboxPhoto() {
  const p = lb.list[lb.index];
  $('#lbImg').src = p.src;
  $('#lbImg').alt = p.alt || '';
  $('#lbCap').textContent = p.alt || '';
  $('#lbCount').textContent = lb.list.length > 1 ? `${lb.index + 1} / ${lb.list.length}` : '';
  $('#lbPrev').hidden = $('#lbNext').hidden = lb.list.length < 2;
}

function openLightbox(list, index, opener) {
  if (!list.length) return;
  lb.list = list; lb.index = index; lb.opener = opener || document.activeElement;
  showLightboxPhoto();
  lightbox.hidden = false;
  lockScroll();
  $('#lbClose').focus();
}
function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  unlockScroll();
  if (lb.opener && lb.opener.focus) lb.opener.focus();
}
function stepLightbox(delta) {
  if (lb.list.length < 2) return;
  lb.index = (lb.index + delta + lb.list.length) % lb.list.length;
  showLightboxPhoto();
}
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => stepLightbox(-1));
$('#lbNext').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });


/* =========================================================
   8. HEADER, NAVIGATION AND PAGE VIEWS
   The site has two "views" in one page: the home view and the
   menu view. Links ending in #menu show the menu view; every
   other link shows the home view and scrolls to its section.
   ========================================================= */

const header = $('#siteHeader');
const navToggle = $('#navToggle');
const nav = $('#primaryNav');
const homeView = $('#homeView');
const menuView = $('#menu');
const SPY_IDS = ['home', 'about', 'gallery', 'reservations', 'contact'];
let currentView = 'home';
let heroIntroDone = false;
let headerSolid = false;      // cached header state, avoids a classList write every scroll frame
let activeNavName = null;     // cached scroll-spy result, avoids re-setting aria-current every frame

function closeNav() {
  if (!nav.classList.contains('is-open')) return;
  nav.classList.remove('is-open');
  header.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  unlockScroll();
}
function toggleNav() {
  if (nav.classList.contains('is-open')) { closeNav(); return; }
  nav.classList.add('is-open');
  header.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  lockScroll();
}
navToggle.addEventListener('click', toggleNav);
nav.addEventListener('click', event => { if (event.target.closest('a')) closeNav(); });

function setActiveNav(name) {
  if (name === activeNavName) return;      // skip redundant DOM writes
  activeNavName = name;
  $$('[data-nav]').forEach(a => {
    if (a.dataset.nav === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function updateHeader() {
  const solid = currentView === 'menu' || window.scrollY > 24;
  if (solid === headerSolid) return;       // only touch the class when it changes
  headerSolid = solid;
  header.classList.toggle('is-solid', solid);
}

function updateSpy() {
  if (currentView !== 'home') return;
  const line = header.offsetHeight + 160;
  let current = 'home';
  SPY_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  });
  setActiveNav(current);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateHeader(); updateSpy(); ticking = false; });
}, { passive: true });

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
}

/* Cross-fade between the two views.
   The view that is leaving is pinned (position: fixed) exactly where it was on
   screen and fades out on top, while the new view is already in place and fades
   in underneath it. Nothing is ever hidden before its replacement is painted, so
   there is no white flash, blink or loading-like jump. */
const VIEW_FADE_MS = 420;
let leavingView = null;
let leavingTimer = 0;
let viewsReady = false;   // no cross-fade for the very first route on page load

function endViewFade() {
  if (!leavingView) return;
  const el = leavingView;
  leavingView = null;
  clearTimeout(leavingTimer);
  el.classList.remove('view-leaving');
  el.style.position = el.style.left = el.style.top = el.style.width = el.style.height = el.style.willChange = '';
  if (el !== (currentView === 'menu' ? menuView : homeView)) el.hidden = true;
}

function startViewFade(outEl, inEl) {
  endViewFade();

  /* Pin the outgoing view where it currently sits, then reveal the new one */
  const rect = outEl.getBoundingClientRect();
  outEl.classList.remove('view-entering');
  outEl.style.left = `${rect.left}px`;
  outEl.style.top = `${rect.top}px`;
  outEl.style.width = `${rect.width}px`;
  outEl.style.height = `${rect.height}px`;
  outEl.style.willChange = 'opacity';          // hint the compositor so the fade-out does not repaint every frame
  outEl.classList.add('view-leaving');
  leavingView = outEl;

  inEl.hidden = false;
  inEl.classList.remove('view-entering');
  void inEl.offsetWidth;                       // restart the fade-in if one was running
  inEl.classList.add('view-entering');
  setTimeout(() => inEl.classList.remove('view-entering'), VIEW_FADE_MS);

  leavingTimer = setTimeout(endViewFade, VIEW_FADE_MS);
}

function showView(name) {
  const previous = currentView;
  currentView = name;

  const outEl = previous === 'menu' ? menuView : homeView;
  const inEl = name === 'menu' ? menuView : homeView;

  if (previous !== name && viewsReady && !outEl.hidden) {
    startViewFade(outEl, inEl);
  } else {
    endViewFade();
    homeView.hidden = name !== 'home';
    menuView.hidden = name !== 'menu';
  }

  document.title = name === 'menu'
    ? 'Menu | Green Lounge Rooftop Restaurant & Convention Hall | Chhagalnaiya'
    : 'Green Lounge Rooftop Restaurant & Convention Hall | Chhagalnaiya';
  if (name === 'menu') setActiveNav('menu');
  updateHeader();

  /* The hero's title/subtitle/buttons/moon play a one-time entrance animation (.hero-intro).
     Strip the class once it has played through, so returning to Home later never replays it —
     that replay was the dark "blink" when switching between Home and Menu. */
  if (name === 'home' && !heroIntroDone) {
    heroIntroDone = true;
    const hero = $('.hero');
    if (hero) setTimeout(() => hero.classList.remove('hero-intro'), 1300);
  }
}

function route(initial = false) {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''));
  closeNav();
  if (id === 'menu') {
    const wasMenu = currentView === 'menu';
    showView('menu');
    if (!wasMenu || initial) window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    const changed = currentView !== 'home';
    showView('home');
    if (changed || (initial && id)) requestAnimationFrame(() => scrollToId(id || 'home'));
    updateSpy();
  }
}
window.addEventListener('hashchange', () => route(false));

/* Light reveal for a handful of large blocks */
let revealObserver = null;
function observeReveals(root = document) {
  const targets = $$('.reveal:not(.is-visible)', root);
  if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('is-visible')); return; }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }
  targets.forEach(el => revealObserver.observe(el));
}

/* About picture: a real photo if listed, else a collage of three plates from the menu, else a simple emblem */
function initAboutVisual() {
  const visual = $('#aboutVisual');
  if (PHOTOS.about) {
    visual.innerHTML = `<img src="${esc(PHOTOS.about)}" alt="${esc(PHOTOS.aboutAlt)}" loading="lazy">`;
    return;
  }
  const trio = ['set-3', 'dala-1', 'set-6'].map(id => DISH_PHOTOS[id]);
  if (trio.every(p => p && p.plate)) {
    const cls = ['plates__a', 'plates__b', 'plates__c'];
    visual.innerHTML = `<div class="plates">${trio.map((p, i) =>
      `<img class="${cls[i]}" src="${esc(p.src)}" alt="${esc(p.alt)}" width="480" height="480" loading="lazy" decoding="async">`).join('')}</div>`;
    return;
  }
  visual.innerHTML = `<div class="about__emblem" aria-hidden="true"><svg focusable="false"><use href="#logo-mark"/></svg></div>`;
}

/* Use real photos for the hero / rooftop when they are listed in PHOTOS */
function initPhotos() {
  if (PHOTOS.hero) {
    const img = document.createElement('img');
    img.className = 'hero__photo';
    img.alt = PHOTOS.heroAlt || '';
    img.addEventListener('load', () => $('#home').classList.add('has-photo'));
    img.src = PHOTOS.hero;
    $('.hero__bg').insertBefore(img, $('.hero__shade'));
  }
  initAboutVisual();
  if (PHOTOS.rooftop) {
    const frame = $('#rooftopFrame');
    const img = document.createElement('img');
    img.alt = PHOTOS.rooftopAlt || '';
    img.loading = 'lazy';
    img.addEventListener('load', () => { frame.classList.add('has-photo'); const svg = $('svg', frame); if (svg) svg.remove(); });
    img.src = PHOTOS.rooftop;
    frame.prepend(img);
  }
}


/* =========================================================
   9. START-UP
   ========================================================= */

/* Escape closes whatever is open; Tab stays inside dialogs; arrows move through photos */
document.addEventListener('keydown', event => {
  if (!lightbox.hidden) {
    if (event.key === 'Escape') closeLightbox();
    else if (event.key === 'ArrowLeft') stepLightbox(-1);
    else if (event.key === 'ArrowRight') stepLightbox(1);
    else trapTab(event, lightbox);
    return;
  }
  if (event.key === 'Escape') closeNav();
});

/* Close the mobile menu if the window grows to desktop width */
window.matchMedia('(min-width: 1180px)').addEventListener('change', event => { if (event.matches) closeNav(); });

$('#year').textContent = new Date().getFullYear();

/* Marks the hero as ready to play its one-time entrance animation (see showView) */
$('.hero').classList.add('hero-intro');

renderHighlights();
initMenuControls();
initGallery();
initReservationForm();
initPhotos();
observeReveals();
route(true);
viewsReady = true;   // from now on, switching views cross-fades
updateHeader();

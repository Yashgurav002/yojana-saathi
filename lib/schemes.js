// Scheme database. Compiled 2026-11-07 from official scheme portals and notices; a few amounts come from news
// reports of state cabinet decisions. Each entry links its source and the date its rules were last checked.
// Kept current by Scheme Scout (scout/scout.mjs) through human-reviewed pull requests. Verify at the office before applying.
export const SCHEMES = [
  {
    "id": "pm-kisan",
    "level": "central",
    "name": {
      "en": "PM-KISAN",
      "hi": "पीएम किसान सम्मान निधि",
      "mr": "पीएम किसान सन्मान निधी"
    },
    "benefit": {
      "en": "₹6,000 a year in 3 payments of ₹2,000, straight to your bank account",
      "hi": "साल में ₹6,000, ₹2,000 की 3 किस्तों में सीधे बैंक खाते में",
      "mr": "वर्षाला ₹6,000, ₹2,000 च्या 3 हप्त्यांत थेट बँक खात्यात"
    },
    "rules": [
      {
        "f": "ownsFarmland",
        "eq": true
      },
      {
        "f": "incomeTaxPayerFamily",
        "eq": false
      },
      {
        "f": "govtEmployeeInFamily",
        "eq": false
      },
      {
        "f": "hasBankAccount",
        "eq": true
      }
    ],
    "note": {
      "en": "Only one benefit per farmer family. Not for doctors, lawyers, engineers or pensioners getting ₹10,000 or more a month. Peon / clerk-level (Group D) government staff families can still apply. e-KYC and Farmer ID are needed.",
      "hi": "एक किसान परिवार को एक ही लाभ मिलता है। डॉक्टर, वकील, इंजीनियर और ₹10,000 या ज्यादा पेंशन वाले इसमें नहीं आते। चपरासी / क्लास-4 सरकारी कर्मचारी का परिवार अर्जी दे सकता है। ई-केवाईसी और फार्मर आईडी चाहिए।",
      "mr": "एका शेतकरी कुटुंबाला एकच लाभ मिळतो. डॉक्टर, वकील, इंजिनिअर आणि महिना ₹10,000 किंवा जास्त पेन्शन घेणारे यात बसत नाहीत. शिपाई / वर्ग-4 सरकारी कर्मचाऱ्याचे कुटुंब अर्ज करू शकते. ई-केवायसी आणि फार्मर आयडी लागतो."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "7/12 land record (satbara)",
        "Bank passbook linked to Aadhaar",
        "Mobile number linked to Aadhaar",
        "Farmer ID"
      ],
      "hi": [
        "आधार कार्ड",
        "7/12 जमीन का उतारा",
        "आधार से जुड़ा बैंक पासबुक",
        "आधार से जुड़ा मोबाइल नंबर",
        "फार्मर आईडी"
      ],
      "mr": [
        "आधार कार्ड",
        "7/12 उतारा",
        "आधारशी जोडलेले बँक पासबुक",
        "आधारशी जोडलेला मोबाइल नंबर",
        "फार्मर आयडी"
      ]
    },
    "apply": {
      "en": "Apply at your CSC / Setu Kendra, or at pmkisan.gov.in, or ask the village Talathi / Krishi office.",
      "hi": "अपने CSC / सेतु केंद्र पर या pmkisan.gov.in पर अर्जी दें, या गाँव के तलाठी / कृषि कार्यालय से पूछें।",
      "mr": "तुमच्या CSC / सेतू केंद्रावर किंवा pmkisan.gov.in वर अर्ज करा, किंवा गावच्या तलाठी / कृषी कार्यालयात विचारा."
    },
    "url": "https://pmkisan.gov.in/",
    "source": "https://pmkisan.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-vishwakarma",
    "level": "central",
    "name": {
      "en": "PM Vishwakarma",
      "hi": "पीएम विश्वकर्मा योजना",
      "mr": "पीएम विश्वकर्मा योजना"
    },
    "benefit": {
      "en": "₹15,000 toolkit, ₹500 a day during training, and loan of ₹1 lakh then ₹2 lakh at 5% interest",
      "hi": "₹15,000 औजार किट, ट्रेनिंग में रोज ₹500, और 5% ब्याज पर ₹1 लाख फिर ₹2 लाख का लोन",
      "mr": "₹15,000 ची अवजारे, प्रशिक्षणात रोज ₹500 आणि 5% व्याजाने ₹1 लाख, मग ₹2 लाख कर्ज"
    },
    "rules": [
      {
        "f": "occupation",
        "in": [
          "artisan"
        ]
      },
      {
        "f": "age",
        "min": 18
      },
      {
        "f": "govtEmployeeInFamily",
        "eq": false
      }
    ],
    "note": {
      "en": "Not if you or your family took a PMEGP, PM SVANidhi or Mudra loan in the last 5 years. Only one person per family (husband, wife, unmarried children). Must be one of the 18 listed traditional trades.",
      "hi": "अगर आपने या परिवार ने पिछले 5 साल में PMEGP, PM स्वनिधि या मुद्रा लोन लिया है तो नहीं। परिवार में सिर्फ एक व्यक्ति (पति, पत्नी, अविवाहित बच्चे)। 18 तय पारंपरिक काम में से एक होना चाहिए।",
      "mr": "तुम्ही किंवा कुटुंबाने मागच्या 5 वर्षांत PMEGP, पीएम स्वनिधी किंवा मुद्रा कर्ज घेतले असेल तर नाही. कुटुंबात फक्त एकच व्यक्ती (नवरा, बायको, अविवाहित मुले). ठरवलेल्या 18 पारंपरिक कामांपैकी एक असावे."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Mobile number linked to Aadhaar",
        "Bank passbook",
        "Ration card",
        "Proof of your trade (if you have it)"
      ],
      "hi": [
        "आधार कार्ड",
        "आधार से जुड़ा मोबाइल नंबर",
        "बैंक पासबुक",
        "राशन कार्ड",
        "अपने काम का सबूत (हो तो)"
      ],
      "mr": [
        "आधार कार्ड",
        "आधारशी जोडलेला मोबाइल नंबर",
        "बँक पासबुक",
        "रेशन कार्ड",
        "तुमच्या कामाचा पुरावा (असल्यास)"
      ]
    },
    "apply": {
      "en": "Register free at your nearest CSC / Setu Kendra or at pmvishwakarma.gov.in.",
      "hi": "नजदीकी CSC / सेतु केंद्र पर या pmvishwakarma.gov.in पर मुफ्त रजिस्ट्रेशन करें।",
      "mr": "जवळच्या CSC / सेतू केंद्रावर किंवा pmvishwakarma.gov.in वर मोफत नोंदणी करा."
    },
    "url": "https://pmvishwakarma.gov.in/",
    "source": "https://pmvishwakarma.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-svanidhi",
    "level": "central",
    "name": {
      "en": "PM SVANidhi",
      "hi": "पीएम स्वनिधि (ठेले-पटरी वालों का लोन)",
      "mr": "पीएम स्वनिधी (फेरीवाला कर्ज)"
    },
    "benefit": {
      "en": "Loan without guarantee: ₹15,000, then ₹25,000, then ₹50,000 as you repay on time",
      "hi": "बिना गारंटी लोन: ₹15,000, फिर ₹25,000, फिर ₹50,000, समय पर चुकाने पर",
      "mr": "हमीशिवाय कर्ज: ₹15,000, मग ₹25,000, मग ₹50,000, वेळेवर फेडल्यास"
    },
    "rules": [
      {
        "f": "occupation",
        "in": [
          "street_vendor"
        ]
      }
    ],
    "note": {
      "en": "You need a vending certificate, ID card or Letter of Recommendation from your municipal body, or to be in its street vendor survey. Your mobile must be linked to Aadhaar. Works only in states that have notified the Street Vendors Act rules.",
      "hi": "नगर पालिका का वेंडिंग सर्टिफिकेट, पहचान पत्र या सिफारिश पत्र चाहिए, या उनके सर्वे में नाम होना चाहिए। मोबाइल आधार से जुड़ा हो।",
      "mr": "नगरपालिकेचे विक्रेता प्रमाणपत्र, ओळखपत्र किंवा शिफारस पत्र लागते, किंवा त्यांच्या सर्वेक्षणात नाव असावे. मोबाइल आधारशी जोडलेला हवा."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Mobile number linked to Aadhaar",
        "Vending certificate / ID card / Letter of Recommendation",
        "Bank passbook"
      ],
      "hi": [
        "आधार कार्ड",
        "आधार से जुड़ा मोबाइल नंबर",
        "वेंडिंग सर्टिफिकेट / पहचान पत्र / सिफारिश पत्र",
        "बैंक पासबुक"
      ],
      "mr": [
        "आधार कार्ड",
        "आधारशी जोडलेला मोबाइल नंबर",
        "विक्रेता प्रमाणपत्र / ओळखपत्र / शिफारस पत्र",
        "बँक पासबुक"
      ]
    },
    "apply": {
      "en": "Apply through the PM SVANidhi app or pmsvanidhi.mohua.gov.in, at a CSC, or at a bank or your municipal office.",
      "hi": "पीएम स्वनिधि ऐप या pmsvanidhi.mohua.gov.in पर, CSC पर, या बैंक या नगर पालिका दफ्तर में अर्जी दें।",
      "mr": "पीएम स्वनिधी अॅप किंवा pmsvanidhi.mohua.gov.in वर, CSC वर, किंवा बँक किंवा नगरपालिका कार्यालयात अर्ज करा."
    },
    "url": "https://pmsvanidhi.mohua.gov.in/",
    "source": "https://pmsvanidhi.mohua.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "e-shram",
    "level": "central",
    "name": {
      "en": "e-Shram Card",
      "hi": "ई-श्रम कार्ड",
      "mr": "ई-श्रम कार्ड"
    },
    "benefit": {
      "en": "Free card with ₹2 lakh accident cover (₹1 lakh for partial disability) and a link to other worker schemes",
      "hi": "मुफ्त कार्ड, ₹2 लाख का दुर्घटना बीमा (आंशिक विकलांगता पर ₹1 लाख) और दूसरी मजदूर योजनाओं से जुड़ाव",
      "mr": "मोफत कार्ड, ₹2 लाखांचा अपघात विमा (अंशतः अपंगत्वास ₹1 लाख) आणि इतर कामगार योजनांशी जोड"
    },
    "rules": [
      {
        "f": "age",
        "min": 16,
        "max": 59
      },
      {
        "f": "occupation",
        "in": [
          "farmer",
          "street_vendor",
          "artisan",
          "construction_worker",
          "domestic_worker",
          "other_unorganised",
          "small_business"
        ]
      },
      {
        "f": "inEpfoEsicNps",
        "eq": false
      },
      {
        "f": "incomeTaxPayerSelf",
        "eq": false
      }
    ],
    "note": {
      "en": "Accident cover comes through PMSBY and may need a bank account; check at registration.",
      "hi": "दुर्घटना बीमा PMSBY से मिलता है और इसके लिए बैंक खाता लग सकता है; रजिस्ट्रेशन पर पूछ लें।",
      "mr": "अपघात विमा PMSBY मधून मिळतो आणि त्यासाठी बँक खाते लागू शकते; नोंदणीच्या वेळी विचारा."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Mobile number linked to Aadhaar",
        "Bank passbook"
      ],
      "hi": [
        "आधार कार्ड",
        "आधार से जुड़ा मोबाइल नंबर",
        "बैंक पासबुक"
      ],
      "mr": [
        "आधार कार्ड",
        "आधारशी जोडलेला मोबाइल नंबर",
        "बँक पासबुक"
      ]
    },
    "apply": {
      "en": "Register free at a CSC / Setu Kendra, a post office, or at eshram.gov.in.",
      "hi": "CSC / सेतु केंद्र, डाकघर या eshram.gov.in पर मुफ्त रजिस्ट्रेशन करें।",
      "mr": "CSC / सेतू केंद्र, पोस्ट ऑफिस किंवा eshram.gov.in वर मोफत नोंदणी करा."
    },
    "url": "https://eshram.gov.in/",
    "source": "https://eshram.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-sym",
    "level": "central",
    "name": {
      "en": "PM Shram Yogi Maan-dhan (PM-SYM)",
      "hi": "पीएम श्रम योगी मानधन (पेंशन)",
      "mr": "पीएम श्रम योगी मानधन (पेन्शन)"
    },
    "benefit": {
      "en": "₹3,000 pension every month after age 60; government adds equal money to what you pay",
      "hi": "60 साल के बाद हर महीने ₹3,000 पेंशन; आप जितना भरें, सरकार भी उतना ही भरती है",
      "mr": "60 वर्षांनंतर दर महिना ₹3,000 पेन्शन; तुम्ही भरता तितकेच सरकारही भरते"
    },
    "rules": [
      {
        "f": "age",
        "min": 18,
        "max": 40
      },
      {
        "f": "occupation",
        "in": [
          "street_vendor",
          "artisan",
          "construction_worker",
          "domestic_worker",
          "other_unorganised",
          "small_business"
        ]
      },
      {
        "f": "inEpfoEsicNps",
        "eq": false
      },
      {
        "f": "incomeTaxPayerSelf",
        "eq": false
      },
      {
        "f": "hasBankAccount",
        "eq": true
      }
    ],
    "note": {
      "en": "Your own monthly income must be ₹15,000 or less. You pay about ₹55 to ₹200 a month depending on your age when you join, until age 60.",
      "hi": "आपकी अपनी महीने की कमाई ₹15,000 या कम होनी चाहिए। जुड़ने की उम्र के हिसाब से लगभग ₹55 से ₹200 महीना 60 साल तक भरना होगा।",
      "mr": "तुमची स्वतःची महिन्याची कमाई ₹15,000 किंवा कमी असावी. सामील होतानाच्या वयानुसार सुमारे ₹55 ते ₹200 महिना 60 वर्षांपर्यंत भरावे लागतात."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Bank passbook or IFSC code",
        "Mobile number"
      ],
      "hi": [
        "आधार कार्ड",
        "बैंक पासबुक या IFSC कोड",
        "मोबाइल नंबर"
      ],
      "mr": [
        "आधार कार्ड",
        "बँक पासबुक किंवा IFSC कोड",
        "मोबाइल नंबर"
      ]
    },
    "apply": {
      "en": "Enrol at your nearest CSC / Setu Kendra, or at maandhan.in.",
      "hi": "नजदीकी CSC / सेतु केंद्र पर या maandhan.in पर नाम लिखवाएँ।",
      "mr": "जवळच्या CSC / सेतू केंद्रावर किंवा maandhan.in वर नाव नोंदवा."
    },
    "url": "https://maandhan.in/",
    "source": "https://maandhan.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "atal-pension-yojana",
    "level": "central",
    "name": {
      "en": "Atal Pension Yojana",
      "hi": "अटल पेंशन योजना",
      "mr": "अटल पेन्शन योजना"
    },
    "benefit": {
      "en": "Fixed pension of ₹1,000 to ₹5,000 a month after age 60, as per what you choose",
      "hi": "60 साल के बाद हर महीने ₹1,000 से ₹5,000 तय पेंशन, आपकी चुनी रकम के हिसाब से",
      "mr": "60 वर्षांनंतर दर महिना ₹1,000 ते ₹5,000 ठरलेली पेन्शन, तुम्ही निवडलेल्या रकमेनुसार"
    },
    "rules": [
      {
        "f": "age",
        "min": 18,
        "max": 40
      },
      {
        "f": "hasBankAccount",
        "eq": true
      },
      {
        "f": "incomeTaxPayerSelf",
        "eq": false
      }
    ],
    "note": {
      "en": "You pay a small monthly amount from your bank account until 60. The younger you join, the less you pay.",
      "hi": "60 साल तक बैंक खाते से हर महीने थोड़ी रकम कटती है। जितनी कम उम्र में जुड़ेंगे, उतना कम भरना होगा।",
      "mr": "60 वर्षांपर्यंत बँक खात्यातून दर महिना थोडी रक्कम कापली जाते. जितक्या कमी वयात सामील व्हाल तितके कमी भरावे लागते."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Savings bank account",
        "Mobile number",
        "Nominee details"
      ],
      "hi": [
        "आधार कार्ड",
        "बचत बैंक खाता",
        "मोबाइल नंबर",
        "नॉमिनी की जानकारी"
      ],
      "mr": [
        "आधार कार्ड",
        "बचत बँक खाते",
        "मोबाइल नंबर",
        "नॉमिनीची माहिती"
      ]
    },
    "apply": {
      "en": "Go to your bank or post office where you have a savings account and fill the APY form.",
      "hi": "जिस बैंक या डाकघर में आपका बचत खाता है वहाँ जाकर APY फॉर्म भरें।",
      "mr": "तुमचे बचत खाते असलेल्या बँकेत किंवा पोस्ट ऑफिसमध्ये जाऊन APY फॉर्म भरा."
    },
    "url": "https://www.npscra.nsdl.co.in/scheme-details.php",
    "source": "https://www.myscheme.gov.in/schemes/apy",
    "checked": "2026-11-07"
  },
  {
    "id": "pmjjby",
    "level": "central",
    "name": {
      "en": "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
      "hi": "पीएम जीवन ज्योति बीमा योजना",
      "mr": "पीएम जीवन ज्योती विमा योजना"
    },
    "benefit": {
      "en": "₹2 lakh life insurance for ₹436 a year; paid to family on death from any cause",
      "hi": "साल के ₹436 में ₹2 लाख का जीवन बीमा; किसी भी कारण से मृत्यु पर परिवार को मिलता है",
      "mr": "वर्षाला ₹436 मध्ये ₹2 लाखांचा जीवन विमा; कोणत्याही कारणाने मृत्यू झाल्यास कुटुंबाला मिळतो"
    },
    "rules": [
      {
        "f": "age",
        "min": 18,
        "max": 50
      },
      {
        "f": "hasBankAccount",
        "eq": true
      }
    ],
    "note": {
      "en": "Cover is for one year and renews every year by auto-debit from your bank account, up to age 55. Keep ₹436 in the account every May.",
      "hi": "बीमा एक साल का है और हर साल बैंक खाते से अपने आप कटकर 55 साल तक बढ़ता है। हर मई से पहले खाते में ₹436 रखें।",
      "mr": "विमा एका वर्षाचा आहे आणि दरवर्षी बँक खात्यातून आपोआप कापून 55 वर्षांपर्यंत चालतो. दरवर्षी मे महिन्यापूर्वी खात्यात ₹436 ठेवा."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Savings bank account",
        "Nominee details"
      ],
      "hi": [
        "आधार कार्ड",
        "बचत बैंक खाता",
        "नॉमिनी की जानकारी"
      ],
      "mr": [
        "आधार कार्ड",
        "बचत बँक खाते",
        "नॉमिनीची माहिती"
      ]
    },
    "apply": {
      "en": "Ask at your bank branch or post office, or enrol through your bank app or net banking.",
      "hi": "अपनी बैंक शाखा या डाकघर में पूछें, या बैंक ऐप / नेट बैंकिंग से जुड़ें।",
      "mr": "तुमच्या बँक शाखेत किंवा पोस्ट ऑफिसमध्ये विचारा, किंवा बँक अॅप / नेट बँकिंगने सामील व्हा."
    },
    "url": "https://jansuraksha.gov.in/",
    "source": "https://jansuraksha.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "pmsby",
    "level": "central",
    "name": {
      "en": "PM Suraksha Bima Yojana (PMSBY)",
      "hi": "पीएम सुरक्षा बीमा योजना",
      "mr": "पीएम सुरक्षा विमा योजना"
    },
    "benefit": {
      "en": "₹2 lakh accident insurance for just ₹20 a year (₹1 lakh for partial disability)",
      "hi": "साल के सिर्फ ₹20 में ₹2 लाख का दुर्घटना बीमा (आंशिक विकलांगता पर ₹1 लाख)",
      "mr": "वर्षाला फक्त ₹20 मध्ये ₹2 लाखांचा अपघात विमा (अंशतः अपंगत्वास ₹1 लाख)"
    },
    "rules": [
      {
        "f": "age",
        "min": 18,
        "max": 70
      },
      {
        "f": "hasBankAccount",
        "eq": true
      }
    ],
    "note": {
      "en": "Covers accidents only, not normal death. Renews every year by auto-debit from your bank account.",
      "hi": "सिर्फ दुर्घटना का बीमा है, सामान्य मृत्यु का नहीं। हर साल बैंक खाते से अपने आप कटकर बढ़ता है।",
      "mr": "फक्त अपघाताचा विमा आहे, नैसर्गिक मृत्यूचा नाही. दरवर्षी बँक खात्यातून आपोआप कापून चालतो."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Savings bank account",
        "Nominee details"
      ],
      "hi": [
        "आधार कार्ड",
        "बचत बैंक खाता",
        "नॉमिनी की जानकारी"
      ],
      "mr": [
        "आधार कार्ड",
        "बचत बँक खाते",
        "नॉमिनीची माहिती"
      ]
    },
    "apply": {
      "en": "Ask at your bank branch or post office, or enrol through your bank app or net banking.",
      "hi": "अपनी बैंक शाखा या डाकघर में पूछें, या बैंक ऐप / नेट बैंकिंग से जुड़ें।",
      "mr": "तुमच्या बँक शाखेत किंवा पोस्ट ऑफिसमध्ये विचारा, किंवा बँक अॅप / नेट बँकिंगने सामील व्हा."
    },
    "url": "https://jansuraksha.gov.in/",
    "source": "https://jansuraksha.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-jay",
    "level": "central",
    "name": {
      "en": "Ayushman Bharat PM-JAY (Mahatma Phule Jan Arogya Yojana in Maharashtra)",
      "hi": "आयुष्मान भारत (गोल्डन कार्ड)",
      "mr": "आयुष्मान भारत / महात्मा फुले जन आरोग्य योजना"
    },
    "benefit": {
      "en": "Free hospital treatment up to ₹5 lakh per family per year; everyone aged 70+ gets it, whatever the income",
      "hi": "परिवार को साल में ₹5 लाख तक अस्पताल का इलाज मुफ्त; 70 साल या ज्यादा उम्र वाले सभी को, कमाई चाहे जितनी हो",
      "mr": "कुटुंबाला वर्षाला ₹5 लाखांपर्यंत रुग्णालयातील उपचार मोफत; 70 वर्षे किंवा जास्त वयाच्या सर्वांना, उत्पन्न कितीही असो"
    },
    "rules": [
      {
        "any": [
          {
            "f": "age",
            "min": 70
          },
          {
            "f": "bplCard",
            "eq": true
          },
          {
            "f": "state",
            "eq": "Maharashtra"
          }
        ]
      }
    ],
    "note": {
      "en": "For under-70s, poor families are chosen from official lists (SECC); a BPL, yellow or orange ration card is used here as a guide. In Maharashtra, MJPJAY runs together with PM-JAY since 1 July 2024 with ₹5 lakh cover for resident families with any ration card or a domicile certificate; confirm at the hospital Arogya Mitra desk.",
      "hi": "70 से कम उम्र वालों के लिए गरीब परिवार सरकारी सूची (SECC) से चुने जाते हैं; यहाँ BPL, पीला या केसरी राशन कार्ड को अंदाज के लिए माना है। महाराष्ट्र में 1 जुलाई 2024 से महात्मा फुले योजना और PM-JAY साथ चलती हैं: किसी भी राशन कार्ड या अधिवास प्रमाण पत्र वाले परिवार को ₹5 लाख तक; अस्पताल के आरोग्य मित्र से पक्का करें।",
      "mr": "70 पेक्षा कमी वयाच्या लोकांसाठी गरीब कुटुंबे सरकारी यादीतून (SECC) निवडली जातात; इथे BPL, पिवळे किंवा केशरी रेशन कार्ड अंदाजासाठी धरले आहे. महाराष्ट्रात 1 जुलै 2024 पासून महात्मा फुले योजना आणि PM-JAY एकत्र चालतात: कोणतेही रेशन कार्ड किंवा अधिवास दाखला असलेल्या कुटुंबाला ₹5 लाखांपर्यंत; रुग्णालयातील आरोग्य मित्राकडे खात्री करा."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Ration card",
        "Age proof (for 70+)",
        "Mobile number"
      ],
      "hi": [
        "आधार कार्ड",
        "राशन कार्ड",
        "उम्र का सबूत (70+ के लिए)",
        "मोबाइल नंबर"
      ],
      "mr": [
        "आधार कार्ड",
        "रेशन कार्ड",
        "वयाचा पुरावा (70+ साठी)",
        "मोबाइल नंबर"
      ]
    },
    "apply": {
      "en": "Get your card at a listed hospital Arogya Mitra desk, a CSC / Setu Kendra, or through the Ayushman app or beneficiary.nha.gov.in.",
      "hi": "सूचीबद्ध अस्पताल के आरोग्य मित्र, CSC / सेतु केंद्र, या आयुष्मान ऐप / beneficiary.nha.gov.in से कार्ड बनवाएँ।",
      "mr": "यादीतील रुग्णालयाच्या आरोग्य मित्राकडे, CSC / सेतू केंद्रावर, किंवा आयुष्मान अॅप / beneficiary.nha.gov.in वरून कार्ड काढा."
    },
    "url": "https://pmjay.gov.in/",
    "source": "https://www.myscheme.gov.in/schemes/ab-pmjay",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-ujjwala",
    "level": "central",
    "name": {
      "en": "PM Ujjwala Yojana",
      "hi": "पीएम उज्ज्वला योजना (मुफ्त गैस कनेक्शन)",
      "mr": "पीएम उज्ज्वला योजना (मोफत गॅस कनेक्शन)"
    },
    "benefit": {
      "en": "Free LPG gas connection for a poor household, with a ₹300 subsidy on each cylinder refill (up to 9 a year)",
      "hi": "गरीब परिवार को मुफ्त गैस कनेक्शन, और हर सिलेंडर पर ₹300 की सब्सिडी (साल में 9 तक)",
      "mr": "गरीब कुटुंबाला मोफत गॅस कनेक्शन, आणि प्रत्येक सिलेंडरवर ₹300 सबसिडी (वर्षाला 9 पर्यंत)"
    },
    "rules": [
      {
        "f": "gender",
        "in": [
          "female"
        ]
      },
      {
        "f": "age",
        "min": 18
      },
      {
        "f": "hasLpgConnection",
        "eq": false
      }
    ],
    "note": {
      "en": "The woman must be 18+ and the household must have no LPG connection. The family must be poor: shown by a BPL / Antyodaya card, SC/ST status, a PMAY house, or a simple self-declaration at the gas agency.",
      "hi": "महिला 18+ हो और घर में कोई गैस कनेक्शन न हो। परिवार गरीब होना चाहिए: BPL / अंत्योदय कार्ड, SC/ST, PMAY घर, या गैस एजेंसी पर एक सादा स्व-घोषणा पत्र से यह दिखाया जाता है।",
      "mr": "महिला 18+ असावी आणि घरात गॅस कनेक्शन नसावे. कुटुंब गरीब असावे: BPL / अंत्योदय कार्ड, SC/ST, PMAY घर, किंवा गॅस एजन्सीत साध्या स्व-घोषणापत्राने हे दाखवता येते."
    },
    "documents": {
      "en": [
        "Aadhaar card of the woman",
        "Ration card",
        "Bank passbook",
        "Passport photo",
        "Address proof"
      ],
      "hi": [
        "महिला का आधार कार्ड",
        "राशन कार्ड",
        "बैंक पासबुक",
        "पासपोर्ट फोटो",
        "पते का सबूत"
      ],
      "mr": [
        "महिलेचे आधार कार्ड",
        "रेशन कार्ड",
        "बँक पासबुक",
        "पासपोर्ट फोटो",
        "पत्त्याचा पुरावा"
      ]
    },
    "apply": {
      "en": "Apply at your nearest LPG gas agency (Indane, HP or Bharat Gas) or at pmuy.gov.in.",
      "hi": "नजदीकी गैस एजेंसी (इंडेन, HP या भारत गैस) पर या pmuy.gov.in पर अर्जी दें।",
      "mr": "जवळच्या गॅस एजन्सीत (इंडेन, HP किंवा भारत गॅस) किंवा pmuy.gov.in वर अर्ज करा."
    },
    "url": "https://www.pmuy.gov.in/",
    "source": "https://www.pmuy.gov.in/",
    "checked": "2026-11-07"
  },
  {
    "id": "sukanya-samriddhi",
    "level": "central",
    "name": {
      "en": "Sukanya Samriddhi Yojana",
      "hi": "सुकन्या समृद्धि योजना",
      "mr": "सुकन्या समृद्धी योजना"
    },
    "benefit": {
      "en": "Savings account for your girl child with 8.2% interest (rate reviewed every 3 months), from ₹250 up to ₹1.5 lakh a year",
      "hi": "बेटी के नाम बचत खाता, 8.2% ब्याज (दर हर 3 महीने तय), साल में ₹250 से ₹1.5 लाख तक जमा",
      "mr": "मुलीच्या नावे बचत खाते, 8.2% व्याज (दर दर 3 महिन्यांनी ठरतो), वर्षाला ₹250 ते ₹1.5 लाख जमा"
    },
    "rules": [
      {
        "f": "hasGirlChildUnder10",
        "eq": true
      }
    ],
    "note": {
      "en": "Account must be opened before the girl turns 10. Maximum 2 girls per family (3 if twins or triplets). Interest rate is reset every 3 months.",
      "hi": "बेटी 10 साल की होने से पहले खाता खुलना चाहिए। एक परिवार की ज्यादा से ज्यादा 2 बेटियाँ (जुड़वाँ हों तो 3)। ब्याज दर हर 3 महीने में तय होती है।",
      "mr": "मुलगी 10 वर्षांची होण्यापूर्वी खाते उघडावे. एका कुटुंबातील जास्तीत जास्त 2 मुली (जुळ्या असतील तर 3). व्याजदर दर 3 महिन्यांनी ठरतो."
    },
    "documents": {
      "en": [
        "Girl's birth certificate",
        "Parent or guardian Aadhaar card",
        "Parent or guardian address proof",
        "Passport photo"
      ],
      "hi": [
        "बेटी का जन्म प्रमाण पत्र",
        "माता-पिता / अभिभावक का आधार कार्ड",
        "पते का सबूत",
        "पासपोर्ट फोटो"
      ],
      "mr": [
        "मुलीचा जन्म दाखला",
        "आई-वडील / पालकांचे आधार कार्ड",
        "पत्त्याचा पुरावा",
        "पासपोर्ट फोटो"
      ]
    },
    "apply": {
      "en": "Open the account at any post office or a bank that offers it.",
      "hi": "किसी भी डाकघर या इसे चलाने वाले बैंक में खाता खुलवाएँ।",
      "mr": "कोणत्याही पोस्ट ऑफिसमध्ये किंवा ही योजना असलेल्या बँकेत खाते उघडा."
    },
    "url": "https://www.indiapost.gov.in/",
    "source": "https://www.myscheme.gov.in/schemes/ssy",
    "checked": "2026-11-07"
  },
  {
    "id": "pm-mudra",
    "level": "central",
    "name": {
      "en": "PM Mudra Yojana",
      "hi": "पीएम मुद्रा योजना (मुद्रा लोन)",
      "mr": "पीएम मुद्रा योजना (मुद्रा कर्ज)"
    },
    "benefit": {
      "en": "Business loan without guarantee: up to ₹50,000 (Shishu), ₹5 lakh (Kishor), ₹10 lakh (Tarun), ₹20 lakh (Tarun Plus)",
      "hi": "बिना गारंटी धंधे का लोन: ₹50,000 तक (शिशु), ₹5 लाख (किशोर), ₹10 लाख (तरुण), ₹20 लाख (तरुण प्लस)",
      "mr": "हमीशिवाय व्यवसाय कर्ज: ₹50,000 पर्यंत (शिशु), ₹5 लाख (किशोर), ₹10 लाख (तरुण), ₹20 लाख (तरुण प्लस)"
    },
    "rules": [
      {
        "f": "age",
        "min": 18
      },
      {
        "f": "occupation",
        "in": [
          "small_business",
          "street_vendor",
          "artisan",
          "other_unorganised"
        ]
      }
    ],
    "note": {
      "en": "For non-farm business only (shop, services, small making work, transport). Tarun Plus is only for those who repaid a Tarun loan. Not for people with unpaid loans.",
      "hi": "सिर्फ खेती से बाहर के धंधे के लिए (दुकान, सेवा, छोटा उत्पादन, गाड़ी)। तरुण प्लस सिर्फ उनके लिए जिन्होंने तरुण लोन चुका दिया है। पुराना लोन बाकी हो तो नहीं।",
      "mr": "फक्त शेतीबाहेरच्या व्यवसायासाठी (दुकान, सेवा, लहान उत्पादन, वाहतूक). तरुण प्लस फक्त ज्यांनी तरुण कर्ज फेडले त्यांच्यासाठी. जुने कर्ज थकले असेल तर नाही."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "PAN card",
        "Address proof",
        "Business proof or plan",
        "Bank statement (6 months)"
      ],
      "hi": [
        "आधार कार्ड",
        "पैन कार्ड",
        "पते का सबूत",
        "धंधे का सबूत या योजना",
        "बैंक स्टेटमेंट (6 महीने)"
      ],
      "mr": [
        "आधार कार्ड",
        "पॅन कार्ड",
        "पत्त्याचा पुरावा",
        "व्यवसायाचा पुरावा किंवा आराखडा",
        "बँक स्टेटमेंट (6 महिने)"
      ]
    },
    "apply": {
      "en": "Go to any bank, small finance bank or microfinance company, or apply on udyamimitra.in.",
      "hi": "किसी भी बैंक, स्मॉल फाइनेंस बैंक या माइक्रोफाइनेंस कंपनी में जाएँ, या udyamimitra.in पर अर्जी दें।",
      "mr": "कोणत्याही बँकेत, स्मॉल फायनान्स बँकेत किंवा मायक्रोफायनान्स कंपनीत जा, किंवा udyamimitra.in वर अर्ज करा."
    },
    "url": "https://www.mudra.org.in/",
    "source": "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/oct/doc20241029426401.pdf",
    "checked": "2026-11-07"
  },
  {
    "id": "ladki-bahin",
    "level": "maharashtra",
    "name": {
      "en": "Mukhyamantri Majhi Ladki Bahin Yojana",
      "hi": "मुख्यमंत्री माझी लाडकी बहीण योजना",
      "mr": "मुख्यमंत्री माझी लाडकी बहीण योजना"
    },
    "benefit": {
      "en": "₹1,500 every month in your bank account (₹18,000 a year)",
      "hi": "हर महीने ₹1,500 सीधे बैंक खाते में (साल में ₹18,000)",
      "mr": "दर महिना ₹1,500 थेट बँक खात्यात (वर्षाला ₹18,000)"
    },
    "rules": [
      {
        "f": "state",
        "eq": "Maharashtra"
      },
      {
        "f": "gender",
        "in": [
          "female"
        ]
      },
      {
        "f": "age",
        "min": 21,
        "max": 65
      },
      {
        "f": "annualFamilyIncome",
        "max": 250000
      },
      {
        "f": "incomeTaxPayerFamily",
        "eq": false
      },
      {
        "f": "govtEmployeeInFamily",
        "eq": false
      },
      {
        "f": "ownsFourWheeler",
        "eq": false
      },
      {
        "f": "hasBankAccount",
        "eq": true
      }
    ],
    "note": {
      "en": "Bank account must be linked to Aadhaar and e-KYC must be done, or payments stop. Only one unmarried woman per family. Not if you already get ₹1,500 or more a month from another state scheme. New applications may be closed; check the portal or Anganwadi.",
      "hi": "बैंक खाता आधार से जुड़ा हो और ई-केवाईसी हो, वरना पैसा बंद हो जाता है। परिवार में सिर्फ एक अविवाहित महिला। किसी और राज्य योजना से ₹1,500 या ज्यादा महीना मिलता हो तो नहीं। नए अर्ज बंद हो सकते हैं; पोर्टल या आंगनवाड़ी में पूछें।",
      "mr": "बँक खाते आधारशी जोडलेले असावे आणि ई-केवायसी झालेली असावी, नाहीतर पैसे बंद होतात. कुटुंबात फक्त एक अविवाहित महिला. इतर राज्य योजनेतून महिना ₹1,500 किंवा जास्त मिळत असेल तर नाही. नवीन अर्ज बंद असू शकतात; पोर्टल किंवा अंगणवाडीत विचारा."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Maharashtra domicile proof or ration card (yellow / orange)",
        "Income certificate (₹2.5 lakh or less)",
        "Bank passbook in your name",
        "Passport photo"
      ],
      "hi": [
        "आधार कार्ड",
        "महाराष्ट्र का रहने का सबूत या राशन कार्ड (पीला / केसरी)",
        "आय प्रमाण पत्र (₹2.5 लाख या कम)",
        "अपने नाम का बैंक पासबुक",
        "पासपोर्ट फोटो"
      ],
      "mr": [
        "आधार कार्ड",
        "महाराष्ट्राचा रहिवासी पुरावा किंवा रेशन कार्ड (पिवळे / केशरी)",
        "उत्पन्नाचा दाखला (₹2.5 लाख किंवा कमी)",
        "तुमच्या नावाचे बँक पासबुक",
        "पासपोर्ट फोटो"
      ]
    },
    "apply": {
      "en": "Apply at your Anganwadi, Gram Panchayat, ward office or Setu Kendra, or on the Ladki Bahin portal.",
      "hi": "अपनी आंगनवाड़ी, ग्राम पंचायत, वार्ड ऑफिस या सेतु केंद्र पर, या लाडकी बहीण पोर्टल पर अर्जी दें।",
      "mr": "तुमच्या अंगणवाडी, ग्रामपंचायत, वॉर्ड कार्यालय किंवा सेतू केंद्रात, किंवा लाडकी बहीण पोर्टलवर अर्ज करा."
    },
    "url": "https://ladakibahin.maharashtra.gov.in/",
    "source": "https://citizennest.com/guide/majhi-ladki-bahin-yojana-maharashtra",
    "checked": "2026-11-07"
  },
  {
    "id": "sanjay-gandhi-niradhar",
    "level": "maharashtra",
    "name": {
      "en": "Sanjay Gandhi Niradhar Anudan Yojana",
      "hi": "संजय गांधी निराधार अनुदान योजना",
      "mr": "संजय गांधी निराधार अनुदान योजना"
    },
    "benefit": {
      "en": "₹2,500 every month for helpless people (raised from ₹1,500 from October 2025)",
      "hi": "बेसहारा लोगों को हर महीने ₹2,500 (अक्टूबर 2025 से ₹1,500 की जगह)",
      "mr": "निराधार लोकांना दर महिना ₹2,500 (ऑक्टोबर 2025 पासून ₹1,500 ऐवजी)"
    },
    "rules": [
      {
        "f": "state",
        "eq": "Maharashtra"
      },
      {
        "f": "age",
        "min": 18,
        "max": 64
      },
      {
        "f": "annualFamilyIncome",
        "max": 21000
      },
      {
        "any": [
          {
            "f": "hasDisability",
            "eq": true
          },
          {
            "all": [
              {
                "f": "gender",
                "in": [
                  "female"
                ]
              },
              {
                "f": "maritalStatus",
                "in": [
                  "widowed",
                  "divorced",
                  "abandoned"
                ]
              }
            ]
          }
        ]
      }
    ],
    "note": {
      "en": "Also covers orphans, transgender persons, and people with serious illness (TB, cancer, AIDS, paralysis, leprosy, sickle cell etc.) with a health certificate, which this check cannot see. The widow / divorced / abandoned category is for women. From age 65, apply under Shravanbal instead. Family income limit ₹21,000 a year.",
      "hi": "अनाथ, तृतीयपंथी और गंभीर बीमारी (TB, कैंसर, एड्स, लकवा, कुष्ठ, सिकल सेल आदि) वाले लोग भी इसमें आते हैं, जिसके लिए सरकारी डॉक्टर का सर्टिफिकेट चाहिए; इसे यह जाँच नहीं देख सकती। विधवा / तलाकशुदा / छोड़ी गई वाली श्रेणी महिलाओं के लिए है। 65 साल से ऊपर श्रवणबाळ में अर्जी दें। परिवार की आय सीमा साल के ₹21,000।",
      "mr": "अनाथ, तृतीयपंथी आणि गंभीर आजार (टीबी, कॅन्सर, एड्स, लकवा, कुष्ठरोग, सिकलसेल इ.) असलेले लोकही यात येतात, त्यासाठी आरोग्य दाखला लागतो; हे तपासणीत दिसत नाही. विधवा / घटस्फोटित / परित्यक्ता ही श्रेणी महिलांसाठी आहे. 65 वर्षांनंतर श्रावणबाळमध्ये अर्ज करा. कुटुंबाचे उत्पन्न वर्षाला ₹21,000 पर्यंत."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Age proof",
        "Income certificate (₹21,000 or less)",
        "Disability or medical certificate / husband death certificate",
        "Bank passbook"
      ],
      "hi": [
        "आधार कार्ड",
        "उम्र का सबूत",
        "आय प्रमाण पत्र (₹21,000 या कम)",
        "विकलांगता / मेडिकल सर्टिफिकेट / पति का मृत्यु प्रमाण पत्र",
        "बैंक पासबुक"
      ],
      "mr": [
        "आधार कार्ड",
        "वयाचा पुरावा",
        "उत्पन्नाचा दाखला (₹21,000 किंवा कमी)",
        "अपंगत्व / वैद्यकीय दाखला / पतीचा मृत्यू दाखला",
        "बँक पासबुक"
      ]
    },
    "apply": {
      "en": "Apply at your Tahsil office (Sanjay Gandhi Yojana section) or Setu Kendra.",
      "hi": "अपने तहसील कार्यालय (संजय गांधी योजना विभाग) या सेतु केंद्र पर अर्जी दें।",
      "mr": "तुमच्या तहसील कार्यालयात (संजय गांधी योजना विभाग) किंवा सेतू केंद्रात अर्ज करा."
    },
    "url": "https://sjsa.maharashtra.gov.in/",
    "source": "https://gadchiroli.gov.in/sanjay-gandhi-yojana/",
    "checked": "2026-11-07"
  },
  {
    "id": "shravanbal-seva",
    "level": "maharashtra",
    "name": {
      "en": "Shravanbal Seva Rajya Nivruttivetan Yojana",
      "hi": "श्रावणबाळ सेवा राज्य निवृत्तिवेतन योजना (वृद्धावस्था पेंशन)",
      "mr": "श्रावणबाळ सेवा राज्य निवृत्तिवेतन योजना"
    },
    "benefit": {
      "en": "₹2,500 pension every month for poor senior citizens aged 65+ (raised from ₹1,500 from October 2025)",
      "hi": "65+ गरीब बुजुर्गों को हर महीने ₹2,500 पेंशन (अक्टूबर 2025 से ₹1,500 की जगह)",
      "mr": "65+ गरीब ज्येष्ठ नागरिकांना दर महिना ₹2,500 पेन्शन (ऑक्टोबर 2025 पासून ₹1,500 ऐवजी)"
    },
    "rules": [
      {
        "f": "state",
        "eq": "Maharashtra"
      },
      {
        "f": "age",
        "min": 65
      },
      {
        "any": [
          {
            "f": "annualFamilyIncome",
            "max": 21000
          },
          {
            "f": "bplCard",
            "eq": true
          }
        ]
      }
    ],
    "note": {
      "en": "Family income limit is ₹21,000 a year, or the family is on the BPL list. BPL card holders may get the central Indira Gandhi old age pension under the same application.",
      "hi": "परिवार की आय सीमा साल के ₹21,000 है, या परिवार BPL सूची में हो। BPL वालों को इसी अर्जी से केंद्र की इंदिरा गांधी वृद्धावस्था पेंशन भी मिल सकती है।",
      "mr": "कुटुंबाच्या उत्पन्नाची मर्यादा वर्षाला ₹21,000 आहे, किंवा कुटुंब BPL यादीत असावे. BPL कार्डधारकांना याच अर्जातून केंद्राची इंदिरा गांधी वृद्धापकाळ पेन्शनही मिळू शकते."
    },
    "documents": {
      "en": [
        "Aadhaar card",
        "Age proof (birth or school certificate)",
        "Income certificate or BPL card",
        "Bank passbook",
        "Passport photo"
      ],
      "hi": [
        "आधार कार्ड",
        "उम्र का सबूत (जन्म या स्कूल का दाखला)",
        "आय प्रमाण पत्र या BPL कार्ड",
        "बैंक पासबुक",
        "पासपोर्ट फोटो"
      ],
      "mr": [
        "आधार कार्ड",
        "वयाचा पुरावा (जन्म किंवा शाळेचा दाखला)",
        "उत्पन्नाचा दाखला किंवा BPL कार्ड",
        "बँक पासबुक",
        "पासपोर्ट फोटो"
      ]
    },
    "apply": {
      "en": "Apply at your Tahsil office (Sanjay Gandhi Yojana section), Talathi, or Setu Kendra.",
      "hi": "अपने तहसील कार्यालय (संजय गांधी योजना विभाग), तलाठी या सेतु केंद्र पर अर्जी दें।",
      "mr": "तुमच्या तहसील कार्यालयात (संजय गांधी योजना विभाग), तलाठी किंवा सेतू केंद्रात अर्ज करा."
    },
    "url": "https://sjsa.maharashtra.gov.in/",
    "source": "https://gadchiroli.gov.in/sanjay-gandhi-yojana/",
    "checked": "2026-11-07"
  }
];

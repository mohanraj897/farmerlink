export type Language = 'English' | 'Tamil' | 'Hindi' | 'Telugu' | 'Kannada' | 'Malayalam' | 'Marathi' | 'Bengali';

export const LANGUAGES: Language[] = [
  'English',
  'Tamil',
  'Hindi',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Bengali'
];

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  English: {
    home: 'Home',
    messages: 'Messages',
    notifications: 'Notifications',
    dashboard: 'Dashboard',
    profile: 'Profile',
    search: 'Search FarmerLink...',
    postCrop: 'Post Crop Availability',
    postRequirement: 'Post Crop Requirement',
    farmerRole: 'Farmer',
    companyRole: 'Corporate Company',
    verified: 'Verified',
    contact: 'Contact',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    save: 'Save',
    language: 'Language',
    governmentSchemes: 'Government Schemes',
    marketPrices: 'Market Price Tracker',
    weatherReport: 'Weather Report',
    quantity: 'Quantity',
    price: 'Price',
    harvestDate: 'Harvest Date',
    budget: 'Budget',
    deadline: 'Deadline',
    aiRecommendations: 'AI Crop Recommendation',
    leadsReceived: 'Procurement Leads',
    earnings: 'Earnings',
    registeredUsers: 'Registered Users',
    adminConsole: 'Admin Control Panel',
    pendingVerification: 'Verification Requests'
  },
  Hindi: {
    home: 'मुख्य पृष्ठ',
    messages: 'संदेश',
    notifications: 'सूचनाएं',
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफाइल',
    search: 'फार्मरलिंक खोजें...',
    postCrop: 'फसल की उपलब्धता पोस्ट करें',
    postRequirement: 'फसल की आवश्यकता पोस्ट करें',
    farmerRole: 'किसान',
    companyRole: 'कॉर्पोरेट कंपनी',
    verified: 'सत्यापित',
    contact: 'संपर्क करें',
    like: 'पसंद करें',
    comment: 'टिप्पणी',
    share: 'साझा करें',
    save: 'सहेजें',
    language: 'भाषा',
    governmentSchemes: 'सरकारी योजनाएं',
    marketPrices: 'मंडी भाव ट्रैकर',
    weatherReport: 'मौसम की रिपोर्ट',
    quantity: 'मात्रा',
    price: 'कीमत',
    harvestDate: 'कटाई की तारीख',
    budget: 'बजट',
    deadline: 'समय सीमा',
    aiRecommendations: 'एआई फसल अनुशंसा',
    leadsReceived: 'प्राप्त लीड्स',
    earnings: 'कमाई',
    registeredUsers: 'पंजीकृत उपयोगकर्ता',
    adminConsole: 'एडमिन कंट्रोल पैनल',
    pendingVerification: 'सत्यापन अनुरोध'
  },
  Tamil: {
    home: 'முகப்பு',
    messages: 'செய்திகள்',
    notifications: 'அறிவிப்புகள்',
    dashboard: 'டாஷ்போர்டு',
    profile: 'சுயவிவரம்',
    search: 'FarmerLink தேடுக...',
    postCrop: 'பயிர் இருப்பைப் பதிவிடவும்',
    postRequirement: 'பயிர் தேவையைப் பதிவிடவும்',
    farmerRole: 'விவசாயி',
    companyRole: 'நிறுவனம்',
    verified: 'சரிபார்க்கப்பட்டது',
    contact: 'தொடர்பு கொள்ள',
    like: 'விருப்பம்',
    comment: 'கருத்து',
    share: 'பகிர்க',
    save: 'சேமிக்க',
    language: 'மொழி',
    governmentSchemes: 'அரசு திட்டங்கள்',
    marketPrices: 'சந்தை விலை டிராக்கர்',
    weatherReport: 'வானிலை அறிக்கை',
    quantity: 'அளவு',
    price: 'விலை',
    harvestDate: 'அறுவடை தேதி',
    budget: 'பட்ஜெட்',
    deadline: 'இறுதி தேதி',
    aiRecommendations: 'AI பயிர் பரிந்துரை',
    leadsReceived: 'விற்பனை வாய்ப்புகள்',
    earnings: 'வருவாய்',
    registeredUsers: 'பதிவுசெய்த பயனர்கள்',
    adminConsole: 'நிர்வாக கன்சோல்',
    pendingVerification: 'சரிபார்ப்பு கோரிக்கைகள்'
  },
  Telugu: {
    home: 'హోమ్',
    messages: 'సందేశాలు',
    notifications: 'నోటిఫికేషన్లు',
    dashboard: 'డాష్‌బోర్డ్',
    profile: 'ప్రొఫైల్',
    search: 'FarmerLink శోధించండి...',
    postCrop: 'పంట లభ్యతను పోస్ట్ చేయండి',
    postRequirement: 'పంట అవసరాన్ని పోస్ట్ చేయండి',
    farmerRole: 'రైతు',
    companyRole: 'కార్పొరేట్ కంపెనీ',
    verified: 'ధృవీకరించబడింది',
    contact: 'సంప్రదించండి',
    like: 'లైక్',
    comment: 'కామెంట్',
    share: 'షేర్',
    save: 'సేవ్',
    language: 'భాష',
    governmentSchemes: 'ప్రభుత్వ పథకాలు',
    marketPrices: 'మార్కెట్ ధరల ట్రాకర్',
    weatherReport: 'వాతావరణ నివేదిక',
    quantity: 'పరిమాణం',
    price: 'ధర',
    harvestDate: 'కోత తేదీ',
    budget: 'బడ్జెట్',
    deadline: 'గడువు',
    aiRecommendations: 'AI పంట సిఫార్సు',
    leadsReceived: 'లీడ్స్ వచ్చాయి',
    earnings: 'ఆదాయం',
    registeredUsers: 'నమోదైన వినియోగదారులు',
    adminConsole: 'అడ్మిన్ కన్సోల్',
    pendingVerification: 'ధృవీకరణ అభ్యర్థనలు'
  },
  Kannada: {
    home: 'ಮುಖಪುಟ',
    messages: 'ಸಂದೇಶಗಳು',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    search: 'ಫಾರ್ಮರ್ ಲಿಂಕ್ ಹುಡುಕಿ...',
    postCrop: 'ಬೆಳೆ ಲಭ್ಯತೆ ಪೋಸ್ಟ್ ಮಾಡಿ',
    postRequirement: 'ಬೆಳೆ ಅಗತ್ಯತೆ ಪೋಸ್ಟ್ ಮಾಡಿ',
    farmerRole: 'ರೈತ',
    companyRole: 'ಕಾರ್ಪೊರೇಟ್ ಕಂಪನಿ',
    verified: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    like: 'ಲೈಕ್',
    comment: 'ಕಾಮೆಂಟ್',
    share: 'ಶೇರ್',
    save: 'ಉಳಿಸಿ',
    language: 'ಭಾಷೆ',
    governmentSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    marketPrices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಟ್ರ್ಯಾಕರ್',
    weatherReport: 'ಹವಾಮಾನ ವರದಿ',
    quantity: 'ಪ್ರಮಾಣ',
    price: 'ಬೆಲೆ',
    harvestDate: 'ಕೊಯ್ಲು ದಿನಾಂಕ',
    budget: 'ಬಜೆಟ್',
    deadline: 'ಕೊನೆಯ ದಿನಾಂಕ',
    aiRecommendations: 'AI ಬೆಳೆ ಶಿಫಾರಸು',
    leadsReceived: 'ಲೀಡ್‌ಗಳು ಬಂದಿವೆ',
    earnings: 'ಗಳಿಕೆಗಳು',
    registeredUsers: 'ನೊಂದಾಯಿತ ಬಳಕೆದಾರರು',
    adminConsole: 'ನಿರ್ವಾಹಕ ನಿಯಂತ್ರಣ ಫಲಕ',
    pendingVerification: 'ದೃಢೀಕರಣ ವಿನಂತಿಗಳು'
  },
  Malayalam: {
    home: 'ഹോം',
    messages: 'സന്ദേശങ്ങൾ',
    notifications: 'അറിയിപ്പുകൾ',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    profile: 'പ്രൊഫൈൽ',
    search: 'ഫാർമർലിങ്ക് തിരയുക...',
    postCrop: 'വിള ലഭ്യത പോസ്റ്റ് ചെയ്യുക',
    postRequirement: 'വിള ആവശ്യകത പോസ്റ്റ് ചെയ്യുക',
    farmerRole: 'കർഷകൻ',
    companyRole: 'കോർപ്പറേറ്റ് കമ്പനി',
    verified: 'സാക്ഷ്യപ്പെടുത്തിയത്',
    contact: 'ബന്ധപ്പെടുക',
    like: 'ലൈക്ക്',
    comment: 'കമന്റ്',
    share: 'ഷെയർ',
    save: 'സേവ്',
    language: 'ഭാഷ',
    governmentSchemes: 'സർക്കാർ പദ്ധതികൾ',
    marketPrices: 'വിപണി വില ട്രാക്കർ',
    weatherReport: 'കാലാവസ്ഥ റിപ്പോർട്ട്',
    quantity: 'അളവ്',
    price: 'വില',
    harvestDate: 'വിളവെടുപ്പ് തീയതി',
    budget: 'ബഡ്ജറ്റ്',
    deadline: 'അവസാന തീയതി',
    aiRecommendations: 'AI വിള ശുപാർശ',
    leadsReceived: 'ലഭിച്ച ലീഡുകൾ',
    earnings: 'വരുമാനം',
    registeredUsers: 'രജിസ്റ്റർ ചെയ്ത ഉപയോക്താക്കൾ',
    adminConsole: 'അഡ്മിൻ പാനൽ',
    pendingVerification: 'വെരിഫിക്കേഷൻ അഭ്യർത്ഥനകൾ'
  },
  Marathi: {
    home: 'मुख्य पृष्ठ',
    messages: 'संदेश',
    notifications: 'सूचना',
    dashboard: 'डॅशबोर्ड',
    profile: 'प्रोफाइल',
    search: 'फार्मरलिंक शोधा...',
    postCrop: 'पिकाची उपलब्धता पोस्ट करा',
    postRequirement: 'पिकाची गरज पोस्ट करा',
    farmerRole: 'शेतकरी',
    companyRole: 'कॉर्पोरेट कंपनी',
    verified: 'सत्यापित',
    contact: 'संपर्क करा',
    like: 'आवडले',
    comment: 'प्रतिक्रिया',
    share: 'शेअर करा',
    save: 'जतन करा',
    language: 'भाषा',
    governmentSchemes: 'सरकारी योजना',
    marketPrices: 'बाजार भाव ट्रॅकर',
    weatherReport: 'हवामान अहवाल',
    quantity: 'प्रमाण',
    price: 'किंमत',
    harvestDate: 'काढणीची तारीख',
    budget: 'बजेट',
    deadline: 'शेवटची तारीख',
    aiRecommendations: 'AI पीक शिफारस',
    leadsReceived: 'मिळालेले लीड्स',
    earnings: 'कमाई',
    registeredUsers: 'नोंदणीकृत वापरकर्ते',
    adminConsole: 'अ‍ॅडमिन कन्सोल',
    pendingVerification: 'पडताळणी विनंत्या'
  },
  Bengali: {
    home: 'হোম',
    messages: 'বার্তা',
    notifications: 'বিজ্ঞপ্তি',
    dashboard: 'ড্যাশবোর্ড',
    profile: 'প্রোফাইল',
    search: 'ফার্মারলিঙ্ক খুঁজুন...',
    postCrop: 'ফসল প্রাপ্যতা পোস্ট করুন',
    postRequirement: 'ফসল চাহিদা পোস্ট করুন',
    farmerRole: 'কৃষক',
    companyRole: 'কর্পোরেট কোম্পানি',
    verified: 'যাচাইকৃত',
    contact: 'যোগাযোগ',
    like: 'লাইক',
    comment: 'মন্তব্য',
    share: 'শেয়ার',
    save: 'সংরক্ষণ',
    language: 'ভাষা',
    governmentSchemes: 'সরকারি প্রকল্প',
    marketPrices: 'বাজার মূল্য ট্র্যাকার',
    weatherReport: 'আবহাওয়ার খবর',
    quantity: 'পরিমাণ',
    price: 'মূল্য',
    harvestDate: 'ফসল তোলার তারিখ',
    budget: 'বাজেট',
    deadline: 'শেষ সময়সীমা',
    aiRecommendations: 'AI ফসল সুপারিশ',
    leadsReceived: 'প্রাপ্ত লিড',
    earnings: 'উপার্জন',
    registeredUsers: 'নিবন্ধিত ব্যবহারকারী',
    adminConsole: 'অ্যাডমিন প্যানেল',
    pendingVerification: 'যাচাইকরণের অনুরোধ'
  }
};

// Simulated AI Translation helper
export const translateText = (
  text: string,
  fromLang: string,
  toLang: Language
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock translations or simulated outputs
      if (toLang === 'English') {
        resolve(text + ' [Translated from ' + fromLang + ']');
      } else {
        const translationsForTarget = UI_TRANSLATIONS[toLang];
        // Provide mock translation mappings for known phrases
        if (text.includes('Harvesting fresh premium quality')) {
          if (toLang === 'Hindi') {
            resolve('ताजा प्रीमियम गुणवत्ता वाले जैविक टमाटरों की कटाई। अगले 3 दिनों में उपलब्ध। प्रत्यक्ष थोक खरीदारों की तलाश है।');
          } else if (toLang === 'Tamil') {
            resolve('புதிய பிரீமியம் தரமான இயற்கை தக்காளி அறுவடை செய்யப்படுகிறது. அடுத்த 3 நாட்களில் கிடைக்கும். மொத்த வியாபாரிகளை நேரடியாக தேடுகிறோம்.');
          }
        }
        resolve(`[${toLang} Translation]: ${text}`);
      }
    }, 400); // 400ms delay to simulate network call to translation API
  });
};

// AI Language Detection helper
export const detectLanguage = (text: string): Language => {
  const hindiRegex = /[\u0900-\u097F]/;
  const tamilRegex = /[\u0B80-\u0BFF]/;
  const teluguRegex = /[\u0C00-\u0C7F]/;
  const kannadaRegex = /[\u0C80-\u0CFF]/;
  const bengaliRegex = /[\u0980-\u09FF]/;
  const malayalamRegex = /[\u0D00-\u0D7F]/;

  if (hindiRegex.test(text)) return 'Hindi';
  if (tamilRegex.test(text)) return 'Tamil';
  if (teluguRegex.test(text)) return 'Telugu';
  if (kannadaRegex.test(text)) return 'Kannada';
  if (bengaliRegex.test(text)) return 'Bengali';
  if (malayalamRegex.test(text)) return 'Malayalam';
  
  return 'English'; // fallback default
};

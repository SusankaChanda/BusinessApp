type StateCities = {
  [state: string]: string[], // States as keys with an array of city names
};

type CountryList = {
  [country: string]: {
    states: StateCities, // Country contains a 'states' object with states as keys
  },
};

// Define the type for countryList with proper structure
export const countryList: CountryList = {
  USA: {
    states: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
      NewYork: ["New York City", "Buffalo", "Rochester"],
      Florida: ["Miami", "Orlando", "Tampa"],
      Illinois: ["Chicago", "Naperville", "Peoria"],
    },
  },
  Canada: {
    states: {
      Ontario: ["Toronto", "Ottawa", "Hamilton"],
      Quebec: ["Montreal", "Quebec City", "Gatineau"],
      BritishColumbia: ["Vancouver", "Victoria", "Surrey"],
      Alberta: ["Calgary", "Edmonton", "Banff"],
    },
  },
  India: {
    states: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
      Delhi: ["New Delhi", "Faridabad", "Noida", "Gurugram"],
      TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem"],
      Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
      Telangana: ["Hyderabad", "Warangal", "Khammam", "Karimnagar"],
      UttarPradesh: ["Lucknow", "Agra", "Varanasi", "Kanpur"],
      WestBengal: ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
      Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
    },
  },
  Australia: {
    states: {
      NewSouthWales: ["Sydney", "Newcastle", "Wollongong"],
      Victoria: ["Melbourne", "Geelong", "Ballarat"],
      Queensland: ["Brisbane", "Cairns", "Gold Coast"],
      WesternAustralia: ["Perth", "Fremantle", "Mandurah"],
    },
  },
  UnitedKingdom: {
    states: {
      England: ["London", "Manchester", "Birmingham"],
      Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
      Wales: ["Cardiff", "Swansea", "Newport"],
      NorthernIreland: ["Belfast", "Derry", "Lisburn"],
    },
  },
  Germany: {
    states: {
      Bavaria: ["Munich", "Nuremberg", "Augsburg"],
      Berlin: ["Berlin", "Potsdam", "Cottbus"],
      Hamburg: ["Hamburg", "Lubeck", "Buxtehude"],
      NorthRhineWestphalia: ["Cologne", "Düsseldorf", "Dortmund"],
    },
  },
  France: {
    states: {
      IleDeFrance: ["Paris", "Versailles", "Boulogne-Billancourt"],
      ProvenceAlpesCoteDAzur: ["Marseille", "Nice", "Cannes"],
      Normandy: ["Rouen", "Caen", "Le Havre"],
      RhôneAlpes: ["Lyon", "Grenoble", "Saint-Étienne"],
    },
  },
  Japan: {
    states: {
      Tokyo: ["Tokyo", "Yokohama", "Saitama"],
      Osaka: ["Osaka", "Kobe", "Kyoto"],
      Hokkaido: ["Sapporo", "Asahikawa", "Hakodate"],
      Fukuoka: ["Fukuoka", "Kitakyushu", "Kurume"],
    },
  },
  Brazil: {
    states: {
      SaoPaulo: ["Sao Paulo", "Campinas", "Santos"],
      RioDeJaneiro: ["Rio de Janeiro", "Niteroi", "Angra dos Reis"],
      Bahia: ["Salvador", "Ilheus", "Feira de Santana"],
      MinasGerais: ["Belo Horizonte", "Ouro Preto", "Contagem"],
    },
  },
  Mexico: {
    states: {
      CDMX: ["Mexico City", "Coyoacan", "Xochimilco"],
      Jalisco: ["Guadalajara", "Puerto Vallarta", "Tlaquepaque"],
      NuevoLeon: ["Monterrey", "San Pedro Garza García", "Apodaca"],
      Yucatan: ["Mérida", "Valladolid", "Progreso"],
    },
  },
  SouthAfrica: {
    states: {
      Gauteng: ["Johannesburg", "Pretoria", "Ekurhuleni"],
      WesternCape: ["Cape Town", "Stellenbosch", "Paternoster"],
      KwazuluNatal: ["Durban", "Pietermaritzburg", "Richards Bay"],
      EasternCape: ["Port Elizabeth", "East London", "Mthatha"],
    },
  },
  Italy: {
    states: {
      Lazio: ["Rome", "Viterbo", "Civitavecchia"],
      Tuscany: ["Florence", "Pisa", "Siena"],
      Lombardy: ["Milan", "Bergamo", "Brescia"],
      Campania: ["Naples", "Salerno", "Pompeii"],
    },
  },
  Spain: {
    states: {
      Madrid: ["Madrid", "Alcalá de Henares", "Getafe"],
      Catalonia: ["Barcelona", "Girona", "Tarragona"],
      Andalusia: ["Seville", "Malaga", "Granada"],
      Valencia: ["Valencia", "Alicante", "Castellon de la Plana"],
    },
  },
  Russia: {
    states: {
      Moscow: ["Moscow", "Zelenograd", "Balashikha"],
      SaintPetersburg: ["Saint Petersburg", "Pushkin", "Petergof"],
      Sverdlovsk: ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky"],
    },
  },
  China: {
    states: {
      Beijing: ["Beijing", "Tianjin", "Qinhuangdao"],
      Shanghai: ["Shanghai", "Suzhou", "Hangzhou"],
      Guangdong: ["Guangzhou", "Shenzhen", "Dongguan"],
      Sichuan: ["Chengdu", "Mianyang", "Deyang"],
    },
  },
  SaudiArabia: {
    states: {
      Riyadh: ["Riyadh", "Al-Khobar", "Dammam"],
      Makkah: ["Mecca", "Jeddah", "Taif"],
      EasternProvince: ["Dhahran", "Al-Ahsa", "Al Jubail"],
    },
  },
  Argentina: {
    states: {
      BuenosAires: ["Buenos Aires", "La Plata", "Mar del Plata"],
      Cordoba: ["Cordoba", "Villa Carlos Paz", "Rio Cuarto"],
      Mendoza: ["Mendoza", "San Rafael", "Tunuyan"],
    },
  },
  SouthKorea: {
    states: {
      Seoul: ["Seoul", "Incheon", "Suwon"],
      Gyeonggi: ["Gyeonggi", "Suwon", "Paju"],
      Busan: ["Busan", "Ulsan", "Changwon"],
    },
  },
  Egypt: {
    states: {
      Cairo: ["Cairo", "Giza", "Helwan"],
      Alexandria: ["Alexandria", "Borg El Arab", "Abu Qir"],
      Giza: ["Giza", "6th of October City", "Al Haram"],
    },
  },
};

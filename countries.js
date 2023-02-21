

const countries1 = [
  {
    code: "AF",
    name: "Afghanistan",
    continent: {
      code: "AS",
      name: "Asia"
    },
    languages: [
      {
        code: "ps",
        name: "Pashto",
        native: "پښتو",
        rtl: true
      },
      {
        code: "uz",
        name: "Uzbek",
        native: "Oʻzbek",
        rtl: false
      },
      {
        code: "tk",
        name: "Turkmen",
        native: "Türkmen",
        rtl: false
      }
    ]
  },
  {
    code: "AX",
    name: "Åland Islands",
    continent: {
      code: "EU",
      name: "Europe"
    },
    languages: [
      {
        code: "sv",
        name: "Swedish",
        native: "svenska",
        rtl: false
      }
    ]
  },
  {
    code: "AL",
    name: "Albania",
    continent: {
      code: "EU",
      name: "Europe"
    },
    languages: [
      {
        code: "sq",
        name: "Albanian",
        native: "Shqip",
        rtl: false
      }
    ]
  },
  {
    code: "DZ",
    name: "Algeria",
    continent: {
      code: "AF",
      name: "Africa"
    },
    languages: [
      {
        code: "ar",
        name: "Arabic",
        native: "العربية",
        rtl: true
      }
    ]
  }
];

const countries = [
  {
    code: "AF",
    name: "Afghanistan",
    continent: {
      code: "AS",
    },
    languages: [
      {
        code: "ps",
      },
      {
        code: "uz",
      },
      {
        code: "tk",
      }
    ]
  },
  {
    code: "AX",
    name: "Åland Islands",
    continent: {
      code: "AS",
    },
    languages: [
      {
        code: "sv",
      }
    ]
  },
  {
    code: "AL",
    name: "Albania",
    continent: {
      code: "EU",
    },
    languages: [
      {
        code: "sq",
      }
    ]
  },
  {
    code: "DZ",
    name: "Algeria",
    continent: {
      code: "AF",
    },
    languages: [
      {
        code: "ar",
      }
    ]
  }
];

const continents = [
  {
    code: "AF",
    name: "Africa",
    countries: [
      { code: "AF" },
      { code: "DZ" }
    ]
  },
  {
    code: "AN",
    name: "Antarctica",
    countries: []
  },
  {
    code: "AS",
    name: "Asia",
    countries: [
      { code: "AF" },
      { code: "AX" }
    ]
  },
  {
    code: "EU",
    name: "Europe",
    countries: [
      { code: "AX" },
      { code: "AL" }
    ]
  },
  {
    code: "NA",
    name: "North America",
    countries: []
  },
  {
    code: "OC",
    name: "Oceania",
    countries: []
  },
  {
    code: "SA",
    name: "South America",
    countries: []
  }
];

const languages = [
  {
    code: "ps",
    name: "Pashto",
    native: "پښتو",
    rtl: true
  },
  {
    code: "uz",
    name: "Uzbek",
    native: "Oʻzbek",
    rtl: false
  },
  {
    code: "tk",
    name: "Turkmen",
    native: "Türkmen",
    rtl: false
  },
  {
    code: "sv",
    name: "Swedish",
    native: "svenska",
    rtl: false
  },
  {
    code: "sq",
    name: "Albanian",
    native: "Shqip",
    rtl: false
  },
  {
    code: "ar",
    name: "Arabic",
    native: "العربية",
    rtl: true
  }
];

module.exports = {
  countries: countries,
  continents: continents,
  languages: languages
}
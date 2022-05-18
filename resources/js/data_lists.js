const cities = [
  "Abbottabad",
  "Abdul Hakim",
  "Ahmadpur East",
  "Aliabad",
  "Alpurai",
  "Athmuqam",
  "Attock City",
  "Attock Khurd",
  "Awaran",
  "Badin",
  "Bagh",
  "Bahawalnagar",
  "Bahawalpur",
  "Bannu",
  "Barkhan",
  "Batgram",
  "Bhakkar",
  "Bhalwal",
  "Chakwal",
  "Chaman",
  "Charsadda",
  "Chenab Nagar",
  "Chilas",
  "Chiniot",
  "Chishtian",
  "Chitral",
  "Chunian",
  "Dadu",
  "Daggar",
  "Dainyor",
  "Dalbandin",
  "Dasu",
  "Dera Allahyar",
  "Dera Bugti",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Dera Murad Jamali",
  "Dipalpur",
  "Eidgah",
  "Faisalabad",
  "Gakuch",
  "Gandava",
  "Ghotki",
  "Gilgit",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gwadar",
  "Hafizabad",
  "Hangu",
  "Haripur",
  "Harunabad",
  "Hasilpur",
  "Hassan Abdal",
  "Hujra Shah Muqim",
  "Hyderabad City",
  "Islamabad",
  "Jacobabad",
  "Jalalpur Jattan",
  "Jamshoro",
  "Jaranwala",
  "Jhang City",
  "Jhelum",
  "Kabirwala",
  "Kahror Pakka",
  "Kalat",
  "Kamalia",
  "Kandhkot",
  "Karachi",
  "Karak",
  "Kasur",
  "Khairpur Mirâ€™s",
  "Khanewal",
  "Khanpur",
  "Kharan",
  "Kharian",
  "Khushab",
  "Khuzdar",
  "Khuzdar",
  "Kohat",
  "Kohlu",
  "Kot Addu",
  "Kotli",
  "Kulachi",
  "Kundian",
  "Lahore",
  "Lakki",
  "Lala Musa",
  "Larkana",
  "Leiah",
  "Lodhran",
  "Loralai",
  "Malakand",
  "Mandi Bahauddin",
  "Mandi Burewala",
  "Mansehra",
  "Mardan",
  "Mastung",
  "Matiari",
  "Mian Channun",
  "Mianwali",
  "Mingaora",
  "Mirpur Khas",
  "Multan",
  "Muridke",
  "Musa Khel Bazar",
  "Muzaffarabad",
  "Muzaffargarh",
  "Nankana Sahib",
  "Narowal",
  "Naushahro Firoz",
  "Nawabshah",
  "New Mirpur",
  "Nowshera",
  "Okara",
  "Pakpattan",
  "Panjgur",
  "Parachinar",
  "Pasrur",
  "Pattoki",
  "Peshawar",
  "Pishin",
  "Qila Saifullah",
  "Quetta",
  "Rahimyar Khan",
  "Rajanpur",
  "Rawala Kot",
  "Rawalpindi",
  "Risalpur Cantonment",
  "Saddiqabad",
  "Sahiwal",
  "Saidu Sharif",
  "Sambrial",
  "Samundri",
  "Sanghar",
  "Sargodha",
  "Shahdad Kot",
  "Shakargarh",
  "Shekhupura",
  "Shikarpur",
  "Shujaabad",
  "Sialkot City",
  "Sibi",
  "Sukkur",
  "Swabi",
  "Tando Allahyar",
  "Tando Muhammad Khan",
  "Tank",
  "Thatta",
  "Timargara",
  "Toba Tek Singh",
  "Turbat",
  "Umarkot",
  "Upper Dir",
  "Uthal",
  "Vihari",
  "Zhob",
  "Ziarat",
  "Other",
];

const provinces = [
  "Gilgit Baltistan",
  "Balochistan",
  "Sindh",
  "Punjab",
  "KPK",
  "AJK",
  "Islamabad",
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const education_levels = [
  "Grade 8",
  "Matric/O Levels",
  "Inter/A Levels",
  "Bachelors",
  "Masters",
  "MPhil",
  "PhD",
];

const type_of_employment = ["Part Time", "Full Time"];

module.exports = {
  cities,
  provinces,
  countries,
  education_levels,
  type_of_employment,
};

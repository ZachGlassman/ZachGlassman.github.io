var CITIES = {"San Antonio TX": "33214", "Seattle WA": "30559", "San Juan PR": "34819", "Indianapolis IN": "32337", "Denver CO": "30325", "Raleigh/Durham NC": "34492", "Houston TX": "31453", "West Palm Beach/Palm Beach FL": "34027", "Charlotte Amalie VI": "34945", "Bozeman MT": "30849", "Boise ID": "30713", "Dallas/Fort Worth TX": "30194", "Phoenix AZ": "30466", "St. Louis MO": "31123", "Jacksonville FL": "31136", "Sacramento CA": "33192", "Boston MA (Metropolitan Area)": "30721", "Buffalo NY": "30792", "San Diego CA": "33570", "Las Vegas NV": "32211", "Portland OR": "34057", "Minneapolis/St. Paul MN": "31650", "Palm Springs CA": "34262", "Richmond VA": "34524", "San Francisco CA (Metropolitan Area)": "32457", "Fort Myers FL": "31714", "Atlanta GA (Metropolitan Area)": "30397", "Orlando FL": "31454", "Anchorage AK": "30299", "Madison WI": "33485", "New Orleans LA": "33495", "Nashville TN": "30693", "St. George UT": "34794", "Sioux Falls SD": "31775", "Fresno CA": "31638", "South Bend IN": "34696", "Chicago IL": "30977", "Fairbanks AK": "31517", "Honolulu HI": "32134", "Wichita KS": "30928", "Detroit MI": "31295", "Tampa FL (Metropolitan Area)": "33195", "Salt Lake City UT": "34614", "Tulsa OK": "34653", "Tucson AZ": "30436", "Milwaukee WI": "33342", "Idaho Falls ID": "32280", "Washington DC (Metropolitan Area)": "30852", "Columbus OH": "31066", "New York City NY (Metropolitan Area)": "31703", "Reno NV": "34570", "Cleveland OH (Metropolitan Area)": "30647", "Hartford CT": "30529", "Oklahoma City OK": "33851", "Miami FL (Metropolitan Area)": "32467", "Spokane WA": "31884", "Philadelphia PA": "34100", "Austin TX": "30423", "Kahului HI": "33830", "Charlotte NC": "31057", "Albuquerque NM": "30140", "Santa Barbara CA": "34689", "Omaha NE": "33316", "Pittsburgh PA": "30198", "Harlingen/San Benito TX": "32206", "Los Angeles CA (Metropolitan Area)": "32575", "Kansas City MO": "33198"};

var CITY_INVERSE = {"34696": "South Bend IN", "31123": "St. Louis MO", "34100": "Philadelphia PA", "32457": "San Francisco CA (Metropolitan Area)", "31650": "Minneapolis/St. Paul MN", "32134": "Honolulu HI", "30721": "Boston MA (Metropolitan Area)", "30325": "Denver CO", "34262": "Palm Springs CA", "30529": "Hartford CT", "33485": "Madison WI", "30792": "Buffalo NY", "34794": "St. George UT", "34689": "Santa Barbara CA", "30928": "Wichita KS", "33851": "Oklahoma City OK", "33316": "Omaha NE", "32575": "Los Angeles CA (Metropolitan Area)", "33192": "Sacramento CA", "30559": "Seattle WA", "31295": "Detroit MI", "32211": "Las Vegas NV", "33198": "Kansas City MO", "34027": "West Palm Beach/Palm Beach FL", "30140": "Albuquerque NM", "31775": "Sioux Falls SD", "32467": "Miami FL (Metropolitan Area)", "33830": "Kahului HI", "31136": "Jacksonville FL", "30466": "Phoenix AZ", "33570": "San Diego CA", "30713": "Boise ID", "31638": "Fresno CA", "30849": "Bozeman MT", "34524": "Richmond VA", "33195": "Tampa FL (Metropolitan Area)", "30198": "Pittsburgh PA", "34492": "Raleigh/Durham NC", "31517": "Fairbanks AK", "33342": "Milwaukee WI", "30423": "Austin TX", "32337": "Indianapolis IN", "34614": "Salt Lake City UT", "33214": "San Antonio TX", "30299": "Anchorage AK", "30852": "Washington DC (Metropolitan Area)", "33495": "New Orleans LA", "34819": "San Juan PR", "34570": "Reno NV", "31454": "Orlando FL", "31057": "Charlotte NC", "34653": "Tulsa OK", "31884": "Spokane WA", "30436": "Tucson AZ", "30693": "Nashville TN", "30397": "Atlanta GA (Metropolitan Area)", "30977": "Chicago IL", "32206": "Harlingen/San Benito TX", "31453": "Houston TX", "30194": "Dallas/Fort Worth TX", "31714": "Fort Myers FL", "32280": "Idaho Falls ID", "31066": "Columbus OH", "31703": "New York City NY (Metropolitan Area)", "34057": "Portland OR", "30647": "Cleveland OH (Metropolitan Area)", "34945": "Charlotte Amalie VI"};
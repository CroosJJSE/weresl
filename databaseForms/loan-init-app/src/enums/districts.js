/**
 * District Enums and Mappings
 * Sri Lankan districts with codes and names
 */

export const District = {
  MANNAR : 'MAN',
  COLOMBO : 'COL',
  BATTICALOA : 'BAT',
  GAMPAHA : 'GAM',
  KALUTARA : 'KAL',
  KANDY : 'KAN',
  KURUNEGALA : 'KUR',
  JAFFNA : 'JAF',
  VAVUNIYA : 'VAV',
  TRINCOMALEE : 'TRI',
  MATARA : 'MTR',
  HAMBANTOTA : 'HAM',
  MONARAGALA : 'MON',
  ANURADHAPURA : 'ANU',
  POLONNARUWA : 'POL',
  PUTTALAM : 'PUT',
  RATNAPURA : 'RAT',
  NUWARA_ELIYA : 'NUW',
  BADULLA : 'BAD',
  KEGALLE : 'KEG',
  MULLAITIVU : 'MUL',
  MATALE : 'MTL',
  AMPARA : 'AMP',
  KILINOCHCHI : 'KIL',
  GALLE : 'GAE'
}

// District code to name mapping
export const DISTRICT_MAPPING = {
  [District.MANNAR]: 'Mannar',
  [District.COLOMBO]: 'Colombo',
  [District.BATTICALOA]: 'Batticaloa',
  [District.GAMPAHA]: 'Gampaha',
  [District.KALUTARA]: 'Kalutara',
  [District.KANDY]: 'Kandy',
  [District.KURUNEGALA]: 'Kurunegala',
  [District.JAFFNA]: 'Jaffna',
  [District.VAVUNIYA]: 'Vavuniya',
  [District.TRINCOMALEE]: 'Trincomalee',
  [District.MATARA]: 'Matara',
  [District.HAMBANTOTA]: 'Hambantota',
  [District.MONARAGALA]: 'Monaragala',
  [District.ANURADHAPURA]: 'Anuradhapura',
  [District.POLONNARUWA]: 'Polonnaruwa',
  [District.PUTTALAM]: 'Puttalam',
  [District.RATNAPURA]: 'Ratnapura',
  [District.NUWARA_ELIYA]: 'Nuwara Eliya',
  [District.BADULLA]: 'Badulla',
  [District.KEGALLE]: 'Kegalle',
  [District.MULLAITIVU]: 'Mullaitivu',
  [District.MATALE]: 'Matale',
  [District.AMPARA]: 'Ampara',
  [District.KILINOCHCHI]: 'Kilinochchi',
  [District.GALLE]: 'Galle'
}

// District name to code mapping
export const DISTRICT_CODES = {
  'Mannar': District.MANNAR,
  'Colombo': District.COLOMBO,
  'Batticaloa': District.BATTICALOA,
  'Gampaha': District.GAMPAHA,
  'Kalutara': District.KALUTARA,
  'Kandy': District.KANDY,
  'Kurunegala': District.KURUNEGALA,
  'Jaffna': District.JAFFNA,
  'Vavuniya': District.VAVUNIYA,
  'Trincomalee': District.TRINCOMALEE,
  'Matara': District.MATARA,
  'Hambantota': District.HAMBANTOTA,
  'Monaragala': District.MONARAGALA,
  'Anuradhapura': District.ANURADHAPURA,
  'Polonnaruwa': District.POLONNARUWA,
  'Puttalam': District.PUTTALAM,
  'Ratnapura': District.RATNAPURA,
  'Nuwara Eliya': District.NUWARA_ELIYA,
  'Badulla': District.BADULLA,
  'Kegalle': District.KEGALLE,
  'Mullaitivu': District.MULLAITIVU,
  'Matale': District.MATALE,
  'Ampara': District.AMPARA,
  'Kilinochchi': District.KILINOCHCHI,
  'Galle': District.GALLE
}

// Helper functions
export const getDistrictName = (code) => {
  return DISTRICT_MAPPING[code] || 'Unknown'
}

export const getDistrictCode = (name) => {
  return DISTRICT_CODES[name] || null
}

export const getAllDistricts = () => {
  return Object.entries(DISTRICT_MAPPING).map(([code, name]) => ({
    code,
    name
  }))
} 
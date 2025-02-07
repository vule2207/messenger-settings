export const isDevelopment = () => {
  const locationInfo = window.location;
  const { hostname } = locationInfo;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true;
  } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return true;
  } else {
    return false;
  }
};

export const getBaseUrl = (defaultHost: string = '') => {
  const locationInfo = window.location;
  const { host } = locationInfo;
  if (isDevelopment()) {
    const baseUrlArr = process.env.REACT_APP_BASE_URL?.split('/');
    if (baseUrlArr) {
      return 'https://' + baseUrlArr?.[2];
    } else {
      return 'https://vndev.hanbiro.com';
    }
  } else {
    const data = defaultHost ? defaultHost : localStorage.getItem('host') || host;
    const dataArr = data?.split('/');
    return 'https://' + dataArr?.[0];
  }
};

export const getGroupwareUrl = () => {
  let locationInfo = window.location;
  if (isDevelopment()) {
    return process.env.REACT_APP_BASE_URL || 'https://vndev.hanbiro.com/ngw';
  } else {
    if (window.location !== window.parent.location) {
      locationInfo = window.parent.location;
    }

    const { hostname, protocol } = locationInfo;
    return [protocol, '//', hostname, '/ngw'].join('');
  }
};

export const TIME_RANGE_CACHE_IMAGE: number = 3;

export const getUserAvatarUrl = (
  cn: string | number | undefined,
  no: string | number | undefined,
  width = 35,
  height = 35,
  isThumbnail = false,
) => {
  const date = new Date();
  const hour = date.getHours();
  const rootHour = Math.floor(hour / TIME_RANGE_CACHE_IMAGE) * TIME_RANGE_CACHE_IMAGE;
  date.setHours(rootHour, 0, 0, 0);
  return isThumbnail
    ? getGroupwareUrl() + `/org/user/photo/no/${no}/cn/${cn}/thumb/1?t=${date.getTime()}`
    : getGroupwareUrl() +
        `/org/user/photo/no/${no}/cn/${cn}/?width=${width}&height=${height}&t=${date.getTime()}`;
};

export const getContactPhotoUrl = (id: string, file: string) => {
  if (!id || !file) return '';
  const date = new Date();
  const hour = date.getHours();
  const rootHour = Math.floor(hour / TIME_RANGE_CACHE_IMAGE) * TIME_RANGE_CACHE_IMAGE;
  date.setHours(rootHour, 0, 0, 0);
  return getGroupwareUrl() + `/addrbook/contact/photo/id/${id}/file/${file}?_ts=${date.getTime()}`;
};

export const getAssetPhotoUrl = (id: string) => {
  const date = new Date();
  const hour = date.getHours();
  const rootHour = Math.floor(hour / TIME_RANGE_CACHE_IMAGE) * TIME_RANGE_CACHE_IMAGE;
  date.setHours(rootHour, 0, 0, 0);
  return getGroupwareUrl() + `/asset/asset/photo/id/${id}?_ts=${date.getTime()}`;
};

export const convertHTMLEntitiesToString = (input: string) => {
  const entityMap: { [key: string]: string } = {
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    // Add more HTML entities and their corresponding characters if needed
  };

  return input.replace(/&[a-zA-Z]+;/g, (match) => {
    const decodedEntity = entityMap[match];
    return decodedEntity || match;
  });
};

/**
 * Formats a file size from bytes to other units like KB, MB, GB, etc.
 *
 * @param {number} fileSize - The file size in bytes.
 * @returns {string} The formatted file size along with the appropriate unit.
 */
export function formatFileSize(fileSize: number | string): string {
  let size: number = 0;
  if (!fileSize) {
    return '';
  }
  if (typeof fileSize === 'string') {
    size = parseInt(fileSize);
  } else {
    size = fileSize;
  }

  const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unit: string = 'B';
  for (let i: number = 0; i < units.length; i++) {
    if (size < 1024) {
      unit = units[i];
      break;
    }
    size = size / 1024;
  }
  return `${size.toFixed(2)} ${unit}`;
}

export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), waitFor);
  };
}

export const buildQueryParamsStr = (params: any) => {
  const queryBuilder = [];
  for (const _key in params) {
    const value = params[_key] || '';
    if (value) queryBuilder.push(`${_key}=${value}`);
  }

  return queryBuilder.join('&');
};

export const objectToString = (params: any) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const isEmailValid = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const vailForwardMail = (mails: string): { status: boolean; mail: string } => {
  const emailReg = /^[a-z0-9.!#$%&'*+/=?^_`{|}~]+@([0-9.]+|([^\s'"<>@,;]+\.+[a-z]{2,6}))$/i;
  let result = { status: true, mail: '' };

  if (mails.indexOf(',') < 0) {
    if (!emailReg.test(mails.trim())) {
      return { status: false, mail: mails.trim() };
    }
  } else {
    const arr = mails.split(',');
    for (let entry of arr) {
      if (!emailReg.test(entry.trim())) {
        result.status = false;
        result.mail = entry;
        break;
      }
    }
  }

  return result;
};

export const checkPhoneNumberFormat = (val: string): boolean => {
  // Regexp for phone_number validating
  const regexpPhoneNumber = /^[0-9-]*$/;
  // Check phone number value
  return regexpPhoneNumber.test(val);
};

export const checkEmailFormat = (value: string): boolean => {
  const emaiRegex = /^([/\w/g\.-]+)@([\dza-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
  return emaiRegex.test(value);
};

export const checkDomain = (val: string): boolean => {
  // Regular expression for domain validation
  const domainRegExp = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}\.?$/;

  // Test the input value against the regular expression
  return domainRegExp.test(val);
};

export const isBase64Encoded = (val: string): boolean => {
  const base64Exp = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  return base64Exp.test(val);
};

// normal: en-US
// shortCode: en
export function getBrowserLang(shortCode: boolean = true) {
  let language: string = navigator.language;

  if (language.indexOf('-') !== -1 && shortCode) {
    language = language.substring(0, 2);
  }

  if (language === 'ja') {
    language = 'jp';
  }

  const supportLanguage: string[] = ['ko', 'en', 'jp', 'ch', 'zh', 'id', 'vi', 'es'];

  if (!(supportLanguage.indexOf(language) > -1)) {
    language = 'ko';
  }

  return language || 'ko';
}

export const removeDuplicateData = (rows: any[], field: string = 'id') => {
  let newRows: any[] = [];
  let checkedIds: any = {};
  if (rows?.length > 0) {
    rows.forEach((row: any) => {
      if (!checkedIds[row?.[field]]) {
        newRows.push(row);
        checkedIds[row?.id] = true;
      }
    });
  }
  return newRows;
};

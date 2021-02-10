import * as moment from 'moment';

export function setFormData(key: string, val: any, schema: any, data: any) {
  Object.keys(schema.properties).map((propName: string) => {
    if (key === propName) {
      data[key] = val;
    }

    if (key.length > propName.length &&
      key.startsWith(propName) &&
      schema.properties[propName].type === 'object') {
      const childKey = key.replace(propName + '_', '');
      data[propName] = setFormData(childKey, val, schema.properties[propName], data[propName] || {});
    }
  });
  return data;
}

export function getFormData(key: string, dataOb: any): any {
  let k = (key.startsWith('root_')) ? key.replace(/^root_/, '') : key;
  for (const propName of Object.keys(dataOb)) {
    if (k === propName) {
      const v = dataOb[k];
      return v;
    } else if (k.startsWith(propName + '_')) {
      k = k.replace(new RegExp(propName + '_'), '');
      const val = getFormData(k, dataOb[propName]);
      return val;
    }
  }
  return '';
}

export function fmtDate(strDate: string, fmt: string) {
  if (!strDate) {
    return '';
  }
  return moment(strDate).format(fmt);
}
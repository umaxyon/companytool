import { JSONSchema6 } from 'json-schema';

export function findSchema(rootSchema: JSONSchema6, key: string): JSONSchema6 {
  return (function recursive(schema: JSONSchema6, names: string[]): JSONSchema6 {
    const nm: any = names.shift();
    const properties: any = schema.properties;
    const scm = properties[nm];
    if (names.length === 0) {
      return scm;
    } else {
      return recursive(scm, names);
    }
  })(rootSchema, key.split('.'));
}


export function findUiSchema(uis: JSONSchema6, nm: string): any {
  function recursive(uiSchema: JSONSchema6, name: string): any {
    for (const p of Object.keys(uiSchema)) {
      const t = uiSchema[p];
      if (t && t.children && t.children.length === 1 && t.children[0] === name) {
        return [true, uiSchema];
      }
      if (typeof t === 'object') {
        if (t.length) {
          let ret;
          for (const r of Object.keys(t)) {
            ret = recursive(t[r], name);
            if (ret && ret[0] === true) {
              return ret;
            }
          }
        } else {
          if (t.hasOwnProperty('children') || t.hasOwnProperty('ui:row') || t.hasOwnProperty('ui:col')) {
            return recursive(t, name);
          }
        }
      }
    }
  }

  const currentUiSchema = recursive(uis, nm);
  if (currentUiSchema && currentUiSchema[0] === true) {
    return currentUiSchema[1];
  } else {
    return undefined;
  }
}
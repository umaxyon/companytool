const schema = {
  type: "object",
  properties: {
    partner_id: { type: "string", title: "取引先ID", default: "" },
    name: { type: "string", title: "取引先名", default: "" },
    abbreviation: { type: "string", title: "取引先略称", default: "" },
    client_oropriety: { type: "string", title: "顧客可否", default: "", enum: [], "ss:master": 'oropriety', "ss:radio": true },
    bp_oropriety: { type: "string", title: "BP可否", default: "", enum: [], "ss:master": 'oropriety', "ss:radio": true },
    post_code: { type: "string", title: "郵便番号", default: "" },
    address: { type: "string", title: "住所", default: "", "ss:width": "max" },
    phone: { type: "string", title: "電話", default: "", 'ss:type': 'phone' },
    fax: { type: "string", title: "FAX", default: "", 'ss:type': 'phone' },
    website: { type: "string", title: "Webサイト", default: "", "ss:width": "max" },
    number_of_employees: { type: "string", title: "従業員数", default: "", "ss:type": "num_human" },
    description: { type: "textarea4", title: "説明", default: "" },
    tdp_points: { type: "string", title: "帝国データバンク点数", default: "" },
    application_date: { type: "date", title: "取引先申請日", default: ""},
    tdb_survey_date: { type: "date", title: "TDB調査日", default: ""},
    terms_and_conditions: { type: "string", title: "取引条件など", default: "" },
    kansai_employee: { type: "string", title: "関西社員エンジニア数", default: "", "ss:type": "num_human" },
    kansai_bp: { type: "string", title: "関西BPエンジニア数", default: "", "ss:type": "num_human" },
    editor: { type: "string", title: "更新者", default: "" },
    register_date: { type: "string", title: "登録日時", default: "" },
    update_date: { type: "string", title: "更新日時", default: "" },
  },
};

const uiSchema = {
  'ui:field': 'layout_grid',
  'ui:layout_grid': {
    children: [
      {
        'ui:card': true,
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:row': [
                    { 'ui:col': { children: ['name'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['abbreviation'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['client_oropriety'] } },
                    { 'ui:col': { children: ['bp_oropriety'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['post_code'] }, 'ui:label': '〒' }
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['address'] } }
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['phone'] } },
                    { 'ui:col': { children: ['fax'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['website'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['number_of_employees'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['description'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['tdp_points'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['application_date'] }, 'ui:dateformat': 'YYYY年MM月DD日' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['tdb_survey_date'] }, 'ui:dateformat': 'YYYY年MM月DD日' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['terms_and_conditions'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['kansai_employee'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['kansai_bp'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['editor'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['register_date'] }, 'ui:disable_edit': true, 'ui:dateformat': 'YYYY年MM月DD日 HH:mm:ss' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['update_date'] }, 'ui:disable_edit': true, 'ui:dateformat': 'YYYY年MM月DD日 HH:mm:ss' },
                  ]
                },
                {
                  'ui:template': 'SupplierFormFooter',
                }
              ]
            }
          }
        ]
      },
      // 契約一覧
      {
        'ui:card': true,
        'ui:appear_mode': ['detail'],
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:row': [
                    { 'ui:template': 'PartnerContractList' }
                  ]
                }
              ]
            }
          }
        ]
      },
    ]
  }
}

export default (param: any) => {
  return { schema, uiSchema };
}
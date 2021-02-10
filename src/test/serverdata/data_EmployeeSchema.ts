const schema = {
  type: "object",
  properties: {
    employee_type: { type: "string", title: "社員種別", default: "", enum: [], "ss:master": 'employee_type' },
    name: { type: "string", title: "社員名", default: "" },
    phonetic: { type: "string", title: "ふりがな", default: "" },
    cellphone_number: { type: "string", title: "個人携帯番号", default: "", 'ss:type': 'phone' },
    nearest_station: { type: "string", title: "最寄駅", default: "" },
    facebook_address: { type: "string", title: "Facebookアドレス", default: "" },
    twitter_address: { type: "string", title: "Twitterアドレス", default: "" },
    line_address: { type: "string", title: "LINEアドレス", default: "" },
    remarks: { type: "string", title: "備考", default: "", "ss:type": "textarea4" },
    staff_info: {
      type: "object",
      title: "社員情報",
      properties: {
        mail_address: { type: "string", title: "メールアドレス", default: "" },
        birthday: { type: "date", title: "生年月日", default: ""},
        joined_route: { type: "string", title: "入社経路", default: "" },
        hire_date: { type: "date", title: "入社日", default: "", "ss:type": "date" },
        company_history: { type: "string", title: "社歴", default: "" },
        joining_conditions: { type: "string", title: "入社時の譲れない条件", default: "", "ss:type": "textarea3" },
        base_performance_rate: { type: "string", title: "ベース成果給率", default: "", enum: [], "ss:master": 'base_performance_rate' },
        retirement_date: { type: "date", title: "退職日", default: ""},
        retirement_reason: { type: "string", title: "退職理由", default: "", "ss:type": "textarea3" },
      }
    },
    partner_info: {
      type: "object",
      title: "協力会社社員情報",
      properties: {
        company_name: { type: "string", title: "会社名", default: "", enum: [], "ss:master": 'client_partner_list' },
        commerical_flow: { type: "string", title: "商流", default: "" },
        age: { type: "string", title: "年齢", default: "" },
        input_age_date: { type: "date", title: "年齢入力日", default: ""},
        good_language: { type: "string", title: "得意言語", default: "" },
        assessment: { type: "string", title: "評価", default: "", enum: [], "ss:master": "assessment" },
        contract_target: { type: "string", title: "契約対象", default: "", enum: [], "ss:master": 'contract_target', "ss:radio": true },
      }
    },
    editor: { type: "string", title: "更新者", default: "" },
    register_date: { type: "date", title: "登録日時", default: ""},
    update_date: { type: "date", title: "更新日時", default: ""},
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
                    { 'ui:col': { children: ['employee_type'] } },
                  ]
                },
              ]
            }
          }
        ]
      },
      // 社員フォーマット
      {
        'ui:card': true,
        'ui:classname': 'fm_emp_staff',
        'ui:condition': 'employee_type',
        'ui:disabled': true,
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:card': true,
                  'ui:col': {
                    children: [
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['name'] } },
                          { 'ui:col': { children: ['phonetic'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.mail_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['cellphone_number'] } },
                          { 'ui:col': { children: ['nearest_station'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.birthday'] }, 'ui:dateformat': 'YYYY年MM月DD日', 'ui:blur': true },
                          { 'ui:col': { children: ['partner_info.age'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.joined_route'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.hire_date'] }, 'ui:dateformat': 'YYYY年MM月DD日', 'ui:blur': true },
                          { 'ui:col': { children: ['staff_info.company_history'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.joining_conditions'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.base_performance_rate'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['facebook_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['twitter_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['line_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['remarks'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.retirement_date'] }, 'ui:dateformat': 'YYYY年MM月DD日' },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['staff_info.retirement_reason'] } },
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
                    ]
                  }
                },
                {
                  'ui:template': 'EmployeeFormFooter',
                }
              ]
            },
          }
        ]
      },
      // BPフォーマット
      {
        'ui:card': true,
        'ui:classname': 'fm_emp_bp',
        'ui:condition': 'employee_type',
        'ui:disabled': true,
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:card': true,
                  'ui:col': {
                    children: [
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['partner_info.company_name'] }, 'ui:label': '協力会社名' },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['name'] }, 'ui:label': 'エンジニア名' },
                          { 'ui:col': { children: ['phonetic'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['cellphone_number'] } },
                          { 'ui:col': { children: ['nearest_station'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['partner_info.age'] } },
                          { 'ui:col': { children: ['partner_info.input_age_date'] }, 'ui:dateformat': 'YYYY年MM月DD日' },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['partner_info.good_language'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['partner_info.assessment'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['facebook_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['twitter_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['line_address'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['remarks'] } },
                        ]
                      },
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['partner_info.contract_target'] } },
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
                    ]
                  }
                },
                {
                  'ui:template': 'EmployeeFormFooter',
                }
              ]
            },
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
                    { 'ui:template': 'EmployeeContractList' }
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
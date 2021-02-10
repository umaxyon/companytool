const schema = {
  type: "object",
  required: [
    {
      keys:[
        'employee_id',
        'contract_type',
        'other_employee_id',
        'start_date',
        'job_no',
      ]
    },
    {
      condition: 'contract_type',
      format: 'fm_permanent',
      keys: [
        'employee_contract.contract_info.month_unit_price_info.month_unit_price',
        'employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.unit_price',
        'employee_contract.performance_rate',
        'employee_contract.same_client_percent_from_duration',
      ]
    },
    {
      condition: 'contract_type',
      format: 'fm_bp',
      keys: [
        'bp_contract.bp_contract_info.special_liquidation_existence',
      ]
    }
  ],
  properties: {
    contract_id: { type: "string", title: "常駐契約ID", default: "" },
    employee_id: { type: "string", title: "エンジニア名", default: "", enum: [], "ss:master": 'staff_list' },
    partner_id: { type: "string", title: "顧客", default: "", enum: [], "ss:master": 'client_list' },
    contract_type: { type: "string", title: "契約形態", default: "", enum: [], "ss:master": 'contract_type' },
    start_date: { type: "date", title: "開始日", default: "" },
    end_date: { type: "date", title: "終了日", default: "" },
    other_employee_id: { type: "string", title: "社員その他ID", default: "", enum: [], "ss:master": 'staff_other_list' },
    item_registration_progress: { type: "string", title: "案件登録進捗", default: "", enum: [], "ss:master": 'item_registration_progress' },
    job_no: { type: "string", title: "JOB No", default: "" },
    zac_project_title: { type: "string", title: "ZAC案件名", default: "", "ss:width": "max" },
    client_contract_person: { type: "string", title: "顧客担当者", default: "" },
    project_title: { type: "string", title: "案件名", default: "", "ss:width": "max" },
    organizational_unit: { type: "string", title: "組織単位", default: "" },
    contract_progress: {
      type: "object",
      title: "契約進行状況",
      properties: {
        quotation_issue_date: { type: "date", title: "見積書発行日", default: "" },
        quotation_confirmation: { type: "boolean", title: "見積書確認", default: "" },
        order_receipt_date: { type: "date", title: "注文書受取日", default: "" },
        order_confirmation: { type: "boolean", title: "注文書確認", default: "" },
        order_confirmation_return_date: { type: "date", title: "注文請書返送日", default: "" },
      }
    },

    work_place: { type: "string", title: "作業場所", default: "" },
    commericial_flow: { type: "string", title: "商流など", default: "", "ss:width": "max" },
    working_hours: { type: "string", title: "就業時間", default: "" },
    break_time: { type: "string", title: "休憩時間", default: "" },
    remarks: { type: "textarea4", title: "備考", default: "", "ss:type": "textarea4" },
    entry_card: { type: "boolean", title: "入館証", default: "" },
    uniform: { type: "boolean", title: "制服", default: "" },
    other_borrowed_items: { type: "string", title: "その他借り物", default: "", "ss:width": "max" },

    employee_contract: {
      type: "object",
      title: "社員契約情報",
      properties: {
        individual_contract_issue_date: { type: "date", title: "個別契約書発行日", default: "" },
        individual_contract_confirmation: { type: "boolean", title: "個別契約書確認" },
        woring_condition_issue_date: { type: "date", title: "就業条件通知書発行日", default: "" },
        working_condition_checked: { type: "boolean", title: "就業条件通知書確認" },
        unit_price_for_salary: { type: "integer", title: "給料計算上の単価", default: "", "ss:type": "currency" },
        transition_condition: { type: "boolean", title: "移行時条件" },
        base_performance_rate: { type: "string", title: "ベース成果給率", default: "", enum: [], "ss:master": 'base_performance_rate' },
        minus_percent_from_pass_price: { type: "integer", title: "定期代からのマイナス％", default: "", "ss:type": "percent" },
        same_client_start_date: { type: "date", title: "同一顧客契約開始日", default: "" },
        same_client_percent_from_duration: { type: "integer", title: "同一顧客継続年数からの％", default: "", "ss:type": "percent" },
        superior_evaluation_adjustment_percent: { type: "integer", title: "上長評価調整％", default: "", "ss:type": "percent" },
        performance_rate: { type: "integer", title: "成果給率", default: "", "ss:type": "percent" },
        salary_amount: { type: "integer", title: "給料額", default: "", "ss:type": "currency" },
        deemed_overtime: { type: "string", title: "みなし残業", default: "" },
        short_work_duty: { type: "string", title: "時短勤務", default: "" },
        education_training_date_contents: { type: "string", title: "教育訓練実施日・内容", default: "", "ss:width": "max" },
        redemption_ratio: { type: "integer", title: "還元率", default: "", "ss:type": "percent" },

        responsible_person_info: {
          type: "object",
          title: "派遣責任者情報",
          properties: {
            commander: { type: "string", title: "指揮命令者", default: "", "ss:width": "max" },
            manager: { type: "string", title: "派遣先責任者", default: "", "ss:width": "max" },
            complainant: { type: "string", title: "苦情責任者", default: "", "ss:width": "max" },
          }
        },
        commuting_info: {
          type: "object",
          title: "通勤情報",
          properties: {
            traffic_route: { type: "string", title: "交通ルート", default: "", "ss:width": "max" },
            pass_price: { type: "integer", title: "定期代", default: "", "ss:type": "currency" },
            first_month_transit_price: { type: "integer", title: "初月交通費", default: "", "ss:type": "currency" },
          }
        },
        contract_info: { $ref: "#/definitions/contract_basic_info" },
      }
    },

    bp_contract: {
      type: "object",
      title: "BP契約情報",
      properties: {
        partner_company_name: { type: "string", title: "協力会社名", default: "", enum: [], "ss:master": 'client_partner_list' },
        payment_contract_person: { type: "string", title: "支払先担当者", default: "" },
        quotation_receipt_date: { type: "date", title: "見積書受取日", default: "" },
        order_issue_date: { type: "date", title: "注文書契約書発行日", default: "" },
        order_confirmation_receipt_date: { type: "date", title: "注文請書受取日", default: "" },
        client_contract_info: { $ref: "#/definitions/contract_basic_info" },
        bp_contract_info: { $ref: "#/definitions/contract_basic_info" },
      }
    },
    editor: { type: "string", title: "更新者", default: "" },
    register_date: { type: "string", title: "登録日時", default: "" },
    update_date: { type: "string", title: "更新日時", default: "" },
  },
  definitions: {
    contract_basic_info: {
      type: "object",
      title: "契約基本情報",
      properties: {
        clearing_form: { title: "清算形態", type: 'string', enum: [], "ss:master": 'clearing_form' },
        hour_unit_price: { type: "integer", title: "時間単価", default: "", "ss:type": "currency" },
        month_unit_price_info: {
          type: "object",
          title: "人月単価情報",
          properties: {
            month_unit_price: { type: "integer", title: "人月単価", default: "", "ss:type": "currency" },
            reference_time: { $ref: "#/definitions/reference_time" },
            excess_unit_price: { type: "integer", title: "超過単価", default: "", "ss:type": "currency" },
            deducation_unit_price: { type: "integer", title: "控除単価", default: "", "ss:type": "currency" },
            first_month_daily_existence: { type: "boolean", title: "初月日割りの有無", default: "" },
            first_month_daily_calculation_info: {
              type: "object",
              title: "初月日割り計算情報",
              properties: {
                calculation_method: { type: "string", title: "計算方法", default: "", "ss:width": "max" },
                unit_price: { type: "integer", title: "単価", default: "", "ss:type": "currency" },
                reference_time: { $ref: "#/definitions/reference_time" },
              }
            }
          }
        },
        special_liquidation_existence: { type: "boolean", title: "特殊精算の有無", default: "" },
        special_liquidation_detail: { type: "textarea3", title: "特殊精算の詳細", default: "", "ss:type": "textarea3" },
        time_unit: {
          type: "object",
          title: "時間単位",
          properties: {
            daily: { type: "string", title: "時間単位(日々)", default: "", enum: [], "ss:master": "minute_unit" },
            monthly: { type: "string", title: "時間単位(月間)", default: "", enum: [], "ss:master": "minute_unit" },
          }
        },
        closing_date: { type: "string", title: "締め日", default: "", enum: [], "ss:master": "closing_date_type" },
        payment_date: { type: "string", title: "支払日", default: "", enum: [], "ss:master": "payment_date_type" },
      }
    },
    reference_time: {
      type: "object",
      title: "基準時間",
      properties: {
        lower_limit: { type: "string", title: "下限", default: "" },
        upper_limit: { type: "string", title: "上限", default: "" },
        other: { type: "string", title: "基準時間_他", default: "", "ss:width": "max" },
      }
    },
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
                    { 'ui:col': { children: ['employee_id'] } },
                    { 'ui:col': { children: ['contract_type'] }, 'ui:classname': 'fm_emp_bp', 'ui:condition': 'employee_type' },
                  ]
                }
              ]
            }
          }
        ]
      },
      // 常駐フォーマット
      {
        'ui:card': true,
        'ui:classname': 'fm_permanent',
        'ui:condition': 'contract_type',
        'ui:disabled': true,
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:row': [
                    { 'ui:col': { children: ['other_employee_id'] }, 'ui:label': '担当営業' },
                    { 'ui:col': { children: ['item_registration_progress'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['job_no'] } },
                    { 'ui:col': { children: ['zac_project_title'] } },
                  ]
                },
                {
                  'ui:group': '契約期間',
                  'ui:col': {
                    children: [
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['start_date'] }, 'ui:dateformat': 'YYYY年MM月DD日', 'ui:change': true },
                          { 'ui:col': { children: ['end_date'] }, 'ui:dateformat': 'YYYY年MM月DD日', 'ui:change': true },
                        ]
                      },
                    ]
                  }
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['partner_id'] } },
                    { 'ui:col': { children: ['client_contract_person'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.contract_info.closing_date'] } },
                    { 'ui:col': { children: ['employee_contract.contract_info.time_unit.daily'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.contract_info.payment_date'] } },
                    { 'ui:col': { children: ['employee_contract.contract_info.time_unit.monthly'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.contract_info.clearing_form'] } },
                    {
                      'ui:expand': true,
                      'ui:classname': 'fm_monthly_settlement',
                      'ui:condition': 'settlement',
                      'ui:row': [
                        {
                          'ui:col': {
                            children: [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_existence'] }, 'ui:label_on': '有' },
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                // 人月精算
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_monthly_settlement',
                  'ui:condition': 'settlement',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.month_unit_price'] }, 'ui:blur': true },
                            ]
                          },
                          {
                            'ui:group': '基準時間',
                            'ui:col': {
                              children: [
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.reference_time.lower_limit'] }, 'ui:blur': true },
                                    { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.reference_time.upper_limit'] }, 'ui:blur': true },
                                  ]
                                },
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.reference_time.other'] } },
                                  ]
                                },
                              ]
                            }
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.deducation_unit_price'] }, 'ui:blur': true },
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.excess_unit_price'] }, 'ui:blur': true },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                // 初月日割り計算
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_calc_first_month_yes',
                  'ui:condition': 'settlement',
                  'ui:row': [
                    {
                      'ui:group': '初月日割り',
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.calculation_method'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.unit_price'] }, 'ui:label': '計算単価' },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.lower_limit'] } },
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.upper_limit'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.other'] } },
                            ]
                          },
                        ]
                      }
                    }
                  ]
                },

                // 時間精算
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_daily_settlement',
                  'ui:condition': 'settlement',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.contract_info.hour_unit_price'] } },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.contract_info.special_liquidation_existence'] }, 'ui:label_on': '有' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.contract_info.special_liquidation_detail'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['project_title'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['work_place'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.commuting_info.traffic_route'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.commuting_info.pass_price'] }, 'ui:blur': true },
                    { 'ui:col': { children: ['employee_contract.commuting_info.first_month_transit_price'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['commericial_flow'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['working_hours'] } },
                    { 'ui:col': { children: ['break_time'] } },
                  ]
                },
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_temporary',
                  'ui:condition': 'temporary_stuff',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.responsible_person_info.commander'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.responsible_person_info.manager'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['employee_contract.responsible_person_info.complainant'] } },
                            ]
                          },
                        ]
                      }
                    }
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.education_training_date_contents'] } },
                  ]
                },

                {
                  'ui:row': [
                    { 'ui:col': { children: ['entry_card'] }, 'ui:label_on': '有' },
                    { 'ui:col': { children: ['uniform'] }, 'ui:label_on': '有' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['other_borrowed_items'] } },
                  ]
                },

                {
                  'ui:row': [
                    { 'ui:col': { children: ['remarks'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.unit_price_for_salary'] }, 'ui:blur': true },
                    { 'ui:col': { children: ['employee_contract.transition_condition'] }, 'ui:label_on': '有' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.base_performance_rate'] }, 'ui:change': true },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.minus_percent_from_pass_price'] }, 'ui:change': true },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.same_client_start_date'] }, 'ui:dateformat': 'YYYY年MM月DD日', 'ui:change': true },
                    { 'ui:col': { children: ['employee_contract.same_client_percent_from_duration'] }, 'ui:change': true, 
                      'ui:description': '同一顧客契約開始日が毎年4月1日時点でXヵ年以上でX%　(最大7%)' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.superior_evaluation_adjustment_percent'] }, 'ui:change': true },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.performance_rate'] }, 'ui:classname': 'fm_transition_cond_no', 'ui:condition': 'transition_condition', 'ui:blur': true, 
                      'ui:description': '移行時条件チェック時のみ直接入力'},
                    { 'ui:col': { children: ['employee_contract.salary_amount'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['employee_contract.deemed_overtime'] } },
                    { 'ui:col': { children: ['employee_contract.short_work_duty'] } },
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
                  'ui:template': 'ContractFormFooter',
                }
              ]
            }
          },
        ]
      },
      // BPフォーマット
      {
        'ui:card': true,
        'ui:classname': 'fm_bp',
        'ui:condition': 'contract_type',
        'ui:disabled': true,
        'ui:row': [
          {
            'ui:card': true,
            'ui:col': {
              children: [
                {
                  'ui:row': [
                    { 'ui:col': { children: ['other_employee_id'] }, 'ui:label': '担当営業' },
                    { 'ui:col': { children: ['item_registration_progress'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['job_no'] } },
                    { 'ui:col': { children: ['zac_project_title'] } },
                  ]
                },
                {
                  'ui:group': '契約期間',
                  'ui:col': {
                    children: [
                      {
                        'ui:row': [
                          { 'ui:col': { children: ['start_date'] } },
                          { 'ui:col': { children: ['end_date'] } },
                        ]
                      },
                    ]
                  }
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['partner_id'] } },
                    { 'ui:col': { children: ['client_contract_person'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.partner_company_name'] } },
                    { 'ui:col': { children: ['bp_contract.payment_contract_person'] }, 'ui:label': 'BP支払先担当者' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.client_contract_info.closing_date'] } },
                    { 'ui:col': { children: ['bp_contract.client_contract_info.time_unit.daily'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.client_contract_info.payment_date'] } },
                    { 'ui:col': { children: ['bp_contract.client_contract_info.time_unit.monthly'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.closing_date'] }, 'ui:label': 'BP締め日' },
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.time_unit.daily'] }, 'ui:label': 'BP時間単位（日々）' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.payment_date'] }, 'ui:label': 'BP支払日', "ss:master": "bp_payment_date_type" },
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.time_unit.monthly'] }, 'ui:label': 'BP時間単位（月間）' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.client_contract_info.clearing_form'] }, 'ui:label': '精算形態（顧客）' },
                    {
                      'ui:expand': true,
                      'ui:classname': 'fm_monthly_settlement',
                      'ui:condition': 'settlement_client',
                      'ui:row': [
                        {
                          'ui:col': {
                            children: [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_existence'] }, 'ui:label': '初月日割りの有無（顧客）', 'ui:label_on': '有' },
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                // 時間精算(顧客)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_daily_settlement',
                  'ui:condition': 'settlement_client',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.hour_unit_price'] } },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                // 人月精算(顧客)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_monthly_settlement',
                  'ui:condition': 'settlement_client',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.month_unit_price'] }, 'ui:blur': true },
                            ]
                          },
                          {
                            'ui:group': '基準時間',
                            'ui:col': {
                              children: [
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.reference_time.lower_limit'] }, 'ui:blur': true },
                                    { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.reference_time.upper_limit'] }, 'ui:blur': true },
                                  ]
                                },
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.reference_time.other'] } },
                                  ]
                                },
                              ]
                            }
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.deducation_unit_price'] }, 'ui:blur': true },
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.excess_unit_price'] }, 'ui:blur': true },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                // 初月日割り計算(顧客)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_calc_first_month_yes',
                  'ui:condition': 'settlement_client',
                  'ui:row': [
                    {
                      'ui:group': '初月日割り',
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info.calculation_method'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info.unit_price'] }, 'ui:label': '計算単価' },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.lower_limit'] } },
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.upper_limit'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.client_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.other'] } },
                            ]
                          },
                        ]
                      }
                    }
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.clearing_form'] }, 'ui:label': '精算形態（BP）' },
                    {
                      'ui:expand': true,
                      'ui:classname': 'fm_monthly_settlement',
                      'ui:condition': 'settlement_bp',
                      'ui:row': [
                        {
                          'ui:col': {
                            children: [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_existence'] }, 'ui:label': '初月日割りの有無（BP）', 'ui:label_on': '有' },
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                // 時間精算(BP)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_daily_settlement',
                  'ui:condition': 'settlement_bp',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.hour_unit_price'] }, 'ui:label': 'BP時間単価' },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                // 人月精算(BP)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_monthly_settlement',
                  'ui:condition': 'settlement_bp',
                  'ui:row': [
                    {
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.month_unit_price'] }, 'ui:label': 'BP人月単価', 'ui:blur': true },
                            ]
                          },
                          {
                            'ui:group': 'BP基準時間',
                            'ui:col': {
                              children: [
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.reference_time.lower_limit'] }, 'ui:blur': true },
                                    { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.reference_time.upper_limit'] }, 'ui:blur': true },
                                  ]
                                },
                                {
                                  'ui:row': [
                                    { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.reference_time.other'] } },
                                  ]
                                },
                              ]
                            }
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.deducation_unit_price'] }, 'ui:label': 'BP控除単価', 'ui:blur': true },
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.excess_unit_price'] }, 'ui:label': 'BP超過単価', 'ui:blur': true },
                            ]
                          },
                        ]
                      }
                    },
                  ]
                },
                // 初月日割り計算(BP)
                {
                  'ui:expand': true,
                  'ui:classname': 'fm_calc_first_month_yes',
                  'ui:condition': 'settlement_bp',
                  'ui:row': [
                    {
                      'ui:group': 'BP初月日割り',
                      'ui:col': {
                        children: [
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info.calculation_method'] }, 'ui:label': '計算方法' },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info.unit_price'] }, 'ui:label': '計算単価' },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.lower_limit'] } },
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.upper_limit'] } },
                            ]
                          },
                          {
                            'ui:row': [
                              { 'ui:col': { children: ['bp_contract.bp_contract_info.month_unit_price_info.first_month_daily_calculation_info.reference_time.other'] } },
                            ]
                          },
                        ]
                      }
                    }
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.special_liquidation_existence'] }, 'ui:label_on': '有' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['bp_contract.bp_contract_info.special_liquidation_detail'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['project_title'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['work_place'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['commericial_flow'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['working_hours'] } },
                    { 'ui:col': { children: ['break_time'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['remarks'] } },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['entry_card'] }, 'ui:label_on': '有' },
                    { 'ui:col': { children: ['uniform'] }, 'ui:label_on': '有' },
                  ]
                },
                {
                  'ui:row': [
                    { 'ui:col': { children: ['other_borrowed_items'] } },
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
                  'ui:template': 'ContractFormFooter',
                }
              ]
            }
          },
        ]
      },
    ]
  }
}

export default (param: any) => {
  return { schema, uiSchema };
}
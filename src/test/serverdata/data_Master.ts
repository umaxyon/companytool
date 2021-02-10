export default (param: any) => {

  const master = {
    "client_list": [
      {
        "label": "PFU略",
        "value": "2c7655110a51cced109fb4d0"
      }
    ],
    "client_partner_list": [
      {
        "label": "PFU",
        "value": "2c7655110a51cced109fb4d0"
      }
    ],
    "staff_list": [
      {
        "label": "社員A",
        "value": "5c7655110a51cced109fb4d0",
        "empType": "staff_engineer"
      },
      {
        "label": "外注さんA",
        "value": "5c7655110a51cced109fb4d1",
        "empType": "partner_staff"
      },
      {
        "label": "社員B",
        "value": "5c7655110a51cced109fb4d2",
        "empType": "staff_engineer"
      },
      {
        "label": "山田　太郎",
        "value": "5c7655110a51cced109fb4d4",
        "empType": "partner_staff"
      },
      {
        "label": "外注さんB",
        "value": "5c7655110a51cced109fb4d3",
        "empType": "partner_other"
      }
    ],
    "staff_other_list": [
      {
        "label": "担当",
        "value": "5c7655110a51cced109fb4d9",
        "empType": "staff_other"
      }
    ],
    "employee_type": [
      {
        "label": "社員（エンジニア）",
        "value": "staff_engineer"
      },
      {
        "label": "社員（その他）",
        "value": "staff_other"
      },
      {
        "label": "協力会社（社員）",
        "value": "partner_staff"
      },
      {
        "label": "協力会社（その他）",
        "value": "partner_other"
      }
    ],
    "commerical_flow": [
      {
        "label": "直接",
        "value": "directly"
      },
      {
        "label": "一次下",
        "value": "primary_bottom"
      },
      {
        "label": "二次下",
        "value": "secondary_bottom"
      },
      {
        "label": "三次下",
        "value": "third_bottom"
      },
      {
        "label": "四次下",
        "value": "fourth_bottom"
      }
    ],
    "assessment": [
      {
        "label": "優秀",
        "value": "excellence"
      },
      {
        "label": "普通",
        "value": "usually"
      },
      {
        "label": "ヤバイ",
        "value": "dangerous"
      }
    ],
    "contract_type": [
      {
        "label": "派遣契約",
        "value": "temporary_agency_contract"
      },
      {
        "label": "準委任契約",
        "value": "subcommission_contract"
      }
    ],
    "clearing_form": [
      {
        "label": "人月精算",
        "value": "montly_liquidation"
      },
      {
        "label": "時間精算",
        "value": "time_settlement"
      },
    ],
    "base_performance_rate": [
      {
        "label": "23%",
        "value": "twenty_three_percent"
      },
      {
        "label": "28%",
        "value": "twenty_eight_percent"
      },
      {
        "label": "33%",
        "value": "thirty_three_percent"
      }
    ],
    "contract_target": [
      {
        "label": "〇",
        "value": "true"
      },
      {
        "label": "✕",
        "value": "false"
      }
    ],
    "oropriety": [
      {
        "label": "未選択",
        "value": "not_selected"
      },
      {
        "label": "〇",
        "value": "yes"
      },
      {
        "label": "✕",
        "value": "no"
      }
      // {
      //   "label": "○",
      //   "value": "yes"
      // },
      // {
      //   "label": "×",
      //   "value": "no"
      // }
    ],
    "item_registration_progress": [
      {
        "label": "ZAC案件登録済み",
        "value": "zac_registered"
      },
      {
        "label": "見積書/個別契約書発行済み",
        "value": "individual_contract_issued"
      },
      {
        "label": "個別契約書返送済み",
        "value": "individual_contract_returned"
      },
      {
        "label": "就業条件通知書発行済み",
        "value": "working_condition_issued"
      }
    ],
    "minute_unit": [
      {
        "label": "1分単位",
        "value": "one_minute_unit"
      },
      {
        "label": "5分単位",
        "value": "five_minute_unit"
      },
      {
        "label": "10分単位",
        "value": "ten_minute_unit"
      },
      {
        "label": "15分単位",
        "value": "fifteen_minute_unit"
      },
      {
        "label": "30分単位",
        "value": "thirty_minute_unit"
      },
      {
        "label": "60分単位",
        "value": "sixty_minute_unit"
      }
    ],
    "closing_date_type": [
      {
        "label": "毎月5日締め",
        "value": "fifth_every_month"
      },
      {
        "label": "毎月15日締め",
        "value": "fifteen_every_month"
      },
      {
        "label": "毎月20日締め",
        "value": "twenty_every_month"
      },
      {
        "label": "毎月末日締め",
        "value": "last_day_every_month"
      }
    ],
    "payment_date_type": [
      {
        "label": "翌月末日支払",
        "value": "next_month_payment"
      },
      {
        "label": "翌々月5日支払",
        "value": "fifth_month_after_next_payment"
      },
      {
        "label": "翌々月15日支払",
        "value": "fifteen_month_after_next_payment"
      },
      {
        "label": "翌々月20日支払",
        "value": "twenty_month_after_next_payment"
      },
      {
        "label": "翌々月25日支払",
        "value": "twenty_five_month_after_next_payment"
      },
      {
        "label": "翌々月末日支払",
        "value": "last_day_month_after_next_payment"
      }
    ],
    "bp_payment_date_type": [
      {
        "label": "翌々月第5営業日支払",
        "value": "fifth_buisiness_day_month_after_next_payment"
      },
      {
        "label": "翌々月5日支払",
        "value": "fifth_month_after_next_payment"
      },
      {
        "label": "翌々月15日支払",
        "value": "fifteen_month_after_next_payment"
      },
      {
        "label": "翌々月20日支払",
        "value": "twenty_month_after_next_payment"
      },
      {
        "label": "翌々月25日支払",
        "value": "twenty_five_month_after_next_payment"
      },
      {
        "label": "翌々月末日支払",
        "value": "last_day_month_after_next_payment"
      }
    ]
  }

  // const master = {};
  return master;
}
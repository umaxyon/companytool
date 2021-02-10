export default (param: any) => {
    const contractId = param.contractId;
    if (contractId === '0') {
        return {
            contract_id: '0',
            employee_id: '5c7655110a51cced109fb4d0',
            contract_type: 'subcommission_contract',
            constract_progress: {
                quotation_confirmation: 'true'
            },
            partner_id: '2c7655110a51cced109fb4d0',
            other_employee_id: '5c7655110a51cced109fb4d9',
            start_date: '2018-11-28',
            end_date: '2019-03-26',
            job_no: 'JOB No.0',
            zac_registered_check: 'true',
            contract_name: '常駐契約内容名',
            client_contract_person: '顧客担当者',
            contract_progress: {
                quotation_confirmation: 'true',
                quotation_issue_date: '2019-03-05',
                order_receipt_date: '2019-03-04',
                order_confirmation_return_date: '2019-03-28'
            },
            employee_contract: {
                individual_contract_issue_date: '2019-03-07',
                individual_contract_confirmation: 'true',
                working_condition_issue_date: '2019-03-24',
                working_condition_checked: 'true',
                transition_condition: 'true',
                unit_price_for_salary: '300000',
                base_performance_rate: 'twenty_eight_percent',
                minus_percent_from_pass_price: '10',
                same_client_start_date: '2019-03-10',
                same_client_percent_from_duration: '5',
                superior_evaluation_adjustment_percent: '5',
                performance_rate: '20',
                salary_amount: '650000',
                short_work_duty: '無し',
                deemed_overtime: '無し',
                commuting_info: {
                    traffic_route: 'JR新大阪駅から徒歩5分',
                    pass_price: '30000',
                    first_month_transit_price: '7000'
                },
                responsible_person_info: {
                    commander: '指揮命令者',
                    manager: '派遣先責任者',
                    complainant: '苦情責任者'
                },
                education_training_date_contents: '参画日初日にプロジェクト説明、セキュリティ講習 (2019/04/01)',
                sale_administration_fee: '販売管理費',
                redemption_ratio: '還元率',
                contract_info: {
                    closing_date: 'twenty_every_month',
                    time_unit: {
                        daily: 'fifteen_minute_unit',
                        monthly: 'fifteen_minute_unit'
                    },
                    payment_date: 'next_month_payment',
                    clearing_form: 'montly_liquidation',
                    month_unit_price_info: {
                        first_month_daily_existence: 'true',
                        month_unit_price: '700000',
                        reference_time: {
                            lower_limit: '120',
                            upper_limit: '180',
                            other: '休日出勤時は基準単価に1.2掛け'
                        },
                        deducation_unit_price: '5830',
                        excess_unit_price: '3500',
                        first_month_daily_calculation_info: {
                            calculation_method: '当社規定に準ずる',
                            unit_price: '4500',
                            reference_time: {
                                lower_limit: '110',
                                upper_limit: '170',
                                other: '1000円未満は切り捨て'
                            }
                        }
                    },
                    special_liquidation_existence: 'true',
                    special_liquidation_detail: '出張時の費用は別途請求'
                }
            },
            zac_project_title: '社員A/PFU略/1811-1903',
            work_place: '〇〇ビル14階',
            commericial_flow: '㈱△△テック 山田様からご紹介',
            working_hours: '9:00-18:00',
            break_time: '12:00-13:00',
            remarks: '勤怠の連絡はFAXで〇〇様宛に送信する',
            entry_card: 'true',
            uniform: 'true',
            other_borrowed_items: 'ノートパソコン1台',
            editor: '更新者',
            item_registration_progress: 'zac_registered',
            project_title: '基幹システム再構築'
        }
    } else if (contractId === '1') {
        return {
            contract_id: '',
            employee_id: '5c7655110a51cced109fb4d3',
            contract_type: 'subcommission_contract',
            constract_progress: {
                quotation_confirmation: 'true'
            },
            contract_info: {
                clearing_form: 'montly_liquidation',
                closing_date: '2019-03-02',
                time_unit: {
                    daily: '時間単位(日々)',
                    monthly: ' 時間単位(月間)'
                },
                month_unit_price_info: {
                    month_unit_price: '400000',
                    reference_time: {
                        lower_limit: '基準時間下限',
                        upper_limit: '基準時間上限',
                        other: '基準時間他'
                    },
                    first_month_daily_calculation_info: {
                        calculation_method: '初月日割り計算方法',
                        reference_time: {
                            lower_limit: '初月日割り下限',
                            upper_limit: '初月日割り上限',
                            other: '初月日割り他'
                        },
                        unit_price: '500000',
                        fixed_billing_expenses: {
                            without_tax: '初月日割り固定請求経費(税抜き)',
                            tax_included: '初月日割り固定請求経費(税込)'
                        }
                    }
                },
                fixed_billing_expenses: {
                    without_tax: '固定請求経費(税抜き)',
                    tax_included: '固定請求経費(税込)'
                },
                fixed_payment_expenses: {
                    tax_included: ' 固定支払い経費(税込)',
                    without_tax: '固定支払い経費(税抜き)'
                }
            },
            partner_id: '2c7655110a51cced109fb4d0',
            other_employee_id: '5c7655110a51cced109fb4d9',
            start_date: '2018-08-01',
            end_date: '2019-04-18',
            job_no: 'JOB No.1',
            zac_registered_check: 'true',
            contract_name: '常駐契約内容名',
            client_contract_person: '鈴木一郎',
            bill_to: '請求書送り先（自由入力）',
            organizational_unit: '組織単位',
            contract_progress: {
                quotation_confirmation: 'true',
                quotation_issue_date: '2019-03-05',
                order_receipt_date: '2019-03-04',
                order_confirmation_return_date: '2019-03-28'
            },
            employee_contract: {
                individual_contract_issue_date: '2019-03-07',
                individual_contract_confirmation: 'true',
                working_condition_issue_date: '2019-03-24',
                working_condition_checked: 'true',
                transition_condition: 'true',
                unit_price_for_salary: '300000',
                base_performance_rate: 'twenty_eight_percent',
                minus_percent_from_pass_price: '10',
                same_client_start_date: '2019-03-10',
                same_client_percent_from_duration: '5',
                superior_evaluation_adjustment_percent: '上長評価調整％',
                performance_rate: '20',
                salary_amount: '650000',
                short_work_duty: '無し',
                deemed_overtime: '無し',
                commuting_info: {
                    traffic_route: 'JR新大阪駅から徒歩5分',
                    pass_price: '30000',
                    first_month_transit_price: '7000'
                },
                responsible_person_info: {
                    commander: '指揮命令者',
                    manager: '派遣先責任者',
                    complainant: '苦情責任者'
                },
                education_training_date_contents: '参画日初日にプロジェクト説明、セキュリティ講習 (2019/04/01)',
                sale_administration_fee: '販売管理費',
                redemption_ratio: '還元率',
                contract_info: {
                    closing_date: 'twenty_every_month',
                    time_unit: {
                        daily: 'fifteen_minute_unit',
                        monthly: 'fifteen_minute_unit'
                    },
                    payment_date: 'next_month_payment',
                    clearing_form: 'montly_liquidation',
                    month_unit_price_info: {
                        first_month_daily_existence: 'true',
                        month_unit_price: '700000',
                        reference_time: {
                            lower_limit: '120',
                            upper_limit: '180',
                            other: '休日出勤時は基準単価に1.2掛け'
                        },
                        deducation_unit_price: '5830',
                        excess_unit_price: '3500',
                        first_month_daily_calculation_info: {
                            calculation_method: '当社規定に準ずる',
                            unit_price: '4500',
                            reference_time: {
                                lower_limit: '110',
                                upper_limit: '170',
                                other: '1000円未満は切り捨て'
                            }
                        }
                    },
                    special_liquidation_existence: 'true',
                    special_liquidation_detail: '出張時の費用は別途請求'
                }
            },
            zac_project_title: 'BP外注さんB/PFU略/1808-1904',
            work_place: '〇✕商事本社ビル3F',
            commericial_flow: '㈱△△ソフト様 経由 住友商事',
            working_hours: '9:30-18:30',
            break_time: '12:00-13:00',
            remarks: '勤務表は△△ソフト山田様に送付',
            entry_card: 'true',
            uniform: 'true',
            other_borrowed_items: '〇〇データセンター入館用セキュリティカード',
            editor: '更新者',
            item_registration_progress: 'zac_registered',
            project_title: '〇✕商事顧客管理システムのデータ移行',
            bp_contract: {
                partner_company_name: '〇〇エンジニアリング㈱',
                payment_contract_person: '山本花子',
                client_contract_info: {
                    closing_date: 'last_day_every_month',
                    time_unit: {
                        daily: 'thirty_minute_unit',
                        monthly: 'thirty_minute_unit'
                    },
                    payment_date: 'last_day_month_after_next_payment',
                    clearing_form: 'time_settlement',
                    hour_unit_price: '5200'
                },
                bp_contract_info: {
                    closing_date: 'fifteen_every_month',
                    time_unit: {
                        daily: 'ten_minute_unit',
                        monthly: 'sixty_minute_unit'
                    },
                    payment_date: 'fifth_buisiness_day_month_after_next_payment',
                    clearing_form: 'montly_liquidation',
                    month_unit_price_info: {
                        first_month_daily_existence: 'true',
                        month_unit_price: '450000',
                        reference_time: {
                            lower_limit: '100',
                            upper_limit: '200',
                            other: '残業は30時間まで'
                        },
                        deducation_unit_price: '4500',
                        excess_unit_price: '2250',
                        first_month_daily_calculation_info: {
                            calculation_method: 'BP人月単価 / 稼働日数 × 出勤日数',
                            unit_price: '4000',
                            reference_time: {
                                lower_limit: '110',
                                upper_limit: '190',
                                other: '稼働が下限以下の場合はBP基準単価に0.8掛け'
                            }
                        }
                    }
                }
            }
        }
    } else if (contractId === '2') {
        return {
            zac_project_title: '社員A/PFU略/1703-1905',
            employee_id: '5c7655110a51cced109fb4d0',
            contract_type: 'temporary_agency_contract',
            other_employee_id: '5c7655110a51cced109fb4d9',
            item_registration_progress: 'individual_contract_returned',
            job_no: 'JOB No.2',
            partner_id: '2c7655110a51cced109fb4d0',
            start_date: '2017-03-13',
            end_date: '2019-05-08',
            employee_contract: {
                contract_info: {
                    closing_date: 'twenty_every_month',
                    time_unit: {
                        daily: 'five_minute_unit',
                        monthly: 'thirty_minute_unit'
                    },
                    payment_date: 'twenty_five_month_after_next_payment',
                    clearing_form: 'montly_liquidation',
                    month_unit_price_info: {
                        first_month_daily_existence: 'true',
                        month_unit_price: '600000',
                        reference_time: {
                            lower_limit: '130',
                            upper_limit: '190',
                            other: 'なし'
                        },
                        deducation_unit_price: '4610',
                        excess_unit_price: '3150',
                        first_month_daily_calculation_info: {
                            calculation_method: '月30日固定、単価÷30×稼働日数',
                            unit_price: '4000',
                            reference_time: {
                                lower_limit: '50',
                                upper_limit: '190',
                                other: '諸費用は別途請求'
                            }
                        }
                    },
                    special_liquidation_existence: 'true',
                    special_liquidation_detail: '交通費名目で月5万追加請求'
                },
                commuting_info: {
                    traffic_route: '御堂筋線本町駅5番出口から徒歩10分',
                    pass_price: '25000',
                    first_month_transit_price: '4000'
                },
                responsible_person_info: {
                    commander: '㈱〇✕商事 システム部 山本様',
                    manager: '同上',
                    complainant: '△△システム㈱ 井上様'
                },
                education_training_date_contents: '参画から1ヵ月は教育期間',
                unit_price_for_salary: '4300',
                transition_condition: 'true',
                deemed_overtime: '30時間',
                superior_evaluation_adjustment_percent: '30',
                performance_rate: '50',
                salary_amount: '650000',
                short_work_duty: 'なし',
                minus_percent_from_pass_price: '5',
                same_client_percent_from_duration: '10',
                same_client_start_date: '2018-02-09',
                base_performance_rate: 'twenty_eight_percent'
            },
            client_contract_person: '田中雄介',
            project_title: 'ショッピングサイト保守開発',
            work_place: '本町〇〇ビル20F',
            commericial_flow: '',
            working_hours: '9:00-18:00',
            break_time: '11:30-12:30',
            entry_card: 'true',
            uniform: 'true',
            editor: '更新者',
            other_borrowed_items: 'スマートフォン 1台',
            remarks: 'スマートフォンの番号 080-1111-2222'
        }
    }

    return {
        contract_id: `${param.contractId}`,
        employee_id: '5c7655110a51cced109fb4d0',
        contract_type: 'subcommission_contract',
        constract_progress: {
            quotation_confirmation: 'true'
        },
        contract_info: {
            clearing_form: 'montly_liquidation',
            closing_date: '2019-03-02',
            time_unit: {
                daily: '時間単位(日々)',
                monthly: ' 時間単位(月間)'
            },
            month_unit_price_info: {
                month_unit_price: '400000',
                reference_time: {
                    lower_limit: '基準時間下限',
                    upper_limit: '基準時間上限',
                    other: '基準時間他'
                },
                first_month_daily_calculation_info: {
                    calculation_method: '初月日割り計算方法',
                    reference_time: {
                        lower_limit: '初月日割り下限',
                        upper_limit: '初月日割り上限',
                        other: '初月日割り他'
                    },
                    unit_price: '500000',
                    fixed_billing_expenses: {
                        without_tax: '初月日割り固定請求経費(税抜き)',
                        tax_included: '初月日割り固定請求経費(税込)'
                    }
                }
            },
            fixed_billing_expenses: {
                without_tax: '固定請求経費(税抜き)',
                tax_included: '固定請求経費(税込)'
            },
            fixed_payment_expenses: {
                tax_included: ' 固定支払い経費(税込)',
                without_tax: '固定支払い経費(税抜き)'
            }
        },
        partner_id: '2c7655110a51cced109fb4d0',
        other_employee_id: '5c7655110a51cced109fb4d9',
        start_date: '2018-11-28',
        end_date: '2019-03-26',
        job_no: `JOB No.${param.contractId}`,
        zac_registered_check: 'true',
        contract_name: '常駐契約内容名',
        client_contract_person: '顧客担当者',
        bill_to: '請求書送り先（自由入力）',
        organizational_unit: '組織単位',
        contract_progress: {
            quotation_confirmation: 'true',
            quotation_issue_date: '2019-03-05',
            order_receipt_date: '2019-03-04',
            order_confirmation_return_date: '2019-03-28'
        },
        employee_contract: {
            individual_contract_issue_date: '2019-03-07',
            individual_contract_confirmation: 'true',
            working_condition_issue_date: '2019-03-24',
            working_condition_checked: 'true',
            transition_condition: 'true',
            unit_price_for_salary: '300000',
            base_performance_rate: 'twenty_eight_percent',
            minus_percent_from_pass_price: '定期代からのマイナス％',
            same_client_start_date: '2019-03-10',
            same_client_percent_from_duration: '同一顧客継続年数からの％',
            superior_evaluation_adjustment_percent: '上長評価調整％',
            performance_rate: '40',
            salary_amount: '280000',
            short_work_duty: '時短勤務',
            deemed_overtime: 'みなし残業',
            commuting_info: {
                traffic_route: '交通ルート',
                pass_price: '30000',
                first_month_transit_price: '7000'
            },
            responsible_person_info: {
                commander: '指揮命令者',
                manager: '派遣先責任者',
                complainant: '苦情責任者'
            },
            education_training_date_contents: '教育訓練実施日・内容',
            sale_administration_fee: '販売管理費',
            redemption_ratio: '還元率',
        },
        zac_project_title: '案件名',
        work_place: '作業場所',
        commericial_flow: '商流など',
        working_hours: '就業時間',
        break_time: '休憩時間',
        remarks: '備考',
        entry_card: 'true',
        uniform: 'true',
        other_borrowed_items: 'その他借り物',
        editor: '更新者'
    }
}

// 
export interface IEmployeeBase {
    id: string
    fullName: string // 氏名
    privatePhoneNumber: string // 個人用携帯電話番号
    age: number,
    employmentStatus: EmploymentStatus // 雇用形態
}
// テーブル一覧表示用
export type IEmployeeSummary = IEmployeeBase

export enum EmploymentStatus {
    Staff = "Staff",
    BpStaff = "BpStaff",
    Freelance = "Freelance",
}

export const EmploymentStatusLabel = {
    Staff: "社員",
    BpStaff: "協力会社社員",
    Freelance: "個人事業主",
}
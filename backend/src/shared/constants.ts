export const validCountries = ['US', 'CANADA', 'UK', 'AUSTRALIA', 'KUWAIT'];
export const institutes = ['FAST', 'NUST', 'LUMS', 'PUCIT'];
export enum TaskStatus {
    Unassigned = 'unassigned',
    InProgress = 'in progress',
    Delivered = 'delivered',
    Cancelled = 'cancelled',
    InRevision = 'in revision',
    OnHold = 'on hold',
}
export enum TaskType {
    Assignment = 'assignment',
    Quiz = 'quiz',
    Exam = 'exam'
}

import { Response } from "src/types/response.type";

export function sendResponse<T>(data: T, message: string, status?: boolean): Response<T> {
    return { status, message, data };
  }
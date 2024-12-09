import { SuccessResponse } from "../utils/utils.type"

export type AuthResponse = SuccessResponse<{
  access_token: string
}>
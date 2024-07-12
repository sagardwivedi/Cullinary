// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"
import type {
  RegisterUserData,
  RegisterUserResponse,
  LoginAccessTokenData,
  LoginAccessTokenResponse,
  ReadUserMeResponse,
} from "./types.gen"

/**
 * Register User
 * Register a new user.
 *
 * Parameters:
 * - session: Database session dependency.
 * - user_in: User input data for registration.
 *
 * Returns:
 * - The newly created user data as `UserPublic`.
 *
 * Raises:
 * - HTTPException: If email or username is already registered.
 * @param data The data for the request.
 * @param data.requestBody
 * @returns UserPublic Successful Response
 * @throws ApiError
 */
export const registerUser = (
  data: RegisterUserData,
): CancelablePromise<RegisterUserResponse> => {
  return __request(OpenAPI, {
    method: "POST",
    url: "/api/v1/auth/register",
    body: data.requestBody,
    mediaType: "application/json",
    errors: {
      422: "Validation Error",
    },
  })
}

/**
 * Login Access Token
 * Login user and return an access token.
 *
 * Parameters:
 * - session: Database session dependency.
 * - form_data: User input data for login.
 *
 * Returns:
 * - Access token for the authenticated user.
 *
 * Raises:
 * - HTTPException: If authentication fails.
 * @param data The data for the request.
 * @param data.formData
 * @returns Token Successful Response
 * @throws ApiError
 */
export const loginAccessToken = (
  data: LoginAccessTokenData,
): CancelablePromise<LoginAccessTokenResponse> => {
  return __request(OpenAPI, {
    method: "POST",
    url: "/api/v1/auth/login/access-token",
    formData: data.formData,
    mediaType: "application/x-www-form-urlencoded",
    errors: {
      422: "Validation Error",
    },
  })
}

/**
 * Read User Me
 * @returns UserPublic Successful Response
 * @throws ApiError
 */
export const readUserMe = (): CancelablePromise<ReadUserMeResponse> => {
  return __request(OpenAPI, {
    method: "GET",
    url: "/api/v1/auth/me",
  })
}
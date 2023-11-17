const domain = process.env.NEXT_PUBLIC_BACKEND_PORT;
export const refreshTokenUrl = `${domain}/api/auth/refresh-token`; //拿新的jwt token
export const loginUrl = `${domain}/api/auth/login`; //登入
export const logoutUrl = `${domain}/api/auth/logout`; //註冊
export const checkAuthUrl = `${domain}/api/auth/check-auth`; //檢查AUTH
export const resetPasswordToken = `${domain}/api/auth/reset-token`; //拿到reset password 的 token
export const resetPassword = `${domain}/api/auth/reset-password`; //更改密碼



export const mapAuthError = (error: string) => {
    switch(error) {
        case 'Invalid credentials':
            return 'Email hoặc mật khẩu không chính xác'
        default:
            return 'Đã có lỗi xảy ra'
    }
}
import { RegisterFormValue } from "@/types/regiterform";
import { isAxiosError } from "axios";

export const passwordRequirements = [
  { label: "Đúng 8 ký tự", error: "Mật khẩu phải có đúng 8 ký tự", check: (value: string) => value.length === 8 },
  { label: "Có chữ hoa (A–Z)", error: "Mật khẩu phải có ít nhất một chữ hoa (A-Z)", check: (value: string) => /[A-Z]/.test(value) },
  { label: "Có chữ thường (a–z)", error: "Mật khẩu phải có ít nhất một chữ thường (a-z)", check: (value: string) => /[a-z]/.test(value) },
  { label: "Có chữ số (0–9)", error: "Mật khẩu phải có ít nhất một chữ số (0-9)", check: (value: string) => /[0-9]/.test(value) },
  { label: "Có ký tự đặc biệt, ví dụ !@#$%", error: "Mật khẩu phải có ít nhất một ký tự đặc biệt, ví dụ !@#$%", check: (value: string) => /[^A-Za-z0-9\s]/.test(value) },
  { label: "Không chỉ chứa khoảng trắng", error: "Mật khẩu không được chỉ chứa khoảng trắng", check: (value: string) => !!value.trim() },
] as const;

export const getPasswordErrors = (password: string): string[] => passwordRequirements
  .filter(requirement => !requirement.check(password))
  .map(requirement => requirement.error);

type RegistrationErrors = Partial<Record<keyof RegisterFormValue | "form", string[]>>;

// API validation messages can be either a string or an array of strings.
export const getRegistrationErrors = (error: unknown): RegistrationErrors => {
  const response = isAxiosError<{ message?: unknown }>(error) ? error.response : undefined;
  if (response?.status === 409) return { email: ["Email đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác."] };

  const message = response?.data?.message;
  const messages = typeof message === "string" ? [message.trim()]
    : Array.isArray(message) ? message.filter((item): item is string => typeof item === "string").map(item => item.trim()) : [];
  const errors: RegistrationErrors = {};
  for (const item of new Set(messages.filter(Boolean))) {
    let field: keyof RegistrationErrors = "form";
    let text = item;
    if (/mật khẩu|password/i.test(item)) field = "password";
    else if (/email/i.test(item)) {
      field = "email";
      if (item.toLowerCase() === "email must be an email") text = "Email chưa đúng định dạng.";
      if (item.toLowerCase() === "email already exists") text = "Email đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.";
    } else if (/\bname\b|họ và tên/i.test(item)) field = "name";
    (errors[field] ??= []).push(text);
  }
  if (!Object.keys(errors).length) {
    errors.form = [!response && isAxiosError(error)
      ? "Không thể kết nối máy chủ. Kiểm tra mạng và thử lại."
      : "Không thể đăng ký. Vui lòng thử lại."];
  }
  return errors;
};

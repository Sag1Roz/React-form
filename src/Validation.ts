import z from "zod";

export const validation = z
  .object({
    firstName: z
      .string()
      .min(2, "צריך  להיות לפחות 2 תווים")
      .max(10, "אסור לעבור את ה10 תווים"),
    lastName: z
      .string()
      .min(2, "צריך  להיות לפחות שני תווים")
      .max(10, "אסור לעבור את ה10 תווים"),
    phone: z
      .string()
      .regex(
        /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/,
        "טלפון לא תקין"
      ),
    email: z.string().email("איימיל לא תקין"),
    password: z
      .string()
      .min(8, "צריך  להיות לפחות 8 תווים")
      .max(16, "אסור לעבור את ה16 תווים"),
    confirmPassword: z
      .string()
      .min(8, "צריך  להיות לפחות 8 תווים")
      .max(16, "אסור לעבור את ה16 תווים"),
  })
  .refine(
    (password) => {
      return password.password === password.confirmPassword;
    },
    {
      message: "הסיסמאות צריכות להיות תואמות",
      path: ["confirmPassword"],
    }
  );

export type Schema = z.infer<typeof validation>;

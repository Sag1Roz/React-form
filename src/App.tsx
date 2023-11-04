import { FormEvent, useState } from "react";
import { validation, Schema } from "./validation.ts";

function App() {
  const [formData] = useState<Schema>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Schema>>({});
  function submitCheck(e: FormEvent) {
    e.preventDefault();
    const response = validation.safeParse(formData);
    if (!response.success) {
      const message = response.error.format();

      setErrors((parsedError) => {
        parsedError = {};

        for (const objectKey in formData) {
          const key = objectKey as keyof Schema;
          parsedError[key] = message[key]?._errors[0];
        }

        return parsedError;
      });
    }
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={submitCheck}
        className=" grid grid-cols-2 gap-5 border p-5 text-lg font-bold"
      >
        <h1 className="text-center text-3xl p-3 col-span-2">צור חשבון חדש</h1>
        <div>
          <label className="block p-1" htmlFor="firstName">
            שם פרטי
          </label>
          <input
            onChange={(e) => (formData.firstName = e.target.value)}
            className="input"
            type="text"
            id="firstName"
          />
          {errors.firstName && (
            <small className="text-red-600 block">{errors.firstName}</small>
          )}
        </div>
        <div>
          <label className="block p-1" htmlFor="lastName">
            שם משפחה
          </label>
          <input
            onChange={(e) => (formData.lastName = e.target.value)}
            className="input"
            type="text"
            id="lastName"
          />
          {errors.lastName && (
            <small className="text-red-600 block">{errors.lastName}</small>
          )}
        </div>
        <div className="col-span-2">
          <label className="block p-1" htmlFor="phone">
            טלפון
          </label>
          <input
            onChange={(e) => (formData.phone = e.target.value)}
            className=" w-full input"
            type="text"
            id="phone"
          />
          {errors.phone && (
            <small className="text-red-600 block">{errors.phone}</small>
          )}
        </div>
        <div className="col-span-2">
          <label className="block p-1" htmlFor="email">
            איימיל
          </label>
          <input
            onChange={(e) => (formData.email = e.target.value)}
            className="input w-full"
            type="text"
            id="email"
          />
          {errors.email && (
            <small className="text-red-600 block">{errors.email}</small>
          )}
        </div>
        <div>
          <label className="block p-1" htmlFor="password">
            סיסמא
          </label>
          <input
            onChange={(e) => (formData.password = e.target.value)}
            className="input"
            type="password"
            id="password"
          />
          {errors.password && (
            <small className="text-red-600 block">{errors.password}</small>
          )}
        </div>
        <div>
          <label className="block p-1" htmlFor="confirmPassword">
            אימות סיסמא
          </label>
          <input
            onChange={(e) => (formData.confirmPassword = e.target.value)}
            className="input"
            type="password"
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <small className="text-red-600 block">
              {errors.confirmPassword}
            </small>
          )}
        </div>
        <button type="submit" className="button">
          שלח
        </button>
      </form>
    </div>
  );
}

export default App;

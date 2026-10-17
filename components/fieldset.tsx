/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import dynamic from "next/dynamic";

const Select = dynamic<any>(() => import("antd").then((mod) => mod.Select), {
  ssr: false,
});
const DatePicker = dynamic<any>(() => import("antd").then((mod) => mod.DatePicker), {
  ssr: false,
});
const TimePicker = dynamic<any>(() => import("antd").then((mod) => mod.TimePicker), {
  ssr: false,
});
import {
  Controller,
  FieldValues,
  FieldPath,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

type SelectMode = "single" | "multiple" | "tags";

interface Option {
  label: string;
  value: string | number;
}

interface CommonFieldsetProps<T extends FieldValues> {
  wrapperClass?: string;
  inputClass?: string;
  labelClass?: string;
  selectClass?: string;
  popupClassName?: string;
  textareaClass?: string;
  innerWrapper?: string;
  label?: string;
  type?:
  | "text"
  | "password"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "date"
  | "datetime"
  | "time";
  placeholder?: string;
  register_as: FieldPath<T>;
  options?: Option[];
  errors?: Record<string, { message?: string }>;
  validationRules?: UseControllerProps<T>["rules"];
  readOnly?: boolean;
  /** Optional default value – must match the field type */
  defaultValue?: PathValue<T, FieldPath<T>> | undefined;
  control: UseControllerProps<T>["control"];
  selectMode?: SelectMode;
  icon?: React.ReactNode;
  disabled?: boolean;
  isRequired?: boolean;
  is_required?: boolean;
  min?: string;
  max?: string;
}

const CommonFieldset = <T extends FieldValues>({
  wrapperClass,
  inputClass,
  labelClass,
  selectClass,
  popupClassName,
  textareaClass,
  innerWrapper,
  label = "",
  type = "text",
  placeholder = "",
  register_as,
  options = [],
  errors = {},
  validationRules = {},
  readOnly = false,
  defaultValue,
  control,
  selectMode = "single",
  icon,
  disabled = false,
  isRequired = false,
  is_required = false,
  min,
  max,
}: CommonFieldsetProps<T>) => {
  const [show, setShow] = useState(false);
  const errorMessage = errors[register_as]?.message;
  const requiredField = isRequired || is_required || !!validationRules?.required;

  const normalizeValue = (val: any): any => {
    if (selectMode === "multiple" || selectMode === "tags") {
      if (Array.isArray(val)) {
        return val.map((i) => (typeof i === "object" ? i.value : i));
      }
      return val ? [typeof val === "object" ? val.value : val] : [];
    }
    return typeof val === "object" ? val?.value : val;
  };

  const disableDate = (current: dayjs.Dayjs | null) => {
    if (!current) return false;
    const parse = (v?: string) =>
      v && dayjs(v, ["MM/DD/YYYY", "YYYY-MM-DD"], true).isValid()
        ? dayjs(v, ["MM/DD/YYYY", "YYYY-MM-DD"], true)
        : null;
    const minDate = parse(min);
    const maxDate = parse(max);
    return !!(minDate && current.isBefore(minDate, "day")) || !!(maxDate && current.isAfter(maxDate, "day"));
  };

  return (
    <div
      className={cn(
        "w-full min-w-0 max-w-full flex flex-col gap-1 justify-start text-base text-black border-none",
        wrapperClass
      )}
    >
      {label && (
        <label
          htmlFor={register_as}
          className={cn("font-black uppercase text-xs tracking-tight text-black mb-0.5", labelClass)}
        >
          {label}
          {requiredField && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={cn(
          "w-full min-w-0 max-w-full flex items-center gap-2.5 px-3 py-2 bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] transition-all duration-150",
          errorMessage
            ? "border-red-600 shadow-[2px_2px_0px_#dc2626]"
            : "focus-within:border-black",
          innerWrapper
        )}
      >
        {icon && <div className="shrink-0 w-fit text-zinc-600">{icon}</div>}

        {/* TEXTAREA */}
        {type === "textarea" ? (
          <Controller
            control={control}
            name={register_as}
            rules={validationRules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <textarea
                {...field}
                value={field.value ?? ""}
                id={register_as}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={label}
                className={cn(
                  "w-full border-none capitalize outline-none resize-none 2xs:min-h-48 min-h-32 placeholder:text-gray-300 placeholder:text-sm bg-transparent",
                  textareaClass
                )}
              />
            )}
          />
        ) : type === "select" ? (
          /* SELECT */
          <div className={cn("w-full flex-1 min-w-0 common-select", selectClass)}>
            <Controller
              control={control}
              name={register_as}
              rules={validationRules}
              defaultValue={defaultValue} // Let caller or useForm set correct default
              render={({ field }) => (
                <Select
                  {...field}
                  variant="borderless"
                  mode={selectMode !== "single" ? selectMode : undefined}
                  placeholder={placeholder}
                  options={options}
                  optionFilterProp="label"
                  disabled={disabled}
                  showSearch
                  allowClear
                  classNames={{
                    popup: {
                      root: cn("common-select-dropdown", popupClassName),
                    },
                  }}
                  className="w-full min-w-0 bg-transparent border-none! shadow-none! capitalize outline-none! p-0!"
                  style={{ width: "100%", maxWidth: "100%", boxShadow: "none" }}
                  value={
                    field.value === undefined ||
                      field.value === null ||
                      field.value === "" ||
                      (Array.isArray(field.value) && field.value.length === 0)
                      ? undefined
                      : normalizeValue(field.value)
                  }
                  onChange={(val: any, option: any) => {
                    if (selectMode !== "single") {
                      field.onChange(val ?? []);
                    } else {
                      const v = Array.isArray(option) ? option[0]?.value : option?.value ?? val;
                      field.onChange(v ?? undefined);
                    }
                  }}
                />
              )}
            />
          </div>
        ) : type === "date" || type === "datetime" ? (
          /* DATE & DATETIME */
          <div className={cn("w-full flex-1 min-w-0 common-datepicker", selectClass)}>
            <Controller
              control={control}
              name={register_as}
              rules={validationRules}
              defaultValue={defaultValue}
              render={({ field }) => {
                const dateFormat =
                  type === "datetime" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
                return (
                  <DatePicker
                    {...field}
                    variant="borderless"
                    className="w-full p-0! bg-transparent border-none! shadow-none! outline-none!"
                    placeholder={
                      placeholder ||
                      (type === "datetime"
                        ? "Select date and time"
                        : "Select date")
                    }
                    disabled={disabled}
                    format={dateFormat}
                    showTime={type === "datetime" ? { format: "HH:mm" } : false}
                    disabledDate={disableDate}
                    value={
                      field.value ? dayjs(field.value, dateFormat) : null
                    }
                    onChange={(date: any) =>
                      field.onChange(
                        date ? date.format(dateFormat) : null
                      )
                    }
                  />
                );
              }}
            />
          </div>
        ) : type === "time" ? (
          /* TIME */
          <div className={cn("w-full flex-1 min-w-0 common-datepicker", selectClass)}>
            <Controller
              control={control}
              name={register_as}
              rules={validationRules}
              defaultValue={defaultValue}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  variant="borderless"
                  className="w-full p-0! bg-transparent border-none! shadow-none! outline-none!"
                  placeholder={placeholder || "Select time"}
                  disabled={disabled}
                  format="HH:mm"
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                  onChange={(time: any) =>
                    field.onChange(time ? time.format("HH:mm") : null)
                  }
                />
              )}
            />
          </div>
        ) : (
          /* DEFAULT INPUT */
          <Controller
            control={control}
            name={register_as}
            rules={validationRules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ?? ""}
                type={type === "password" ? (show ? "text" : "password") : type}
                id={register_as}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                aria-label={label}
                className={cn(
                  "w-full border-none font-bold text-sm text-black placeholder:text-zinc-400 placeholder:font-medium outline-none bg-transparent",
                  inputClass
                )}
              />
            )}
          />
        )}

        {/* PASSWORD TOGGLE */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="cursor-pointer text-zinc-600 hover:text-black transition-colors"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FaEye className="text-base" /> : <FaEyeSlash className="text-base" />}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-xs font-bold text-red-600 mt-0.5">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export { CommonFieldset, CommonFieldset as Input };
export default CommonFieldset;
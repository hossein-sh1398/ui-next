"use client";
import { resendTokenAction } from "@/actions/auth";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ResendToken({
  validity_period_in_seconds,
  mobile,
}: {
  validity_period_in_seconds: number;
  mobile: number;
}) {
  const [state, formAction] = useFormState<any, any>(resendTokenAction, {});
  let [minutes, setMinutes] = useState<number>(0);
  let [second, setSecond] = useState<number>(validity_period_in_seconds);
  useEffect(() => {
    if (state?.error) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success(state.message);
      setSecond(validity_period_in_seconds);
      setMinutes(0);
    }
  }, [state]);

  useEffect(() => {
    let clear_interval = setInterval(() => {
      if (second == 0 && minutes == 0) clearInterval(clear_interval);

      if (second > 0) {
        setSecond(second - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSecond(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(clear_interval);
    };
  }, [second]);
  return (
    <div>
      {second > 0 || minutes > 0 ? (
        <div
          style={{ width: 50 }}
          className="flex badge align-items-center bg-black"
        >
          <span>{minutes}:</span>
          <span>{second}</span>
        </div>
      ) : (
        <form action={formAction}>
          <input type="hidden" name="mobile" defaultValue={mobile} />
          <SubmitButton
            title="ارسال مجدد"
            style="bg-primary text-white btn-sm"
          />
        </form>
      )}
    </div>
  );
}

export default ResendToken;

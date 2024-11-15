"use client";
import SubmitButton from "../../components/SubmitButton";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { verifyRequest } from "@/actions/auth";
function VerifyRequestForm({
  set_validity_period_in_seconds,
  setIsPeriodForm,
  setMobile,
  setUser,
}: {
  set_validity_period_in_seconds: (n: number) => void;
  setIsPeriodForm: (v: number) => void;
  setMobile: (m: number) => void;
  setUser: any;
}) {
  const [verifyRequestState, verifyRequestAction] = useFormState<any, any>(
    verifyRequest,
    {}
  );

  useEffect(() => {
    if (verifyRequestState?.error) {
      toast.error(verifyRequestState.message);
    }

    if (verifyRequestState?.success) {
      toast.success(verifyRequestState.message);

      setIsPeriodForm(2);

      set_validity_period_in_seconds(
        verifyRequestState.data.validity_period_in_seconds
      );
      setMobile(verifyRequestState.data.user.mobile);
      setUser(verifyRequestState.data.user);
    }
  }, [verifyRequestState]);

  return (
    <form action={verifyRequestAction}>
      <div className="mb-3">
        <label className="form-label">شماره موبایل</label>
        <input name="mobile" type="text" className="form-control" />
      </div>
      <SubmitButton title="ارسال" style="btn-success btn-sm" />
    </form>
  );
}

export default VerifyRequestForm;

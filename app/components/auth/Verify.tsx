"use client";
import SubmitButton from "../../components/SubmitButton";
import { checkToken } from "@/actions/auth";
import React, { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import ResendToken from "./ResendToken";
function Verify({
  validity_period_in_seconds,
  mobile,
}: {
  validity_period_in_seconds: number;
  mobile: number;
}) {
  const { setLoginUser } = useContext(UserContext);

  const router = useRouter();
  const [checkTokenState, checkTokenAction] = useFormState<any, any>(
    checkToken,
    {}
  );
  useEffect(() => {
    if (checkTokenState?.error) {
      toast.error(checkTokenState.message);
    }
    if (checkTokenState?.success) {
      toast.success(checkTokenState.message);
      setLoginUser(checkTokenState.user.user);
      router.push("/profile");
    }
  }, [checkTokenState]);
  return (
    <>
      <form action={checkTokenAction}>
        <div className="mb-3">
          <label className="form-label">کد ورود</label>
          <input name="otp_code" type="text" className="form-control" />
        </div>
        <input type="hidden" name="mobile" defaultValue={mobile} />
        <div className="d-flex justify-content-between">
          <SubmitButton title="تایید" style="btn-success btn-sm" />
        </div>
      </form>
      <p></p>
      <ResendToken
        mobile={mobile}
        validity_period_in_seconds={validity_period_in_seconds}
      />
    </>
  );
}

export default Verify;

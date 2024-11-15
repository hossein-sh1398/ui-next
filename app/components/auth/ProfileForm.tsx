"use client";
import SubmitButton from "../SubmitButton";
import { updateProfile } from "@/actions/auth";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

function ProfileForm({
  user,
  setIsPeriodForm,
}: {
  user: any;
  setIsPeriodForm: any;
}) {
  const [updateProfileState, updateProfileAction] = useFormState<any, any>(
    updateProfile,
    {}
  );
  useEffect(() => {
    if (user.first_name && user.last_name) {
      setIsPeriodForm(3);
    }
    if (updateProfileState?.error) {
      toast.error(updateProfileState.message);
    }
    if (updateProfileState?.success) {
      setIsPeriodForm(3);
    }
  }, [updateProfileState]);
  return (
    <>
      <form action={updateProfileAction}>
        <div className="mb-3">
          <label className="form-label">نام</label>
          <input
            name="first_name"
            type="text"
            defaultValue={user?.first_name}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">نام خانوادگی</label>
          <input
            name="last_name"
            type="text"
            defaultValue={user?.last_name}
            className="form-control"
          />
        </div>
        <input type="hidden" name="mobile" defaultValue={user?.mobile} />
        <div className="d-flex justify-content-between">
          <SubmitButton title="ویرایش" style="btn-warning btn-sm" />
        </div>
      </form>
    </>
  );
}

export default ProfileForm;

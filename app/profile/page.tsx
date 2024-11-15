"use client";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

function page() {
  const { user } = useContext(UserContext);
  return (
    <div className="vh-70 mt-5">
      <div className="card">
        <div className="card-header">
          <div className="card-title">پروفایل کاربری من</div>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">نام</label>
              <input
                type="text"
                className="form-control"
                disabled={true}
                defaultValue={user.first_name}
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">نام خانوادگی</label>
              <input
                type="text"
                className="form-control"
                disabled={true}
                defaultValue={user.last_name}
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره موبایل</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                defaultValue={user.mobile}
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">تاریخ آخرین ورود</label>
              <input
                defaultValue={user.at_login_last}
                type="text"
                disabled={true}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

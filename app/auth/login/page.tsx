"use client";

import ProfileForm from "@/app/components/auth/ProfileForm";
import VerifyRequestForm from "../../components/auth/Login";
import Verify from "../../components/auth/Verify";
import { useState } from "react";
type User = { id: 0; first_name: string; last_name: string };
function Login() {
  const [isPeriodForm, setIsPeriodForm] = useState(1);
  const [mobile, setMobile] = useState(0);
  const [user, setUser] = useState<User>();
  const [validity_period_in_seconds, set_validity_period_in_seconds] =
    useState(0);
  return (
    <section className="">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="card-body">
                <div className="form_container">
                  {isPeriodForm == 1 && (
                    <VerifyRequestForm
                      set_validity_period_in_seconds={
                        set_validity_period_in_seconds
                      }
                      setMobile={setMobile}
                      setUser={setUser}
                      setIsPeriodForm={setIsPeriodForm}
                    />
                  )}

                  {isPeriodForm == 2 && (
                    <ProfileForm
                      setIsPeriodForm={setIsPeriodForm}
                      user={user}
                    />
                  )}

                  {isPeriodForm == 3 && (
                    <Verify
                      mobile={mobile}
                      validity_period_in_seconds={validity_period_in_seconds}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

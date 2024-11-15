"use server"

import { api } from "@/api/axios";
import { handleErrors } from "@/utils/helpers";
import { cookies } from "next/headers";

async function verifyRequest(state:any, formData:any) {
    const mobile = formData.get('mobile') as string;

    if (mobile.trim().length === 0) {
        return {
            error:true,
            message:'شماره موبایل الزمامیست'
        }
    }

    const pattern = /^9\d{9}$/;
    if (!pattern.test(mobile)) {
        return {
            error:true,
            message:'فرمت شماره موبایل اشتبا است'
        }
    }

    try {
        const response = await api.post("verify-request", {mobile});

        if (response.data.status === 'success') {
            return {
                data:response.data.data,
                success:true,
                message:'رمز پویا ارسال شد',
            }
        } else {
            return {
                error:true,
                message:'مشکلی پیش آمده، لطفا مجدد تلاش نمایید'
            }
        }
    } catch(e:any) {
        if (e.response.status == 422) {
            return {
                error:true,
                message:handleErrors(e.response.data.message.error)
            }
        }
        return {
            error: true,
            message: 'another errors'
        }
    }
}
async function updateProfile(state:any, formData:any) {
    const mobile = formData.get('mobile') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;

    if (mobile.trim().length === 0) {
        return {
            error:true,
            message:'شماره موبایل الزمامیست'
        }
    }

    if (first_name.trim().length === 0 || last_name.trim().length === 0) {
        return {
            error:true,
            message:'پرکردن تمامی فیلدها الزامیست'
        }
    }

    const pattern = /^9\d{9}$/;
    if (!pattern.test(mobile)) {
        return {
            error:true,
            message:'فرمت شماره موبایل اشتبا است'
        }
    }

    try {
        const response = await api.patch("update", {mobile, first_name, last_name});
        if (response.data.status === 'success') {
            return {
                success:true,
            }
        } else {
            return {
                error:true,
                message:'مشکلی پیش آمده، لطفا مجدد تلاش نمایید'
            }
        }
    } catch(e:any) {

            return {
                error:true,
                message:handleErrors(e.response.data.errors)
            }
        
    }
}

async function checkToken(state:any, formData:any) {
    let otp_code = formData.get('otp_code') as string;
    let mobile = formData.get('mobile') as string;

    if (otp_code.trim().length === 0) {
        return {
            error:true,
            message:'کد تایید الزمامیست'
        }
    }
    
    const pattern = /^[0-9]{4}$/;
    if (!pattern.test(otp_code)) {
        return {
            error:true,
            message:'فرمت کد تایید اشتبا است'
        }
    }
    try {

        const response = await api.post('verify', {
            mobile,otp_code
        });
        cookies().set({
            name:'api_token',
            value:response.data.data.api_token,
            httpOnly:true,
        })
        return {
            success:true,
            user:response.data.data,
            message:'ورود انجام شد',
        }
        
    } catch(e:any) {
        if (e.response.status == 422) {
            return {
                error:true,
                message:handleErrors(e.response.data.errors)
            }
        }
        return {
            error: true,
            message: 'another errors'
        }
    }
}
async function getUserAction() {
    let token = cookies().get('api_token');
 
    if (!token || !token.value) {
        return {
            error:true,
            message:'احراز هویت نمیباشید'
        }
    }
    const options = {
        headers:{
            Authorization: 'Bearer ' + token.value,
        }
    }
    try {
        const response = await api.get("profile", options);
        return {
            success:true,
            user:response.data.data,
        }
        
    } catch(e:any) {
        if (e.response.status == 401) {
            return {
                error: true,
                message: 'توکن نامعتبر میباشد'
            }
        }
    }
}

export async function resendTokenAction(state:any, formData:any) {
     const mobile = formData.get('mobile') as string;

    if (mobile.trim().length === 0) {
        return {
            error:true,
            message:'شماره موبایل الزمامیست'
        }
    }
    try {
        const response = await api.post('resend', {mobile});
         return {
                data:response.data.data,
                success:true,
                message:'رمز پویا ارسال شد',
            }
    } catch(e:any) {
        return {
            error: true,
            message: 'another errors'
        }
    }
}

async function logout() {
    let token = cookies().get('api_token');
 
    if (!token || !token.value) {
        return {
            error:true,
            message:'احراز هویت نمیباشید'
        }
    }
    
    const options = {
        headers:{
            Authorization: 'Bearer ' + token.value,
        }
    }
  try {
      const response = await api.get('logout', options)
    if (response.data.status === 'success') {
		cookies().delete('api_token')
        return {
            status:'success',
        }
    }
  } catch(e:any) {
	return {
		status:'error',
		message:handleErrors(e.response.data.message)
	}
  }
}


export {verifyRequest,logout, checkToken,getUserAction, updateProfile}
package com.trainningreact.myfunction

import android.provider.Settings.Secure
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.lang.Exception


class DeviceModule(var context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "DeviceModule";
    }

    @ReactMethod
    fun getDeviceId(successCallback: Callback, errorCallBack: Callback) {
        try {
            var mAndroidid = Secure.getString(context.contentResolver, Secure.ANDROID_ID)
            successCallback.invoke(mAndroidid)
        } catch (e: Exception) {
            errorCallBack(e.message)
        }
    }
}
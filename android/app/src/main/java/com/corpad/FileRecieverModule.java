package com.corpad;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;


//it actually does nothing at this point, but i'm proud i managed to make it work so I leave it here. it fires events to JS on Resume

public class FileRecieverModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

   private ReactContext mReactContext;

   FileRecieverModule(ReactApplicationContext reactContext) {
      super(reactContext);
      mReactContext = reactContext;
      reactContext.addLifecycleEventListener(this);
   }

   @Override
   public void onHostResume() {
      WritableMap params = Arguments.createMap();
      params.putString("uri", "someValue");
      sendEvent(mReactContext, "fileIntent", params);
   }

   @Override
   public void onHostPause() {
   }

   @Override
   public void onHostDestroy() {
   }

   private void sendEvent(ReactContext reactContext,
         String eventName,
         WritableMap params) {
      reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
   }

   @Override
   public String getName() {
      return "FileRecieverModule";
   }

   @ReactMethod
   public void addListener(String eventName) {
   }

   @ReactMethod
   public void removeListeners(Integer count) {
   }

}
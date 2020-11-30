<template>
  <div>
    <component
      v-if="
        currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''
      "
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <div class="w-4/5 mx-auto mb-10 sm:mb-1">
      <select
        v-if="deviceObject.length > 0 && noCameraRef"
        v-model="selectedDevice"
        class="w-full"
      >
        <option
          v-for="item in deviceObject"
          :key="item.deviceId"
          :value="item.deviceId"
        >
          {{ item.label }}
        </option>
      </select>
      <button
        v-else
        @click="callFile"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        :disabled="btnDisable"
      >
        Qrcode File
      </button>
    </div>
    <video
      :class="{ hidden: isType !== 'video' }"
      class="w-1/2 mx-auto h-full"
      ref="video"
    ></video>
    <img
      :class="{ hidden: isType !== 'image' }"
      class="h-1/2 mx-auto"
      ref="imgRef"
    />
    <input
      ref="fileRef"
      class="hidden"
      type="file"
      @change="callReader"
      accept="image/*;capture=camera"
    />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from "vue";

import Login from "@/api/Login.js";
import Verification from "@/api/Verification.js";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import router from "@/router";
import config from "@/api/request/config.js";
import navTag from "@/api/global/navTag.js";

import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";

export default {
  name: "scanQrcodeMain",
  components: {
    alert,
    alertmobile,
  },
  setup() {
    const LoginModule = Login();
    const verificationModule = Verification();
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }
    if (!LoginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }

    const video = ref(null);
    const imgRef = ref(null);
    const fileRef = ref(null);
    const deviceObject = ref([]);
    const selectedDevice = ref("");
    const oResult = ref("");
    const noCameraRef = ref(true);
    const isType = ref("video");
    const btnDisable = ref(false);
    const triggerDisable = ref(false);

    // ====================================================================

    navTag.value = "scanQrcode";
    const scanRole = LoginModule.userData.role;

    let codeReader = new BrowserQRCodeReader();

    codeReader.getVideoInputDevices().then((videoInputDevices) => {
      const videoData = [...videoInputDevices];
      deviceObject.value = videoData;
      if (videoData.length > 0) {
        selectedDevice.value = videoData[0].deviceId;
      }
    });

    const decodeCamera = (mainCodeReader, deviceId, videoElement) => {
      mainCodeReader
        .decodeFromInputVideoDeviceContinuously(
          deviceId,
          videoElement,
          async (result, err) => {
            try {
              if (err) {
                if (err instanceof NotFoundException) {
                  return;
                }

                if (err instanceof ChecksumException) {
                  throw "A code was found, but it's read value was not valid.";
                }

                if (err instanceof FormatException) {
                  throw "A code was found, but it was in a invalid format.";
                }
              }

              if (!result || result.text === "") {
                throw "Qrcode is empty";
              }

              if (triggerDisable.value) {
                return;
              }
              triggerDisable.value = true;

              verificationModule.verifyCredentialId.value = result.text;
              let apiResult = null;
              if (scanRole === 1) {
                apiResult = await verificationModule.userScanQrcode();
              }
              if (scanRole === 2) {
                apiResult = await verificationModule.sendVerify();
              }
              if (!apiResult) {
                throw "no role error";
              }

              if (!apiResult.success) {
                verificationModule.normalVerifyAlert({
                  title: apiResult.msg,
                  status: "fail",
                });
                decodeCamera(codeReader, selectedDevice.value, video.value);
                throw "request fail";
              }

              switch (scanRole) {
                case 1:
                  verificationModule.normalVerifyAlert({
                    title: "send success",
                    status: "ok",
                  });
                  break;
                case 2:
                  router.push("/verifyreport");
                  break;
                default:
                  break;
              }
              triggerDisable.value = false;
            } catch (error) {
              triggerDisable.value = false;
              console.error(error);
            }
          }
        )
        .catch((err) => {
          console.error(err);
          if (err && err.name === "NotAllowedError") {
            noCameraRef.value = false;
          }
        });
    };

    const callFile = () => {
      fileRef.value.click();
    };

    const callReader = (event) => {
      btnDisable.value = true;
      const files = event.target.files;
      if (files.length === 0) {
        return;
      }

      const type = files[0].type;
      if (type.indexOf("image/") > -1) {
        isType.value = "image";
        fileReaderToImage(files[0])
          .then(
            (img) =>
              new Promise((resolve, reject) => {
                if (typeof img !== "undefined" && img !== "") {
                  imgRef.value.src = img;
                  resolve(imgRef.value);
                } else {
                  reject("image error");
                }
              })
          )
          .then((element) => {
            return codeReader.decodeFromImage(element);
          })
          .then((result) => {
            if (!result || !result.text || result.text === "") {
              fileRef.value.value = null;
              return new Promise((resolve, reject) => {
                reject("qrcodeObject and qrcodeObject.text is empty");
              });
            }

            verificationModule.verifyCredentialId.value = result.text;

            if (scanRole === 1) {
              return verificationModule.userScanQrcode();
            }
            if (scanRole === 2) {
              return verificationModule.sendVerify();
            }
          })
          .then((apiData) => {
            fileRef.value.value = null;
            btnDisable.value = false;
            if (!apiData.success) {
              codeReader = new BrowserQRCodeReader();
              verificationModule.normalVerifyAlert({
                title: apiData.msg,
                status: "fail",
              });
              return;
            }
            switch (scanRole) {
              case 1:
                codeReader = new BrowserQRCodeReader();
                verificationModule.normalVerifyAlert({
                  title: "send success",
                  status: "ok",
                });
                break;
              case 2:
                router.push("/verifyreport");
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            codeReader = new BrowserQRCodeReader();
            fileRef.value.value = null;
            btnDisable.value = false;
            console.error(err);
          });
      }

      if (type.indexOf("video/") > -1) {
        isType.value = "video";
        fileReaderToVideo(files[0])
          .then((video) => codeReader.decodeFromVideo(video))
          .then((qrcodeObject) => {
            if (!qrcodeObject || qrcodeObject.text === "") {
              return new Promise((resolve, reject) => {
                reject("qrcodeObject and qrcodeObject.text is empty");
              });
            }
            verificationModule.verifyCredentialId.value = qrcodeObject.text;
            if (scanRole === 1) {
              return verificationModule.userScanQrcode();
            }
            if (scanRole === 2) {
              return verificationModule.sendVerify();
            }
            return new Promise((resolve, reject) => {
              reject("no role error");
            });
          })
          .then((apiData) => {
            btnDisable.value = false;
            if (!apiData.success) {
              codeReader = new BrowserQRCodeReader();
              verificationModule.normalVerifyAlert({
                title: apiData.msg,
                status: "fail",
              });
              return;
            }
            switch (scanRole) {
              case 1:
                codeReader = new BrowserQRCodeReader();
                verificationModule.normalVerifyAlert({
                  title: "send success",
                  status: "ok",
                });
                break;
              case 2:
                router.push("/verifyreport");
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            codeReader = new BrowserQRCodeReader();
            btnDisable.value = false;
            console.error(err);
          });
      }
    };
    // imgRef
    const fileReaderToVideo = (file) =>
      new Promise((resove, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event) => {
          const buffer = event.target.result;
          const videoBlob = new Blob([new Uint8Array(buffer)], {
            type: "video/mp4",
          });
          const url = window.URL.createObjectURL(videoBlob);
          video.value.src = url;
          resove(video.value);
        };
        reader.onerror = () => {
          reject("fileReader error");
        };
      });

    const fileReaderToImage = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("onload fail");
      });

    watch(selectedDevice, (val, old) => {
      if (old !== "") {
        codeReader.reset();
        decodeCamera(codeReader, selectedDevice.value, video.value);
      }
    });

    onMounted(() => {
      decodeCamera(codeReader, selectedDevice.value, video.value);
    });

    onUnmounted(() => {
      codeReader.reset();
    });

    return {
      ...verificationModule,
      alertComponent,
      video,
      imgRef,
      fileRef,
      deviceObject,
      selectedDevice,
      oResult,
      callFile,
      callReader,
      noCameraRef,
      isType,
      btnDisable,
    };
  },
};
</script>

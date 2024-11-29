// // public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyAyCuK_ZfSfNV18WF3-xzNI4VoiwndH7yo",
    authDomain: "dkproduct-5c801.firebaseapp.com",
    projectId: "dkproduct-5c801",
    storageBucket: "dkproduct-5c801.appspot.com",
    messagingSenderId: "536200045611",
    appId: "1:536200045611:web:f6d4375fc7b727f3caf66e",
    measurementId: "G-0180JXGLR2",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background Message:", payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// self.addEventListener("message", (event) => {
//     if (event.data === "get-firebase-token") {
//         const generateAndPostToken = async () => {
//             try {
//                 const firebaseToken = await messaging.getToken();

//                 const firebaseTokenTransferChannel = new BroadcastChannel("firebaseTokenTransferChannel");

//                 firebaseTokenTransferChannel.postMessage({ firebaseToken: firebaseToken });
//             } catch (error) {
//                 console.error("Error obtaining token:", error);
//             }
//         };

//         generateAndPostToken();
//     }
// });

// messaging.onBackgroundMessage(function (payload) {
//     const channel = new BroadcastChannel("notification_channel_name");

//     channel.postMessage(payload);

//     const notificationTitle = payload.data.title;

//     const notificationOptions = {
//         body: payload.data.body,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

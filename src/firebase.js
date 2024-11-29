import { initializeApp } from "@firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAyCuK_ZfSfNV18WF3-xzNI4VoiwndH7yo",
    authDomain: "dkproduct-5c801.firebaseapp.com",
    projectId: "dkproduct-5c801",
    storageBucket: "dkproduct-5c801.appspot.com",
    messagingSenderId: "536200045611",
    appId: "1:536200045611:web:f6d4375fc7b727f3caf66e",
    measurementId: "G-0180JXGLR2",
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

const setupNotifications = async () => {
    try {
        // Request permission for notifications
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            console.log("Notification permission granted.");
            const token = await getToken(messaging);
            localStorage.setItem("firebaseToken", token);
            console.log("FCM Token:", token);
        } else {
            console.log("Notification permission denied.");
        }
        // Handle foreground notifications
        onMessage(messaging, (payload) => {
            console.log("Foreground Message:", payload);
            // Handle the notification or update your UI
            if (payload.data) {
                const { title, body } = payload.data;

                console.log(`title ==>`, title);

                new Notification(title, {
                    body: body,
                });
            }
        });
    } catch (error) {
        console.error("Error setting up notifications:", error);
        setupNotifications();
    }
};
export { messaging, setupNotifications };

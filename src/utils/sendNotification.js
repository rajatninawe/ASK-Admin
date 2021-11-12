import axios from "axios";
import { serverKey } from "../environments/environment";

let instance = axios.create({
  baseURL: "https://fcm.googleapis.com/fcm/send",
});

let key = serverKey;

export function sendNotification(title, description, zipcode) {
  return onSend(title, description, zipcode);
}

function onSend(title, description, zipcode) {
  return instance.post(
    ``,
    {
      notification: {
        title: title,
        body: description,
      },
      to: `/topics/${zipcode}`,
    },
    {
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json",
      },
    }
  );
}

import { message, notification } from "antd";


export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50
    }
  });
};

export const displayErrorMessage = (error: string) => {
  return message.error(error);
};


export const displaySuccessMessage = (success: string) => {
  return message.success(success);
};
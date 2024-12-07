import http from "../../interceptor/index";

export const updateUserApi = async (
  id,
  fName,
  lName,
  userName,
  gmail,
  phoneNumber,
  active,
  isDelete,
  isTecher,
  isStudent,
  recoveryEmail,
  twoStepAuth,
  userAbout,
  currentPictureAddress,
  linkdinProfile,
  telegramLink,
  receiveMessageEvent,
  homeAdderess,
  nationalCode,
  gender,
  latitude,
  longitude,
  insertDate,
  birthDay
) => {
  try {
    const response = await http.put(`/User/UpdateUser/${id}`, {
      fName,
      lName,
      userName,
      gmail,
      phoneNumber,
      active,
      isDelete,
      isTecher,
      isStudent,
      recoveryEmail,
      twoStepAuth,
      userAbout,
      currentPictureAddress,
      linkdinProfile,
      telegramLink,
      receiveMessageEvent,
      homeAdderess,
      nationalCode,
      gender,
      latitude,
      longitude,
      insertDate,
      birthDay
    });

    console.log("Sent Data: ", {
      fName,
      lName,
      userName,
      gmail,
      phoneNumber,
      active,
      isDelete,
      isTecher,
      isStudent,
      recoveryEmail,
      twoStepAuth,
      userAbout,
      currentPictureAddress,
      linkdinProfile,
      telegramLink,
      receiveMessageEvent,
      homeAdderess,
      nationalCode,
      gender,
      latitude,
      longitude,
      insertDate,
      birthDay
    });

    return response;
  } catch (error) {
    console.log(error, "error");
  }
};

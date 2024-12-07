import http from "../../interceptor/index"

export const getaddCardApi = async (
  firstName,
  lastName,
  password,
  gmail,
  phoneNumber,
  isTeacher,
  isStudent,
  command,
)=> {
  try {
    const response = await http.post("/User/CreateUser", {
      firstName,
      lastName,
      password,
      gmail,
      phoneNumber,
      isTeacher,
      isStudent,
      command
    });
    console.log("Sent Data: ", {
      firstName,
      lastName,
      password,
      gmail,
      phoneNumber,
      isTeacher,
      isStudent,
      command,
    });
    return response;
  } catch (error) {
      console.log(error, "error")
  }
}
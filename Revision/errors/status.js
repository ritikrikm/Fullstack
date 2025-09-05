const statuses = (message, statuscode, extras) => {
  let codeMessage = "";
  let codeerror = true;
  if (statuscode === 200) {
    codeMessage = "OK";
    codeerror = false;
  } else if (statuscode === 201) {
    codeMessage = "Created";
  } else if (statuscode === 400) {
    codeMessage = "Bad Request";
  } else if (statuscode === 401) {
    codeMessage = "Unauthorized";
  } else if (statuscode === 403) {
    codeMessage = "Forbidden";
  } else if (statuscode === 422) {
    codeMessage = "Unprocessable Entity";
  } else if (statuscode === 500) {
    codeMessage = "Internal Server Error";
  }

  return {
    message,
    codeMessage,
    statuscode,
    error: codeerror,
    extras,
  };
};
export default statuses;

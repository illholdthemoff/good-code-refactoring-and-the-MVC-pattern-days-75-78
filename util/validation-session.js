function getSessionErrorData(req, defaultValues) {
  // checks if there is an error within our session
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValues,
    };
  }

  req.session.inputData = null;

  return sessionInputData;
}

function flashErrorsToSession(req, data, action) {
  // 'flashes' the current info when the user makes a fuckup but doesnt actually really save it
  req.session.inputData = {
    hasError: true,
    ...data, // spread operator, takes all the key:value pairs from the initial object and adds them to this object ie from 'data' and into req.session.inputData
  };

  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
};

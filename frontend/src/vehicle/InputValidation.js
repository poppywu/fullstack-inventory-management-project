function validatePayload(payload) {
    let valid = true;
    let msg = "";
    const currentYear = new Date().getFullYear();
    if (payload.modelYear > currentYear + 1) {
        valid = false;
        msg = `Model year must be <= ${currentYear + 1}`;
    }
    return {valid: valid, msg: msg};
}

export default validatePayload;


function OptionVerifier(req, field1, field2, field3) {

    if(req.sessionModel.get(field1) === "yes"){
        return "yes";
    }
        let allAnswers = [];
        allAnswers.push(req.sessionModel.get(field1), req.sessionModel.get(field2), req.sessionModel.get(field3));
        let isAnswerNo = (currentValue) => currentValue === "no";
        let threeNo = allAnswers.every(isAnswerNo);
        if (threeNo) {
            return "allNo";
        }
        return  "skip";;
};
module.exports = {
    OptionVerifier
};


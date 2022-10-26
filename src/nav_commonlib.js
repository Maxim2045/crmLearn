var Navicon = Navicon || {};

 Navicon.yearsDiff =  function (d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let result = timeDiff / (1000 * 3600 * 24 * 365) 
    return result;
};

Navicon.customAlert = function (alertText, alertTitle){
    let alertStrings = { confirmButtonLabel: "ОК", text: alertText, title: alertTitle };
            let alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                function (success) {
                    console.log("Alert dialog closed");
                },
                function (error) {
                    console.log(error.message);
                }
            );
};

Navicon.removeLetters = function(stringS)
{
   // return stringS.replace(/^\D+|[^\d-]+|-(?=\D+)|\D+$/gim , '');
   return stringS.replace(/[^-0-9]/gi , '');
   
};

/*var Navicon = (
    function(){

    var yearsDiffPrivate = function (d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let result = timeDiff / (1000 * 3600 * 24 * 365) 
        return result;
    };

    var customAlertPrivate = function (alertText, alertTitle){
        let alertStrings = { confirmButtonLabel: "ОК", text: alertText, title: alertTitle };
                let alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                    function (success) {
                        console.log("Alert dialog closed");
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
    };
    var removeLettersPrivate = function (stringS)
    {
       // return stringS.replace(/^\D+|[^\d-]+|-(?=\D+)|\D+$/gim , '');
       return stringS.replace(/[^-0-9]/gi , '');
    };


    return
    {
        yearsDiff: yearsDiffPrivate,
        customAlert: customAlertPrivate,
        removeLetters: removeLettersPrivate
    };
})();*/
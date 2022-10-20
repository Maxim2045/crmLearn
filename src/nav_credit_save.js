var Navicon = Navicon || {};

Navicon.nav_credit_save = (function()
{
    function yearsDiff(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let result = timeDiff / (1000 * 3600 * 24 * 365) //понимаю, что с високосными годами будут неверные расчеты. пока ничего лучше не придумал
        return result;
    }
    
    function datesValidate (dateStartAttr, dateEndAttr)
    {
    
        if(dateStartAttr.getValue() && dateEndAttr.getValue())
        {
            let yearsDiffResult = yearsDiff(dateStartAttr.getValue(), dateEndAttr.getValue());
            if(yearsDiffResult < 1)
            {
                let alertStrings = { confirmButtonLabel: "Yes", text: "Срок кредита не может быть меньше года", title: "Ошибка" };
                let alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                    function (success) {
                        console.log("Alert dialog closed");
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
                return false;
            }
            else
            {
                return true;
            }
        }
    
    }
    return{
        onSave: function(context)
        {
           debugger;
           let formContext = context.getFormContext();
           let dateStartAttr = formContext.getAttribute("nav_datestart");
           let dateEndAttr = formContext.getAttribute("nav_dateend");

           let validateResult =  datesValidate(dateStartAttr, dateEndAttr);

            if(validateResult == false)
            {
                context.getEventArgs().preventDefault();
            }
            else
            {
                alert("yes");
            }
        }
    }
})();
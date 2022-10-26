var Navicon = Navicon || {};

Navicon.nav_agreemet = (function()
{
    var validSave = true;
    const formTypeCreate = 1;

    function customAlert (alertText, alertTitle){
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
    }

    var infoForCreditOnChange = function(context)
    {
        let formContext = context.getFormContext();

        let autoAttr = formContext.getAttribute("nav_autoid");
        let contactAttr = formContext.getAttribute("nav_contact");

        if(autoAttr.getValue() != null && autoAttr.getValue() != undefined && contactAttr.getValue() != null && contactAttr.getValue() != undefined)
        {
            formContext.ui.tabs.get("tab_credit").setVisible(true);
            formContext.getControl("nav_creditid").setVisible(true);

            let creditAttr = formContext.getAttribute("nav_creditid");
            creditAttr.addOnChange(сreditProgramOnChange);
            creditAttr.fireOnChange();
           // formContext.data.entity.addOnSave(сreditProgramOnChange);
        }
        else
        {
            let formType = formContext.ui.getFormType();

            if(formType != formTypeCreate)
            {
                if(autoAttr.getValue() == null)
                {
                    customAlert("Для оформления договора необходимо указать автомобиль", "Предупреждение");
                }
                if( contactAttr.getValue() == null)
                {
                    customAlert("Для оформления договора необходимо указать контакт", "Предупреждение");
                }
            }

            formContext.ui.tabs.get("tab_credit").setVisible(false);
            formContext.getControl("nav_creditid").setVisible(false);
        }

    }


    var сreditProgramOnChange = function(context)
    {
        let formContext = context.getFormContext();

        let creditAttr = formContext.getAttribute("nav_creditid");

        if(creditAttr.getValue() != null && creditAttr.getValue() != undefined)
        {
            formContext.getControl("nav_summa").setVisible(true);
            formContext.getControl("nav_fact").setVisible(true);
            formContext.ui.tabs.get("tab_credit").setVisible(true);

            let creditArray =  creditAttr.getValue();
            let creditRef = creditArray[0];

            var promiseCredit = Xrm.WebApi.retrieveRecord("nav_credit", creditRef.id, "?$select=nav_datestart,nav_dateend,nav_creditperiod");
            promiseCredit.then(
                function(creditResult){
                    let agreementDateAttr = formContext.getAttribute("nav_date");
                    if(agreementDateAttr.getValue() != null && agreementDateAttr.getValue() != undefined
                        && creditResult.nav_datestart != null && creditResult.nav_datestart != undefined
                        && creditResult.nav_dateend != null && creditResult.nav_dateend != undefined)
                        {
                            let agreementDate = new Date(agreementDateAttr.getValue());
                            let creditDateStart = new Date(creditResult.nav_datestart);
                            let creditDateEnd = new Date(creditResult.nav_dateend);
                            if(agreementDate.getTime() >= creditDateStart.getTime() && agreementDate.getTime() <= creditDateEnd.getTime())
                            {
                                //customAlert("Дата договора в рамках сроков кредитной программы", "Успех");
                                let creditperiodAttr = formContext.getAttribute("nav_creditperiod");
                                if(creditperiodAttr != null && creditperiodAttr != undefined)
                                {
                                    creditperiodAttr.setValue(creditResult.nav_creditperiod);
                                }
                                
                                validSave = true;
                                
                            }
                            else
                            {
                                let creditperiodAttr = formContext.getAttribute("nav_creditperiod");
                                if(creditperiodAttr != null && creditperiodAttr != undefined)
                                {
                                    creditperiodAttr.setValue(0);
                                }
                                customAlert("Дата договора не входит в сроки кредитной программы", "Ошибка");
                                validSave = false;
                            }
                        }
                },
                function(error)
                {
                    console.error(error.message);
                }
            )
        }
        else
        {
            formContext.getControl("nav_summa").setVisible(false);
            formContext.getControl("nav_fact").setVisible(false);
            formContext.ui.tabs.get("tab_credit").setVisible(false);
        }
    }
    var saveValidate = function(context)
    {
       if(validSave === false)
       {
            customAlert("Дата договора не входит в сроки кредитной программы. Измените дату договора или кредитную программу", "Ошибка");
            context.getEventArgs().preventDefault();
       }
    }

    removeLetters = function(stringS)
    {
   // return stringS.replace(/^\D+|[^\d-]+|-(?=\D+)|\D+$/gim , '');
        return stringS.replace(/[^-0-9]/gi , '');  
    }

    var agreementNumberOnChange = function(context)
    {
        let formContext = context.getFormContext();
        let nameAttr = formContext.getAttribute("nav_name");
        if(nameAttr.getValue() != null && nameAttr.getValue() != undefined)
        {
            nameAttr.setValue(`${removeLetters(nameAttr.getValue())}`);          
        }

    }

    var autoOnChange = function(context)
    {
        let formContext = context.getFormContext();
        let autoAttr = formContext.getAttribute("nav_autoid");
        if(autoAttr.getValue() != null && autoAttr.getValue() != undefined)
        {
            let autoArray =  autoAttr.getValue();
            let autoRef = autoArray[0];

            var promiseAuto = Xrm.WebApi.retrieveRecord("nav_auto", autoRef.id, "?$select=nav_used,nav_amount&$expand=nav_modelid($select=nav_recommendedamount)");
            promiseAuto.then(
                function(autoResult){;
                    if(autoResult.nav_used === true)
                    {
                        let summaAttr = formContext.getAttribute("nav_summa");
                        if(summaAttr != null && summaAttr != undefined)
                        {
                            formContext.getControl("nav_summa").setVisible(true);
                            summaAttr.setValue(autoResult.nav_amount);
                        }
                    }
                    else if(autoResult.nav_used === false && autoResult.nav_modelid != null && autoResult.nav_modelid != undefined)
                    {
                        let sumModel = autoResult.nav_modelid.nav_recommendedamount;
                      
                        let summaAttr = formContext.getAttribute("nav_summa");
                        if(summaAttr != null && summaAttr != undefined)
                        {
                             formContext.getControl("nav_summa").setVisible(true);
                             summaAttr.setValue(sumModel);
                        }
                  
                    }
                },
                function(error)
                {
                    console.error(error.message);
            });
        }
    }


     return{
         onLoad: function(context)
         {
            debugger;
            let formContext = context.getFormContext();
            formContext.getControl("nav_summa").setVisible(false);
            formContext.getControl("nav_fact").setVisible(false);
            formContext.getControl("nav_creditid").setVisible(false);
            formContext.ui.tabs.get("tab_credit").setVisible(false);

            let autoAttr = formContext.getAttribute("nav_autoid");
            let contactAttr = formContext.getAttribute("nav_contact");

            autoAttr.addOnChange(infoForCreditOnChange);
            autoAttr.fireOnChange();
            autoAttr.addOnChange(autoOnChange);
            contactAttr.addOnChange(infoForCreditOnChange);
            //contactAttr.fireOnChange();

            let nameAttr = formContext.getAttribute("nav_name");  //условно считает что это номер договора
            nameAttr.addOnChange(agreementNumberOnChange);
            
            let agreementDateAttr = formContext.getAttribute("nav_date");
            agreementDateAttr.addOnChange(сreditProgramOnChange);
            formContext.data.entity.addOnSave(saveValidate);

           // let k = 0;
         }
     }
})();


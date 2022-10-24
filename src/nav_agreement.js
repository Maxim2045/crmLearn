var Navicon = Navicon || {};

Navicon.nav_agreemet = (function()
{
    const formTypeCreate = 1;

    var infoForCreditOnChange = function(context)
    {
        let formContext = context.getFormContext();

        let autoAttr = formContext.getAttribute("nav_autoid");
        let contactAttr = formContext.getAttribute("nav_contact");

        if(autoAttr.getValue() != null && contactAttr.getValue() != null)
        {
            formContext.ui.tabs.get("tab_credit").setVisible(true);
            formContext.getControl("nav_creditid").setVisible(true);

            let creditAttr = formContext.getAttribute("nav_creditid");
            creditAttr.addOnChange(сreditProgramOnChange);
            creditAttr.fireOnChange();
        }
        else
        {
            let formType = formContext.ui.getFormType();

            if(formType != formTypeCreate)
            {
                if(autoAttr.getValue() == null)
                {
                    let alertStrings = { confirmButtonLabel: "ОК", text: "Для оформления договора необходимо указать автомобиль", title: "Предупреждение" };
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
                if( contactAttr.getValue() == null)
                {
                    let alertStrings = { confirmButtonLabel: "ОК", text: "Для оформления договора необходимо указать контакт", title: "Предупреждение" };
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
            }

            formContext.ui.tabs.get("tab_credit").setVisible(false);
            formContext.getControl("nav_creditid").setVisible(false);
        }

    }
    var сreditProgramOnChange = function(context)
    {
        let formContext = context.getFormContext();

        let creditAttr = formContext.getAttribute("nav_creditid");

        if(creditAttr.getValue() != null)
        {
            formContext.getControl("nav_summa").setVisible(true);
            formContext.getControl("nav_fact").setVisible(true);
            formContext.ui.tabs.get("tab_credit").setVisible(true);
        }
        else
        {
            formContext.getControl("nav_summa").setVisible(false);
            formContext.getControl("nav_fact").setVisible(false);
            formContext.ui.tabs.get("tab_credit").setVisible(false);
        }

    }

    var removeLetters = function(stringS)
    {
       // return stringS.replace(/^\D+|[^\d-]+|-(?=\D+)|\D+$/gim , '');
       return stringS.replace(/[^-0-9]/gi , '');
       
    }

    var agreementNumberOnChange = function(context)
    {
        let formContext = context.getFormContext();
        let nameAttr = formContext.getAttribute("nav_name");
        if(nameAttr.getValue() != null)
        {
            nameAttr.setValue(`${removeLetters(nameAttr.getValue())}`);          
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
            contactAttr.addOnChange(infoForCreditOnChange);
            contactAttr.fireOnChange();

            let nameAttr = formContext.getAttribute("nav_name");  //условно считает что это номер договора
            nameAttr.addOnChange(agreementNumberOnChange);
         }
     }
})();


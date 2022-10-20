var Navicon = Navicon || {};

Navicon.nav_agreemet = (function()
{
    var infoForCreditOnChange = function(context)
    {
        let formContext = context.getFormContext();

        let autoAttr = formContext.getAttribute("nav_autoid");
        let contactAttr = formContext.getAttribute("nav_contact");

        if(autoAttr.getValue() != null && contactAttr.getValue())
        {
            formContext.ui.tabs.get("tab_credit").setVisible(true);
            formContext.getControl("nav_creditid").setVisible(true);

            let creditAttr = formContext.getAttribute("nav_creditid");
            creditAttr.addOnChange(сreditProgramOnChange);
        }
        else
        {
            formContext.ui.tabs.get("tab_credit").setVisible(false);
            formContext.getControl("nav_creditid").setVisible(false);
            alert("no");
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
        }
        else
        {
            formContext.getControl("nav_summa").setVisible(false);
            formContext.getControl("nav_fact").setVisible(false);
            alert("no credit");
        }

    }


     return{
         onLoad: function(context)
         {
            //debugger;
            let formContext = context.getFormContext();
            let formType = formContext.ui.getFormType();

            if(formType == 1) //не рекомендуется сравнивать с значениями, лучше ввести константы
            {


            }
            //let floorAttr = formContext.getAttribute("nav_floors");

           // floorAttr.setRequiredLevel("required");


           // floorAttr.setValue(100);
            
           //floorAttr.fireOnChange();

           // floorAttr.addOnChange(floorOnChange);

           // let floorAllControls = formContext.getAttribute("nav_floors").controls;
            
            //formContext.getControl("nav_floors").setDisabled(true);

            //let developerId =  formContext.getAttribute("nav_developerid").getValue();

            //console.log(developerId);
            formContext.getControl("nav_summa").setVisible(false);
            formContext.getControl("nav_fact").setVisible(false);
            formContext.getControl("nav_creditid").setVisible(false);
            formContext.ui.tabs.get("tab_credit").setVisible(false);


            let autoAttr = formContext.getAttribute("nav_autoid");
            let contactAttr = formContext.getAttribute("nav_contact");

            autoAttr.addOnChange(infoForCreditOnChange);
            contactAttr.addOnChange(infoForCreditOnChange);
         }
     }
})();


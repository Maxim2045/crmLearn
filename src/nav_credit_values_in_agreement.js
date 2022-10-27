var Navicon = Navicon || {};

Navicon.nav_credit_values_in_agreement = (function()
{
    
     return{
         Calculate: function(context)
         {
            
            //let formContext = Xrm.Page;
            //Xrm.Utility.getGlobalContext 
            let formContext = context.getFormContext();
            //firstpart          
            let summaAttr = formContext.getAttribute("nav_summa");
            let initialfeeValue = 0;
            if(summaAttr != undefined && summaAttr.getValue() != null && summaAttr.getValue() != undefined)
            {
                let initialfeeAttr = formContext.getAttribute("nav_initialfee");
                if(initialfeeAttr != undefined && initialfeeAttr.getValue() != null && initialfeeAttr.getValue() != undefined)
                {
                    initialfeeValue = initialfeeAttr.getValue();
                }
            }

            let creditamountAttr = formContext.getAttribute("nav_creditamount");
            if(creditamountAttr != undefined)
            {
                creditamountAttr.setValue(summaAttr.getValue() - initialfeeValue);
            }


            ///secondpart

            let creditProgramAttr = formContext.getAttribute("nav_creditid");
            if(creditProgramAttr != undefined && creditProgramAttr.getValue() != null && creditProgramAttr.getValue() != undefined)
            {
                let creditProgramArray =  autoAttr.getValue();
                let creditProgramRef = creditProgramArray[0];
                var promiseCreditProgram = Xrm.WebApi.retrieveRecord("nav_agreement", creditProgramRef.id, "?$expand=nav_creditid($select=nav_percent)");
                promiseCreditProgram.then(
                function(creditProgramResult){

                    let fullamountAttr = formContext.getAttribute("nav_fullcreditamount");
                    let creditperiodAttr = formContext.getAttribute("nav_creditperiod");
                    let creditamountAttr = formContext.getAttribute("nav_creditperiod");

                    if(creditProgramResult.nav_creditid.nav_percent != undefined && creditProgramResult.nav_creditid.nav_percent != null
                        && fullamountAttr != undefined && creditperiodAttr != undefined && creditamountAttr != undefined)
                    {
                        if(creditperiodAttr.getValue() != null && creditamountAttr.getValue() != null)
                        {
                            let calculatedfullamount = (creditProgramResult.nav_creditid.nav_percent / 100) * creditperiodAttr.getValue() * creditamountAttr.getValue() 
                            + creditamountAttr.getValue();

                            fullamountAttr.setValue(calculatedfullamount);
                        }
                        else
                        {
                            alert("Не достаточно данных");
                        }
                    }
                    else
                    {
                        alert("Не хватает данных");
                    }
                },
                function(error)
                {
                    console.error(error.message);
                });
                    
            }
        }
    }
}
)();
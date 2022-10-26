var Navicon = Navicon || {};


Navicon.nav_auto = (function()
{     
            
    var usedOnChange = function(context)
    {
        debugger;
        let formContext = context.getFormContext();
        let usedAttr = formContext.getAttribute("nav_used");
        if(usedAttr.getValue() != null && usedAttr.getValue() != undefined)
        {
            if(usedAttr.getValue() === true)
            {
                formContext.getControl("nav_km").setVisible(true);
                formContext.getControl("nav_isdamaged").setVisible(true);
                formContext.getControl("nav_ownerscount").setVisible(true);
            }
            else
            {
                formContext.getControl("nav_km").setVisible(false);
                formContext.getControl("nav_isdamaged").setVisible(false);
                formContext.getControl("nav_ownerscount").setVisible(false);
            }
        }
     
    } 

    filterModels = function () {


        let brandAttr = Xrm.Page.getAttribute("nav_brandid");
        let brandArray =  brandAttr.getValue();
        let brandRef = brandArray[0];

        var modelsFilter = "<filter type='and'><condition attribute='nav_brandid' operator='eq' value='"+brandRef.id+"'/></filter>";
        Xrm.Page.getControl("nav_modelid").addCustomFilter(modelsFilter, "nav_model");


    }
     return{
         onLoad: function(context)
         {
            let formContext = context.getFormContext();
            let usedAttr = formContext.getAttribute("nav_used");

            //usedAttr.fireOnChange();
            usedAttr.addOnChange(usedOnChange);
            usedAttr.fireOnChange();
            
            formContext.getControl("nav_modelid").addPreSearch(filterModels);
         }
     }
})();
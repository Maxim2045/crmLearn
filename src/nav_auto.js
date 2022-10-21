var Navicon = Navicon || {};


Navicon.nav_auto = (function()
{     
            
    var usedOnChange = function(context)
    {
        debugger;
        let formContext = context.getFormContext();
        let usedAttr = formContext.getAttribute("nav_used");
        if(usedAttr.getValue() != null)
        {
            if(usedAttr.getValue() == true)
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
     return{
         onLoad: function(context)
         {
            let formContext = context.getFormContext();
            let usedAttr = formContext.getAttribute("nav_used");

           // usedAttr.fireOnChange();
            usedAttr.addOnChange(usedOnChange);
            usedAttr.fireOnChange();

         }
     }
})();
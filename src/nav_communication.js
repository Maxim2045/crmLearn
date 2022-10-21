var Navicon = Navicon || {};


Navicon.nav_communication = (function()
{     
     
    const phoneType = 808630000;
    const mailType = 808630001;

    var typeOnChange = function(context)
    {
        debugger;
        let formContext = context.getFormContext();
        let typeAttr = formContext.getAttribute("nav_type");
        if(typeAttr.getValue() != null)
        {
            if(typeAttr.getValue() == phoneType)
            {
                formContext.getControl("nav_phone").setVisible(true);
                formContext.getControl("nav_email").setVisible(false);
            }
            else if (typeAttr.getValue() == mailType)
            {
                formContext.getControl("nav_phone").setVisible(false);
                formContext.getControl("nav_email").setVisible(true);
            }
        }
        else
        {
            formContext.getControl("nav_phone").setVisible(false);
            formContext.getControl("nav_email").setVisible(false);
        }
     
    } 
     return{
         onLoad: function(context)
         {
            let formContext = context.getFormContext();
            let typeAttr = formContext.getAttribute("nav_type");

           typeAttr.addOnChange(typeOnChange);
           typeAttr.fireOnChange();

         }
     }
})();
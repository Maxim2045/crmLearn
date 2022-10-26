var Navicon = Navicon || {};

Navicon.nav_model = (function()
{
    const formTypeCreate = 1;

  

    function CheckUserSARole() {
        let currentUserId = Xrm.Page.context.getUserId();
        let currentUserRoles = getCurrentUserRoles(currentUserId);
        var isSystem = false;
        for (let role of currentUserRoles) {
            if(role === "System Administrator");
            {
                isSystem = true;
            }
          }
        return isSystem;
    }
    
    // Get Roles of User only
    function getCurrentUserRoles(currentUserId){
        var userId = currentUserId.slice(1, -1);
        var req = new XMLHttpRequest();
        var nameRoles = [];
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/systemuserrolescollection?$select=roleid&$filter=systemuserid eq "+userId+"", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    for (var i = 0; i < results.value.length; i++) {
                        var userRoleId = results.value[i].roleid;
                        var userRoleName = GetRoleName(userRoleId);
                        nameRoles.push(userRoleName);
                    }
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();
        return nameRoles;
    }
    
    //Get Rolename based on RoleId
    function GetRoleName(roleId) {
        var req = new XMLHttpRequest();
        var roleName;
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/roles("+roleId+")?$select=name", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function() {
        if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.response);
                    roleName = result["name"];               
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();
        return roleName;
    }
     return{
         onLoad: function(context)
         {
            debugger;
            let formContext = context.getFormContext();
            let isSystemAdministrator = CheckUserSARole();

            if(isSystemAdministrator != true)
            {
                let formType = formContext.ui.getFormType();

                if(formType != formTypeCreate)
                {
                    let formControls = formContext.ui.controls;

                    formControls.forEach(control => {
                        if (control.getName() != "" && control.getName() != null)
                        {
                            control.setDisabled(true);
                        }});
                }
            }
            else
            {
                alert("У учетки есть роль системного администратора");
            }

           // let k = 0;
         }
     }
})();


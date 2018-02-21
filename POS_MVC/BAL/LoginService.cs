using POS_MVC.BAL;
using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class LoginService
    {
        DBService<UserInfo> service = new DBService<UserInfo>();
        ricemillEntities entity = new ricemillEntities();
        public List<Screen> GetMenuPermission(int roleid)
        {
            var entryPoint = (from ep in entity.Screens
                              join e in entity.RoleWiseScreenPermissions on ep.ScreenId equals e.ScreenId
                              where e.RoleId == roleid.ToString()
                              select ep);
            return entryPoint.ToList();
        }

        public List<UserInfo> GetAll()
        {
            return service.GetAll();
        }
        public UserInfo GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public UserInfo Save(UserInfo cus)
        {
            return service.Save(cus);

        }
        public UserInfo Update(UserInfo t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}
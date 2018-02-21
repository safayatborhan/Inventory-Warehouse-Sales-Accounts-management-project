using POS_MVC.BAL;
using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POS_MVC.Controllers
{
    public class LoginController : Controller
    {
        LoginService service = new LoginService();
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(UserInfo user)
        {
            var msg = service.GetAll().Where(a => a.UserName == user.UserName && a.UserPassword == user.UserPassword).FirstOrDefault();

            if (msg!=null)
            {
                CreateSession(user.UserName);
                return RedirectToAction("index", "homepage");
            }
            else
            {
                Session["Session"] = null;
                ModelState.AddModelError("Not found","Not Found!!");
                return View("index");
            }
           // return Json(msg, JsonRequestBehavior.AllowGet);

        }
        
       
        private void CreateSession(string userName)
        {
            var data = service.GetAll().Where(a=>a.UserName==userName).FirstOrDefault();
            AppSession appSession = new AppSession();
            if (data != null)
            {
                appSession.UserId = data.Id;
                appSession.UserName = data.UserName;
                appSession.UserRoleId = data.UserRoleId;
                appSession.UserStatus = data.UserStatus;
                appSession.BranchId = data.BranchId;
              //  appSession.UserTenancyName = data.UserTenancyInfo.TenancyName;
              //  appSession.UserTenancyAddress = data.UserTenancyInfo.TenancyAddress;

                Session["Session"] = appSession;
            }
            else
            {
                Session["Session"] = null;
            }

        }

        public ActionResult LogOut()
        {
            Session.RemoveAll();
            return RedirectToAction("Index", "Login");
        }
    }
}
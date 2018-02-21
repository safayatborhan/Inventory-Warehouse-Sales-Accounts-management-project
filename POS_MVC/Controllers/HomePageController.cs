using POS_MVC.BAL;
using POS_MVC.Util;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POS_MVC.Controllers
{
    public class HomePageController : Controller
    {
        SalesService salesService = new SalesService();
        InventoryService invService = new InventoryService();
        public ActionResult Index()
        {
            LoginService service = new LoginService();
            var currentUser=CurrentSession.GetCurrentSession();
            if (currentUser!=null)
            {
                List<MenuPermission> list = new List<MenuPermission>();
                var ListOfPermittedMenu= service.GetMenuPermission(currentUser.UserRoleId);
                var maninMenu = ListOfPermittedMenu.Where(a => a.ParentScreenId == "0000").ToList();

                foreach (var item in maninMenu)                 {
                    var menu = new MenuPermission();
                    menu.MainModule = item;
                    var submodule = ListOfPermittedMenu.Where(a => a.ParentScreenId == item.ScreenId).ToList();
                    menu.SubModules = submodule;
                    list.Add(menu);
                }
                Session["MenuPermission"] = list;
                return View();
            }
            else
            {
                return RedirectToAction("Index","Login");
            }

        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult GetStatistices()
        {
            var statistices = new HomePageStatistices();
            statistices.TotalInventory = invService.GetAll().Sum(a => a.BalanceQty);
            statistices.TopSell = salesService.GetTopSell();
            return Json(statistices, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
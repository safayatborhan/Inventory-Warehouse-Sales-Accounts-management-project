using POS_MVC.BAL;
using POS_MVC.Models;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using POS_MVC.Util;
using System.Net;

namespace POS_MVC.Controllers
{
    public class WareHouseController : Controller
    {
        private WareHouseService db = new WareHouseService();

        public ActionResult Index()
        {
            return View(new WareHouse());
        }
        public ActionResult GetAll()
        {
            List<WareHouse> oWareHouse = db.GetAll();
            if (oWareHouse == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<WareHouse>, List<WareHouseResponse>>(oWareHouse);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }
            WareHouse oWareHouse = db.GetById(id);
            if (oWareHouse == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<WareHouse, WareHouseResponse>(oWareHouse);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // GET: /Category/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Category/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create(WareHouse oWareHouse, int create)
        {
            var result = oWareHouse;
            if (ModelState.IsValid)
            {
                oWareHouse.CreatedDate = DateTime.Now;
                oWareHouse.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                oWareHouse.IsActive = true;
                result = db.Save(oWareHouse);                
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Edit(WareHouse model)
        {
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WareHouse wareHouse = db.GetById(model.Id);
            if (wareHouse == null)
            {
                return HttpNotFound();
            }
            model.IsActive = true;
            db.Update(model, model.Id);
            return Json("Updated", JsonRequestBehavior.AllowGet);
            //return View();
        }


        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WareHouse wareHouse = db.GetById(id);
            if (wareHouse == null)
            {
                return HttpNotFound();
            }
            wareHouse.IsActive = false;
            db.Update(wareHouse, id ?? 0);
            //int delete = db.Delete(id ?? 0);
            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }
    }
}
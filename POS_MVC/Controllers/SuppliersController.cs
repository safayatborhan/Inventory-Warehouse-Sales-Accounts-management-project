using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using POS_MVC.Models;
using POS_MVC.BAL;
using POS_MVC.ViewModel;
using POS_MVC.Util;

namespace POS_MVC.Controllers
{
    public class SuppliersController : Controller
    {
        private SupplierService db = new SupplierService();

        public ActionResult Index()
        {
            return View(new Supplier());
        }
        public ActionResult GetAll()
        {
            List<Supplier> oSupplier = db.GetAll();
            if (oSupplier == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Supplier>, List<SupplierResponse>>(oSupplier);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }
            Supplier oSupplier = db.GetById(id);
            if (oSupplier == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<Supplier, SupplierResponse>(oSupplier);

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
        public ActionResult Create(Supplier supplier, int create)
        {
            var result = supplier;
            if (ModelState.IsValid)
            {
                supplier.CreationDate = DateTime.Now;
                supplier.UpdateDate = DateTime.Now;
                supplier.Creator = CurrentSession.GetCurrentSession().UserName;
                supplier.IsActive = true;
                result = db.Save(supplier);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Edit(Supplier model)
        {
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Supplier supplier = db.GetById(model.Id);
            if (supplier == null)
            {
                return HttpNotFound();
            }
            model.IsActive = true;
            model.UpdateDate = DateTime.Now;
            model.UpdateBy = CurrentSession.GetCurrentSession().UserName;
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
            Supplier supplier = db.GetById(id);
            if (supplier == null)
            {
                return HttpNotFound();
            }
            supplier.IsActive = false;
            db.Update(supplier, id ?? 0);
            //int delete = db.Delete(id ?? 0);
            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }


    }
}

using POS_MVC.BAL;
using POS_MVC.Models;
using POS_MVC.Util;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace POS_MVC.Controllers
{
    public class ProductController : Controller
    {
        private ProductService db = new ProductService();

        // GET: /Category/
        public ActionResult Index()
        {
            return View(new Product());
        }
        // GET: /Category/Details/5
        public ActionResult GetAll(int type=0)
        {
            List<Product> products = db.GetAll(type);
            if (products == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Product>, List<ProductResponse>>(products);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.GetById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<Product, ProductResponse>(product);
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
        public ActionResult Create(Product category, int create)
        {
            var result = category;
            if (ModelState.IsValid)
            {
                category.CreatedDate = DateTime.Now;
                category.UpdateDate = DateTime.Now;
                category.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                category.IsActive = true;
                result = db.Save(category);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // GET: /Category/Edit/5
        [HttpPost]
        public ActionResult Edit(Product model)
        {
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.GetById(model.Id);
            if (product == null)
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

        // GET: /Category/Delete/5
        
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.GetById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            product.IsActive = false;
            db.Update(product, id ?? 0);
            //int delete = db.Delete(id ?? 0);
            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }
    }
}
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
using Newtonsoft.Json;
using POS_MVC.ViewModel;
using POS_MVC.Util;

namespace POS_MVC.Controllers
{
    public class CategoryController : Controller
    {
        private CategoryService db = new CategoryService();
        // GET: /Category/
        public ActionResult Index()
        {
            return View(new Category());
        }
        // GET: /Category/Details/5
        public ActionResult GetAll()
        {
            List<Category> category = db.GetAll();
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Category>, List<CategoryResponse>>(category);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Category category = db.GetById(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<Category, CategoryResponse>(category);
            return Json(result,JsonRequestBehavior.AllowGet);
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
        public ActionResult Create(Category category, int create)
        {
            var result = category;
            if (ModelState.IsValid)
            {
                category.CreatedDate = DateTime.Now;
                category.UpdateDate = DateTime.Now.ToString();
                category.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                category.IsActive = true;
                result = db.Save(category);        
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // GET: /Category/Edit/5
        [HttpPost]
        public ActionResult Edit(Category model)
        {
            if (model== null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Category category = db.GetById(model.Id);
            if (category == null)
            {
                return HttpNotFound();
            }
            model.IsActive = true;
            model.UpdateDate = DateTime.Now.ToString();
            model.UpdatedBy=CurrentSession.GetCurrentSession().UserName;
            db.Update(model, model.Id);
            return Json("Updated", JsonRequestBehavior.AllowGet);
        }

        // GET: /Category/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Category category = db.GetById(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            category.IsActive = false;
            db.Update(category, id??0);
            return Json("Deleted",JsonRequestBehavior.AllowGet);

        }
        
    }
}

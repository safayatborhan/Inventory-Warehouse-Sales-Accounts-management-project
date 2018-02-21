using POS_MVC.BAL;
using POS_MVC.Models;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace POS_MVC.Controllers
{
    public class BrandController : Controller
    {
        // GET: Brand
        BrandService service = new BrandService();

        public ActionResult Index()
        {
            return View(new Brand());
        }
        // GET: /Category/Details/5
        public ActionResult GetAll()
        {
            List<Brand> category = service.GetAll();
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Brand>, List<BrandResponse>>(category);
            return Json(category, JsonRequestBehavior.AllowGet);
        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Brand category = service.GetById(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<Brand, BrandResponse>(category);

            return View(category);
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
        public ActionResult Create(Brand category, int create)
        {
            var result = 0;
            if (ModelState.IsValid)
            {
                service.Save(category);
                return RedirectToAction("Index");
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }


    }
}
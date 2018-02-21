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
using POS_MVC.Util;
using POS_MVC.ViewModel;

namespace POS_MVC.Controllers
{
    public class CustomerController : Controller
    {
        private CustomerService db = new CustomerService();
        private AccountLedgerService dbAccountLedgerService = new AccountLedgerService();

        // GET: /Category/
        public ActionResult Index()
        {
            return View(new Customer());
        }
        // GET: /Category/Details/5
        public ActionResult GetAll()
        {
            List<Customer> customer = db.GetAll();
            if (customer == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Customer>, List<CustomerResponse>>(customer);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.GetById(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<Customer, CustomerResponse>(customer);
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
        public ActionResult Create(Customer customer, int create, AccountLedger accountLedger)
        {
            var result = customer;
            var resultAccountLedger = accountLedger;
            resultAccountLedger = dbAccountLedgerService.Save(accountLedger);
            if (ModelState.IsValid)
            {
                var sesssion = CurrentSession.GetCurrentSession();
                if (sesssion != null)
                {

                }
                customer.CreatedDate = DateTime.Now;
                customer.UpdatedDate = DateTime.Now;
                customer.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                customer.LedgerId = resultAccountLedger.Id;
                customer.IsActive = true;
                result = db.Save(customer);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Edit(Customer model)
        {
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.GetById(model.Id);
            if (customer == null)
            {
                return HttpNotFound();
            }

            var sesssion = CurrentSession.GetCurrentSession();
            if (sesssion != null)
            {

            }

            model.IsActive = true;
            model.UpdatedDate = DateTime.Now;
            model.UpdatedBy = CurrentSession.GetCurrentSession().UserName;
            db.Update(model, model.Id);
            return Json("Updated", JsonRequestBehavior.AllowGet);
        }


        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.GetById(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            customer.IsActive = false;
            db.Update(customer, id ?? 0);
            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }

    }
}

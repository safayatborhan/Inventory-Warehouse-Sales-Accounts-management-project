using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using POS_MVC.BAL;
using POS_MVC.Models;
using POS_MVC.Util;
using POS_MVC.ViewModel;

namespace POS_MVC.Controllers
{
    public class EmployeeController : Controller
    {
        private EmployeeService db = new EmployeeService();

        
        // GET: Employee
        public ActionResult AddEmployee()
        {
            return View();
        }

        

        [HttpPost]
        public ActionResult Create(Employee employee)
        {
            var result = employee;

            if (ModelState.IsValid)
            {
                employee.CreationDate = DateTime.Now;
                employee.Creator = CurrentSession.GetCurrentSession().UserName;
                employee.IsActive = true;
                employee.Photo = ImageViewModel.bufferByte;
                result = db.Save(employee);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        private byte[] ImageByte = null;
        public void ImageUpload(ImageViewModel model)
        {
            int imgId = 0;
            var file = model.ImageFile;
            if (file != null)
            {
                //file.SaveAs(Server.MapPath("/UploadEmployeeImage" + file.FileName));
                BinaryReader reader = new BinaryReader(file.InputStream);
                ImageByte = reader.ReadBytes(file.ContentLength);
                ImageViewModel.bufferByte = ImageByte;
            }
        }


        public ActionResult GetAll()
        {
            List<Employee> employees = db.GetAll();
            if (employees == null)
            {
                return HttpNotFound();
            }
            //var result = AutoMapper.Mapper.Map<List<Employee>, List<EmployeeResponse>>(employees);
            return Json(employees, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.GetById(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            //var result = AutoMapper.Mapper.Map<Employee, EmployeeResponse>(employee);
            return Json(employee, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Edit(Employee model)
        {
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.GetById(model.Id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            model.IsActive = true;
            model.UpdateDate = DateTime.Now;
            model.UpdateBy = CurrentSession.GetCurrentSession().UserName;
            model.Photo = ImageViewModel.bufferByte;
            db.Update(model, model.Id);
            return Json("Updated", JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.GetById(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            employee.IsActive = false;
            db.Update(employee, id ?? 0);
            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }
    }
}
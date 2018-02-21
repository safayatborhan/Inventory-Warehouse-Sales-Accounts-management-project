using POS_MVC.BAL;
using POS_MVC.BLL;
using POS_MVC.Models;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using POS_MVC.Util;

namespace POS_MVC.Controllers
{
    public class GoodsReceiveController : Controller
    {
        // GET: Brand
        GoodsReceiveService service = new GoodsReceiveService();
        
        public ActionResult Index()
        {

            return View(new ReceiveMaster());
        }
        public ActionResult LocalMarket()
        {
            return View(new ReceiveMaster());
        }
        // GET: /Category/Details/5
        public ActionResult GetAll()
        {
            List<ReceiveMaster> category = service.GetAll();
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(category);
            return Json(category, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetInvoiceNumber()
        {
            string invoiceNumber =
                new GlobalClass().GetInvoiceNumber("InvoiceNoPaper", "2", "001", "ReceiveMaster");
            return Json(invoiceNumber, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(string totalAmount, string PONo,int supplierId,string descriptions,int WarehouseId, List<GoodsReceiveResponse> response)
        {
            string ID = "";
            ReceiveMaster master = new ReceiveMaster();
            master.InvoiceNoPaper= PONo;
            master.TotalAmount = decimal.Parse(totalAmount);
            master.InvoiceNo = new GlobalClass().GetMaxIdWithPrfix("InvoiceNo", "8", "00000001", "ReceiveMaster", "GR");
            master.SupplierID = supplierId;
            ID = master.InvoiceNo;
            var total = 0.0m;
            foreach (var item in response)
            {
                ReceiveDetail details = new ReceiveDetail();
                //details.Id = item.Id;
                details.ReceiveMasterId = master.Id;
                details.ProductId = item.ProductId;
                details.WarehouseId = item.WarehouseId;
                details.TotalBale = item.TotalBale;
                details.QtyInBale = item.QtyInBale;

                details.WeightInKG = item.WeightInKG;
                details.WeightType = item.WeightType;
                details.WeightInMon = item.WeightInMon;
                details.Amount = item.Amount;
                details.TotalAmount = item.TotalAmount;


                details.IsActive = true;
                details.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                details.CreatedDate = DateTime.Now;                
                master.ReceiveDetails.Add(details);
               // total += details.QTY??0 * details.RetailPrice??0;
            }
            master.RecieveFrom = CurrentSession.GetCurrentSession().UserName;
            master.AdditionalCost = 0.0m;
            master.BillDiscount = 0.0m;
            //master.TotalAmount = total;
            master.GrandTotal = master.TotalAmount + master.AdditionalCost - master.BillDiscount;
            master.InvoiceDate = DateTime.Now;
            master.IsActive = true;
            master.SupplierID = supplierId;
            master.Notes = descriptions;
            master.MarketType = "Not Local";
            master.TransportType = "Truck";
            master.TransportNo = "1";
            master.CreatedBy = CurrentSession.GetCurrentSession().UserName;
            master.CreatedDate = DateTime.Now;

            var result = service.Save(master, WarehouseId,1);
            //return Json(result.Id, JsonRequestBehavior.AllowGet);
            return Json(new { result = true, Error = "Saved", ID = ID }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SaveForLocalMarket(string totalAmount, string PONo, int supplierId, string descriptions, int WarehouseId, List<GoodsReceiveResponse> response)
        {
            string ID = "";
            ReceiveMaster master = new ReceiveMaster();
            master.InvoiceNoPaper = PONo;
            master.InvoiceNo = new GlobalClass().GetMaxIdWithPrfix("GRNo", "8", "00000001", "ReceiveMaster", "GR");
            master.SupplierID = supplierId;
            master.TotalAmount = decimal.Parse(totalAmount);
            ID = master.InvoiceNo;
            master.MarketType = "Local";
            var total = 0.0m;
            foreach (var item in response)
            {
                ReceiveDetail details = new ReceiveDetail();
                //details.Id = item.Id;
                details.ReceiveMasterId = master.Id;
                details.ProductId = item.ProductId;
                details.WarehouseId = item.WarehouseId;
                details.TotalBale = item.TotalBale;
                details.QtyInBale = item.QtyInBale;

                details.WeightInKG = item.WeightInKG;
                details.WeightType = item.WeightType;
                details.WeightInMon = item.WeightInMon;
                details.Amount = item.Amount;
                details.TotalAmount = item.TotalAmount;

                details.IsActive = true;
                details.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                details.CreatedDate = DateTime.Now;
                master.ReceiveDetails.Add(details);
                // total += details.QTY??0 * details.RetailPrice??0;
            }
            master.RecieveFrom = CurrentSession.GetCurrentSession().UserName;
            master.AdditionalCost = 0.0m;
            master.BillDiscount = 0.0m;
            //master.TotalAmount = total;
            master.GrandTotal = master.TotalAmount + master.AdditionalCost - master.BillDiscount;
            master.InvoiceDate = DateTime.Now;
            master.IsActive = true;
            master.SupplierID = supplierId;
            master.Notes = descriptions;
            master.MarketType = "Local";
            master.TransportType = "Truck";
            master.TransportNo = "1";
            master.CreatedBy = CurrentSession.GetCurrentSession().UserName;
            master.CreatedDate = DateTime.Now;

            var result = service.Save(master, WarehouseId,3);
            //return Json(result.Id, JsonRequestBehavior.AllowGet);
            return Json(new { result = true, Error = "Saved", ID = ID }, JsonRequestBehavior.AllowGet);
        }


        // GET: /Category/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReceiveMaster category = service.GetById(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<ReceiveMaster, ReceiveMasterResponse>(category);

            return View(category);
        }

        // GET: /Category/Create
        public ActionResult Create()
        {
            return View();
        }


        public ActionResult GetAllPaddyReceives()
        {
            List<ReceiveMaster> receive = service.GetAllPaddyRecieveForReport();
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllPaddyReceivesFilteredBySupplier(int supplierId)
        {
            List<ReceiveMaster> receive = service.GetAllPaddyRecieveFilteredBySupplierForReport(supplierId);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllPaddyReceivesFilteredByDate(DateTime fromDate, DateTime toDate)
        {
            List<ReceiveMaster> receive = service.GetAllPaddyRecieveFilteredByDateForReport(fromDate, toDate);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllPaddyReceivesFilteredBySupplierAndDate(DateTime fromDate, DateTime toDate, int supplierId)
        {
            List<ReceiveMaster> receive =
                service.GetAllPaddyRecieveFilteredByDateAndSupplierForReport(fromDate, toDate, supplierId);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetAllRiceReceives()
        {
            List<ReceiveMaster> receive = service.GetAllRiceRecieveForReport();
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllRiceReceivesFilteredBySupplier(int supplierId)
        {
            List<ReceiveMaster> receive = service.GetAllRiceRecieveFilteredBySupplierForReport(supplierId);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllRiceReceivesFilteredByDate(DateTime fromDate, DateTime toDate)
        {
            List<ReceiveMaster> receive = service.GetAllRiceRecieveFilteredByDateForReport(fromDate, toDate);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllRiceReceivesFilteredBySupplierAndDate(DateTime fromDate, DateTime toDate, int supplierId)
        {
            List<ReceiveMaster> receive =
                service.GetAllRiceRecieveFilteredByDateAndSupplierForReport(fromDate, toDate, supplierId);
            if (receive == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<ReceiveMaster>, List<ReceiveMasterResponse>>(receive);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PaddyReceiveReport()
        {
            return View();
        }

        public ActionResult RiceReceiveReport()
        {
            return View();
        }


    }
}
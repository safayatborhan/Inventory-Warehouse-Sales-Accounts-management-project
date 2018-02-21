using CrystalDecisions.CrystalReports.Engine;
using POS_MVC.BAL;
using POS_MVC.BLL;
using POS_MVC.Models;
using POS_MVC.Util;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace POS_MVC.Controllers
{
    public class SalesController : Controller
    {
        // GET: Sales
        private InventoryService inventoryService = new InventoryService();
        SalesService salesService = new SalesService();
        ricemillEntities context = new ricemillEntities();             
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sales()
        {
            return View();
        }

        public ActionResult SalesOrder()
        {
            return View();
        }

        public ActionResult SalesReport()
        {
            return View();
        }

        public ActionResult GetAllSales()
        {
            List<SalesMaster> category = salesService.GetAll();
            if (category == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<SalesMaster>, List<SalesMasterResponse>>(category);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSalesFilteredByCustomer(int id)
        {
            List<SalesMaster> sales = salesService.GetAllSalesFilteredByCustomer(id);
            if (sales == null)
            {
                return HttpNotFound();
            }

            var result = AutoMapper.Mapper.Map<List<SalesMaster>, List<SalesMasterResponse>>(sales);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSalesFilteredByDate(DateTime startDate, DateTime endDate)
        {
            List<SalesMaster> sales = salesService.GetAllSalesFilteredByDateForReport(startDate, endDate);
            if (sales == null)
            {
                return HttpNotFound();
            }

            var result = AutoMapper.Mapper.Map<List<SalesMaster>, List<SalesMasterResponse>>(sales);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSalesFilteredByDateAndCustomer(DateTime startDate, DateTime endDate, int customerId)
        {
            List<SalesMaster> sales =
                salesService.GetAllSalesFilteredByDateAndCustomerForReport(startDate, endDate, customerId);
            if (sales == null)
            {
                return HttpNotFound();
            }

            var result = AutoMapper.Mapper.Map<List<SalesMaster>, List<SalesMasterResponse>>(sales);
            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public ActionResult GetInvoiceNumber()
        {
            string invoiceNumber = "SO" + DateTime.Now.Year +
                new GlobalClass().GetInvoiceNumber("SalesInvoice", "4", "00001", "SalesMaster");
            return Json(invoiceNumber, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetInvoiceNumberSalesOrder()
        {
            string invoiceNumber = "DO-DR" + DateTime.Now.Year +"-"+
                new GlobalClass().GetInvoiceNumber("SalesOrderId", "4", "00001", "SalesOrder");
            return Json(invoiceNumber, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetAllInventory()
        {
            List<Inventory> inventories = inventoryService.GetAll();
            if (inventories == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<Inventory>, List<InventoryResponse>>(inventories);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSaleOrders()
        {
            List<SalesOrder> salesOrders = salesService.GetAllSalesOrders();
            if (salesOrders == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<SalesOrder>, List<SalesOrderResponse>>(salesOrders);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSaleOrdersFilterdByCustomer(int? CustomerID)
        {
            List<SalesOrder> salesOrders = salesService.GetAllSalesOrdersByCustomerId(CustomerID);
            if (salesOrders == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<List<SalesOrder>, List<SalesOrderResponse>>(salesOrders);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveSalesOrder(List<SalesOrder> salesOrders)
        {
            SalesOrder result = new SalesOrder();
            SalesOrder FinalResult = new SalesOrder();
            var totalAmount = 0m;
            int customerId = 0;
            foreach (var item in salesOrders)
            {
                result.SalesOrderId =item.SalesOrderId;
                result.CustomerID = item.CustomerID;
                result.Notes = item.Notes;

                result.OrderDate = DateTime.Now;
                result.OrderRecieveBy = CurrentSession.GetCurrentSession().UserName;
                result.ProductId = item.ProductId;
                result.BaleQty = item.BaleQty;
                result.BaleWeight = item.BaleWeight;
                result.TotalQtyInKG = item.TotalQtyInKG;
                result.Rate = item.Rate;
                result.Amount = item.Amount;
                result.DeliveryDate = item.DeliveryDate;
                result.DeliveryQty = 0;

                result.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                result.CreatedDate = DateTime.Now;
                result.IsActive = true;
                FinalResult = salesService.SaveSalesOrder(result);
                totalAmount += result.Amount;
                customerId = item.CustomerID;
            }

            if (FinalResult.Id > 0)
            {
                var customer = new CustomerService().GetById(customerId);
                new SMSEmailService().SendOneToOneSingleSms(customer.Phone, "Dear Customer,DO Has Been Created.DO No - " + FinalResult.SalesOrderId + ", Dated - " + DateTime.Now.ToString("dd-MM-yyyy")+ ". Total DO Amount - " + totalAmount + ". Dada Rice");
            }

            return Json(FinalResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Export()
        {
            List<SalesMaster> allCustomer = new List<SalesMaster>();
            allCustomer = context.SalesMasters.ToList();
            var data = AutoMapper.Mapper.Map<List<SalesMaster>, List<SalesMasterResponse>>(allCustomer, new List<SalesMasterResponse>());
            ReportDocument rd = new ReportDocument();
            rd.Load(Path.Combine(Server.MapPath("~/Report/RPT"), "rptDeliveryOrder.rpt"));
            rd.SetDataSource(data);

            Response.Buffer = false;
            Response.ClearContent();
            Response.ClearHeaders();


            Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/pdf", "SalesInvoice.pdf");
        }

        [HttpPost]
        public ActionResult SaveSales(List<SalesMaster> salesMasters, List<SalesDetail> salesDetail, List<SalesOrder> salesOrders, List<string> lstDeliveryQunatities)
        {
            foreach (var VARIABLE in salesMasters)
            {
                VARIABLE.SalesDetails = salesDetail;
            }

            SalesMaster result = new SalesMaster();
            SalesMaster FinalResult = new SalesMaster();

            SalesDetail resultDetail = new SalesDetail();
            SalesDetail FinalResultDetail = new SalesDetail();

            SalesOrder resultOrder = new SalesOrder();
            SalesOrder FinalResultOrder = new SalesOrder();

            List<int> lstSalesMasterId = new List<int>();

            foreach (var item in salesMasters)
            {
                result.SalesInvoice = item.SalesInvoice;
                result.SalesOrderId = item.SalesOrderId;
                result.SalesDate = item.SalesDate;
                result.SalesBy = CurrentSession.GetCurrentSession().UserName;
                result.CustomerID = item.CustomerID;
                result.AdditionalCost = 0;
                result.Discount = item.Discount;
                result.TotalAmount = item.TotalAmount;
                result.Notes = item.Notes;
                result.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                result.CreatedDate = DateTime.Now;
                result.IsActive = true;                

              //  FinalResult = salesService.SaveSalesMaster(result);
              //  lstSalesMasterId.Add(FinalResult.Id);
            }

           // int count = 0;
            foreach (var item in salesDetail)
            {
                //resultDetail.SalesMasterId = lstSalesMasterId[count];
                // count++;
                resultDetail.SalesMasterId = result.Id;
                resultDetail.SalesInvoice = result.SalesInvoice;
                resultDetail.ProductId = item.ProductId;
                resultDetail.BaleQty = item.BaleQty;
                resultDetail.BaleWeight = item.BaleWeight;
                resultDetail.TotalQtyInKG = item.TotalQtyInKG;
                resultDetail.Rate = item.Rate;
                resultDetail.Amount = item.Amount;
                resultDetail.Notes = FinalResult.Notes;
                resultDetail.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                resultDetail.CreatedDate = DateTime.Now;
                resultDetail.IsActive = true;
                result.SalesDetails.Add(resultDetail);
            }
            var saved = salesService.SaveSalesMaster(result);

            for (int i = 0; i < salesOrders.Count; i++)
            {
                salesOrders[i].DeliveryQty = salesOrders[i].DeliveryQty + decimal.Parse(lstDeliveryQunatities[i]);
                //salesOrders[i].DeliveryDate = DateTime.Now;
                //salesOrders[i].CreatedDate = DateTime.Now;
                //salesOrders[i].OrderDate = DateTime.Now;
                //salesOrders[i].PricingDate = DateTime.Now;

                salesOrders[i].DeliveryDate = DateTime.Parse(salesOrders[i].DeliveryDate.ToString());
                salesOrders[i].CreatedDate = DateTime.Parse(salesOrders[i].CreatedDate.ToString());
                salesOrders[i].OrderDate = DateTime.Parse(salesOrders[i].OrderDate.ToString());
                salesOrders[i].PricingDate = DateTime.Parse(salesOrders[i].PricingDate.ToString());


                FinalResultOrder = salesService.Update(salesOrders[i], salesOrders[i].Id);
            }

            return Json(FinalResult, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesOrder salesOrder = salesService.GetSalesOrderById(id);
            if (salesOrder == null)
            {
                return HttpNotFound();
            }
            var result = AutoMapper.Mapper.Map<SalesOrder, SalesOrderResponse>(salesOrder);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
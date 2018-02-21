using POS_MVC.BAL;
using POS_MVC.Report.RPT;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace POS_MVC.Report.Viewer
{
    public partial class ReportViewer : System.Web.UI.Page
    {
        Result oResult = new Result();
        SQLDAL oDAL = new SQLDAL();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void page_Init(object sender, EventArgs e)
        {
            try
            {
                string reportType = Request.QueryString["ReportName"].ToString();
                if (reportType == "HeadOfficeInventoryReport")
                {
                    LoadHeadOfficeInventoryReport();
                }
                if (reportType == "GrChallanReport")
                {
                    LoadGrChallanReport();
                }
                if (reportType == "RevenueReport")
                {
                    //LoadRevenueReport();
                }
                if (reportType == "EXECLIPARTReport")
                {
                    // LoadEXECLIPARTReport();
                }
                if (reportType == "InvoiceReprint")
                {
                    //LoadInvoiceReport();
                }

            }
            catch (Exception ex)
            {
                lblMsg.Text = ex.Message;
            }
        }

        private void LoadGrChallanReport()
        {
            string GRNo = Request.QueryString["GRNo"].ToString();

            string query = @"sp_GRChallanReport '" + GRNo + "'";
            oResult = oDAL.Select(query);
            DataTable dt = null;
            dt = oResult.Data as DataTable;
            rptGRChallanReport rpt = new rptGRChallanReport();
            rpt.SetDataSource(dt);
            CrystalReportViewer1.ReportSource = rpt;
            CrystalReportViewer1.DataBind();
        }

        private void LoadHeadOfficeInventoryReport()
        {
            string ProductID = Request.QueryString["ProductID"].ToString();
            string CategoryID = Request.QueryString["CategoryID"].ToString();
            string SizeID = Request.QueryString["SizeID"].ToString();
            string DesignID = Request.QueryString["DesignID"].ToString();
            string ColorID = Request.QueryString["ColorID"].ToString();

            string query = @"sp_reportAllStoockSummary '" + ProductID + "', '" + CategoryID + "', '" + SizeID + "', '" + DesignID + "', '" + ColorID + "'";
            oResult = oDAL.Select(query);
            DataTable dt = null;
            dt = oResult.Data as DataTable;
            rptInventoryReport rpt = new rptInventoryReport();
            rpt.SetDataSource(dt);
            CrystalReportViewer1.ReportSource = rpt;
            CrystalReportViewer1.DataBind();
        }
    }
}
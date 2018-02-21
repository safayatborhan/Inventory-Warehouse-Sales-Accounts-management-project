using System;
using System.Data;
using System.Web;
using System.Web.UI;

namespace POS_MVC.BAL
{
    [Serializable]
    public class ResultReport : System.Web.UI.Page
    {
        public string SqlError;

        public string ReportParameter;

        public bool ResultState;

        public object Data;

        public string getExecutetionMessage()
        {
            string msg = "";
            if (ResultState)
            {

                msg = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">Data Saved Successfully</span></p>";
            }
            else
            {
                msg = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">Data Saved Fail <br>" + SqlError + "</span></p>";

            }
            return msg;
        }

        public static void ShowAlertMessage(string error)
        {
            Page page = HttpContext.Current.Handler as Page;
            if (page != null)
            {
                error = error.Replace("'", "\'");

                ScriptManager.RegisterStartupScript(page, page.GetType(), "err_msg", "alert('" + error + "');", true);
            }
        }
        public string getSaveMessage()
        {
            string msg = "";

            msg = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">Data Saved Successfully</span></p>";

            return msg;
        }

        public string getFailMessage()
        {
            string msg = "";

            msg = "<p class=\"info\" id=\"error\"><span class=\"info_inner\">Data Saved Fail</span></p>";

            return msg;
        }

        public void showReport(string pageUrl, string param, Type cType, Page oPage)
        {
            string url = ResolveClientUrl(pageUrl) + param;

            //for (int i = 0; i < param.Length; i++)
            //{
            //    url += pageUrl + Server.UrlEncode(param[i]);
            //}
            ClientScriptManager crScript = oPage.ClientScript;
            //Type cType = this.GetType();
            string script = @"<script language=javascript>window.open('" + url + "')</script>";
            if (!crScript.IsClientScriptBlockRegistered(cType, "ViewReport"))
                crScript.RegisterClientScriptBlock(cType, "ViewReport", script);
        }


        public void showReportModified(string pageUrl, string param, Type cType, Page oPage, Control ctrl)
        {
            string url = ResolveClientUrl(pageUrl) + param;

            //for (int i = 0; i < param.Length; i++)
            //{
            //    url += pageUrl + Server.UrlEncode(param[i]);
            //}
            //ClientScriptManager crScript = oPage.ClientScript;
            ////Type cType = this.GetType();
            //string script = @"<script language=javascript>window.open('" + url + "')</script>";
            //if (!crScript.IsClientScriptBlockRegistered(cType, "ViewReport"))
            //    crScript.RegisterClientScriptBlock(cType, "ViewReport", script);

            ScriptManager.RegisterStartupScript(ctrl, typeof(string), "redirect", "window.open('" + url + "');", true);

        }

        public void showButton(Type cType, Page oPage, Control ctrl)
        {

            ScriptManager.RegisterStartupScript(ctrl, typeof(string), "showButton", "EnableButton();", true);

        }

        public void showReport2(string pageUrl, string param, Type cType, Page oPage)
        {
            string url = ResolveClientUrl(pageUrl) + param;

            //for (int i = 0; i < param.Length; i++)
            //{
            //    url += pageUrl + Server.UrlEncode(param[i]);
            //}
            ClientScriptManager crScript = oPage.ClientScript;
            //Type cType = this.GetType();
            string script = @"<script language=javascript>window.open('" + url + "')</script>";
            if (!crScript.IsClientScriptBlockRegistered(cType, "ViewReport2"))
                crScript.RegisterClientScriptBlock(cType, "ViewReport2", script);
        }

        public string getSuccessfulMessage(string msg)
        {
            string message = "";

            message = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">" + msg + "</span></p>";


            return message;
        }

        public string getWarningMessage(string msg)
        {
            string message = "";

            message = "<p class=\"info\" id=\"warning\"><span class=\"info_inner\">" + msg + "</span></p>";


            return message;
        }
        public string getInfoMessage(string msg)
        {
            string message = "";

            message = "<p class=\"info\" id=\"info\"><span class=\"info_inner\">" + msg + "</span></p>";


            return message;
        }

        public string getFailMessage(string msg)
        {
            string message = "";

            message = "<p class=\"info\" id=\"error\"><span class=\"info_inner\">" + msg + "</span></p>";

            return message;
        }
    }

    public class Result
    {
        public bool ExecutionState { get; set; }
        public string Error { get; set; }
        public DataTable Data;
        public bool ResultState;
        public string SqlError;
        public string getExecutetionMessage()
        {
            string msg = "";
            if (ResultState)
            {
                msg = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">Data Saved Successfully</span></p>";
            }
            else
            {
                msg = "<p class=\"info\" id=\"success\"><span class=\"info_inner\">Data Saved Fail <br>" + SqlError + "</span></p>";
            }
            return msg;
        }

    }
}

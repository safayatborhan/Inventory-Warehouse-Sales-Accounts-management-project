<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportViewer.aspx.cs" Inherits="POS_MVC.Report.Viewer.ReportViewer" %>

<%--<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
         <asp:Label ID="lblMsg" runat="server" Text="" Font-Size="20px" ForeColor="Red"></asp:Label>
        <CR:CrystalReportViewer ID="rptViewer" runat="server" HasCrystalLogo="False"
            AutoDataBind="True" Height="50px" EnableParameterPrompt="false" EnableDatabaseLogonPrompt="false" ToolPanelWidth="200px"
            Width="350px" ToolPanelView="None" />
    </form>
</body>
</html>--%>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report Page</title>

    <style type="text/css">
 

 
.crystalstyle {
border: 1px dotted #CCCCCC ;
padding: 10px 10px 10px 10px ;
}
 
 
</style>

    
   <script type="text/javascript" src="../../Scripts/jquery-1.8.2.min.js"></script>
   <%-- <script src="../../Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/jQuery.print.js" type="text/javascript"></script>
    
    <script type="text/javascript">

        //$(document).ready(function () {
        $(window).bind("load", function () {
            //$(window).load(function(){

            //End of body tag
            //var footstr = "</body></html>";
            //This the main content to get the all the html content inside the report viewer control
            //"ReportViewer1_ctl10" is the main div inside the report viewer
            //controls who helds all the tables and divs where our report contents or data is available
            var newstr = $("div.crystalstyle#CrViewer_ctl01").html();
            //var newstr = jQuery('div[class="crystalstyle"]', document.getElementById('CrViewer_ctl01')); 
            //open blank html for printing
            //            var popupWin = window.open('', '_blank');
            //            //paste data of printing in blank html page
            //            popupWin.document.write(newstr);
            //            //print the page and see is what you see is what you get
            //            popupWin.print();
            return false;
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Label ID="lblMsg" runat="server" Text="" Font-Size="20px" ForeColor="Red"></asp:Label>

       <%-- <CR:CrystalReportViewer ID="CrViewers" runat="server" AutoDataBind="true" />--%>

        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" AutoDataBind="true" />
    </div>
    </form>
</body>
</html>

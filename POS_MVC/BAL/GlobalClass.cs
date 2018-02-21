using System;
using System.ComponentModel;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Collections.Generic;
using POS_MVC.BAL;

namespace POS_MVC.BLL
{
    public class GlobalClass
    {
        private string _selectQuery;

        public static string LoginProfile = "hdfkiueifwekfiweufuwei";

        public static string RemoveSingleQuote(string data)
        {
            return string.IsNullOrEmpty(data) ? string.Empty : data.Replace("'", "''");
        }

        public static string RemoveSpace(string data)
        {
            return string.IsNullOrEmpty(data) ? string.Empty : data.Trim();
        }

        public static T RemoveSingleQuote<T>(object ob)
        {
            PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(typeof(T));

            T Tob = (T)ob;
            if (Tob != null)
            {
                for (int i = 0; i < props.Count; i++)
                {
                    PropertyDescriptor prop = props[i];
                    if (prop.PropertyType.Name == "String")
                    {
                        object oPropertyValue = prop.GetValue(Tob);
                        oPropertyValue = RemoveSingleQuote((string)oPropertyValue) as object;
                        oPropertyValue = RemoveSpace((string)oPropertyValue) as object;
                        prop.SetValue(Tob, oPropertyValue);
                    }
                    //oPropertyValue
                    //table.Columns.Add(prop.Name, prop.PropertyType);
                }
            }
            return Tob;
        }

        public static string ConvertSystemDate(string date)
        {
            try
            {
                string month = date.Split('/')[1];
                string day = date.Split('/')[0];
                string year = date.Split('/')[2];

                return month + "/" + day + "/" + year;
            }
            catch (Exception ex)
            {
                return "1/1/1900";
            }
        }

        public string GetEncryptedPassword(string password)
        {
            string pass = "";
            byte[] toEncodeAsBytes = ASCIIEncoding.ASCII.GetBytes(password);
            string returnValue = Convert.ToBase64String(toEncodeAsBytes);
            Byte[] originalBytes;
            Byte[] encodedBytes;
            MD5 objMd5 = new MD5CryptoServiceProvider();
            originalBytes = ASCIIEncoding.Default.GetBytes(returnValue);
            encodedBytes = objMd5.ComputeHash(originalBytes);
            StringBuilder ss = new StringBuilder();
            foreach (byte b in encodedBytes)
            {
                ss.Append(b.ToString("x2").ToLower());
            }
            pass = ss.ToString();
            return pass;
        }

        public string GetMaxId(string coloumName, string rightStringLength, string initialValue, string tableName)
        {
            string maxId = "";
            _selectQuery = "SELECT ISNULL(MAX(RIGHT(" + coloumName + ", " + rightStringLength + ")) + 1, " + initialValue + ") AS maxID " +
                               " FROM  " + tableName + " ";

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }

            return maxId;
        }

        public string GetMaxId(string coloumName, string tableName)
        {
            string maxId = "";

            _selectQuery = "SELECT MAX(CONVERT(numeric,(" + coloumName + "))) +1 AS " + coloumName + " FROM " + tableName;

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }
        public string GetMaxRowNumber(string coloumName, string tableName)
        {
            string maxId = "";
            _selectQuery = "SELECT  Count(" + coloumName + ") +1 AS " + coloumName + " FROM " + tableName;

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }

        public string GetCurrentMaxId(string coloumName, string tableName)
        {
            string maxId = "";
            _selectQuery = "SELECT  MAX(" + coloumName + ") AS " + coloumName + " FROM " + tableName;

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }

        public string GetMaxIdByWhereVar(string coloumName, string tableName, string whereCol, string WhereVal)
        {
            string maxId = "";

            _selectQuery = "SELECT  MAX(" + coloumName + ") +1 AS " + coloumName + " FROM " + tableName + " where " + whereCol + "='" + WhereVal + "'";

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }

        public string GetMaxIdChlnByWhereVar(string coloumName, string tableName, string whereCol, string WhereVal)
        {
            string maxId = "";

            _selectQuery = "SELECT  MAX(" + coloumName + ") +1 AS " + coloumName + " FROM " + tableName + " where " + whereCol + "='" + WhereVal + "' and ShopID=9999";

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }


        public string GetMaxIdByWhereVarChallan(string coloumName, string tableName, string whereCol, string WhereVal)
        {
            string maxId = "";

            _selectQuery = "SELECT  MAX(" + coloumName + ") +1 AS " + coloumName + " FROM " + tableName + " where left(Chln,3) <> 'rIN' and " + whereCol + "='" + WhereVal + "'";

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                maxId = dt.Rows[0][coloumName].ToString();
            }
            if (string.IsNullOrEmpty(maxId))
            {
                return "1";
            }

            return maxId;
        }

        public DataTable GetDistinctValue(string coloumName, string tableName)
        {
            _selectQuery = "SELECT Distinct " + coloumName + " FROM " + tableName;

            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;
            return dt;
        }

        //public List<MenuViewModel> GetMenuByUserName(string UserName)
        //{
        //   // _selectQuery = "select * from Menu";

        //    _selectQuery = "SELECT dbo.Menu.* FROM  dbo.Menu INNER JOIN dbo.UserMenu ON dbo.Menu.MenuId = dbo.UserMenu.MenuId  WHERE dbo.UserMenu.UserName='" + UserName + "'" + "ORDER BY dbo.Menu.Serial asc";

        //    SQLDALService dal = new SQLDALService();
        //    DataTable dt = dal.Select(_selectQuery).Data;
        //    List<MenuViewModel> user = new List<MenuViewModel>();
        //    foreach (DataRow dr in dt.Rows)
        //    {
        //        MenuViewModel up = new MenuViewModel();
        //        up.Serial = int.Parse(dr["Serial"].ToString());
        //        up.Text = dr["Text"].ToString();
        //        up.IcoClass = dr["IcoClass"].ToString();
        //        up.ActionName = dr["ActionName"].ToString();
        //        up.Controller = dr["Controller"].ToString();
        //        up.MenuId = int.Parse(dr["MenuId"].ToString());
        //        up.ParentID = Convert.ToInt32(dr["ParentID"].ToString());
        //        user.Add(up);
        //    }
        //    return user;
        //}

        public DataTable GetDataTable(string query)
        {
            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(query).Data;
            return dt;
        }

        public DataTable GetShopList()
        {
            _selectQuery = "SELECT * from ShopList";
            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;
            return dt;
        }

        public DataTable GlobalDataInit()
        {
            _selectQuery = "SELECT * from GlobalSetup";
            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;
            return dt;
        }

        public DataTable UserProfile_GetList(string UserName)
        {
            string _selectQuery = "EXECUTE usp_UserProfile_GetList '" + UserName + "'";
            SQLDALService dal = new SQLDALService();
            DataTable dt = dal.Select(_selectQuery).Data;
            return dt;
        }
        //public LogedInInfo GetLogedInInfo(string UserName)
        //{
        //    string _selectQuery = "EXECUTE usp_UserProfile_GetList '" + UserName + "'";
        //    SQLDALService dal = new SQLDALService();
        //    DataTable dt = dal.Select(_selectQuery).Data;

        //    LogedInInfo info = new LogedInInfo();
        //    for (int i = 0; i < dt.Rows.Count; i++)
        //    {
        //        info.CounterID = "00";
        //        info.UserId = Convert.ToInt32(dt.Rows[0]["UserId"].ToString());
        //        info.UserName = dt.Rows[0]["UserName"].ToString();
        //        info.CompanyID = dt.Rows[0]["CompanyID"].ToString();
        //        info.CompanyName = dt.Rows[0]["CompanyName"].ToString();
        //    }
        //    return info;
        //}

        public string GetMaxIdWithPrfix(string coloumName, string rightStringLength, string initialValue, string tableName, string prefix)
        {
            string id = "";
            string maxId = "";

            _selectQuery = "SELECT ISNULL(MAX(RIGHT(" + coloumName + ", " + rightStringLength + ")) + 1, " + initialValue + ") AS maxID " +
                               " FROM  " + tableName + " where left(" + coloumName + "," + prefix.Length + ")='" + prefix + "' ";


            SQLDAL dal = new SQLDAL();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                id = (dt.Rows[0]["maxID"].ToString());
            }


            if (id.Length < initialValue.Length)
            {
                int prefixZero = initialValue.Length - id.Length;
                string _prefix = "";
                for (int i = 0; i < prefixZero; i++)
                {
                    _prefix += "0";
                }
                id = _prefix + id;
            }
            maxId = prefix + id;
            return maxId;

        }


        public string GetInvoiceNumber(string coloumName, string rightStringLength, string initialValue, string tableName)
        {
            string id = "";
            string maxId = "";

            _selectQuery = "SELECT ISNULL(MAX(RIGHT(" + coloumName + ", " + rightStringLength + ")) + 1, " + initialValue + ") AS maxID " +
                           " FROM  " + tableName + "";


            SQLDAL dal = new SQLDAL();
            DataTable dt = dal.Select(_selectQuery).Data;

            if (dt != null && dt.Rows.Count > 0)
            {
                id = (dt.Rows[0]["maxID"].ToString());
            }


            if (id.Length < initialValue.Length)
            {
                int prefixZero = initialValue.Length - id.Length;
                string _prefix = "";
                for (int i = 0; i < prefixZero; i++)
                {
                    _prefix += "0";
                }
                id = _prefix + id;
            }
            maxId = id;
            return maxId;

        }
    }
}
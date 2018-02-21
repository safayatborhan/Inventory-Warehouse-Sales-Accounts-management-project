using System;
using System.Collections.Generic;
using System.Data.SqlClient;
//using POS_MVC;
//using POS_MVC.Data;

namespace POS_MVC.BAL
{
    public class SQLDALService
    {
        private SqlConnection connection;

        SQLDAL objSqlData= new SQLDAL();
        #region Query Execute
        public Result ExecuteQuery(string SQL)
        {
            Result oResult = new Result();
            oResult = objSqlData.Select(SQL);
            return oResult;
        }
        public Result ExecuteQuery(List<string> SQL)
        {
            Result oResult = new Result();
            SqlTransaction oTransaction = null;
            SqlCommand oCmd = null;

            try
            {

                if (connection != null)
                {
                    connection.Open();
                    oTransaction = connection.BeginTransaction();
                    foreach (string s in SQL)
                    {
                        oCmd = new SqlCommand(s, connection);
                        oCmd.Transaction = oTransaction;
                        oCmd.ExecuteNonQuery();
                        oResult.ExecutionState = true;
                    }
                    oTransaction.Commit();
                }
            }
            catch (Exception ex)
            {
                oResult.ExecutionState = false;
                oResult.Error = ex.Message;
                oTransaction.Rollback();
            }
            finally
            {
                connection.Close();
            }
            return oResult;
        }
        #endregion

        public Result Select(string SQL)
        {
            Result oResult = new Result();
            oResult = objSqlData.Select(SQL);
            return oResult;
        }

    }
}

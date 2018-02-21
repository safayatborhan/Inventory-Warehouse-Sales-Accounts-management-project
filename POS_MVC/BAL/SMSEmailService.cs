using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.ServiceReference1;

namespace POS_MVC.BAL
{
    public class SMSEmailService
    {
        string userName = "01719304970";
        string userPassword = "bl01917813583";
        public string  SendOneToOneSingleSms(string mobileNumber,string smsText)
        {
            try
            {
                var sms = new SendSmsSoapClient();
                string returnValue = sms.OneToOne(userName, userPassword,mobileNumber,smsText,
                "TEXT", "", "");
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
   
}
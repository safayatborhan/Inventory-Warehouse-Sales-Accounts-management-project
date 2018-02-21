using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.Util
{
    public class CurrentSession
    {
        public static AppSession GetCurrentSession()
        {
            AppSession vmSession;
            if (HttpContext.Current.Session["Session"] != null)
            {
                vmSession = HttpContext.Current.Session["Session"] as AppSession;
            }
            else
            {
                vmSession = null;                                                 
            }
            return vmSession;

        }
    }
}
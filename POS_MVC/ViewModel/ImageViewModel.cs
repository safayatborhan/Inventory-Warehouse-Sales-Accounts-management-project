using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class ImageViewModel
    {
        public int ImageId { get; set; }

        public string ImageTitle { get; set; }
        
        public byte[] ImageByte { get; set; }

        public string ImagePath { get; set; }

        public HttpPostedFileWrapper ImageFile { get; set; }

        public static byte[] bufferByte { get; set; }
    }
}
using System;

namespace POS_MVC.ViewModel
{
    public class EmployeeResponse
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ZipCode { get; set; }
        public byte[] Photo { get; set; }
        public string Creator { get; set; }
        public Nullable<System.DateTime> CreationDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public bool IsActive { get; set; }
        public string Remarks { get; set; }
    }
}
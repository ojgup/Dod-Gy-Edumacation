using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DodGyEdumacationAPI.Models
{
    public class Report
    {
        public DateTime DateTimeEntered { get; set; }
        public DateTime DateTimeLeft { get; set; }
        public string Room { get; set; }
        public string SessionType { get; set; }
        public string Teacher { get; set; }
    }
}

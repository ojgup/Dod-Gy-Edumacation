using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DodGyEdumacationAPI.Models
{
    public class Report
    {
        public DateTime SessionStart { get; set; }
        public DateTime? SessionEnd { get; set; }
        public string RoomCode { get; set; }
        public string SessionType { get; set; }
        public string Teacher { get; set; }
    }
}

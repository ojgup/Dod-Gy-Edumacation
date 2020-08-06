using System;
using System.Collections.Generic;

namespace DodGyEdumacationAPI.Models
{
    public partial class Session
    {
        public int SessionId { get; set; }
        public string RoomCode { get; set; }
        public DateTime SessionStart { get; set; }
        public DateTime? SessionEnd { get; set; }
        public string SessionType { get; set; }
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}

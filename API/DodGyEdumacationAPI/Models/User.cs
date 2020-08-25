using System;
using System.Collections.Generic;

namespace DodGyEdumacationAPI.Models
{
    public partial class User
    {
        public User()
        {
            Session = new HashSet<Session>();
        }

        public string Userid { get; set; }
        public Byte[] Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; set; }

        public virtual ICollection<Session> Session { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace api.Models
{
    public class AttendeeDB
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string cell { get; set; }
        public string email { get; set; }
        public bool isDeacon { get; set; }

    }
}

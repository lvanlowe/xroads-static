using System;
using System.Collections.Generic;
using System.Text;

namespace xroadsProcesses.Models
{
    public class DiaconateDB
    {
        public string id { get; set; }
        public int year { get; set; }
        public int month { get; set; }
        public string name { get; set; }
        public string attendeeId { get; set; }
        public DateTime? meetingDate { get; set; }
        public DateTime? newMeetingDate { get; set; }
        public string meetingUrl { get; set; }}
}

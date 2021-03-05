using System;
using System.Collections.Generic;
using System.Text;

namespace xroadsProcesses.DTO
{
    public class DeaconMeeting
    {
        public string DiaconateId { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
        public string OldMeetingDate { get; set; }
        public string DeaconDate { get; set; }
        public string ZoomLink { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public string Copy { get; set; }
    }
}

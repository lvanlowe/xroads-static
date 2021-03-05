using System;
using System.Collections.Generic;
using System.Text;
using SendGrid.Helpers.Mail;
using xroadsProcesses.DTO;

namespace xroadsProcesses.Worker
{
    public class MessageWorker
    {
        private readonly SendGridMessage _message;

        private const string DeaconDutyTemplate = "d-745be84bfa184e4282d327a53082c2ba";
        private const string DeaconMeetingScheduleTemplate = "d-5a3ebb12dde34e479d4a795e53629d65";
        private const string DeaconMeetingChangeTemplate = "d-e981b607229f40bfac481893bf4b5dee";
        private const string DeaconMeetingCanceledTemplate = "d-a4f446b7ead34914854203acac1a1b73";

        public MessageWorker(SendGridMessage message)
        {
            _message = message;
        }

        public SendGridMessage PrepareDiaconateEmail(DeaconDuty deacon)
        {
            BuildEmailFrom(deacon.FromEmail, deacon.FromName);
            BuildEmailTo(deacon.Email, deacon.Name);
            BuildEmailCopy(deacon.Copy);
            SetUpDeaconTemplate(DeaconDutyTemplate, deacon);
            return _message;
        }

        public SendGridMessage PrepareDiaconateMeetingEmail(DeaconMeeting deacon)
        {
            BuildEmailFrom(deacon.FromEmail, deacon.FromName);
            BuildEmailTo(deacon.Email, deacon.Name);
            BuildEmailCopy(deacon.Copy);
            SetUpDeaconMeetingTemplate(deacon);
            return _message;
        }

        private void SetUpDeaconTemplate(string template, DeaconDuty deacon)
        {
            _message.SetTemplateId(template);
            _message.SetTemplateData(deacon);
        }

        private void SetUpDeaconMeetingTemplate(DeaconMeeting deacon)
        {
            if (deacon.DeaconDate == null)
            {
                _message.SetTemplateId(DeaconMeetingCanceledTemplate);
            }
            else
            {
                _message.SetTemplateId(deacon.OldMeetingDate == null
                    ? DeaconMeetingScheduleTemplate
                    : DeaconMeetingChangeTemplate);
            }
            _message.SetTemplateData(deacon);
        }

        public void BuildEmailFrom(string fromEmail, string fromName)
        {
            if (string.IsNullOrEmpty(fromEmail))
            {
                _message.From = new EmailAddress("crossroadsDeacons@nuttin-but.net", "Crossroads Deacons");
            }
            else
            {
                _message.From = string.IsNullOrEmpty(fromName) ? new EmailAddress(fromEmail) : new EmailAddress(fromEmail, fromName);
            }
        }

        public void BuildEmailTo(string toEmail, string toName)
        {
            var emailAddresses = new List<EmailAddress>
            {
                new EmailAddress {Email = toEmail, Name = toName}
            };
            _message.AddTos(emailAddresses);
        }

        public void BuildEmailCopy(string ccEmail)
        {
            if (string.IsNullOrEmpty(ccEmail)) return;
            var i = 0;
            string[] splitList = { ";" };
            var ccList = ccEmail.Split(splitList, StringSplitOptions.None);
            while (i < ccList.Length)
            {
                if (i + 1 < ccList.Length)
                {
                    _message.AddCc(ccList[i++], ccList[i++]);
                }
                else
                {
                    _message.AddCc(ccList[i++]);
                }
            }
        }
    }
}

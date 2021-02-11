using System;
using System.Collections.Generic;
using System.Text;
using SendGrid.Helpers.Mail;

namespace xroadsProcesses.Worker
{
    public class MessageWorker
    {
        private readonly SendGridMessage _message;

        public MessageWorker(SendGridMessage message)
        {
            _message = message;
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
    }
}

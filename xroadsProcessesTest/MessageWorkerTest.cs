using System;
using SendGrid.Helpers.Mail;
using xroadsProcesses.Worker;
using Xunit;

namespace xroadsProcessesTest
{
    public class MessageWorkerTest
    {

        private SendGridMessage _message;
        private MessageWorker _worker;

        public MessageWorkerTest()
        {
            _message = new SendGridMessage();
        }

        [Fact]
        public void BuildFromTest_no_email()
        {
            var fromEmail = string.Empty;
            var fromName = string.Empty;
            const string defaultEmail = "crossroadsDeacons@nuttin-but.net"; 
            const string defaultName = "Crossroads Deacons";
            _worker = new MessageWorker(_message);
            _worker.BuildEmailFrom(fromEmail, fromName);
            Assert.Equal(defaultEmail, _message.From.Email );
            Assert.Equal(defaultName, _message.From.Name );
        }

        [Fact]
        public void BuildFromTest_email_no_name()
        {
            var fromEmail = "spiderman@marvel.comic";
            var fromName = string.Empty;
            const string defaultEmail = "crossroadsDeacons@nuttin-but.net";
            const string defaultName = "Crossroads Deacons";
            _worker = new MessageWorker(_message);
            _worker.BuildEmailFrom(fromEmail, fromName);
            Assert.Equal(fromEmail, _message.From.Email );
            Assert.Null(_message.From.Name );
        }

        [Fact]
        public void BuildFromTest_email_and_name()
        {
            var fromEmail = "spiderman@marvel.comic";
            var fromName = "Peter Parker";
            const string defaultEmail = "crossroadsDeacons@nuttin-but.net";
            const string defaultName = "Crossroads Deacons";
            _worker = new MessageWorker(_message);
            _worker.BuildEmailFrom(fromEmail, fromName);
            Assert.Equal(fromEmail, _message.From.Email);
            Assert.Equal(fromName, _message.From.Name);
        }

        [Fact]
        public void BuildEmailTo_email_no_name()
        {
            var toEmail = "spiderman@marvel.comic";
            var toName = string.Empty;


            _worker = new MessageWorker(_message);
            _worker.BuildEmailTo(toEmail, toName);
            Assert.Equal(toEmail,_message.Personalizations[0].Tos[0].Email);
        }

        [Fact]
        public void BuildEmailTo_email_and_name()
        {
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";


            _worker = new MessageWorker(_message);
            _worker.BuildEmailTo(toEmail, toName);
            Assert.Equal(toEmail, _message.Personalizations[0].Tos[0].Email);
            Assert.Equal(toName, _message.Personalizations[0].Tos[0].Name);
        }

    }
}

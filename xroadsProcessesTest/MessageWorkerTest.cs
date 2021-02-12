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

        [Fact]
        public void BuildEmailCopyTest_no_copy()
        {
            _worker = new MessageWorker(_message);
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";
            _message.AddTo(toEmail, toName);
            var ccEmail = string.Empty;
            _worker.BuildEmailCopy(ccEmail);
            Assert.Null(_message.Personalizations[0].Ccs);
        }

        [Fact]
        public void BuildEmailCopyTest_1_email()
        {
            _worker = new MessageWorker(_message);
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";
            _message.AddTo(toEmail, toName);
            var ccEmail = "hulk@marvel.comic";
            _worker.BuildEmailCopy(ccEmail);
            Assert.Equal(ccEmail, _message.Personalizations[0].Ccs[0].Email);
        }

        [Fact]
        public void BuildEmailCopyTest_1_email_1_name()
        {
            _worker = new MessageWorker(_message);
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";
            _message.AddTo(toEmail, toName);
            var ccEmail = "hulk@marvel.comic;Bruce Banner";
            _worker.BuildEmailCopy(ccEmail);
            Assert.Equal("hulk@marvel.comic", _message.Personalizations[0].Ccs[0].Email);
            Assert.Equal("Bruce Banner", _message.Personalizations[0].Ccs[0].Name);
        }

        [Fact]
        public void BuildEmailCopyTest_2_email_2_name()
        {
            _worker = new MessageWorker(_message);
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";
            _message.AddTo(toEmail, toName);
            var ccEmail = "hulk@marvel.comic;Bruce Banner;ironman@marvel.comic;Tony Stark";
            _worker.BuildEmailCopy(ccEmail);
            Assert.Equal("hulk@marvel.comic", _message.Personalizations[0].Ccs[0].Email);
            Assert.Equal("Bruce Banner", _message.Personalizations[0].Ccs[0].Name);
            Assert.Equal("ironman@marvel.comic", _message.Personalizations[0].Ccs[1].Email);
            Assert.Equal("Tony Stark", _message.Personalizations[0].Ccs[1].Name);
        }

        [Fact]
        public void BuildEmailCopyTest_2_email_1_name()
        {
            _worker = new MessageWorker(_message);
            var toEmail = "spiderman@marvel.comic";
            var toName = "Peter Parker";
            _message.AddTo(toEmail, toName);
            var ccEmail = "hulk@marvel.comic;;ironman@marvel.comic;Tony Stark";
            _worker.BuildEmailCopy(ccEmail);
            Assert.Equal("hulk@marvel.comic", _message.Personalizations[0].Ccs[0].Email);
            Assert.Equal("ironman@marvel.comic", _message.Personalizations[0].Ccs[1].Email);
            Assert.Equal("Tony Stark", _message.Personalizations[0].Ccs[1].Name);
        }
    }
}

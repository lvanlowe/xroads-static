using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using JsonSerializer = System.Text.Json.JsonSerializer;
using SendGrid.Helpers.Mail;
using System.Text.Json;
using Microsoft.Azure.Cosmos;
using xroadsProcesses.DTO;
using xroadsProcesses.Worker;

namespace FunctionApp
{
    public static class SendDiaconateMeetingEmailFunc
    {
        [FunctionName("SendDiaconateMeetingEmailFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [SendGrid(ApiKey = "CustomSendGridKeyAppSettingName")] IAsyncCollector<SendGridMessage> messageCollector,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var meeting = JsonSerializer.Deserialize<DeaconMeeting>(requestBody, options);

            try
            {
                var message = new SendGridMessage();
                var worker = new MessageWorker(message);

                meeting.Email = Environment.GetEnvironmentVariable("DeaconMeetingEmail");
                meeting.Name = Environment.GetEnvironmentVariable("DeaconMeetingName");
                meeting.FromEmail = Environment.GetEnvironmentVariable("DeaconMeetingFromEmail");
                meeting.FromName = Environment.GetEnvironmentVariable("DeaconMeetingFromName");
                meeting.Copy = Environment.GetEnvironmentVariable("DeaconMeetingCopy");

                await messageCollector.AddAsync(worker.PrepareDiaconateMeetingEmail(meeting));

            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
                return new BadRequestResult();
            }


            return new OkResult();
        }
    }
}

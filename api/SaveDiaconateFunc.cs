using System;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using xroadsProcesses.DTO;
using xroadsProcesses.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace api
{
    public static class SaveDiaconateFunc
    {
        [FunctionName("SaveDiaconateFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function,  "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "ministries",
                collectionName: "diaconate",
                ConnectionStringSetting = "CosmosDBConnection")]IAsyncCollector<DiaconateDB> diaconateDocuments,

            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var diaconate = JsonSerializer.Deserialize<DiaconateDB>(requestBody, options);
            try
            {
                if (diaconate.id == null)
                {
                    diaconate.id = Guid.NewGuid().ToString();
                }
                else
                {
                    if (diaconate.meetingDate != diaconate.newMeetingDate)
                    {
                        var meetingUrl = System.Environment.GetEnvironmentVariable("MeetingUrl");
                        DeaconMeeting meeting = new DeaconMeeting();
                        meeting.ZoomLink = diaconate.meetingUrl;
                        meeting.DiaconateId = diaconate.id;
                        meeting.Year = diaconate.year;
                        if (DateTimeFormatInfo.CurrentInfo != null)
                            meeting.Month = DateTimeFormatInfo.CurrentInfo.GetMonthName(diaconate.month);
                        if (diaconate.newMeetingDate.HasValue)
                        {
                            var meetingTime = diaconate.newMeetingDate.Value.AddHours(-5);
                            meeting.DeaconDate = meetingTime.ToLongDateString() + " " + meetingTime.ToShortTimeString();
                        }
                        if (diaconate.meetingDate.HasValue)
                        {
                            meeting.OldMeetingDate = diaconate.meetingDate.Value.AddHours(-5).ToLongDateString();
                        }

                        var registrantDb = JsonSerializer.Serialize<DeaconMeeting>(meeting);
                        var client = new HttpClient();
                        _ = client.PostAsync(meetingUrl, new StringContent(registrantDb, Encoding.UTF8, "application/json"));
                        diaconate.meetingDate = diaconate.newMeetingDate;
                    }
                }

                diaconate.newMeetingDate = null;
                await diaconateDocuments.AddAsync(diaconate);
            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
            }

            return new OkObjectResult(diaconate);
        }
    }
}

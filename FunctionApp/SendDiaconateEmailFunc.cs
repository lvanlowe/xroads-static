using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using SendGrid.Helpers.Mail;
using xroadsProcesses.DTO;
using xroadsProcesses.Models;
using xroadsProcesses.Worker;

namespace FunctionApp
{
    public static class SendDiaconateEmailFunc
    {
        [FunctionName("SendDiaconateEmailFunc")]
        public static async Task RunAsync([TimerTrigger("0 0 15 * * THU")] TimerInfo myTimer,
            [SendGrid(ApiKey = "CustomSendGridKeyAppSettingName")] IAsyncCollector<SendGridMessage> messageCollector,
            ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            var connection = Environment.GetEnvironmentVariable("CosmosDBConnection");


            try
            {
                var cosmosClient = new CosmosClient(connection);
                const string databaseId = "ministries";
                var database = await cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
                var deacon = new DeaconDuty { Month = DateTime.Now.AddMonths(1).ToString("MMMM") };
                var meeting = new DeaconMeeting();
                await GetCurrentDeacon(database.Database, deacon, meeting);
                if (string.IsNullOrEmpty(deacon.AttendeeId))
                {
                    log.LogInformation("Deacon not found");
                }
                await GetDeaconInformation(database.Database, deacon);
                if (string.IsNullOrEmpty(deacon.AttendeeId))
                {
                    log.LogInformation("Attendee not found");
                }

                var message = new SendGridMessage();
                var worker = new MessageWorker(message);

                deacon.FromEmail = Environment.GetEnvironmentVariable("DeaconDutyFromEmail");
                deacon.FromName = Environment.GetEnvironmentVariable("DeaconDutyFromName");
                deacon.Copy = Environment.GetEnvironmentVariable("DeaconDutyCopy");

                await messageCollector.AddAsync(worker.PrepareDiaconateEmail(deacon));

                if (!string.IsNullOrEmpty(meeting.DeaconDate))
                {
                    meeting.Email = Environment.GetEnvironmentVariable("DeaconMeetingEmail");
                    meeting.Name = Environment.GetEnvironmentVariable("DeaconMeetingName");
                    meeting.FromEmail = Environment.GetEnvironmentVariable("DeaconMeetingFromEmail");
                    meeting.FromName = Environment.GetEnvironmentVariable("DeaconMeetingFromName");
                    meeting.Copy = Environment.GetEnvironmentVariable("DeaconMeetingCopy");
                    await messageCollector.AddAsync(worker.PrepareDiaconateReminderEmail(meeting));
                }
            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
            }

        }

        private static async Task GetDeaconInformation(Database database, DeaconDuty deacon)
        {
            const string attendeeContainerId = "attendee";
            var attendeeContainer = await database.CreateContainerIfNotExistsAsync(attendeeContainerId, "/lastName");

            var attendeeQuery = "SELECT * FROM a WHERE a.id = '" + deacon.AttendeeId + "'";
            var attendeeQueryDefinition = new QueryDefinition(attendeeQuery);
            var attendeeIterator =
                attendeeContainer.Container.GetItemQueryIterator<AttendeeDB>(attendeeQueryDefinition);
            var members = new List<AttendeeDB>();
            while (attendeeIterator.HasMoreResults)
            {
                var attendeeResults = await attendeeIterator.ReadNextAsync();
                members.AddRange(attendeeResults);
            }

            deacon.FirstName = members[0].firstName;
            deacon.LastName = members[0].lastName;
            deacon.Email = members[0].email;
        }

        private static async Task GetCurrentDeacon(Database database, DeaconDuty deacon, DeaconMeeting meeting)
        {
            const string deaconContainerId = "diaconate";

            var deaconContainer = await database.CreateContainerIfNotExistsAsync(deaconContainerId, "/year");
            var deaconQuery = "SELECT * FROM c WHERE  ( c.month = " + DateTime.Now.Month + " AND c.year = " + DateTime.Now.Year + " ) OR (c.month = " + DateTime.Now.AddMonths(1).Month + " AND c.year = " + DateTime.Now.AddMonths(1).Year + " )";
            var deaconQueryDefinition = new QueryDefinition(deaconQuery);
            var deaconIterator = deaconContainer.Container.GetItemQueryIterator<DiaconateDB>(deaconQueryDefinition);
            var deacons = new List<DiaconateDB>();

            while (deaconIterator.HasMoreResults)
            {
                var deaconResults = await deaconIterator.ReadNextAsync();
                deacons.AddRange(deaconResults);
            }

            foreach (var diaconate in deacons)
            {
                if (diaconate.month == DateTime.Now.Month)
                {
                    if (!diaconate.meetingDate.HasValue || !(diaconate.meetingDate > DateTime.Now)) continue;
                    var meetingTime = diaconate.meetingDate.Value.AddHours(-5);
                    meeting.ZoomLink = diaconate.meetingUrl;
                    meeting.DiaconateId = diaconate.id;
                    meeting.Year = diaconate.year;
                    if (DateTimeFormatInfo.CurrentInfo != null)
                        meeting.Month = DateTimeFormatInfo.CurrentInfo.GetMonthName(diaconate.month);
                    meeting.DeaconDate = meetingTime.ToLongDateString() + " " + meetingTime.ToShortTimeString();
                }
                else
                {
                    deacon.Name = diaconate.name;
                    deacon.AttendeeId = diaconate.attendeeId;
                }
            }
        }
    }


}

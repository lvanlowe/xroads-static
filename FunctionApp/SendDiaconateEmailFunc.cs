using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using SendGrid.Helpers.Mail;
using xroadsProcesses.DTO;
using xroadsProcesses.Worker;

namespace FunctionApp
{
    public static class SendDiaconateEmailFunc
    {
        [FunctionName("SendDiaconateEmailFunc")]
        public static async Task RunAsync([TimerTrigger("0 0 15 * * SAT")]TimerInfo myTimer,
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

                await GetCurrentDeacon(database.Database, deacon);
                if (string.IsNullOrEmpty(deacon.AttendeeId))
                {
                    log.LogInformation("Deacon not found");
                }
                await GetDeaconInformation(database.Database, deacon);
                if (string.IsNullOrEmpty(deacon.AttendeeId))
                {
                    log.LogInformation("Deacon not found");
                }

                var message = new SendGridMessage();
                var worker = new MessageWorker(message);

                deacon.FromEmail = Environment.GetEnvironmentVariable("DeaconDutyFromEmail");
                deacon.FromName = Environment.GetEnvironmentVariable("DeaconDutyFromName");
                deacon.Copy = Environment.GetEnvironmentVariable("DeaconDutyCopy");

                await messageCollector.AddAsync(worker.PrepareDiaconateEmail(deacon));

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

        private static async Task GetCurrentDeacon(Database database, DeaconDuty deacon)
        {
            const string deaconContainerId = "diaconate";

            var deaconContainer = await database.CreateContainerIfNotExistsAsync(deaconContainerId, "/year");
            var deaconQuery = "SELECT * FROM c WHERE c.month = " + DateTime.Now.AddMonths(1).Month + " AND c.year = " + DateTime.Now.AddMonths(1).Year;
            var deaconQueryDefinition = new QueryDefinition(deaconQuery);
            var deaconIterator = deaconContainer.Container.GetItemQueryIterator<DiaconateDB>(deaconQueryDefinition);
            var deacons = new List<DiaconateDB>();

            while (deaconIterator.HasMoreResults)
            {
                var deaconResults = await deaconIterator.ReadNextAsync();
                deacons.AddRange(deaconResults);
            }

            deacon.Name = deacons[0].name;
            deacon.AttendeeId = deacons[0].attendeeId;
        }
    }


}

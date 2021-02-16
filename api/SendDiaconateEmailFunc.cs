using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid.Helpers.Mail;
using xroadsProcesses.DTO;
using xroadsProcesses.Worker;

namespace api
{
    public static class SendDiaconateEmailFunc
    {
        [FunctionName("SendDiaconateEmailFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [SendGrid(ApiKey = "CustomSendGridKeyAppSettingName")] IAsyncCollector<SendGridMessage> messageCollector,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var connection = System.Environment.GetEnvironmentVariable("CosmosDBConnection");

            var cosmosClient = new CosmosClient(connection);
            var databaseId = "ministries";
            var containerId = "diaconate";
            var database = await cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
            var container = await database.Database.CreateContainerIfNotExistsAsync(containerId, "/year");


            var sqlQueryText = "SELECT * FROM c WHERE c.month = 1";
            QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
            FeedIterator<DiaconateDB> queryResultSetIterator = container.Container.GetItemQueryIterator<DiaconateDB>(queryDefinition);
            List<DiaconateDB> families = new List<DiaconateDB>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<DiaconateDB> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (DiaconateDB deaconx in currentResultSet)
                {
                    families.Add(deaconx);
                }
            }

            var message = new SendGridMessage();
            var worker = new MessageWorker(message);
            var deacon = new DeaconDuty{Email = "lvanlowe@comcast.net", Name = "Van", FirstName = "Van", Month = "March"};

 

            deacon.FromEmail = System.Environment.GetEnvironmentVariable("DeaconDutyFromEmail");
            deacon.FromName = System.Environment.GetEnvironmentVariable("DeaconDutyFromName");
            deacon.Copy = System.Environment.GetEnvironmentVariable("DeaconDutyCopy");

            await messageCollector.AddAsync(worker.PrepareDiaconateEmail(deacon));

            return new OkResult();
        }

        // <QueryWithSqlParameters>
        private static async Task QueryWithSqlParameters(Container container)
        {
            // Query using two properties within each item. WHERE Id == "" AND Address.City == ""
            // notice here how we are doing an equality comparison on the string value of City

            QueryDefinition query = new QueryDefinition("SELECT * FROM Families f WHERE f.id = @id AND f.Address.City = @city")
                .WithParameter("@id", "AndersonDiaconateDB")
                .WithParameter("@city", "Seattle");

            List<DiaconateDB> results = new List<DiaconateDB>();
            using FeedIterator<DiaconateDB> resultSetIterator = container.GetItemQueryIterator<DiaconateDB>(
                query,
                requestOptions: new QueryRequestOptions()
                {
                    PartitionKey = new PartitionKey("Anderson")
                });
            while (resultSetIterator.HasMoreResults)
            {
                FeedResponse<DiaconateDB> response = await resultSetIterator.ReadNextAsync();
                results.AddRange(response);
                if (response.Diagnostics != null)
                {
                }
            }
        }
    }
}

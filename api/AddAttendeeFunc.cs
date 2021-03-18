using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using xroadsProcesses.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace api
{
    public static class AddAttendeeFunc
    {
        [FunctionName("AddAttendeeFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function,  "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "ministries",
                collectionName: "attendee",
                ConnectionStringSetting = "CosmosDBConnection")]IAsyncCollector<AttendeeDB> attendeeDocuments,

            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var attendee = JsonSerializer.Deserialize<AttendeeDB>(requestBody, options);
            try
            {
                if (attendee.id == null)
                {
                    attendee.id = Guid.NewGuid().ToString();
                }
                await attendeeDocuments.AddAsync(attendee);
            }
            catch (Exception e)
            {
                log.LogInformation(e.ToString());
            }

            return new OkObjectResult(attendee);
        }
    }
}

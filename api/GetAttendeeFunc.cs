using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using xroadsProcesses.Models;

namespace api
{
    public static class GetAttendeeFunc
    {
        [FunctionName("GetAttendeeFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "ministries",
                collectionName: "attendee",
                SqlQuery = "SELECT * FROM attendee",
                ConnectionStringSetting = "CosmosDBConnection")]IEnumerable<AttendeeDB> attendeeDocuments,

            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            return new OkObjectResult(attendeeDocuments);
        }

    }
}

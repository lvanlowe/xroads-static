using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api
{
    public static class GetDiaconateFunc
    {
        [FunctionName("GetDiaconateFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "ministries",
                collectionName: "diaconate",
                SqlQuery = "SELECT * FROM diaconate",
                ConnectionStringSetting = "CosmosDBConnection")]IEnumerable<DiaconateDB> diaconateDocuments,

            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            return new OkObjectResult(diaconateDocuments);
        }
    }
}

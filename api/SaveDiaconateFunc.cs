using System;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
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
